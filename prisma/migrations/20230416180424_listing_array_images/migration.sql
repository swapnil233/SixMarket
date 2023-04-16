/*
  Warnings:

  - The `image` column on the `ItemForSale` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `largeImage` column on the `ItemForSale` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "ItemForSale" DROP COLUMN "image",
ADD COLUMN     "image" TEXT[],
DROP COLUMN "largeImage",
ADD COLUMN     "largeImage" TEXT[];
