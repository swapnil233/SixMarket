/*
  Warnings:

  - You are about to drop the column `createdBy` on the `TagsOnListings` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "TagsOnListings" DROP COLUMN "createdBy",
ADD COLUMN     "createdById" TEXT;

-- AddForeignKey
ALTER TABLE "TagsOnListings" ADD CONSTRAINT "TagsOnListings_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
