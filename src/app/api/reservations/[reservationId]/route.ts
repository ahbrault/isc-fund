import { prisma } from '@/common';
import { NextResponse } from 'next/server';

// This is the expected shape of the data from the management form
interface UpdateRequestBody {
  hostInfo: {
    name: string;
    companyName?: string;
    email: string;
    phone?: string;
    address: {
      line1: string;
      city: string;
      postal_code: string;
      country: string;
    };
  };
  guests: {
    id: string; // We need the ID to know which placeholder guest to update
    name: string;
  }[];
}

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ reservationId: string }> }
) {
  try {
    const { reservationId } = await params;
    const body: UpdateRequestBody = await request.json();
    const { hostInfo, guests } = body;

    // Find the host guest record to update it
    const hostGuest = await prisma.tableGuest.findFirst({
      where: {
        reservationId: reservationId,
        isHost: true,
      },
    });

    if (!hostGuest) {
      return NextResponse.json({ error: 'Host not found for this reservation' }, { status: 404 });
    }

    // Use a transaction to update all records atomically
    await prisma.$transaction(async tx => {
      // 1. Update the host's complete information
      await tx.tableGuest.update({
        where: { id: hostGuest.id },
        data: {
          name: hostInfo.name,
          companyName: hostInfo.companyName,
          email: hostInfo.email,
          phone: hostInfo.phone,
          address: hostInfo.address,
        },
      });

      // 2. Update the names of the placeholder guests
      // We use Promise.all to run all updates concurrently for performance
      await Promise.all(
        guests.map(guest =>
          tx.tableGuest.update({
            where: { id: guest.id },
            data: { name: guest.name },
          })
        )
      );
    });

    return NextResponse.json({ message: 'Reservation updated successfully' });
  } catch (error) {
    console.error('[API Update Reservation] Error:', error);
    return NextResponse.json({ error: 'An internal error occurred' }, { status: 500 });
  }
}
