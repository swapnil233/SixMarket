import { Avatar, Button, Dropdown, Navbar, Spinner } from "flowbite-react";
import { FC } from "react";
import Link from "next/link";
import { useSession, signIn, signOut } from "next-auth/react";

interface NavBarProps {}

const NavBar: FC<NavBarProps> = ({}) => {
  const { data, status } = useSession();
  const user = data?.user;

  let userMenu;

  if (!user) {
    userMenu = (
      <Button size="sm" onClick={() => signIn()}>
        Sign in
      </Button>
    );
  }

  if (status === "loading") {
    userMenu = <Spinner aria-label="Default status example" />;
  } else if (status === "authenticated") {
    userMenu = (
      <Dropdown
        arrowIcon={false}
        inline={true}
        label={
          <Avatar
            rounded={true}
            // statusPosition="top-right"
            // status={notification ? "busy" : "online"}
          />
        }
      >
        <Dropdown.Header>
          <span className="block text-sm">{user?.name}</span>
          <span className="block truncate text-sm font-medium">
            {user?.email}
          </span>
        </Dropdown.Header>
        <Dropdown.Item>
          <Link href={"/app/dashboard"}>Dashboard</Link>
        </Dropdown.Item>
        <Dropdown.Item>
          <Link href={"/app/profile/settings"}>Settings</Link>
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
          alt="Flowbite Logo"
        />
        App Name
      </Navbar.Brand>
      <div className="flex md:order-2">{userMenu}</div>
      <div className="lg:none">
        <Navbar.Toggle />
      </div>
      <Navbar.Collapse>
        <Link href={"/"}>Home</Link>
        <Link href={"/app/dashboard"}>Dashboard</Link>
        <Link href={"/app/users"}>Users</Link>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NavBar;
