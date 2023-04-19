import { Badge, Button, Card, Group, Image, Text } from "@mantine/core";
import { FC } from "react";

export interface ITravelCard {
  tag: string;
  title: string;
  body: string;
  author: string;
}

const TravelCard: FC<ITravelCard> = ({ tag, title, body, author }) => {
  return (
    <Card shadow="sm" padding="lg" radius="md" maw={340} withBorder>
      <Card.Section>
        <Image src="/norway.jpg" height={160} alt="Norway" />
      </Card.Section>

      <Group position="apart" mt="md" mb="xs">
        <Text weight={500}>{title}</Text>
        <Badge color="pink" variant="light">
          {tag}
        </Badge>
      </Group>

      <Text size="sm" color="dimmed" mb={"md"}>
        {body}
      </Text>

      <Text size="sm" color="dimmed">
        {author}
      </Text>

      <Button variant="light" color="blue" fullWidth mt="md" radius="md">
        Book classic tour now
      </Button>
    </Card>
  );
};

export default TravelCard;
