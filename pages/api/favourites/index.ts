import prisma from "@/utils/prisma";
import { Favorite } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";

// api/favourites/
export default async function Handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getServerSession(req, res, authOptions);

  if (!session) return res.status(401).send("Unauthorized");

  if (req.method === "GET") {
    try {
      // Get user's favourite listings
      const favourites: Favorite[] = await prisma.favorite.findMany({
        where: {
          // @ts-expect-error
          userId: session.user.id,
        },
      });

      res.status(200).json(favourites);
    } catch (error: any) {
      res.status(400).send(error);
    }
  }

  if (req.method === "POST") {
    try {
      const listingId = req.body.listingId;
      if (!listingId) return res.status(400).send("No listing ID");

      const newFavourite = await prisma.favorite.create({
        data: {
          listingId,
          // @ts-expect-error
          userId: session.user.id,
        },
      });

      res.status(201).json(newFavourite);
    } catch (error: any) {
      res.status(400).send(error);
    }
  }

  if (req.method === "DELETE") {
    try {
      const listingId = req.query.listingId as string;
      if (!listingId) return res.status(400).send("No listing ID");

      await prisma.favorite.deleteMany({
        where: {
          listingId,
          // @ts-expect-error
          userId: session.user.id,
        },
      });

      res.status(200).send("Favorite deleted");
    } catch (error: any) {
      res.status(400).send(error);
    }
  }
}
