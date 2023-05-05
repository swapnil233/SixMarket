import { Carousel } from "@mantine/carousel";
import {
  Card,
  Group,
  Image,
  Text,
  createStyles,
  getStylesRef,
  rem,
} from "@mantine/core";
import Link from "next/link";
import { FC } from "react";

const useStyles = createStyles((theme) => ({
  price: {
    color: theme.colorScheme === "dark" ? theme.white : theme.black,
  },

  carousel: {
    "&:hover": {
      [`& .${getStylesRef("carouselControls")}`]: {
        opacity: 1,
      },
    },
  },

  carouselControls: {
    ref: getStylesRef("carouselControls"),
    transition: "opacity 150ms ease",
    opacity: 0,
  },

  carouselIndicator: {
    width: rem(4),
    height: rem(4),
    transition: "width 250ms ease",

    "&[data-active]": {
      width: rem(16),
    },
  },
}));

export interface IListingCard {
  images: string[];
  title: string;
  description: string;
  price?: number;
  listingId: string;
}

const ListingCard: FC<IListingCard> = ({
  title,
  description,
  images,
  price,
  listingId,
}) => {
  const { classes } = useStyles();

  const slides = images.map((image) => (
    <Carousel.Slide key={image}>
      <Image src={image} height={150} alt={`Image for the listing ${title}`} />
    </Carousel.Slide>
  ));

  const formattedPrice = price
    ? new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(price)
    : "Free";

  return (
    <Card radius="md" withBorder padding="xs">
      <Card.Section>
        <Carousel
          withIndicators
          loop
          classNames={{
            root: classes.carousel,
            controls: classes.carouselControls,
            indicator: classes.carouselIndicator,
          }}
        >
          {slides}
        </Carousel>
      </Card.Section>

      <Link
        href={`/listings/${listingId}`}
        className="no-underline text-decoration-none text-black"
      >
        <Group position="apart" mt="md" mb="xs" fz={"lg"}>
          <Text lineClamp={1} className="font-medium">
            {title}
          </Text>
        </Group>

        {/* <Text fz="sm" c="dimmed" mt="sm" lineClamp={1}>
        {description}
      </Text> */}

        <Group position="apart" mt="md" align="baseline">
          <div>
            <Text fz="xl" span className={classes.price}>
              {formattedPrice}
            </Text>
          </div>
        </Group>
      </Link>
    </Card>
  );
};

export default ListingCard;
