import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { NextApiRequest, NextApiResponse } from "next";
const logger = require("@/utils/logger"); // Import the logger middleware using the 'require' syntax

const createPresignedUrlWithClient = async ({
    region,
    bucket,
    key,
}: {
    region: string;
    bucket: string;
    key: string;
}) => {
    const accessKeyId = process.env.AWS_ACCESS_KEY_ID!;
    const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY!;

    const client = new S3Client({
        region,
        credentials: {
            accessKeyId,
            secretAccessKey,
        },
    });

    const command = await new PutObjectCommand({ Bucket: bucket, Key: key });
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

                const region = process.env.AWS_BUCKET_REGION!;
                const bucket = process.env.AWS_BUCKET_NAME!;

                const url = await createPresignedUrlWithClient({
                    region,
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
