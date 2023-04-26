import timeAgo from "@/utils/timeAgo";
import { Button, Flex, Group, Rating, Text, Textarea } from "@mantine/core";
import { useForm } from "@mantine/form";
import { Listing, User } from "@prisma/client";
import { IconClock, IconEye, IconMapPin, IconSend } from "@tabler/icons-react";
import Image from "next/image";
import Link from "next/link";
import { FC, FormEvent, useMemo } from "react";

export interface IListingMetaDataCard {
  user: User;
  listing: Listing;
  session: any;
  handleMessageFormSubmit: (_session: any, _event: FormEvent) => void;
}

const ListingMetaDataCard: FC<IListingMetaDataCard> = ({
  user,
  listing,
  handleMessageFormSubmit,
  session,
}) => {
  const form = useForm({
    initialValues: {
      message: "",
    },

    validate: {
      message: (value) =>
        value.length < 10 ? "First name must have at least 10 letters" : null,
    },
  });

  // Memoise to avoid unnecessary re-computations
  const formattedTimeAgo = useMemo(
    () => timeAgo(listing.createdAt),
    [listing.createdAt]
  );

  const renderForm = () => (
    <form onSubmit={(event) => handleMessageFormSubmit(session, event)}>
      <Textarea
        placeholder={`Hey ${
          user.name?.split(" ")[0]
        }, is this still available?`}
        label="Contact"
        autosize
        minRows={4}
        {...form.getInputProps("message")}
      />
      <Group position="right" mt="sm">
        <Button type="submit" rightIcon={<IconSend size={"1rem"} />}>
          Send
        </Button>
      </Group>
    </form>
  );

  return (
    <div className="bg-slate-100 rounded-md p-4 flex flex-col justify-between w-full md:col-span-4">
      <div className="flex gap-4">
        <Image
          src={
            user.image ||
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
              href={`/profile/${user.id}`}
              className="text-xl font-medium line-clamp-1 no-underline text-gray-950"
            >
              {user.name}
            </Link>
            <Flex
              justify="flex-start"
              align="center"
              direction="row"
              wrap="wrap"
            >
              <IconMapPin size={"1rem"} color="#476275" />
              <Text ml={4} fz="md" lineClamp={1}>
                {listing.location}
              </Text>
            </Flex>
          </div>
          <Rating value={3.5} fractions={2} readOnly />
        </div>
      </div>
      <div className="h-full my-4">
        {session.data &&
        session.data.user &&
        session.status === "authenticated" ? (
          session.data.user.id !== user.id ? (
            renderForm()
          ) : (
            <>
              <p>This is your listing.</p>
              <Link href={`/profile/my-listings/${listing.id}`}>
                Click here to view listing statistics
              </Link>
            </>
          )
        ) : (
          renderForm()
        )}
      </div>
      <div>
        <Flex justify="flex-start" align="center" direction="row" wrap="wrap">
          <IconClock color="#8b8b8b" />
          <Text fz="md" color="#8b8b8b" ml={4}>
            Posted {formattedTimeAgo}
          </Text>
        </Flex>
        <Flex justify="flex-start" align="center" direction="row" wrap="wrap">
          <IconEye color="#8b8b8b" />
          <Text color="#8b8b8b" ml={4} fz="md">
            {listing.views > 0 && listing.views < 2
              ? `${listing.views} visit`
              : `${listing.views} visits`}
          </Text>
        </Flex>
      </div>
    </div>
  );
};

export default ListingMetaDataCard;
