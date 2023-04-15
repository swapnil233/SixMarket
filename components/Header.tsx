import { Avatar, Button, Dropdown, Navbar, Spinner } from "flowbite-react";
import { FC } from "react";
import Link from "next/link";
import { useSession, signIn, signOut } from "next-auth/react";
import { useRouter } from "next/router";
import { Session } from "next-auth";

interface HeaderProps {}

const Header: FC<HeaderProps> = ({}) => {
  const { data, status } = useSession();
  const user = data?.user;
  const router = useRouter();

  let userMenu;

  if (!user) {
    userMenu = (
      <Button
        size="sm"
        onClick={() =>
          user
            ? router.push("/ads/new")
            : signIn(undefined, { callbackUrl: "/ads/new" })
        }
      >
        Post an ad
      </Button>
    );
  }

  if (status === "loading") {
    userMenu = <Spinner aria-label="Loading" />;
  } else if (status === "authenticated") {
    userMenu = (
      <Dropdown
        arrowIcon={true}
        inline={true}
        label={<Avatar img={user?.image || ""} rounded={true} />}
      >
        <Dropdown.Header>
          <span className="block text-sm">{user?.name}</span>
          <span className="block truncate text-sm font-medium">
            {user?.email}
          </span>
        </Dropdown.Header>

        <Dropdown.Item>
          <Link href={"/profile/my-ads"}>My ads</Link>
        </Dropdown.Item>
        <Dropdown.Item>
          <Link href={"/profile/favourites"}>Favourites</Link>
        </Dropdown.Item>
        <Dropdown.Item>
          <Link href={"/profile"}>Profile</Link>
        </Dropdown.Item>
        <Dropdown.Item>
          <Link href={"/profile/settings"}>Settings</Link>
        </Dropdown.Item>
        <Dropdown.Divider />
        <Dropdown.Item onClick={() => signOut()}>Sign out</Dropdown.Item>
      </Dropdown>
    );
  }

  return (
    <Navbar fluid={true} rounded={true} className="max-w-6xl mx-auto mb-4">
      <Navbar.Brand href="/">
        <img
          src="https://flowbite.com/docs/images/logo.svg"
          className="mr-3 h-6 sm:h-9"
          alt="Marketplace Logo"
        />
        <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
          Marketplace
        </span>
      </Navbar.Brand>
      <div className="flex justify-between items-center">
        <div className="flex md:order-2">{userMenu}</div>
        <Navbar.Collapse className="mr-8">
          {user ? (
            <div className="flex items-center">
              <Navbar.Link className="mr-8" href="/ads">
                Browse
              </Navbar.Link>
              <Button
                size="sm"
                onClick={() =>
                  user
                    ? router.push("ads/new")
                    : signIn(undefined, { callbackUrl: "ads/new" })
                }
              >
                Post an ad
              </Button>
            </div>
          ) : (
            <Navbar.Link href="" onClick={() => signIn()}>
              Sign up or log in
            </Navbar.Link>
          )}
        </Navbar.Collapse>
      </div>
    </Navbar>
  );
};

export default Header;
