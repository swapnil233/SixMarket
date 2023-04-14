import { FC, ReactNode } from "react";
import NavBar from "./Navbar";
import { Footer } from "flowbite-react";

interface LayoutProps {
  children: ReactNode;
}

const Layout: FC<LayoutProps> = ({ children }) => {
  return (
    <>
      <NavBar />
      <main className="max-w-6xl mx-auto px-4">{children}</main>
      <Footer className="max-w-6xl mx-auto px-4" container={true}>
        <Footer.Copyright href="#" by="Marketplace™" year={2022} />
        <Footer.LinkGroup>
          <Footer.Link href="#">About</Footer.Link>
          <Footer.Link href="#">Privacy Policy</Footer.Link>
          <Footer.Link href="#">Licensing</Footer.Link>
          <Footer.Link href="#">Contact</Footer.Link>
        </Footer.LinkGroup>
      </Footer>
    </>
  );
};

export default Layout;
