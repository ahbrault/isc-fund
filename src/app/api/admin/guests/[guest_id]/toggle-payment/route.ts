import { prisma } from '@/common';
import { NextResponse } from 'next/server';

export async function PATCH(request: Request, { params }: { params: { guest_id: string } }) {
  try {
    const guestId = params.guest_id;

    const guest = await prisma.tableGuest.findUnique({ where: { id: guestId } });

    if (!guest) {
      return NextResponse.json({ error: 'Guest not found' }, { status: 404 });
    }

    // Toggle the payment status
    const newStatus = guest.paymentStatus === 'PAID' ? 'PENDING' : 'PAID';

    const updatedGuest = await prisma.tableGuest.update({
      where: { id: guestId },
      data: {
        paymentStatus: newStatus,
        // When manually marking as paid, we nullify the stripe ID.
        // When marking as unpaid, we should also clear it.
        paymentIntentId: null,
      },
    });

    return NextResponse.json(updatedGuest);
  } catch (error) {
    console.error('[API_GUEST_TOGGLE_ERROR]', error);
    return NextResponse.json({ error: 'Failed to update guest status' }, { status: 500 });
  }
}
