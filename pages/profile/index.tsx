import ListingCard from "@/components/cards/listing/ListingCard";
import PrimaryLayout from "@/components/layout/primary/PrimaryLayout";
import prisma from "@/utils/prisma";
import { requireAuthentication } from "@/utils/requireAuthentication";
import { Button } from "@mantine/core";
import { Listing, User } from "@prisma/client";
import { IconEdit } from "@tabler/icons-react";
import { GetServerSideProps } from "next";
import Image from "next/image";
import Link from "next/link";
import { NextPageWithLayout } from "../page";

interface indexProps {
  user: User;
  listings: Listing[];
}

export const getServerSideProps: GetServerSideProps = async (context: any) => {
  return requireAuthentication(context, async (session: any) => {
    const user: User | null = await prisma.user.findUnique({
      where: { id: session.user.id },
    });

    const listings: Listing[] = await prisma.listing.findMany({
      where: {
        userId: session.user.id,
      },
      include: {
        images: true,
      },
    });

    return {
      props: {
        user,
        listings: JSON.parse(JSON.stringify(listings)),
      },
    };
  });
};

const index: NextPageWithLayout<indexProps> = ({ user, listings }) => {
  return (
    <>
      <section className="w-full pb-8">
        <h1 className="text-3xl font-normal flex flex-col mb-4">Profile</h1>
        <h2 className="text-base leading-6 text-gray-600">
          This is your public profile. You can edit your profile and listings
          information.
        </h2>
      </section>

      <section className="grid grid-cols-3 gap-6">
        {/* Profile */}
        <div className="col-span-3 md:col-span-1">
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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 col-span-3 md:col-span-2 w-full">
          {listings.length > 0 ? (
            listings.map((listing, index) => (
              <div key={index}>
                <ListingCard
                  description={listing.description || ""}
                  title={listing.name}
                  price={listing.price || 0}
                  listingId={listing.id}
                  // @ts-expect-error
                  images={listing.images.map((image) => image.url)}
                />
              </div>
            ))
          ) : (
            <p>You have no listings</p>
          )}
        </div>
      </section>
    </>
  );
};

export default index;

index.getLayout = (page) => <PrimaryLayout>{page}</PrimaryLayout>;
