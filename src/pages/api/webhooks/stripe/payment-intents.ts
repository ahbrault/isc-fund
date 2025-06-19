// pages/api/webhooks/stripe.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import { buffer } from 'micro';
import { stripe } from '@/common/config/stripe';
import { prisma } from '@/common';
import Stripe from 'stripe';

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.setHeader('Allow', 'POST').status(405).end('Method Not Allowed');
  }

  let event: Stripe.Event;

  const buf = await buffer(req);
  const sig = req.headers['stripe-signature'] as string;

  try {
    event = stripe.webhooks.constructEvent(buf.toString(), sig, process.env.STRIPE_WEBHOOK_SECRET!);
  } catch (err: any) {
    console.error('[Stripe Webhook] Signature verification failed:', err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  const paymentIntent = event.data.object as Stripe.PaymentIntent;
  const { metadata } = paymentIntent;
  const reservationId = metadata.reservationId;
  const guestId = metadata.guestId;

  switch (event.type) {
    case 'payment_intent.succeeded':
      if (!reservationId || !guestId) {
        console.warn('[Stripe Webhook] Missing metadata. Skipping.');
        break;
      }

      try {
        if (metadata.payingFor === 'full_table') {
          await prisma.$transaction(async tx => {
            await tx.tableGuest.update({
              where: { id: guestId },
              data: { paymentStatus: 'PAID', paymentIntentId: paymentIntent.id },
            });

            await tx.tableGuest.updateMany({
              where: {
                reservationId,
                id: { not: guestId },
              },
              data: { paymentStatus: 'PAID' },
            });

            await tx.tableReservation.update({
              where: { id: reservationId },
              data: { status: 'COMPLETE' },
            });
          });
          console.log(
            `[Stripe Webhook] Full table reservation ${reservationId} marked as COMPLETE`
          );
        } else {
          await prisma.$transaction(async tx => {
            await tx.tableGuest.update({
              where: { id: guestId },
              data: { paymentStatus: 'PAID', paymentIntentId: paymentIntent.id },
            });

            const unpaidGuests = await tx.tableGuest.count({
              where: {
                reservationId,
                paymentStatus: { not: 'PAID' },
              },
            });

            if (unpaidGuests === 0) {
              await tx.tableReservation.update({
                where: { id: reservationId },
                data: { status: 'COMPLETE' },
              });
              console.log(`[Stripe Webhook] Reservation ${reservationId} is now fully paid`);
            }
          });
        }
      } catch (err) {
        console.error('[Stripe Webhook] Error updating database:', err);
        return res.status(500).json({ error: 'Database update failed' });
      }

      break;

    case 'payment_intent.payment_failed':
      console.warn(`[Stripe Webhook] Payment failed for intent ${paymentIntent.id}`);

      if (guestId) {
        await prisma.tableGuest.update({
          where: { id: guestId },
          data: { paymentStatus: 'FAILED' },
        });
        console.log(`[Stripe Webhook] Guest ${guestId} marked as FAILED`);
      }

      break;

    default:
      console.log(`[Stripe Webhook] Unhandled event type: ${event.type}`);
  }

  return res.status(200).json({ received: true });
}
