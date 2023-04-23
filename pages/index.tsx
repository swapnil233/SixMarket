import ListingCard from "@/components/cards/listing/ListingCard";
import PrimaryLayout from "@/components/layout/primary/PrimaryLayout";
import { Button, Skeleton } from "@mantine/core";
import { Listing } from "@prisma/client";
import { signIn, useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { NextPageWithLayout } from "./page";

const Home: NextPageWithLayout = () => {
  const { status } = useSession();
  const [recentListings, setRecentListings] = useState<Listing[] | null>(null);

  // Fetch the 5 recent listings
  useEffect(() => {
    const fetchRecentListings = async () => {
      try {
        const response = await fetch("/api/listings/recent");
        const data = await response.json();
        setRecentListings(data);
      } catch (error) {
        console.error("Error fetching recent listings:", error);
      }
    };

    fetchRecentListings();
  }, []);

  let heroButtonsLayout;

  if (status === "unauthenticated") {
    heroButtonsLayout = (
      <>
        <div className="mt-5 flex w-full align-middle justify-center">
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
      </>
    );
  } else if (status === "loading") {
    <>
      <Skeleton height={36} width={140} mr={12} />
      <Skeleton height={36} width={140} />
    </>;
  } else {
    heroButtonsLayout = (
      <>
        <Button variant="filled">Browse recent listings</Button>
      </>
    );
  }

  return (
    <div>
      {/* Hero */}
      <div className="pt-14 pb-14 flex flex-col w-full">
        <div className="max-w-6xl mx-auto sm:px-4 px-6">
          <section className="text-center pb-4">
            {/* Title */}
            <div className="md:max-w-5xl mx-auto">
              <h1 className="text-5xl lg:text-6xl mb-4 font-normal">
                Welcome to{" "}
                <span className="text-blue-800 font-medium">Marketplace</span>
              </h1>
            </div>
            {/* Subtitle */}
            <div className="max-w-3xl mx-auto">
              <p className="text-xl text-slate-600">
                Discover your local marketplace for buying, selling, and trading
                goods. Connect with nearby sellers and buyers to uncover
                distinctive finds, hidden gems, and fantastic deals!
              </p>
            </div>
            <div className="max-w-[220px] mx-auto sm:max-w-none flex flex-col sm:flex-row sm:justify-center mt-6">
              {heroButtonsLayout}
            </div>
          </section>
        </div>
      </div>

      {/* Recently posted ads */}
      <div className="pb-12 pt-10 flex flex-col w-full">
        <div className="max-w-6xl w-full mx-auto sm:px-4 px-6">
          <section className="md:pb-12 pb-20">
            <div className="w-full">
              <h1 className="sm:text-3xl md:text-4xl font-normal">
                Recently posted
              </h1>
            </div>
            <div className="mb-10">
              <p className="text-xl text-slate-600">
                See what your neighbours are selling
              </p>
            </div>
            <div className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 col-span-full gap-8">
              {/* Recently posted listings */}
              {recentListings ? (
                recentListings.map((listing, index) => (
                  <ListingCard
                    key={index}
                    listingId={listing.id}
                    images={["norway.jpg"]}
                    title={listing.name}
                    description={listing.description || ""}
                    price={listing.price || 0}
                  />
                ))
              ) : (
                <>
                  <Skeleton w={340} h={375} />
                  <Skeleton w={340} h={375} />
                  <Skeleton w={340} h={375} />
                  <Skeleton w={340} h={375} />
                  <Skeleton w={340} h={375} />
                </>
              )}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Home;

Home.getLayout = (page) => {
  return <PrimaryLayout>{page}</PrimaryLayout>;
};
