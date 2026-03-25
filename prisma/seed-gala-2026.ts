import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const event = await prisma.event.upsert({
    where: { slug: 'nikki-beach-july-26' },
    update: {
      name: 'Cathy Guetta for Sickle Cell — 2nd Edition',
      date: new Date('2026-07-16T19:00:00.000Z'),
      totalSeats: 200,
      seatPrice: 600,
      currency: 'eur',
    },
    create: {
      slug: 'nikki-beach-july-26',
      name: 'Cathy Guetta for Sickle Cell — 2nd Edition',
      date: new Date('2026-07-16T19:00:00.000Z'),
      totalSeats: 200,
      seatPrice: 600,
      currency: 'eur',
    },
  });

  console.log('Event created/updated:', event);
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
