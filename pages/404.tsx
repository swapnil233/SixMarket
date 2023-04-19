import PrimaryLayout from "@/components/layout/primary/PrimaryLayout";
import {
  Button,
  Container,
  Group,
  Text,
  Title,
  createStyles,
  rem,
} from "@mantine/core";
import Head from "next/head";
import Link from "next/link";
import { NextPageWithLayout } from "./page";

const useStyles = createStyles((theme) => ({
  root: {
    paddingTop: rem(80),
    paddingBottom: rem(80),
  },

  label: {
    textAlign: "center",
    fontWeight: 900,
    fontSize: rem(220),
    lineHeight: 1,
    marginBottom: `calc(${theme.spacing.xl} * 1.5)`,
    color:
      theme.colorScheme === "dark"
        ? theme.colors.dark[4]
        : theme.colors.gray[2],

    [theme.fn.smallerThan("sm")]: {
      fontSize: rem(120),
    },
  },

  title: {
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    textAlign: "center",
    fontWeight: 900,
    fontSize: rem(38),

    [theme.fn.smallerThan("sm")]: {
      fontSize: rem(32),
    },
  },

  description: {
    maxWidth: rem(500),
    margin: "auto",
    marginTop: theme.spacing.xl,
    marginBottom: `calc(${theme.spacing.xl} * 1.5)`,
  },
}));

const NotFound: NextPageWithLayout = () => {
  const { classes } = useStyles();

  return (
    <>
      <Head>
        <title>Marketplace | 404!</title>
        <meta name="description" content="404! This page does not exist." />
      </Head>
      <Container className={classes.root}>
        <div className={classes.label}>404</div>
        <Title className={classes.title}>Error 404: Lost in Cyberspace</Title>
        <Text
          color="dimmed"
          size="lg"
          align="center"
          className={classes.description}
        >
          We&apos;re sorry, but the page you&apos;re seeking seems to be lost in
          cyberspace. We invite you to return to the homepage and continue your
          journey through our website.
        </Text>
        <Group position="center">
          <Link href="/">
            <Button variant="subtle" size="md">
              Take me back to home page
            </Button>
          </Link>
        </Group>
      </Container>
    </>
  );
};

export default NotFound;

NotFound.getLayout = (page) => {
  return <PrimaryLayout>{page}</PrimaryLayout>;
};
