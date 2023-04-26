import PrimaryLayout from "@/components/layout/primary/PrimaryLayout";
import conditionToEnglish from "@/utils/conditionEnumToEnglish";
import prisma from "@/utils/prisma";
import { Carousel } from "@mantine/carousel";
import {
  Avatar,
  Button,
  Flex,
  Group,
  Rating,
  Text,
  Textarea,
  Tooltip,
  UnstyledButton,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import {
  Category,
  Favorite,
  Image as ImageFromSchema,
  Listing,
  Tag,
  User,
} from "@prisma/client";
import {
  IconClock,
  IconEye,
  IconHeart,
  IconMapPin,
  IconSend,
} from "@tabler/icons-react";
import axios from "axios";
import { GetServerSidePropsContext } from "next";
import { signIn, useSession } from "next-auth/react";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { NextPageWithLayout } from "../page";

interface ListingWithAllInfo extends Listing {
  images: ImageFromSchema[];
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

function timeAgo(dateString: Date) {
  const now: any = new Date();
  const createdAt: any = new Date(dateString);
  const seconds = Math.floor((now - createdAt) / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (days > 0) {
    return `${days} day${days > 1 ? "s" : ""} ago`;
  } else if (hours > 0) {
    return `${hours} hour${hours > 1 ? "s" : ""} ago`;
  } else if (minutes > 0) {
    return `${minutes} minute${minutes > 1 ? "s" : ""} ago`;
  } else {
    return `${seconds} second${seconds > 1 ? "s" : ""} ago`;
  }
}

const IndividualListing: NextPageWithLayout<IndividualListingProps> = ({
  listingInfo,
}) => {
  const session = useSession();
  const form = useForm({
    initialValues: {
      message: "",
    },

    validate: {
      message: (value) =>
        value.length < 10 ? "First name must have at least 10 letters" : null,
    },
  });

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
            <section className="w-full flex justify-between mb-8">
              <div>
                <h1 className="text-3xl font-normal">
                  {listingInfo?.name} •{" "}
                  <span className="text-green-700">{`$${listingInfo?.price}`}</span>
                </h1>
                <p>{conditionToEnglish(listingInfo.condition)}</p>
              </div>
              <UnstyledButton>
                <Tooltip label="Click to add to my favourites">
                  <Avatar size={40} color="red">
                    <IconHeart />
                  </Avatar>
                </Tooltip>
              </UnstyledButton>
            </section>
            <section className="mb-4 flex justify-between gap-4">
              <Carousel mx="auto" w="100%" height={400} withIndicators loop>
                {listingInfo?.images.map(
                  (image: ImageFromSchema, index: number) => (
                    <Carousel.Slide key={index} bg={"#f3f3f3"}>
                      <img
                        src={image.url}
                        alt="d"
                        className="w-full h-full object-contain"
                      />
                    </Carousel.Slide>
                  )
                )}
              </Carousel>
              <div className="w-[500px] bg-slate-100 rounded-md p-4 flex flex-col justify-between">
                <div className="flex gap-4">
                  <Image
                    src={
                      listingInfo.user.image ||
                      "https://avatars.dicebear.com/api/adventurer-neutral/mail%40ashallendesign.co.uk.svg"
                    }
                    width={80}
                    height={80}
                    className="rounded"
                    alt="sdf"
                  />
                  <div className="flex flex-col justify-between">
                    <div>
                      <Link
                        href={`/profile/${listingInfo.user.id}`}
                        className="text-xl font-medium line-clamp-1 no-underline text-gray-950"
                      >
                        {listingInfo.user.name}
                      </Link>
                      <Flex
                        justify="flex-start"
                        align="center"
                        direction="row"
                        wrap="wrap"
                      >
                        <IconMapPin size={"1rem"} color="#476275" />
                        <Text ml={4} fz="md" lineClamp={1}>
                          {listingInfo.location}
                        </Text>
                      </Flex>
                    </div>
                    <Rating value={3.5} fractions={2} readOnly />
                  </div>
                </div>
                <div className="h-full my-4">
                  <form
                    onSubmit={(event) => {
                      event.preventDefault();

                      if (session.status === "authenticated") {
                        console.log("Auth");
                      } else {
                        signIn(undefined, {
                          callbackUrl: `/listings/${listingInfo.id}`,
                        });
                      }
                    }}
                  >
                    <Textarea
                      placeholder={`Hey ${
                        listingInfo.user.name?.split(" ")[0]
                      }, is this still available?`}
                      label="Contact"
                      autosize
                      minRows={4}
                      {...form.getInputProps("message")}
                    />
                    <Group position="right" mt="sm">
                      <Button
                        type="submit"
                        rightIcon={<IconSend size={"1rem"} />}
                      >
                        Send
                      </Button>
                    </Group>
                  </form>
                </div>
                <div>
                  <Flex
                    justify="flex-start"
                    align="center"
                    direction="row"
                    wrap="wrap"
                  >
                    <IconClock color="#8b8b8b" />
                    <Text fz="md" color="#8b8b8b" ml={4}>
                      Posted {timeAgo(listingInfo.createdAt)}
                    </Text>
                  </Flex>
                  <Flex
                    justify="flex-start"
                    align="center"
                    direction="row"
                    wrap="wrap"
                  >
                    <IconEye color="#8b8b8b" />
                    <Text color="#8b8b8b" ml={4} fz="md">
                      {listingInfo.views > 0 && listingInfo.views < 2
                        ? `${listingInfo.views} visit`
                        : `${listingInfo.views} visits`}
                    </Text>
                  </Flex>
                </div>
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
