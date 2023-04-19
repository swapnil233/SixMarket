import PrimaryLayout from "@/components/layout/primary/PrimaryLayout";
import prisma from "@/utils/prisma";
import { requireAuthentication } from "@/utils/requireAuthentication";
import { User } from "@prisma/client";
import { Button } from "flowbite-react";
import { GetServerSideProps } from "next";
import Image from "next/image";
import { HiPencil } from "react-icons/hi";
import { NextPageWithLayout } from "../page";

interface indexProps {
  user: User;
}

export const getServerSideProps: GetServerSideProps = async (context: any) => {
  return requireAuthentication(context, async (session: any) => {
    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    });

    return {
      props: {
        user,
      },
    };
  });
};

const index: NextPageWithLayout<indexProps> = ({ user }) => {
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
            <div className="mt-4">
              <Button href="/profile/settings" color="gray">
                <HiPencil className="mr-2 h-5 w-5" />
                Edit profile
              </Button>
            </div>
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

export default index;

index.getLayout = (page) => <PrimaryLayout>{page}</PrimaryLayout>;
