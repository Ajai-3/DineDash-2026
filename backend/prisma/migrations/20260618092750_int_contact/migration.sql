/*
  Warnings:

  - You are about to alter the column `contact` on the `Restaurant` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Integer`.

*/
-- AlterTable
ALTER TABLE "Restaurant" ALTER COLUMN "contact" SET DATA TYPE INTEGER;
