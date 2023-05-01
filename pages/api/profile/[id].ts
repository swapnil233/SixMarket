import prisma from "@/utils/prisma";
import { User } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
const logger = require("@/utils/logger"); // Import the logger middleware using the 'require' syntax

async function getUserById(id: string): Promise<User | null> {
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: id,
      },
      include: {
        notifications: true,
      },
    });
    return user;
  } catch (error) {
    throw new Error("Failed to fetch data");
  }
}

export default async function Handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const id = req.query.id as string;

  await logger(req, res, async () => {
    try {
      const user = await getUserById(id);

      if (!user) {
        res.status(404).send({ error: "This user does not exist" });
        return;
      }

      // If the request method is HEAD, only send the status
      if (req.method === "HEAD") {
        res.status(200).end();
        return;
      }

      // If the request method is not HEAD, send the user data
      res.status(200).json(user);
    } catch (error: any) {
      res.status(500).send({ error: error.message });
    }
  });
}
