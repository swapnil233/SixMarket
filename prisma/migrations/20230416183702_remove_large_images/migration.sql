/*
  Warnings:

  - You are about to drop the column `image` on the `ItemForSale` table. All the data in the column will be lost.
  - You are about to drop the column `largeImage` on the `ItemForSale` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "ItemForSale" DROP COLUMN "image",
DROP COLUMN "largeImage",
ADD COLUMN     "images" TEXT[],
ALTER COLUMN "updatedAt" SET DEFAULT CURRENT_TIMESTAMP;
