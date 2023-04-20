import Head from "next/head";
import { FC, ReactNode } from "react";
import { Navbar } from "../../Navbar";
import Footer from "../../footer/primary/Footer";

export interface IPrimaryLayout {
  children: ReactNode;
}

const PrimaryLayout: FC<IPrimaryLayout> = ({ children }) => {
  return (
    <>
      <Head>
        <title>Marketplace</title>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
        <meta
          name="description"
          content="Marketplace is a new classfields website based in Toronto"
        />
        <meta name="keywords" content="Classfields" />
        <meta name="author" content="Hasan Iqbal" />
      </Head>
      <Navbar />
      <main className="max-w-6xl mx-auto px-4">{children}</main>
      <Footer />
    </>
  );
};

export default PrimaryLayout;
