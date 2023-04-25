import PrimaryLayout from "@/components/layout/primary/PrimaryLayout";
import { Carousel } from "@mantine/carousel";
import { Avatar, Tooltip, UnstyledButton } from "@mantine/core";
import { Category, Favorite, Image, Listing, Tag, User } from "@prisma/client";
import { IconHeart } from "@tabler/icons-react";
import axios from "axios";
import { GetServerSidePropsContext } from "next";
import Head from "next/head";
import { NextPageWithLayout } from "../page";

interface ListingWithAllInfo extends Listing {
  images: Image[];
  user: User;
  category: Category;
  favorites: Favorite[];
  tags: Tag[];
}

interface IndividualListingProps {
  listingInfo: ListingWithAllInfo;
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { id } = context.query;

  const protocol = context.req.headers["x-forwarded-proto"] || "http";
  const host = context.req.headers["host"];
  const apiUrl = `${protocol}://${host}/api/listings/${id}`;

  try {
    const res = await axios.get(apiUrl);
    const listingInfo = res.data;

    return {
      props: {
        listingInfo,
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
}) => {
  return (
    <>
      <Head>
        <title>{`${listingInfo?.name} | Marketplace`}</title>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
        <meta name="description" content={listingInfo?.description!} />
      </Head>
      <div>
        {/* Hero */}
        <div className="pt-14 pb-14 flex flex-col w-full">
          <div className="max-w-6xl mx-auto sm:px-4 px-6">
            <section className="mb-4">
              <Carousel mx="auto" w="100%" height={400} withIndicators loop>
                {listingInfo?.images.map((image: Image, index: number) => (
                  <Carousel.Slide key={index} bg={"#f3f3f3"}>
                    <img
                      src={image.url}
                      alt="d"
                      className="w-full h-full object-contain"
                    />
                  </Carousel.Slide>
                ))}
              </Carousel>
            </section>
            <section className="w-full flex justify-between">
              <div>
                <h1 className="text-3xl font-normal">
                  {listingInfo?.name} •{" "}
                  <span className="text-green-700">{`$${listingInfo?.price}`}</span>
                </h1>
                <p>{listingInfo?.condition}</p>
              </div>
              <div>
                <UnstyledButton>
                  <Tooltip label="Click to add to my favourites">
                    <Avatar size={40} color="red">
                      <IconHeart />
                    </Avatar>
                  </Tooltip>
                </UnstyledButton>
              </div>
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
