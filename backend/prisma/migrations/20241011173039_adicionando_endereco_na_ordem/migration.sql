/*
  Warnings:

  - Added the required column `deliveryType` to the `Order` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Order" ADD COLUMN     "deliveryAddress" TEXT,
ADD COLUMN     "deliveryType" TEXT NOT NULL,
ADD COLUMN     "tableNumber" TEXT;
