import ListingMetaDataCard from "@/components/cards/listing metadata/ListingMetaDataCard";
import PrimaryLayout from "@/components/layout/primary/PrimaryLayout";
import prisma from "@/utils/prisma";
import { Carousel } from "@mantine/carousel";
import { Avatar, Tooltip, UnstyledButton } from "@mantine/core";
import {
  Category,
  Favorite,
  Image as ImageFromSchema,
  Listing,
  Message,
  Tag,
  User,
} from "@prisma/client";
import { IconHeart, IconHeartFilled } from "@tabler/icons-react";
import axios from "axios";
import { GetServerSidePropsContext } from "next";
import { Session } from "next-auth";
import { getSession, signIn, useSession } from "next-auth/react";
import Head from "next/head";
import Image from "next/image";
import { useState } from "react";
import { NextPageWithLayout } from "../page";

export interface ListingWithAllInfo extends Listing {
  images: ImageFromSchema[];
  user: User;
  category: Category;
  favorites: Favorite[];
  tags: Tag[];
  messages: Message[];
}

interface IndividualListingProps {
  listingInfo: ListingWithAllInfo;
  userAlreadySentMessage: boolean;
  listingAlreadyInFavourites: boolean;
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { id } = context.query;
  const session: Session | null = await getSession(context);

  // @TODO remove API calls and fetch data directly within getServerSideProps for better performance
  // https://nextjs.org/docs/pages/building-your-application/data-fetching/get-server-side-props#getserversideprops-or-api-routes

  // Get the API endpoint
  const protocol = context.req.headers["x-forwarded-proto"] || "http";
  const host = context.req.headers["host"];
  const apiUrl = `${protocol}://${host}/api/listings/${id}`;

  try {
    const res = await axios.get(apiUrl);
    const listingInfo: ListingWithAllInfo = res.data;

    // Update listing's view by +1
    await prisma.listing.update({
      where: {
        id: id as string,
      },
      data: {
        views: {
          increment: 1,
        },
      },
    });

    // @ts-expect-error
    const userId = session?.user.id;

    // Check if the session user has already sent a message to this listing
    const userAlreadySentMessage = listingInfo.messages.some(
      (message: Message) => message.senderId === userId
    );

    // Check if the listing is already in user's favourites
    const listingAlreadyInFavourites = listingInfo.favorites.some(
      (favourite: Favorite) => favourite.userId === userId
    );

    return {
      props: {
        listingInfo,
        userAlreadySentMessage,
        listingAlreadyInFavourites,
      },
    };
  } catch (error: any) {
    console.error("Error fetching listings data:", error.message);

    return {
      notFound: true,
    };
  }
}

const IndividualListing: NextPageWithLayout<IndividualListingProps> = ({
  listingInfo,
  userAlreadySentMessage,
  listingAlreadyInFavourites,
}) => {
  const [isFavourited, setIsFavourited] = useState<boolean>(
    listingAlreadyInFavourites
  );
  const session = useSession();

  async function addToFavourites() {
    setIsFavourited(true);
    try {
      await axios.post("/api/favourites", {
        listingId: listingInfo.id,
      });
    } catch (error) {
      console.log(error);
      setIsFavourited(false);
    }
  }

  async function removeFromFavourites() {
    console.log("removing");
    setIsFavourited(false);

    try {
      await axios.delete("/api/favourites", {
        params: {
          listingId: listingInfo.id,
        },
      });
    } catch (error) {
      setIsFavourited(true);
      console.log(error);
    }
  }

  return (
    <>
      <Head>
        <title>{`${listingInfo?.name} | Marketplace`}</title>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
        <meta name="description" content={listingInfo?.description || ""} />
        <meta property="og:title" content={`Categories | Marketplace`} />
        <meta
          property="og:description"
          content={`${listingInfo?.description || ""}`}
        />
        <meta property="og:image" content={listingInfo.images[0].url} />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Marketplace" />
      </Head>

      {/* Title, price & fav button */}
      <section className="w-full flex justify-between pb-8">
        <h1 className="text-3xl font-normal flex flex-col ">
          {listingInfo?.name}{" "}
          <span className="text-green-700 pt-2">{`$${listingInfo?.price}`}</span>
        </h1>

        {/* Allow adding to favorites if the user isn't the poster of the listing */}
        {session.status === "authenticated" ? (
          // @ts-expect-error
          session.data?.user?.id !== listingInfo.user.id &&
          (isFavourited ? (
            <UnstyledButton onClick={removeFromFavourites}>
              <Tooltip label="Click to remove from favourites.">
                <Avatar size={40} color="red">
                  <IconHeartFilled />
                </Avatar>
              </Tooltip>
            </UnstyledButton>
          ) : (
            <UnstyledButton onClick={addToFavourites}>
              <Tooltip label="Click to add to favourites">
                <Avatar size={40} color="red">
                  <IconHeart />
                </Avatar>
              </Tooltip>
            </UnstyledButton>
          ))
        ) : (
          <UnstyledButton
            onClick={() =>
              signIn(undefined, {
                callbackUrl: `/listings/${listingInfo.id}`,
              })
            }
          >
            <Tooltip label="Click to add to favourites">
              <Avatar size={40} color="red">
                <IconHeart />
              </Avatar>
            </Tooltip>
          </UnstyledButton>
        )}
      </section>

      {/* Carousel and Listing Info */}
      <section className="mb-4 grid md:grid-cols-10 lg:grid-cols-12 w-full gap-2">
        <Carousel
          mx="auto"
          w="100%"
          height={400}
          withIndicators
          loop
          className="md:col-span-6 lg:col-span-8"
        >
          {listingInfo?.images.map((image: ImageFromSchema, index: number) => (
            <Carousel.Slide key={index} bg={"#f3f3f3"}>
              <Image
                src={image.url}
                alt="d"
                className="w-full h-full object-contain"
                fill
              />
            </Carousel.Slide>
          ))}
        </Carousel>

        {/* Info and message card */}
        <ListingMetaDataCard
          listing={listingInfo}
          user={listingInfo.user}
          session={session}
          userAlreadySentMessage={userAlreadySentMessage}
        />
      </section>
    </>
  );
};

export default IndividualListing;

IndividualListing.getLayout = (page) => {
  return <PrimaryLayout>{page}</PrimaryLayout>;
};
