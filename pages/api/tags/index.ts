import prisma from "@/utils/prisma";
import { NextApiRequest, NextApiResponse } from "next";

// '/api/categories/'
export default async function Handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    const categories = await prisma.tag.findMany();
    return res.json(categories);
  }
}
