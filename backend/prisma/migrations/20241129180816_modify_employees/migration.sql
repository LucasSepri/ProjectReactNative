/*
  Warnings:

  - Changed the type of `dayOff` on the `Employee` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Employee" DROP COLUMN "dayOff",
ADD COLUMN     "dayOff" JSONB NOT NULL;
