import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { stripe } from '@/common/config/stripe';
import { prisma } from '@/common';

export async function POST(req: Request) {
  const body = await req.text();
  const signature = req.headers.get('stripe-signature') as string;

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(body, signature, process.env.STRIPE_WEBHOOK_SECRET!);
  } catch (err: any) {
    console.error('Webhook signature verification failed:', err.message);
    return new Response(`Webhook Error: ${err.message}`, { status: 400 });
  }

  const paymentIntent = event.data.object as Stripe.PaymentIntent;
  const { metadata } = paymentIntent;
  const reservationId = metadata.reservationId;
  const guestId = metadata.guestId;

  switch (event.type) {
    case 'payment_intent.succeeded': {
      if (!reservationId || !guestId) {
        console.log(
          'Webhook received for payment_intent.succeeded without reservation metadata. Skipping.'
        );
        break;
      }

      console.log(
        `Processing successful payment for reservationId: ${reservationId}, guestId: ${guestId}`
      );

      try {
        if (metadata.payingFor === 'full_table') {
          // SCENARIO A: Host pays for the full table
          await prisma.$transaction(async tx => {
            // Step 1: Update the host who paid. Only they get the paymentIntentId.
            await tx.tableGuest.update({
              where: { id: guestId },
              data: { paymentStatus: 'PAID', paymentIntentId: paymentIntent.id },
            });

            // Step 2: Mark all other guests in that reservation as paid, but without a payment ID.
            await tx.tableGuest.updateMany({
              where: {
                reservationId: reservationId,
                id: { not: guestId },
              },
              data: { paymentStatus: 'PAID' },
            });

            // Step 3: Mark the entire reservation as complete.
            await tx.tableReservation.update({
              where: { id: reservationId },
              data: { status: 'COMPLETE' },
            });
          });
          console.log(`[Webhook] Full table reservation ${reservationId} marked as COMPLETE.`);
        } else {
          // SCENARIO B: Individual payment
          await prisma.$transaction(async tx => {
            // Update the specific guest who paid
            await tx.tableGuest.update({
              where: { id: guestId },
              data: { paymentStatus: 'PAID', paymentIntentId: paymentIntent.id },
            });
            console.log(`[Webhook] Guest ${guestId} marked as PAID.`);

            // Check if the whole table is now complete
            const unpaidGuestsCount = await tx.tableGuest.count({
              where: {
                reservationId: reservationId,
                paymentStatus: { not: 'PAID' },
              },
            });

            if (unpaidGuestsCount === 0) {
              await tx.tableReservation.update({
                where: { id: reservationId },
                data: { status: 'COMPLETE' },
              });
              console.log(`[Webhook] Reservation ${reservationId} is now fully paid and COMPLETE.`);
            }
          });
        }
      } catch (err) {
        console.error('[Webhook] Error updating database:', err);
        return NextResponse.json({ error: 'Database update failed' }, { status: 500 });
      }

      break;
    }

    case 'payment_intent.payment_failed': {
      console.error(`Payment failed for PaymentIntent: ${paymentIntent.id}`, {
        reservationId: metadata.reservationId,
        guestId: metadata.guestId,
        reason: paymentIntent.last_payment_error?.message,
      });

      // Optional: Update database to reflect the failed payment
      if (guestId) {
        await prisma.tableGuest.update({
          where: { id: guestId },
          data: { paymentStatus: 'FAILED' },
        });
        console.log(`[Webhook] Guest ${guestId} marked as FAILED.`);
      }
      break;
    }

    default:
      console.log(`[Webhook] Unhandled event type: ${event.type}`);
  }

  return NextResponse.json({ received: true });
}
