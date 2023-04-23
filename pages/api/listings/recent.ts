import prisma from "@/utils/prisma";
import { Listing } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
const logger = require("@/utils/logger"); // Import the logger middleware using the 'require' syntax

async function getRecentListings(): Promise<Listing[] | null> {
  try {
    const listings = await prisma.listing.findMany({
      orderBy: {
        createdAt: "desc",
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
  await logger(req, res, async () => {
    // If the request method is HEAD, only send the status
    if (req.method === "HEAD") {
      res.status(200).end();
      return;
    }

    if (req.method === "GET") {
      try {
        const recentAds = await getRecentListings();

        if (!recentAds || recentAds.length === 0) {
          res.status(200).send([]);
          return;
        }

        // If the request method is not HEAD, send the user data
        res.status(200).json(recentAds);
      } catch (error: unknown) {
        if (error instanceof Error) {
          res.status(500).send({ error: error.message });
        } else {
          res.status(500).send({
            error: "500 - An unexpected error occured."
          })
        }
      }
    }
  });
}
