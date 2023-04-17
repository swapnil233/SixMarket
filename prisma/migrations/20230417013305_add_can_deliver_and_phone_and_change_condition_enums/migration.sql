/*
  Warnings:

  - The values [USED,OPEN_BOX,OPEN_BUT_NEVER_USED] on the enum `Condition` will be removed. If these variants are still used in the database, this will fail.
  - A unique constraint covering the columns `[phone]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "Condition_new" AS ENUM ('NEW', 'LIKE_NEW', 'EXCELLENT', 'GOOD', 'FAIR', 'SALVAGE');
ALTER TABLE "ItemForSale" ALTER COLUMN "condition" DROP DEFAULT;
ALTER TABLE "ItemForSale" ALTER COLUMN "condition" TYPE "Condition_new" USING ("condition"::text::"Condition_new");
ALTER TYPE "Condition" RENAME TO "Condition_old";
ALTER TYPE "Condition_new" RENAME TO "Condition";
DROP TYPE "Condition_old";
ALTER TABLE "ItemForSale" ALTER COLUMN "condition" SET DEFAULT 'NEW';
COMMIT;

-- AlterTable
ALTER TABLE "ItemForSale" ADD COLUMN     "canDeliver" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "phone" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "User_phone_key" ON "User"("phone");
