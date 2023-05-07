import { FC } from "react";
import styles from "./MyListingsTable.module.css";
import { DataTable } from "mantine-datatable";
import { Box } from "@mantine/core";
import { IconMoodSad } from "@tabler/icons-react";
import { randomUUID } from "crypto";

export interface IMyListingsTable {
  thumbnailUrl?: string;
  listingId: string;
  title: string;
  price?: number;
  views: number;
  messages: number;
}

const MyListingsTable: FC<IMyListingsTable> = ({
  thumbnailUrl,
  listingId,
  messages,
  views,
  title,
  price,
}) => {
  return (
    <DataTable
      minHeight={150}
      noRecordsIcon={
        <Box
          p={4}
          mb={4}
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
      noRecordsText="No records found"
      // ...
      columns={[
        { accessor: "thumbnail" },
        { accessor: "title" },
        { accessor: "price" },
        { accessor: "views" },
        { accessor: "messages" },
      ]}
      records={[
        {
          id: listingId,
          thumbnail: thumbnailUrl,
          title,
          price,
          views,
          messages,
        },
      ]}
    />
  );
};

export default MyListingsTable;
