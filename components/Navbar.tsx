import {
  Anchor,
  Avatar,
  Box,
  Burger,
  Button,
  Center,
  Collapse,
  Divider,
  Drawer,
  Group,
  Header,
  HoverCard,
  Loader,
  Menu,
  ScrollArea,
  SimpleGrid,
  Text,
  ThemeIcon,
  UnstyledButton,
  rem,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import {
  IconChevronDown,
  IconHeart,
  IconLogout,
  IconPlus,
  IconSettings,
  IconTags,
  IconUser,
} from "@tabler/icons-react";
import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { dropdownMenuData, navbarStyles } from "./data/NavbarData";

export function Navbar() {
  const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] =
    useDisclosure(false);
  const [linksOpened, { toggle: toggleLinks }] = useDisclosure(false);
  const { classes, theme, cx } = navbarStyles();
  const [userMenuOpened, setUserMenuOpened] = useState(false);

  const { data, status } = useSession();
  const user = data?.user;
  const router = useRouter();

  const links = dropdownMenuData.map((item) => (
    <UnstyledButton className={classes.subLink} key={item.title}>
      <Group noWrap align="flex-start">
        <ThemeIcon size={34} variant="default" radius="md">
          <item.icon size={rem(22)} color={theme.fn.primaryColor()} />
        </ThemeIcon>
        <div>
          <Text size="sm" fw={500}>
            {item.title}
          </Text>
          <Text size="xs" color="dimmed">
            {item.description}
          </Text>
        </div>
      </Group>
    </UnstyledButton>
  ));

  // User menu: menu | loader | "Log in"
  let userMenu;

  if (status === "authenticated") {
    userMenu = (
      <Menu
        width={260}
        position="bottom-end"
        transitionProps={{ transition: "pop-top-right" }}
        onClose={() => setUserMenuOpened(false)}
        onOpen={() => setUserMenuOpened(true)}
        withinPortal
      >
        <Menu.Target>
          <UnstyledButton
            className={cx(classes.user, {
              [classes.userActive]: userMenuOpened,
            })}
          >
            <Group spacing={7}>
              <Avatar
                src={user?.image || ""}
                alt={
                  `${user?.name}'s profile picture` || "Default profile picture"
                }
                radius="xl"
                size={20}
              />
              <Text weight={500} size="sm" sx={{ lineHeight: 1 }} mr={3}>
                {user?.name}
              </Text>
              <IconChevronDown size={rem(12)} stroke={1.5} />
            </Group>
          </UnstyledButton>
        </Menu.Target>
        <Menu.Dropdown>
          <Link href="/profile/my-ads">
            <Menu.Item
              icon={
                <IconTags
                  size="0.9rem"
                  color={theme.colors.blue[6]}
                  stroke={1.5}
                />
              }
            >
              My ads
            </Menu.Item>
          </Link>

          <Link href="/profile/favourites">
            <Menu.Item
              icon={
                <IconHeart
                  size="0.9rem"
                  color={theme.colors.red[6]}
                  stroke={1.5}
                />
              }
            >
              Favourites
            </Menu.Item>
          </Link>

          <Menu.Label>Settings</Menu.Label>
          <Link href="/profile/">
            <Menu.Item icon={<IconUser size="0.9rem" stroke={1.5} />}>
              My profile
            </Menu.Item>
          </Link>
          <Link href="/profile/settings">
            <Menu.Item icon={<IconSettings size="0.9rem" stroke={1.5} />}>
              Account settings
            </Menu.Item>
          </Link>
          <Menu.Divider />
          <Menu.Item
            onClick={() => signOut({ callbackUrl: "/" })}
            icon={<IconLogout size="0.9rem" stroke={1.5} />}
          >
            Log out
          </Menu.Item>
        </Menu.Dropdown>
      </Menu>
    );
  } else if (status === "loading") {
    userMenu = <Loader size={"sm"} />;
  } else if (status === "unauthenticated") {
    userMenu = (
      <Button
        variant="light"
        onClick={() => signIn(undefined, { callbackUrl: "/" })}
      >
        Log in
      </Button>
    );
  }

  return (
    <Box>
      <Header height={60} className="px-4 sm:px-6">
        <Group
          className="max-w-6xl w-full mx-auto"
          position="apart"
          sx={{ height: "100%" }}
        >
          <Link href={"/"}>
            <Image
              src={"/MarketplaceLogo.svg"}
              height={30}
              width={150}
              alt="Marketpalce logo"
            />
          </Link>

          <Group
            sx={{ height: "100%" }}
            spacing={0}
            className={classes.hiddenMobile}
          >
            <Link href="/" className={classes.link}>
              Home
            </Link>
            <HoverCard
              width={600}
              position="bottom"
              radius="md"
              shadow="md"
              withinPortal
            >
              <HoverCard.Target>
                <a href="#" className={classes.link}>
                  <Center inline>
                    <Box component="span" mr={5}>
                      Categories
                    </Box>
                    <IconChevronDown
                      size={16}
                      color={theme.fn.primaryColor()}
                    />
                  </Center>
                </a>
              </HoverCard.Target>

              <HoverCard.Dropdown sx={{ overflow: "hidden" }}>
                <Group position="apart" px="md">
                  <Text fw={500}>Features</Text>
                  <Anchor href="#" fz="xs">
                    View all
                  </Anchor>
                </Group>

                <Divider
                  my="sm"
                  mx="-md"
                  color={theme.colorScheme === "dark" ? "dark.5" : "gray.1"}
                />

                <SimpleGrid cols={2} spacing={0}>
                  {links}
                </SimpleGrid>
              </HoverCard.Dropdown>
            </HoverCard>
            <a href="/about" className={classes.link}>
              About
            </a>
          </Group>

          <Group className={classes.hiddenMobile}>
            {userMenu}
            <Button
              leftIcon={<IconPlus size="0.9rem" color={theme.colors.dark[9]} />}
              onClick={
                status === "authenticated"
                  ? () => {
                      router.push("/listings/new");
                    }
                  : () => {
                      signIn(undefined, { callbackUrl: "/listings/new" });
                    }
              }
              variant="default"
            >
              Post an ad
            </Button>
          </Group>

          <Burger
            opened={drawerOpened}
            onClick={toggleDrawer}
            className={classes.hiddenDesktop}
          />
        </Group>
      </Header>

      {/* Mobile menu */}
      <Drawer
        opened={drawerOpened}
        onClose={closeDrawer}
        size="100%"
        padding="md"
        title="Navigation"
        className={classes.hiddenDesktop}
        zIndex={1000000}
      >
        <ScrollArea h={`calc(100vh - ${rem(60)})`} mx="-md">
          {/* Profile links */}
          {status === "authenticated" && (
            <>
              <Divider
                my="sm"
                color={theme.colorScheme === "dark" ? "dark.5" : "gray.1"}
              />
              <Group p={"sm"}>
                <Avatar src={user?.image} radius="xl" />

                <div style={{ flex: 1 }}>
                  <Text size="sm" weight={500}>
                    {user?.name}
                  </Text>

                  <Text color="dimmed" size="xs">
                    {user?.email}
                  </Text>
                </div>
              </Group>
              <Menu>
                <Menu.Label>Profile</Menu.Label>
                <Link href="/profile/" onClick={toggleDrawer}>
                  <Menu.Item
                    className={classes.link}
                    icon={
                      <IconUser
                        color={theme.colors.blue[9]}
                        size="0.9rem"
                        stroke={1.5}
                      />
                    }
                  >
                    My profile
                  </Menu.Item>
                </Link>
                <Link href="/profile/my-ads" onClick={toggleDrawer}>
                  <Menu.Item
                    className={classes.link}
                    icon={
                      <IconTags
                        size="0.9rem"
                        color={theme.colors.blue[9]}
                        stroke={1.5}
                      />
                    }
                  >
                    My ads
                  </Menu.Item>
                </Link>
                <Link href="/profile/favourites" onClick={toggleDrawer}>
                  <Menu.Item
                    className={classes.link}
                    icon={
                      <IconHeart
                        size="0.9rem"
                        color={theme.colors.red[6]}
                        stroke={1.5}
                      />
                    }
                  >
                    Favourites
                  </Menu.Item>
                </Link>
              </Menu>

              <Divider
                my="sm"
                color={theme.colorScheme === "dark" ? "dark.5" : "gray.1"}
              />
              <Menu>
                <Menu.Label>Settings</Menu.Label>
                <Link href="/profile/settings" onClick={toggleDrawer}>
                  <Menu.Item
                    className={classes.link}
                    icon={
                      <IconSettings
                        size="0.9rem"
                        color={theme.colors.blue[9]}
                        stroke={1.5}
                      />
                    }
                  >
                    Profile settings
                  </Menu.Item>
                </Link>
              </Menu>
            </>
          )}

          <Divider
            my="sm"
            color={theme.colorScheme === "dark" ? "dark.5" : "gray.1"}
          />

          <Menu>
            {status === "authenticated" && <Menu.Label>Navigate</Menu.Label>}
            <Link href="/" className={classes.link} onClick={toggleDrawer}>
              Home
            </Link>
            <UnstyledButton className={classes.link} onClick={toggleLinks}>
              <Center inline>
                <Box component="span" mr={5}>
                  Categories
                </Box>
                <IconChevronDown size={16} color={theme.fn.primaryColor()} />
              </Center>
            </UnstyledButton>
            <Collapse onClick={toggleDrawer} in={linksOpened}>
              {links}
            </Collapse>
            <Link href="/about" className={classes.link} onClick={toggleDrawer}>
              About
            </Link>
          </Menu>

          <Divider
            my="sm"
            color={theme.colorScheme === "dark" ? "dark.5" : "gray.1"}
          />
          <Group position="center" grow pb="xl" px="md">
            {status === "authenticated" ? (
              <>
                <Button
                  variant="light"
                  color="red"
                  onClick={() => signOut({ callbackUrl: "/" })}
                >
                  Log out
                </Button>
              </>
            ) : (
              <>
                <Button
                  variant="filled"
                  onClick={() => signIn(undefined, { callbackUrl: "/" })}
                >
                  Log in
                </Button>
              </>
            )}
          </Group>
        </ScrollArea>
      </Drawer>
    </Box>
  );
}
