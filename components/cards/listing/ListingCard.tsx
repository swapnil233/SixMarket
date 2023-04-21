import { Carousel } from "@mantine/carousel";
import {
  Button,
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
  price: number;
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
      <Image src={image} height={220} alt="" />
    </Carousel.Slide>
  ));

  return (
    <Card radius="md" withBorder padding="xl" maw={350}>
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

      <Group position="apart" mt="lg">
        <Text fw={500} fz="lg">
          {title}
        </Text>
      </Group>

      <Text fz="sm" c="dimmed" mt="sm" lineClamp={1}>
        {description}
      </Text>

      <Group position="apart" mt="md">
        <div>
          <Text fz="xl" span fw={500} className={classes.price}>
            ${price}
          </Text>
        </div>

        <Link href={`/listings/${listingId}`}>
          <Button radius="md" variant="subtle">
            View
          </Button>
        </Link>
      </Group>
    </Card>
  );
};

export default ListingCard;
