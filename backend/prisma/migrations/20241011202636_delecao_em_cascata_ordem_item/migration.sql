-- DropForeignKey
ALTER TABLE "Item" DROP CONSTRAINT "Item_order_id_fkey";

-- AddForeignKey
ALTER TABLE "Item" ADD CONSTRAINT "Item_order_id_fkey" FOREIGN KEY ("order_id") REFERENCES "Order"("id") ON DELETE CASCADE ON UPDATE CASCADE;
