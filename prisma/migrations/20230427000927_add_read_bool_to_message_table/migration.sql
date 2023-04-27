/*
  Warnings:

  - You are about to drop the column `itemId` on the `Message` table. All the data in the column will be lost.
  - Added the required column `listingId` to the `Message` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Message" DROP CONSTRAINT "Message_itemId_fkey";

-- AlterTable
ALTER TABLE "Message" DROP COLUMN "itemId",
ADD COLUMN     "listingId" TEXT NOT NULL,
ADD COLUMN     "read" BOOLEAN NOT NULL DEFAULT false;

-- AddForeignKey
ALTER TABLE "Message" ADD CONSTRAINT "Message_listingId_fkey" FOREIGN KEY ("listingId") REFERENCES "Listing"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
