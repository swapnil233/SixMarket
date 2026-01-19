import { S3Client } from "@aws-sdk/client-s3";

/**
 * Centralized S3 client with MinIO support.
 *
 * Environment variables:
 * - AWS_ACCESS_KEY_ID: Access key for S3/MinIO
 * - AWS_SECRET_ACCESS_KEY: Secret key for S3/MinIO
 * - AWS_BUCKET_REGION: Region (use 'us-east-1' for MinIO)
 * - AWS_ENDPOINT_URL: Custom endpoint for MinIO (e.g., 'http://localhost:9000')
 * - AWS_FORCE_PATH_STYLE: Set to 'true' for MinIO path-style access
 */

const getS3Client = (): S3Client => {
  const accessKeyId = process.env.AWS_ACCESS_KEY_ID;
  const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY;
  const region = process.env.AWS_BUCKET_REGION || "us-east-1";

  if (!accessKeyId || !secretAccessKey) {
    throw new Error("AWS credentials not configured");
  }

  const config: ConstructorParameters<typeof S3Client>[0] = {
    region,
    credentials: {
      accessKeyId,
      secretAccessKey,
    },
  };

  // Custom endpoint for MinIO or other S3-compatible storage
  if (process.env.AWS_ENDPOINT_URL) {
    config.endpoint = process.env.AWS_ENDPOINT_URL;
  }

  // Path-style access required for MinIO
  if (process.env.AWS_FORCE_PATH_STYLE === "true") {
    config.forcePathStyle = true;
  }

  return new S3Client(config);
};

// Singleton instance
let s3Client: S3Client | null = null;

export const getS3ClientInstance = (): S3Client => {
  if (!s3Client) {
    s3Client = getS3Client();
  }
  return s3Client;
};

export default getS3ClientInstance;
