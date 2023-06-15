// pages/profile/[id].tsx

import HeadingSection from "@/components/layout/heading/HeadingSection";
import PrimaryLayout from "@/components/layout/primary/PrimaryLayout";
import { User } from "@prisma/client";
import { GetServerSidePropsContext } from "next";
import Head from "next/head";
import Image from "next/image";
import { NextPageWithLayout } from "../page";

interface PageProps {
  user: User;
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  // @TODO remove API calls and fetch data directly within getServerSideProps for better performance
  // https://nextjs.org/docs/pages/building-your-application/data-fetching/get-server-side-props#getserversideprops-or-api-routes

  const { id } = context.query;
  const protocol = context.req.headers["x-forwarded-proto"] || "http";
  const host = context.req.headers["host"];
  const apiUrl = `${protocol}://${host}/api/profile/${id}`;

  // Check if the user exists
  const response = await fetch(apiUrl, { method: "HEAD" });

  // If the user doesn't exist, show a 404 page
  if (response.status === 404) {
    return {
      notFound: true,
    };
  }

  // If the user exists, fetch the user data
  const userData = await fetch(apiUrl);
  const user = await userData.json();

  return {
    props: {
      user: user,
    },
  };
}

const Page: NextPageWithLayout<PageProps> = ({ user }) => {
  return (
    <>
      <Head>
        <title>{`${user.name} | Marketplace`}</title>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
        <meta name="description" content={`Public profile of ${user.name}`} />
        <meta property="og:title" content={`${user.name} | Marketplace`} />
        <meta
          property="og:description"
          content={`Public profile of ${user.name}`}
        />
        <meta property="og:image" content={user.image || ""} />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Marketplace" />
      </Head>

      <HeadingSection
        title="Profile"
        description="This is your public profile. You can edit your profile and listings information."
      />

      <div className="grid grid-cols-12 gap-6 pt-10 md:pt-16 pb-10 md:pb-16 h-screen">
        {/* Profile */}
        <div className="col-span-12 md:col-span-4 sticky">
          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <Image
              className="mx-auto mb-4 rounded-full object-cover"
              src={user.image || "https://flowbite.com/docs/images/logo.svg"}
              width={120}
              height={120}
              alt="User image"
            />
            <h2 className="text-xl font-semibold">{user.name}</h2>
            <p className="text-gray-500">{user.email}</p>
          </div>
        </div>

        {/* Listings */}
        <div className="col-span-12 md:col-span-8 h-full">
          <div className="bg-white rounded-lg">
            {/* Grid of cards goes here */}
            <p className="text-gray-500">
              This is the container for the grid of cards.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Page;

Page.getLayout = (page) => {
  return <PrimaryLayout>{page}</PrimaryLayout>;
};
