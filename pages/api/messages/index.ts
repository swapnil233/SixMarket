import prisma from "@/utils/prisma";
import { NextApiRequest, NextApiResponse } from "next";
const logger = require("@/utils/logger");

// /api/messages/
export default async function Handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const {
    content,
    senderId,
    senderName,
    recipientId,
    listingId,
    listingName,
  }: {
    content: string;
    senderId: string;
    senderName: string;
    recipientId: string;
    listingId: string;
    listingName: string;
  } = req.body;

  if (req.method === "POST") {
    await logger(req, res, async () => {
      if (
        !content ||
        !senderId ||
        !senderName ||
        !recipientId ||
        !listingId ||
        !listingName
      ) {
        return res.status(400).json({
          error:
            "All fields (content, senderId, senderName, recipientId, listingName, and listingId) are required.",
        });
      }

      try {
        const message = await prisma.message.create({
          data: {
            content: content,
            listing: {
              connect: {
                id: listingId,
              },
            },
            recipient: {
              connect: {
                id: recipientId,
              },
            },
            sender: {
              connect: {
                id: senderId,
              },
            },
          },
        });

        // Create a new notification for the recipient
        const notification = await prisma.notification.create({
          data: {
            type: "MESSAGE",
            content: `New message from ${senderName} about listing ${listingName}`,
            user: {
              connect: {
                id: recipientId,
              },
            },
            listingId: listingId,
          },
        });

        return res.status(201).json({
          message,
          notification,
        });
      } catch (error: any) {
        console.error("Error creating message:", error.message, error.stack);
        return res.status(500).json({ error: "Failed to create message." });
      }
    });
  } else {
    res.setHeader("Allow", "POST");
    res.status(405).end("Method Not Allowed");
  }
}
