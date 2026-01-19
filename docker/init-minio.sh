#!/bin/sh
set -e

# Wait for MinIO to be ready
echo "Waiting for MinIO to be ready..."
sleep 2

# Configure MinIO client
mc alias set myminio http://minio:9000 ${MINIO_ROOT_USER:-minioadmin} ${MINIO_ROOT_PASSWORD:-minioadmin}

# Create the bucket if it doesn't exist
if ! mc ls myminio/sixmarket > /dev/null 2>&1; then
    echo "Creating bucket: sixmarket"
    mc mb myminio/sixmarket
else
    echo "Bucket sixmarket already exists"
fi

# Set bucket policy to allow public read access for images
echo "Setting bucket policy to public..."
mc anonymous set download myminio/sixmarket

echo "MinIO initialization complete!"
