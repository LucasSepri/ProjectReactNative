/*
  Warnings:

  - Added the required column `product_name` to the `Item` table without a default value. This is not possible if the table is not empty.
  - Added the required column `product_price` to the `Item` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Item" DROP CONSTRAINT "Item_product_id_fkey";

-- AlterTable
ALTER TABLE "Item" ADD COLUMN     "product_name" TEXT NOT NULL,
ADD COLUMN     "product_price" DOUBLE PRECISION NOT NULL,
ALTER COLUMN "updated_at" SET DEFAULT CURRENT_TIMESTAMP,
ALTER COLUMN "product_id" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Item" ADD CONSTRAINT "Item_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "Product"("id") ON DELETE SET NULL ON UPDATE CASCADE;
