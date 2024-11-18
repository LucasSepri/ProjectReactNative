/*
  Warnings:

  - You are about to drop the column `address` on the `StoreSettings` table. All the data in the column will be lost.
  - Added the required column `city` to the `StoreSettings` table without a default value. This is not possible if the table is not empty.
  - Added the required column `latitude` to the `StoreSettings` table without a default value. This is not possible if the table is not empty.
  - Added the required column `longitude` to the `StoreSettings` table without a default value. This is not possible if the table is not empty.
  - Added the required column `neighborhood` to the `StoreSettings` table without a default value. This is not possible if the table is not empty.
  - Added the required column `number` to the `StoreSettings` table without a default value. This is not possible if the table is not empty.
  - Added the required column `state` to the `StoreSettings` table without a default value. This is not possible if the table is not empty.
  - Added the required column `street` to the `StoreSettings` table without a default value. This is not possible if the table is not empty.
  - Added the required column `zip` to the `StoreSettings` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "StoreSettings" DROP COLUMN "address",
ADD COLUMN     "city" TEXT NOT NULL,
ADD COLUMN     "complement" TEXT,
ADD COLUMN     "latitude" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "longitude" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "neighborhood" TEXT NOT NULL,
ADD COLUMN     "number" TEXT NOT NULL,
ADD COLUMN     "referencePoint" TEXT,
ADD COLUMN     "state" TEXT NOT NULL,
ADD COLUMN     "street" TEXT NOT NULL,
ADD COLUMN     "zip" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "Chat" (
    "id" TEXT NOT NULL,
    "clientId" TEXT NOT NULL,
    "adminId" TEXT,
    "status" TEXT NOT NULL DEFAULT 'active',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Chat_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Message" (
    "id" TEXT NOT NULL,
    "chatId" TEXT NOT NULL,
    "senderId" TEXT NOT NULL,
    "isAdmin" BOOLEAN NOT NULL,
    "content" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Message_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Message" ADD CONSTRAINT "Message_chatId_fkey" FOREIGN KEY ("chatId") REFERENCES "Chat"("id") ON DELETE CASCADE ON UPDATE CASCADE;
