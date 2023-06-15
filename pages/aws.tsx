import HeadingSection from "@/components/layout/heading/HeadingSection";
import PrimaryLayout from "@/components/layout/primary/PrimaryLayout";
import { NextPageWithLayout } from "@/pages/page";
import prisma from "@/utils/prisma";
import { requireAuthentication } from "@/utils/requireAuthentication";
import { Button, FileInput, rem } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { User } from "@prisma/client";
import { IconCheck, IconUpload, IconX } from "@tabler/icons-react";
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

    // Show notification
    notifications.show({
      id: "uploading-image",
      withCloseButton: false,
      title: "Uploading picture",
      message: "Leave the building immediately",
      // color: 'red',
      icon: <IconX />,
      loading: true,
    });

    // Loader
    setUploading(true);

    // Prevent empty file uploads
    if (!value.length) {
      console.log("No file selected");
      notifications.hide("uploading-image");
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
      notifications.hide("uploading-image");
      setUploading(false);
    } else {
      console.log("Upload successful");
      notifications.hide("uploading-image");
      notifications.show({
        id: "success",
        withCloseButton: true,
        title: "Picture uploaded",
        message: "We've stored the image in our database.",
        color: "green",
        icon: <IconCheck />,
        loading: false,
      });
      setUploading(false);
    }
  };

  return (
    <>
      <HeadingSection title="AWS Test" description="Testing AWS S3" />

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
