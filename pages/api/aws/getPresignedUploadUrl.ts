import { PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { NextApiRequest, NextApiResponse } from "next";
import { getS3ClientInstance } from "@/utils/s3Client";
const logger = require("@/utils/logger"); // Import the logger middleware using the 'require' syntax

const createPresignedUrlWithClient = async ({
  bucket,
  key,
}: {
  bucket: string;
  key: string;
}) => {
  const client = getS3ClientInstance();
  const command = new PutObjectCommand({ Bucket: bucket, Key: key });
  return getSignedUrl(client, command, { expiresIn: 3600 });
};

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

    // Key = the name of the file
    const key = req.query.key;

    if (req.method === "GET") {
      try {
        if (!key) {
          res.status(400).send({ error: "400 - Invalid request." });
          return;
        }

        const bucket = process.env.AWS_BUCKET_NAME!;

        const url = await createPresignedUrlWithClient({
          bucket,
          key: key as string,
        });

        res.status(200).send({ url });
      } catch (error: unknown) {
        if (error instanceof Error) {
          res.status(500).send({ error: error.message });
        } else {
          res.status(500).send({
            error: "500 - An unexpected error occured.",
          });
        }
      }
    }
  });
}
