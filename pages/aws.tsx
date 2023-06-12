import PrimaryLayout from "@/components/layout/primary/PrimaryLayout";
import { NextPageWithLayout } from "@/pages/page";
import prisma from "@/utils/prisma";
import { requireAuthentication } from "@/utils/requireAuthentication";
import { Button, FileInput, rem } from "@mantine/core";
import { User } from "@prisma/client";
import { IconUpload } from "@tabler/icons-react";
import axios from "axios";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import { useState } from "react";

export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  return requireAuthentication(context, async (session: any) => {
    const user: User | null = await prisma.user.findUnique({
      where: { id: session.user.id },
    });

    return {
      props: {
        user,
      },
    };
  });
};

interface AWSTestPageProps {
  user: User | null;
}

const AWSTest: NextPageWithLayout<AWSTestPageProps> = ({ user }) => {
  const [value, setValue] = useState<File[]>([]);
  const [uploading, setUploading] = useState(false);

  const handleFormSubmit = async (event: any) => {
    event.preventDefault();

    // Loader
    setUploading(true);

    // Prevent empty file uploads
    if (!value.length) {
      console.log("No file selected");
      return;
    }

    const file = value[0];

    // This will need to be `listings/${listing.id}/images/${listing.id}-${file.name}`;
    const key = `users/${user?.id}/listings/${user?.id}-${file.name}`;

    const uploadUrl = (
      await axios.get(`/api/aws/getPresignedUploadUrl?key=${key}`)
    ).data.url;

    // upload the file to the presigned URL
    const response = await fetch(uploadUrl, {
      method: "PUT",
      body: file,
      headers: {
        "Content-Type": file.type,
      },
    });

    if (!response.ok) {
      console.log("Upload failed", response);
      setUploading(false);
    } else {
      console.log("Upload successful");
      setUploading(false);
    }
  };

  return (
    <>
      <h1>Upload to AWS S3</h1>

      <form onSubmit={handleFormSubmit}>
        <FileInput
          placeholder="Select images"
          label="Listing images"
          icon={<IconUpload size={rem(14)} />}
          withAsterisk
          multiple
          accept="image/png,image/jpeg"
          value={value}
          onChange={setValue}
          sx={{ marginBottom: "1rem", marginTop: "1rem" }}
        />

        <Button type="submit" loading={uploading}>
          Submit
        </Button>
      </form>
    </>
  );
};

export default AWSTest;
AWSTest.getLayout = (page) => {
  return <PrimaryLayout>{page}</PrimaryLayout>;
};
