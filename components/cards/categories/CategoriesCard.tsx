import {
  Card,
  Group,
  Text,
  createStyles,
  getStylesRef,
  rem,
} from "@mantine/core";
import Image from "next/image";
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

export interface ICategoriesCard {
  thumbnail: string;
  title: string;
  slug: string;
}

const CategoriesCard: FC<ICategoriesCard> = ({ title, thumbnail, slug }) => {
  return (
    <Link href={`/${slug}`} className="text-decoration-none no-underline">
      <Card radius="md" withBorder padding="sm" h={"100%"}>
        <Card.Section>
          {/* <Image
            src={thumbnail}
            height={130}
            alt={`Image for the ${title} category.`}
          /> */}
          <Image
            height={130}
            width={210}
            style={{ objectFit: "cover" }}
            src={thumbnail}
            alt={`Image for the ${title} category.`}
            quality={50}
          />
        </Card.Section>

        <Group mt="md" fz={"lg"}>
          <Text weight={500}>{title}</Text>
        </Group>
      </Card>
    </Link>
  );
};

export default CategoriesCard;
