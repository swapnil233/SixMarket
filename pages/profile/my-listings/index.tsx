import PrimaryLayout from "@/components/layout/primary/PrimaryLayout";
import prisma from "@/utils/prisma";
import { requireAuthentication } from "@/utils/requireAuthentication";
import { Listing, Image, Message } from "@prisma/client";
import { GetServerSideProps } from "next";
import MyListingsTable from "@/components/tables/listings/MyListingsTable";
import { NextPageWithLayout } from "@/pages/page";
import Head from "next/head";

interface IMyListingsPageProps {
  listingsWithImages: (Pick<Listing, "id" | "name" | "price" | "views"> & {
    images: Image[];
    messages: Pick<Message, "id">[];
  })[];
}

export const getServerSideProps: GetServerSideProps = async (context: any) => {
  return requireAuthentication(context, async (session: any) => {
    // Get listings with images, and messages
    const listingsWithImages: (Pick<
      Listing,
      "id" | "name" | "price" | "views"
    > & {
      images: Image[];
      messages: Pick<Message, "id">[];
    })[] = await prisma.listing.findMany({
      where: {
        userId: session.user.id,
      },
      select: {
        id: true,
        name: true,
        price: true,
        views: true,
        images: {
          take: 1,
        },
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
      <Head>
        <title>{`My Listings | Marketplace`}</title>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
        <meta name="description" content="View and edit your listings." />

        <meta property="og:title" content={`My Listings | Marketplace`} />
        <meta
          property="og:description"
          content="View and edit your listings."
        />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Marketplace" />
      </Head>

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
