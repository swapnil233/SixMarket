import { FC, ReactNode } from "react";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import { footerData } from "./data/footerData";

interface LayoutProps {
  children: ReactNode;
}

const Layout: FC<LayoutProps> = ({ children }) => {
  return (
    <>
      <Navbar />
      <main className="max-w-6xl mx-auto px-4">{children}</main>
      <Footer data={footerData} />
    </>
  );
};

export default Layout;
