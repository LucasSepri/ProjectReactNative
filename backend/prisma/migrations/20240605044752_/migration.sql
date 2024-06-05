/*
  Warnings:

  - You are about to drop the column `name` on the `orders` table. All the data in the column will be lost.
  - Added the required column `data` to the `orders` table without a default value. This is not possible if the table is not empty.
  - Added the required column `descricao` to the `orders` table without a default value. This is not possible if the table is not empty.
  - Added the required column `precoTotal` to the `orders` table without a default value. This is not possible if the table is not empty.
  - Made the column `created_at` on table `orders` required. This step will fail if there are existing NULL values in that column.
  - Made the column `updated_at` on table `orders` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "orders" DROP COLUMN "name",
ADD COLUMN     "data" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "descricao" TEXT NOT NULL,
ADD COLUMN     "precoTotal" DOUBLE PRECISION NOT NULL,
ALTER COLUMN "status" DROP DEFAULT,
ALTER COLUMN "status" SET DATA TYPE TEXT,
ALTER COLUMN "created_at" SET NOT NULL,
ALTER COLUMN "updated_at" SET NOT NULL;
