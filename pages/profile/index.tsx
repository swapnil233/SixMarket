import PrimaryLayout from "@/components/layout/primary/PrimaryLayout";
import prisma from "@/utils/prisma";
import { requireAuthentication } from "@/utils/requireAuthentication";
import { Button } from "@mantine/core";
import { Listing, User, Image as PrismaImage, Message } from "@prisma/client";
import { IconEdit } from "@tabler/icons-react";
import { GetServerSideProps } from "next";
import Image from "next/image";
import Link from "next/link";
import { NextPageWithLayout } from "../page";
import MyListingsTable from "@/components/tables/listings/MyListingsTable";

interface IMyProfilePageProps {
  user: User;
  listingsWithImages: (Listing & { images: PrismaImage[] } & {
    messages: Message[];
  })[];
  messageCount: number;
}

export const getServerSideProps: GetServerSideProps = async (context: any) => {
  return requireAuthentication(context, async (session: any) => {
    const user: User | null = await prisma.user.findUnique({
      where: { id: session.user.id },
    });

    // Get user's listings with images, and messages
    const listingsWithImages: (Listing & { images: PrismaImage[] })[] =
      await prisma.listing.findMany({
        where: {
          userId: session.user.id,
        },
        include: {
          images: true,
          messages: {
            select: {
              id: true,
            },
          },
        },
      });

    return {
      props: {
        user,
        listingsWithImages: JSON.parse(JSON.stringify(listingsWithImages)),
      },
    };
  });
};
const MyProfilePage: NextPageWithLayout<IMyProfilePageProps> = ({
  user,
  listingsWithImages,
}) => {
  return (
    <>
      <section className="w-full pb-8">
        <h1 className="text-3xl font-normal flex flex-col mb-4">Profile</h1>
        <h2 className="text-base leading-6 text-gray-600">
          This is your public profile. You can edit your profile and listings
          information.
        </h2>
      </section>

      <section className="grid grid-cols-4 gap-2">
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

        {/* Listings */}
        <div className="col-span-3">
          <MyListingsTable listingsWithImages={listingsWithImages} />
        </div>
      </section>
    </>
  );
};

export default MyProfilePage;

MyProfilePage.getLayout = (page) => <PrimaryLayout>{page}</PrimaryLayout>;
