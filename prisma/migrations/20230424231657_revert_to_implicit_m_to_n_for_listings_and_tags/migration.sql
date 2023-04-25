/*
  Warnings:

  - You are about to drop the `TagsOnListings` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "TagsOnListings" DROP CONSTRAINT "TagsOnListings_createdById_fkey";

-- DropForeignKey
ALTER TABLE "TagsOnListings" DROP CONSTRAINT "TagsOnListings_listingId_fkey";

-- DropForeignKey
ALTER TABLE "TagsOnListings" DROP CONSTRAINT "TagsOnListings_tagId_fkey";

-- DropTable
DROP TABLE "TagsOnListings";

-- CreateTable
CREATE TABLE "_ListingToTag" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_ListingToTag_AB_unique" ON "_ListingToTag"("A", "B");

-- CreateIndex
CREATE INDEX "_ListingToTag_B_index" ON "_ListingToTag"("B");

-- AddForeignKey
ALTER TABLE "_ListingToTag" ADD CONSTRAINT "_ListingToTag_A_fkey" FOREIGN KEY ("A") REFERENCES "Listing"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ListingToTag" ADD CONSTRAINT "_ListingToTag_B_fkey" FOREIGN KEY ("B") REFERENCES "Tag"("id") ON DELETE CASCADE ON UPDATE CASCADE;
