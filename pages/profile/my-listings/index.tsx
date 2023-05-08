import PrimaryLayout from "@/components/layout/primary/PrimaryLayout";
import prisma from "@/utils/prisma";
import { requireAuthentication } from "@/utils/requireAuthentication";
import { Listing, Image as PrismaImage, Message } from "@prisma/client";
import { GetServerSideProps } from "next";
import MyListingsTable from "@/components/tables/listings/MyListingsTable";
import { NextPageWithLayout } from "@/pages/page";

interface IMyListingsPageProps {
  listingsWithImages: (Listing & { images: PrismaImage[] } & {
    messages: Message[];
  })[];
}

export const getServerSideProps: GetServerSideProps = async (context: any) => {
  return requireAuthentication(context, async (session: any) => {
    // Get listings with images, and messages
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
        listingsWithImages: JSON.parse(JSON.stringify(listingsWithImages)),
      },
    };
  });
};
const MyListingsPage: NextPageWithLayout<IMyListingsPageProps> = ({
  listingsWithImages,
}) => {
  return (
    <>
      <section className="w-full pb-8">
        <h1 className="text-3xl font-normal flex flex-col mb-4">My listings</h1>
        <h2 className="text-base leading-6 text-gray-600">
          You have {listingsWithImages.length} active listings
        </h2>
      </section>

      <section>
        {/* Listings */}
        <MyListingsTable listingsWithImages={listingsWithImages} />
      </section>
    </>
  );
};

export default MyListingsPage;

MyListingsPage.getLayout = (page) => <PrimaryLayout>{page}</PrimaryLayout>;
