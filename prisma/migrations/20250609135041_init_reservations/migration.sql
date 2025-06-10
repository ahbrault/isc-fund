-- CreateEnum
CREATE TYPE "ReservationStatus" AS ENUM ('PENDING', 'COMPLETE');

-- CreateTable
CREATE TABLE "Event" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "totalSeats" INTEGER NOT NULL,
    "seatPrice" DOUBLE PRECISION NOT NULL,
    "currency" TEXT NOT NULL DEFAULT 'eur',

    CONSTRAINT "Event_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TableReservation" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "tableName" TEXT,
    "totalSeats" INTEGER NOT NULL,
    "status" "ReservationStatus" NOT NULL DEFAULT 'PENDING',
    "eventId" TEXT NOT NULL,

    CONSTRAINT "TableReservation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TableGuest" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT,
    "phone" TEXT,
    "address" TEXT,
    "isHost" BOOLEAN NOT NULL DEFAULT false,
    "hasPaid" BOOLEAN NOT NULL DEFAULT false,
    "paymentIntentId" TEXT,
    "reservationId" TEXT NOT NULL,

    CONSTRAINT "TableGuest_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "TableGuest_paymentIntentId_key" ON "TableGuest"("paymentIntentId");

-- AddForeignKey
ALTER TABLE "TableReservation" ADD CONSTRAINT "TableReservation_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Event"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TableGuest" ADD CONSTRAINT "TableGuest_reservationId_fkey" FOREIGN KEY ("reservationId") REFERENCES "TableReservation"("id") ON DELETE CASCADE ON UPDATE CASCADE;
