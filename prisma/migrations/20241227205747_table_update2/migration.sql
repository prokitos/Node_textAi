/*
  Warnings:

  - You are about to alter the column `rate_for_hundred` on the `models` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Decimal(10,3)`.

*/
-- AlterTable
ALTER TABLE "models" ALTER COLUMN "rate_for_hundred" SET DATA TYPE DECIMAL(10,3);
