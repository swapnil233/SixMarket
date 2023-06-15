import HeadingSection from "@/components/layout/heading/HeadingSection";
import PrimaryLayout from "@/components/layout/primary/PrimaryLayout";
import prisma from "@/utils/prisma";
import { requireAuthentication } from "@/utils/requireAuthentication";
import { Button } from "@mantine/core";
import { User } from "@prisma/client";
import { IconEdit } from "@tabler/icons-react";
import { GetServerSideProps } from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { NextPageWithLayout } from "../page";

interface IMyProfilePageProps {
  user: User;
}

export const getServerSideProps: GetServerSideProps = async (context: any) => {
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
const MyProfilePage: NextPageWithLayout<IMyProfilePageProps> = ({ user }) => {
  return (
    <>
      <Head>
        <title>{`Profile | Marketplace`}</title>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
        <meta name="description" content="View and edit your profile." />
        <meta property="og:title" content={`Profile | Marketplace`} />
        <meta property="og:description" content="View and edit your profile." />
        <meta property="og:image" content={user.image || ""} />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Marketplace" />
      </Head>

      <HeadingSection
        title="Profile"
        description="This is your public profile. You can edit your profile and listings information."
      />

      <section className="grid grid-cols-1 md:grid-cols-4 gap-2">
        {/* Profile */}
        <div className="col-span-1">
          <div className="bg-white rounded-sm shadow-sm p-2 text-center">
            <Image
              className="mx-auto mb-4 rounded-full object-cover"
              src={user.image || "https://flowbite.com/docs/images/logo.svg"}
              width={60}
              height={60}
              alt={`${user.name}'s profile picture`}
            />
            <h2 className="text-xl font-semibold">{user.name}</h2>
            <p className="text-gray-500">{user.email}</p>
            <div className="mt-4">
              <Button
                variant="subtle"
                leftIcon={<IconEdit />}
                component={Link}
                href="/profile/settings"
              >
                Edit profile
              </Button>
            </div>
          </div>
        </div>

        <div className="col-span-1">
          <Button variant="subtle" component={Link} href="/profile/my-listings">
            Manage my listings
          </Button>
        </div>
      </section>
    </>
  );
};

export default MyProfilePage;

MyProfilePage.getLayout = (page) => <PrimaryLayout>{page}</PrimaryLayout>;
