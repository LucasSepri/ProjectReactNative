/*
  Warnings:

  - You are about to drop the `OrderPayment` table. If the table is not empty, all the data it contains will be lost.
  - Made the column `paymentMethod` on table `Order` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "OrderPayment" DROP CONSTRAINT "OrderPayment_actual_payment_id_fkey";

-- DropForeignKey
ALTER TABLE "OrderPayment" DROP CONSTRAINT "OrderPayment_intended_payment_id_fkey";

-- DropForeignKey
ALTER TABLE "OrderPayment" DROP CONSTRAINT "OrderPayment_order_id_fkey";

-- AlterTable
ALTER TABLE "Order" ALTER COLUMN "paymentMethod" SET NOT NULL;

-- DropTable
DROP TABLE "OrderPayment";
