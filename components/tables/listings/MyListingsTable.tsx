import { FC } from "react";
import { DataTable } from "mantine-datatable";
import { ActionIcon, Box, Group, Text } from "@mantine/core";
import { IconEdit, IconMoodSad } from "@tabler/icons-react";
import { Listing, Message } from "@prisma/client";
import { Image as PrismaImage } from ".prisma/client";
import Image from "next/image";
import Link from "next/link";

export interface IMyListingsTable {
  listingsWithImages: (Listing & { images: PrismaImage[] } & {
    messages: Message[];
  })[];
}

const MyListingsTable: FC<IMyListingsTable> = ({ listingsWithImages }) => {
  const records = listingsWithImages.map((listing) => {
    const thumbnailUrl = listing.images[0].url;
    const title = listing.name;
    const price = listing.price;
    const views = listing.views;
    const messages = listing.messages.length;

    return {
      id: listing.id,
      thumbnail: (
        <Box
          sx={{
            borderRadius: 4,
            overflow: "hidden",
            position: "relative",
            width: 150,
            height: 60,
          }}
        >
          <Image
            src={thumbnailUrl}
            alt={title}
            fill={true}
            style={{ objectFit: "contain" }}
            loading="lazy"
          />
        </Box>
      ),
      title,
      price: (
        <span>
          {price
            ? price.toLocaleString("en-US", {
                style: "currency",
                currency: "USD",
              })
            : "Free"}
        </span>
      ),
      views,
      messages,
    };
  });

  return (
    <DataTable
      records={records}
      minHeight={150}
      highlightOnHover
      noRecordsIcon={
        <Box
          p={4}
          mb={8}
          sx={(theme) => ({
            fontSize: 0,
            color:
              theme.colorScheme === "dark"
                ? theme.colors.dark[3]
                : theme.colors.gray[5],
            border: `2px solid ${
              theme.colorScheme === "dark"
                ? theme.colors.dark[3]
                : theme.colors.gray[4]
            }`,
            borderRadius: theme.radius.md,
            background:
              theme.colorScheme === "dark"
                ? theme.colors.dark[6]
                : theme.colors.gray[1],
          })}
        >
          <IconMoodSad size={36} strokeWidth={1.5} />
        </Box>
      }
      noRecordsText="You haven't created any listings yet."
      columns={[
        { accessor: "thumbnail" },
        { accessor: "title" },
        { accessor: "price" },
        { accessor: "views" },
        { accessor: "messages" },
        {
          accessor: "actions",
          title: <Text mr="xs">Edit</Text>,
          textAlignment: "right",
          render: (listing) => (
            <Group spacing={4} position="right" noWrap>
              <Link href={`/profile/my-listings/${listing.id}`}>
                <ActionIcon color="blue">
                  <IconEdit size={16} />
                </ActionIcon>
              </Link>
            </Group>
          ),
        },
      ]}
    />
  );
};

export default MyListingsTable;
