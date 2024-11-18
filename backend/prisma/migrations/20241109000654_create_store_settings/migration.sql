/*
  Warnings:

  - You are about to drop the column `primaryColor` on the `StoreSettings` table. All the data in the column will be lost.
  - You are about to drop the column `secondaryColor` on the `StoreSettings` table. All the data in the column will be lost.
  - Added the required column `colors` to the `StoreSettings` table without a default value. This is not possible if the table is not empty.
  - Made the column `logo` on table `StoreSettings` required. This step will fail if there are existing NULL values in that column.
  - Made the column `background` on table `StoreSettings` required. This step will fail if there are existing NULL values in that column.
  - Changed the type of `openingHours` on the `StoreSettings` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "StoreSettings" DROP COLUMN "primaryColor",
DROP COLUMN "secondaryColor",
ADD COLUMN     "colors" JSONB NOT NULL,
ALTER COLUMN "logo" SET NOT NULL,
ALTER COLUMN "background" SET NOT NULL,
DROP COLUMN "openingHours",
ADD COLUMN     "openingHours" JSONB NOT NULL;
