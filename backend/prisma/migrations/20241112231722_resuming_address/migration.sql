/*
  Warnings:

  - You are about to drop the column `city` on the `StoreSettings` table. All the data in the column will be lost.
  - You are about to drop the column `complement` on the `StoreSettings` table. All the data in the column will be lost.
  - You are about to drop the column `neighborhood` on the `StoreSettings` table. All the data in the column will be lost.
  - You are about to drop the column `number` on the `StoreSettings` table. All the data in the column will be lost.
  - You are about to drop the column `referencePoint` on the `StoreSettings` table. All the data in the column will be lost.
  - You are about to drop the column `state` on the `StoreSettings` table. All the data in the column will be lost.
  - You are about to drop the column `street` on the `StoreSettings` table. All the data in the column will be lost.
  - You are about to drop the column `zip` on the `StoreSettings` table. All the data in the column will be lost.
  - Added the required column `address` to the `StoreSettings` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "StoreSettings" DROP COLUMN "city",
DROP COLUMN "complement",
DROP COLUMN "neighborhood",
DROP COLUMN "number",
DROP COLUMN "referencePoint",
DROP COLUMN "state",
DROP COLUMN "street",
DROP COLUMN "zip",
ADD COLUMN     "address" TEXT NOT NULL;
