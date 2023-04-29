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
import { IconHeart } from "@tabler/icons-react";
import axios from "axios";
import { GetServerSidePropsContext } from "next";
import { Session } from "next-auth";
import { getSession, useSession } from "next-auth/react";
import Head from "next/head";
import Image from "next/image";
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
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { id } = context.query;
  const session: Session | null = await getSession(context);

  // Get the API endpoint
  const protocol = context.req.headers["x-forwarded-proto"] || "http";
  const host = context.req.headers["host"];
  const apiUrl = `${protocol}://${host}/api/listings/${id}`;

  try {
    const res = await axios.get(apiUrl);
    const listingInfo = res.data;

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

    // Check if the session user has already sent a message to this listing
    // @ts-expect-error
    const userId = session?.user.id;
    const userAlreadySentMessage = listingInfo.messages.some(
      (message: Message) => message.senderId === userId
    );

    return {
      props: {
        listingInfo,
        userAlreadySentMessage,
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
}) => {
  const session = useSession();
  return (
    <>
      <Head>
        <title>{`${listingInfo?.name} | Marketplace`}</title>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
        <meta name="description" content={listingInfo?.description!} />
      </Head>
      <div>
        {/* Hero */}
        <div className="pt-8 md:pt-14 pb-14 w-full">
          <div className="max-w-6xl mx-auto sm:px-4 px-6">
            {/* Header */}
            <section className="w-full flex justify-between mb-8">
              <div className="flex w-full justify-between">
                <h1 className="text-3xl font-normal flex flex-col ">
                  {listingInfo?.name}{" "}
                  <span className="text-green-700">{`$${listingInfo?.price}`}</span>
                </h1>
              </div>

              {/* Allow adding to favorites if the user isn't the poster of the listing */}
              {/* @ts-expect-error - user ID has been added to the session inside `/pages/api/auth/[...nextauth].ts as a callback. It's not there by default`*/}
              {session.data?.user?.id !== listingInfo.user.id && (
                <UnstyledButton>
                  <Tooltip label="Click to add to my favourites">
                    <Avatar size={40} color="red">
                      <IconHeart />
                    </Avatar>
                  </Tooltip>
                </UnstyledButton>
              )}
            </section>

            {/* Carousel and Listing Info */}
            <section className="mb-4 grid md:grid-cols-10 lg:grid-cols-12 w-full gap-4">
              <Carousel
                mx="auto"
                w="100%"
                height={400}
                withIndicators
                loop
                className="md:col-span-6 lg:col-span-8"
              >
                {listingInfo?.images.map(
                  (image: ImageFromSchema, index: number) => (
                    <Carousel.Slide key={index} bg={"#f3f3f3"}>
                      <Image
                        src={image.url}
                        alt="d"
                        className="w-full h-full object-contain"
                        fill
                      />
                    </Carousel.Slide>
                  )
                )}
              </Carousel>

              {/* Info and message card */}
              <ListingMetaDataCard
                listing={listingInfo}
                user={listingInfo.user}
                session={session}
                userAlreadySentMessage={userAlreadySentMessage}
              />
            </section>
          </div>
        </div>
      </div>
    </>
  );
};

export default IndividualListing;

IndividualListing.getLayout = (page) => {
  return <PrimaryLayout>{page}</PrimaryLayout>;
};
