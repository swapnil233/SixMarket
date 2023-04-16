// pages/profile/[id].tsx

import { FC } from "react";
import Image from "next/image";
import { User } from "@prisma/client";
import { GetServerSidePropsContext } from "next";

interface PageProps {
  user: User;
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
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

const Page: FC<PageProps> = ({ user }) => {
  return (
    <>
      <h1 className="text-3xl font-semibold leading-7 text-gray-900 mb-4 pt-4 md:pt-8">
        Profile
      </h1>
      <h2 className="text-base leading-6 text-gray-600">
        This is your public profile. You can edit your profile and listings
        information.
      </h2>
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
