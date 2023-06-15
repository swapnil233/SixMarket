import HeadingSection from "@/components/layout/heading/HeadingSection";
import PrimaryLayout from "@/components/layout/primary/PrimaryLayout";
import prisma from "@/utils/prisma";
import { requireAuthentication } from "@/utils/requireAuthentication";
import { User } from "@prisma/client";
import { GetServerSideProps } from "next";
import Head from "next/head";
import { NextPageWithLayout } from "../page";

interface UserSettingsProps {
  user: User;
}

export const getServerSideProps: GetServerSideProps<UserSettingsProps> = async (
  context
) => {
  return requireAuthentication(context, async (session) => {
    const user = await prisma.user.findUnique({
      where: { email: session.user?.email! },
    });

    return {
      props: {
        user,
      },
    };
  });
};

const UserSettings: NextPageWithLayout<UserSettingsProps> = ({ user }) => {
  return (
    <>
      <Head>
        <title>{`Account Settings | Marketplace`}</title>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
        <meta name="description" content="Edit your account settings." />
        <meta property="og:title" content={`Account Settings | Marketplace`} />
        <meta property="og:description" content="Edit your account settings." />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Marketplace" />
      </Head>

      <HeadingSection
        title="Account settings"
        description="Edit your account settings."
      />
    </>
  );
};

export default UserSettings;

UserSettings.getLayout = (page) => <PrimaryLayout>{page}</PrimaryLayout>;
