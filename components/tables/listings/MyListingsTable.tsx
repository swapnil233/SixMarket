import { FC, useState, useEffect } from "react";
import { DataTable, DataTableSortStatus } from "mantine-datatable";
import { Box, Button, Group, Text } from "@mantine/core";
import { IconEdit, IconMoodSad } from "@tabler/icons-react";
import { Listing, Message } from "@prisma/client";
import { Image as PrismaImage } from ".prisma/client";
import Image from "next/image";
import Link from "next/link";
import sortBy from "lodash/sortBy";

export interface IMyListingsTable {
  listingsWithImages: (Listing & { images: PrismaImage[] } & {
    messages: Message[];
  })[];
}

const MyListingsTable: FC<IMyListingsTable> = ({ listingsWithImages }) => {
  const [sortStatus, setSortStatus] = useState<DataTableSortStatus>({
    columnAccessor: "name",
    direction: "asc",
  });

  const listings = listingsWithImages.map((listing) => {
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
            width: 120,
            height: 90,
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
      title: (
        <Link href={`/listings/${listing.id}`} className="no-underline">
          <h3 className="text-lg font-medium text-gray-900 ">{title}</h3>
        </Link>
      ),
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

  const [records, setRecords] = useState(sortBy(listings, "price"));

  useEffect(() => {
    const data = sortBy(listings, sortStatus.columnAccessor) as any;
    setRecords(sortStatus.direction === "desc" ? data.reverse() : data);
  }, [sortStatus]);

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
        { accessor: "price", sortable: true },
        { accessor: "views", sortable: true },
        { accessor: "messages", sortable: true },
        {
          accessor: "actions",
          title: <Text mr="xs">Actions</Text>,
          textAlignment: "right",
          render: (listing) => (
            <Group spacing={4} position="right" noWrap>
              <Link href={`/profile/my-listings/${listing.id}`}>
                <Button
                  variant={"light"}
                  leftIcon={<IconEdit size={"0.9rem"} />}
                >
                  Edit
                </Button>
                {/*<ActionIcon color="blue">*/}
                {/*  <IconEdit size={16} />*/}
                {/*</ActionIcon>*/}
              </Link>
            </Group>
          ),
        },
      ]}
      verticalAlignment={"top"}
      sortStatus={sortStatus}
      onSortStatusChange={setSortStatus}
      textSelectionDisabled
    />
  );
};

export default MyListingsTable;
