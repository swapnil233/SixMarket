import { Card, Group, Text } from "@mantine/core";
import Image from "next/image";
import Link from "next/link";
import { FC } from "react";

export interface ICategoriesCard {
  thumbnail: string;
  title: string;
  slug: string;
}

const CategoriesCard: FC<ICategoriesCard> = ({ title, thumbnail, slug }) => {
  return (
    <Link
      href={`/categories/${slug}`}
      className="text-decoration-none no-underline"
    >
      <Card radius="md" withBorder padding="sm" h={"100%"}>
        <Card.Section>
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
