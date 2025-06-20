/*
  Warnings:

  - A unique constraint covering the columns `[managementToken]` on the table `TableReservation` will be added. If there are existing duplicate values, this will fail.
  - The required column `managementToken` was added to the `TableReservation` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- CreateEnum
CREATE TYPE "CreatedBy" AS ENUM ('USER', 'ADMIN');

-- AlterTable
ALTER TABLE "TableReservation" ADD COLUMN     "createdBy" "CreatedBy" NOT NULL DEFAULT 'USER',
ADD COLUMN     "managementToken" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "TableReservation_managementToken_key" ON "TableReservation"("managementToken");
