import prisma from "@/utils/prisma";
import { Listing } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import { Session, getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";

async function CreateNewAd(adData: Listing) {
  try {
    const newAd = await prisma.listing.create({
      data: adData,
    });
    return newAd;
  } catch (error: any) {
    throw new Error(error);
  }
}

// POST '/api/listings/'
export default async function Handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session: Session | null = await getServerSession(req, res, authOptions);

  if (session) {
    // POST '/api/listings/'
    if (req.method === "POST") {
      console.log("sdfs");
      // @ts-expect-error - By default, session.user doesn't have ID. I added it using callbacks in `pages/api/auth/[...nextauth.ts]`
      const userId = session.user?.id;
      console.log(userId);
      try {
        // const adData = {
        //     userId,
        //     ...req.body,
        //     price: parseInt(req.body.price, 10),
        // };

        // console.log("Data from server", adData);
        // const newAd = await CreateNewAd(adData);

        res.status(201);
      } catch (error: any) {
        console.error("API error:", error); // Add this line to log the error
        res.status(500).send({ error: error.message });
      }
    } else {
      res.setHeader("Allow", "POST");
      res.status(405).end("Method Not Allowed");
    }
  } else {
    res.status(401).send("401 - Not Authorized");
  }
}
