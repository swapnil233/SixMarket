import prisma from "@/utils/prisma";
import { Notification } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";

// GET /api/notifications/getNumberOfNotifications
export default async function Handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Extract user ID from request
  const userId = req.query.userId as string;

  if (!userId) {
    res.status(400).json({ error: "User ID is required." });
    return;
  }

  try {
    // Get user's unread notifications
    const unreadNotifications: Notification[] =
      await prisma.notification.findMany({
        where: {
          userId,
          read: false,
        },
      });

    res.status(200).json(unreadNotifications);
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while fetching notification count." });
  } finally {
    await prisma.$disconnect();
  }
}
