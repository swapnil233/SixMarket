/*
  Warnings:

  - You are about to drop the `_ListingTags` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_ListingTags" DROP CONSTRAINT "_ListingTags_A_fkey";

-- DropForeignKey
ALTER TABLE "_ListingTags" DROP CONSTRAINT "_ListingTags_B_fkey";

-- DropTable
DROP TABLE "_ListingTags";

-- CreateTable
CREATE TABLE "TagsOnListings" (
    "listingId" TEXT NOT NULL,
    "tagId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdBy" TEXT
);

-- CreateIndex
CREATE UNIQUE INDEX "TagsOnListings_listingId_tagId_key" ON "TagsOnListings"("listingId", "tagId");

-- AddForeignKey
ALTER TABLE "TagsOnListings" ADD CONSTRAINT "TagsOnListings_listingId_fkey" FOREIGN KEY ("listingId") REFERENCES "Listing"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TagsOnListings" ADD CONSTRAINT "TagsOnListings_tagId_fkey" FOREIGN KEY ("tagId") REFERENCES "Tag"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
