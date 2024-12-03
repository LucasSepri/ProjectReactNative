-- AlterTable
ALTER TABLE "User" ADD COLUMN     "isReceptionist" BOOLEAN NOT NULL DEFAULT false;

-- CreateTable
CREATE TABLE "Employee" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "rg" TEXT NOT NULL,
    "cpf" TEXT NOT NULL,
    "workCard" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "latitude" DOUBLE PRECISION NOT NULL,
    "longitude" DOUBLE PRECISION NOT NULL,
    "phone" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "hiringDate" TIMESTAMP(3) NOT NULL,
    "workingHours" JSONB NOT NULL,
    "salary" DOUBLE PRECISION NOT NULL,
    "dayOff" TEXT NOT NULL,
    "vacation" JSONB NOT NULL,
    "uniformSize" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Employee_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Employee_rg_key" ON "Employee"("rg");

-- CreateIndex
CREATE UNIQUE INDEX "Employee_cpf_key" ON "Employee"("cpf");

-- CreateIndex
CREATE UNIQUE INDEX "Employee_workCard_key" ON "Employee"("workCard");

-- CreateIndex
CREATE UNIQUE INDEX "Employee_email_key" ON "Employee"("email");
