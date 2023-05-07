import prisma from "@/utils/prisma";
import { NextApiRequest, NextApiResponse } from "next";

async function getListing(id: string) {
  return prisma.listing.findUnique({
    where: {
      id: id,
    },
    include: {
      user: true,
      images: true,
      category: true,
      favorites: true,
      tags: true,
      messages: true,
    },
  });
}

// GET '/api/listings/[id]'
export default async function Handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    const id: string = req.query.id as string;

    // Input validation
    if (!id) {
      return res.status(400).send("Missing id parameter in the request.");
    }

    try {
      const listingInfo = await getListing(id);

      return res.status(200).json(listingInfo);
    } catch (error: any) {
      res
        .status(500)
        .json({ message: "An error occurred.", error: error.message });
    }
  } else {
    res.setHeader("Allow", "GET");
    res.status(405).send("Method not allowed. Use 'GET' instead.");
  }
}
