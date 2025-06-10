import { NextResponse } from 'next/server';
import { headers } from 'next/headers';
import Stripe from 'stripe';
import { stripe } from '@/common/config/stripe';
import { prisma } from '@/common';

export async function POST(req: Request) {
  const body = await req.text();
  const reqHeaders = await headers();
  const signature = reqHeaders.get('Stripe-Signature') as string;

  let event: Stripe.Event;

  // 1. --- Verify the webhook signature ---
  // This is crucial for security to ensure the request is from Stripe.
  try {
    event = stripe.webhooks.constructEvent(body, signature, process.env.STRIPE_WEBHOOK_SECRET!);
  } catch (err: any) {
    console.error(`❌ Webhook signature verification failed: ${err.message}`);
    return new Response(`Webhook Error: ${err.message}`, { status: 400 });
  }

  // 2. --- Handle the specific event type ---
  switch (event.type) {
    case 'checkout.session.completed': {
      const session = event.data.object as Stripe.Checkout.Session;
      const metadata = session.metadata;

      // --- This is where we add our new reservation logic ---
      const reservationId = metadata?.reservationId;
      const guestId = metadata?.guestId;

      // If the metadata for our reservation system isn't present, ignore it.
      // This allows the webhook to safely handle other payment types (like donations).
      if (!reservationId || !guestId) {
        console.log('Webhook received, but no reservation metadata. Skipping.');
        break; // Exit the switch case
      }

      console.log(`Processing payment for reservationId: ${reservationId}, guestId: ${guestId}`);

      try {
        // SCENARIO A: The host paid for the entire table at once.
        if (metadata.payingFor === 'full_table') {
          await prisma.$transaction(async tx => {
            // Mark all guests of this reservation as paid
            await tx.tableGuest.updateMany({
              where: { reservationId: reservationId },
              data: { hasPaid: true },
            });
            // Mark the reservation itself as complete
            await tx.tableReservation.update({
              where: { id: reservationId },
              data: { status: 'COMPLETE' },
            });
            // Update the paying host with their payment intent ID
            await tx.tableGuest.update({
              where: { id: guestId },
              data: { paymentIntentId: String(session.payment_intent) },
            });
          });
          console.log(`✅ Full table reservation ${reservationId} marked as COMPLETE.`);
        } else {
          // SCENARIO B: An individual guest (or host of a partial table) paid for their seat.
          await prisma.$transaction(async tx => {
            // Update the specific guest who paid
            await tx.tableGuest.update({
              where: { id: guestId },
              data: {
                hasPaid: true,
                paymentIntentId: String(session.payment_intent),
              },
            });

            console.log(`✅ Guest ${guestId} marked as PAID.`);

            // After this payment, check if the whole table is now complete.
            const unpaidGuestsCount = await tx.tableGuest.count({
              where: {
                reservationId: reservationId,
                hasPaid: false,
              },
            });

            if (unpaidGuestsCount === 0) {
              await tx.tableReservation.update({
                where: { id: reservationId },
                data: { status: 'COMPLETE' },
              });
              console.log(`✅ Reservation ${reservationId} is now complete.`);
            }
          });
        }
      } catch (err) {
        console.error('Error updating database from webhook:', err);
        // If an error occurs, we should return a 500 to let Stripe know something went wrong
        // on our end, and it will attempt to resend the webhook later.
        return NextResponse.json({ error: 'Database update failed' }, { status: 500 });
      }

      break;
    }
    // ... handle other event types if needed
    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  // 3. --- Return a 200 OK response to Stripe ---
  // This acknowledges receipt of the event.
  return NextResponse.json({ received: true });
}
