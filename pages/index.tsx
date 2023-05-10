import ListingCard from "@/components/cards/listing/ListingCard";
import PrimaryLayout from "@/components/layout/primary/PrimaryLayout";
import { Button, Skeleton } from "@mantine/core";
import { Image as PrismaImage, Listing as PrismaListing } from "@prisma/client";
import { signIn, useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { NextPageWithLayout } from "./page";

interface Image extends PrismaImage {}
interface Listing extends PrismaListing {
  images: Image[];
}

const Home: NextPageWithLayout = () => {
  const { status } = useSession();
  const [recentListings, setRecentListings] = useState<Listing[] | null>(null);

  // Fetch the 5 recent listings
  useEffect(() => {
    const fetchAndSetRecentListings = async () => {
      try {
        const response = await fetch("/api/listings/recent");
        const data = await response.json();
        setRecentListings(data);
      } catch (error) {
        console.error("Error fetching recent listings:", error);
      }
    };

    fetchAndSetRecentListings();
  }, []);

  let heroButtonsLayout;

  if (status === "unauthenticated") {
    heroButtonsLayout = (
      <div className="mt-5 flex w-full items-center justify-center">
        <Button
          variant="light"
          onClick={() => signIn(undefined, { callbackUrl: "/" })}
          className="mr-3"
        >
          Log in
        </Button>
        <Button
          variant="filled"
          onClick={() => signIn(undefined, { callbackUrl: "/listings/new" })}
        >
          Post an ad
        </Button>
      </div>
    );
  } else if (status === "loading") {
    heroButtonsLayout = (
      <div className="mt-5 flex w-full items-center justify-center">
        <Skeleton height={36} width={80} mr={12} />
        <Skeleton height={36} width={140} />
      </div>
    );
  } else {
    heroButtonsLayout = (
      <Button variant="filled">Browse recent listings</Button>
    );
  }

  return (
    <>
      {/* Hero */}
      <section className="pb-14 flex flex-col w-full text-center">
        {/* Title */}
        <h1 className="text-5xl lg:text-6xl mb-4 font-normal">
          Welcome to{" "}
          <span className="text-blue-800 font-medium">Marketplace</span>
        </h1>
        {/* Subtitle */}
        <p className="max-w-3xl mx-auto text-xl text-slate-600">
          Discover your local marketplace for buying, selling, and trading
          goods. Connect with nearby sellers and buyers to uncover distinctive
          finds, hidden gems, and fantastic deals!
        </p>
        <div className="mx-auto flex flex-col sm:flex-row sm:justify-center mt-6">
          {heroButtonsLayout}
        </div>
      </section>

      {/* Recently posted ads */}
      <section className="flex flex-col w-full">
        <h1 className="sm:text-3xl md:text-4xl font-normal w-full pb-2">
          Recently posted
        </h1>
        <p className="text-xl text-slate-600 mb-10">
          See what your neighbours are selling
        </p>
        <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-2 gap-6">
          {/* Recently posted listings */}
          {recentListings ? (
            recentListings.map((listing, index) => (
              <ListingCard
                key={index}
                listingId={listing.id}
                images={listing.images.map((image) => image.url)}
                title={listing.name}
                description={listing.description || ""}
                price={listing.price || 0}
              />
            ))
          ) : (
            <>
              <Skeleton w={"100%"} h={230} />
              <Skeleton w={"100%"} h={230} />
              <Skeleton w={"100%"} h={230} />
              <Skeleton w={"100%"} h={230} />
              <Skeleton w={"100%"} h={230} />
              <Skeleton w={"100%"} h={230} />
              <Skeleton w={"100%"} h={230} />
              <Skeleton w={"100%"} h={230} />
            </>
          )}
        </div>
      </section>
    </>
  );
};

export default Home;

Home.getLayout = (page) => {
  return <PrimaryLayout>{page}</PrimaryLayout>;
};
