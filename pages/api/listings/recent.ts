import prisma from "@/utils/prisma";
import { Image as PrismaImage, Listing as PrismaListing } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
const logger = require("@/utils/logger"); // Import the logger middleware using the 'require' syntax

interface Image extends PrismaImage { }
interface ListingWithImages extends PrismaListing {
  images: Image[];
}

async function getRecentListings(): Promise<ListingWithImages[] | null> {
  try {
    const listings = await prisma.listing.findMany({
      orderBy: {
        createdAt: "desc",
      },
      include: {
        images: true,
      },
      take: 5,
    });
    return listings;
  } catch (error: any) {
    console.error("Failed to fetch data", error);
    return null;
  }
}

export default async function Handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  logger(req, res, async () => {
    if (req.method === "HEAD") {
      res.status(200).end();
      return;
    }

    if (req.method !== "GET") {
      res.status(405).send({ error: "405 - Method not allowed" })
      return;
    }

    try {
      const recentAds = await getRecentListings();

      if (!recentAds || recentAds.length === 0) {
        res.status(200).send([]);
        return;
      }

      res.status(200).json(recentAds);
    } catch (error: unknown) {
      if (error instanceof Error) {
        res.status(500).send({ error: error.message });
      } else {
        res.status(500).send({
          error: "500 - An unexpected error occured.",
        });
      }
    }
  });
}
