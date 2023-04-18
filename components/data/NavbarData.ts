import { createStyles, rem } from "@mantine/core";
import {
  IconBriefcase,
  IconCar,
  IconHome,
  IconTag,
  IconTools,
  IconUsers,
} from "@tabler/icons-react";

export const navbarStyles = createStyles((theme) => ({
  link: {
    display: "flex",
    alignItems: "center",
    height: "100%",
    paddingLeft: theme.spacing.md,
    paddingRight: theme.spacing.md,
    textDecoration: "none",
    color: theme.colorScheme === "dark" ? theme.white : theme.black,
    fontWeight: 500,
    fontSize: theme.fontSizes.sm,

    [theme.fn.smallerThan("sm")]: {
      height: rem(42),
      display: "flex",
      alignItems: "center",
      width: "100%",
    },

    ...theme.fn.hover({
      backgroundColor:
        theme.colorScheme === "dark"
          ? theme.colors.dark[6]
          : theme.colors.gray[0],
    }),
  },

  user: {
    color: theme.colorScheme === "dark" ? theme.colors.dark[0] : theme.black,
    padding: `${theme.spacing.xs} ${theme.spacing.sm}`,
    borderRadius: theme.radius.sm,
    transition: "background-color 100ms ease",

    "&:hover": {
      backgroundColor:
        theme.colorScheme === "dark" ? theme.colors.dark[8] : theme.white,
    },

    [theme.fn.smallerThan("xs")]: {
      display: "none",
    },
  },

  userActive: {
    backgroundColor:
      theme.colorScheme === "dark" ? theme.colors.dark[8] : theme.white,
  },

  subLink: {
    width: "100%",
    padding: `${theme.spacing.xs} ${theme.spacing.md}`,
    borderRadius: theme.radius.md,

    ...theme.fn.hover({
      backgroundColor:
        theme.colorScheme === "dark"
          ? theme.colors.dark[7]
          : theme.colors.gray[0],
    }),

    "&:active": theme.activeStyles,
  },

  hiddenMobile: {
    [theme.fn.smallerThan("sm")]: {
      display: "none",
    },
  },

  hiddenDesktop: {
    [theme.fn.largerThan("sm")]: {
      display: "none",
    },
  },
}));

export const dropdownMenuData = [
  {
    icon: IconTag,
    title: "Buy and sell",
    description: "Browse and purchase from a wide range of products",
  },
  {
    icon: IconCar,
    title: "Cars and vehicles",
    description: "Discover new and used cars, motorcycles, and other vehicles",
  },
  {
    icon: IconHome,
    title: "Real estate",
    description:
      "Explore properties for sale or rent, including houses, apartments, and commercial spaces",
  },
  {
    icon: IconBriefcase,
    title: "Jobs",
    description:
      "Find job listings, part-time opportunities, and freelance work",
  },
  {
    icon: IconTools,
    title: "Services",
    description:
      "Browse professional services, including repairs, cleaning, and tutoring",
  },
  {
    icon: IconUsers,
    title: "Community",
    description:
      "Browse professional services, including repairs, cleaning, and tutoring",
  },
];
