import { FC, useState, useEffect } from "react";
import { DataTable, DataTableSortStatus } from "mantine-datatable";
import { Box, Button, Stack } from "@mantine/core";
import { IconMoodSad } from "@tabler/icons-react";
import { Listing, Message } from "@prisma/client";
import { Image as PrismaImage } from ".prisma/client";
import Image from "next/image";
import Link from "next/link";
import sortBy from "lodash/sortBy";

interface IMyListingsTable {
  listingsWithImages: (Pick<Listing, "id" | "name" | "price" | "views"> & {
    images: PrismaImage[];
    messages: Pick<Message, "id">[];
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
        <Stack>
          <Link href={`/listings/${listing.id}`} className="no-underline">
            <h3 className="text-lg font-medium text-gray-900 ">{title}</h3>
          </Link>

          <div className="flex flex-row space-x-2">
            <Link href={`/listings/${listing.id}`}>
              <Button
                size="xs"
                variant="outline"
                onClick={(event) => event.stopPropagation()}
              >
                View
              </Button>
            </Link>
            <Link href={`/profile/my-listings/${listing.id}`}>
              <Button
                size="xs"
                variant="outline"
                onClick={(event) => event.stopPropagation()}
              >
                Manage
              </Button>
            </Link>
          </div>
        </Stack>
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
  }, [sortStatus, listings]);

  return (
    <DataTable
      records={records}
      minHeight={150}
      highlightOnHover
      verticalAlignment={"top"}
      sortStatus={sortStatus}
      onSortStatusChange={setSortStatus}
      noRecordsText="You haven't created any listings yet."
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
      columns={[
        { accessor: "thumbnail" },
        { accessor: "title" },
        { accessor: "price", sortable: true },
        { accessor: "views", sortable: true },
        { accessor: "messages", sortable: true },
      ]}
    />
  );
};

export default MyListingsTable;
