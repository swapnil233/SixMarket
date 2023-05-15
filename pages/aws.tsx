import { NextPageWithLayout } from "@/pages/page";
import PrimaryLayout from "@/components/layout/primary/PrimaryLayout";
import { useState } from "react";
import { FileInput, rem } from "@mantine/core";
import { IconUpload } from "@tabler/icons-react";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import { requireAuthentication } from "@/utils/requireAuthentication";
import { User } from "@prisma/client";
import prisma from "@/utils/prisma";

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

const AWSTest: NextPageWithLayout = () => {
  const [value, setValue] = useState<File[]>([]);

  const handleFormSubmit = async (event: any) => {
    event.preventDefault();
    console.log(value);
  };

  return (
    <>
      <h1>Upload to AWS S3</h1>

      <form onSubmit={handleFormSubmit}>
        <FileInput
          placeholder="Select images"
          label="Listing images"
          icon={<IconUpload size={rem(14)} />}
          description=".png, .jpg, .jpeg, .webp"
          withAsterisk
          multiple
          accept="image/png,image/jpeg"
          value={value}
          onChange={setValue}
        />

        <button type="submit">Submit</button>
      </form>
    </>
  );
};

export default AWSTest;
AWSTest.getLayout = (page) => {
  return <PrimaryLayout>{page}</PrimaryLayout>;
};
