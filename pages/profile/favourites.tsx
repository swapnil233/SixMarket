import HeadingSection from "@/components/layout/heading/HeadingSection";
import PrimaryLayout from "@/components/layout/primary/PrimaryLayout";
import Head from "next/head";
import { NextPageWithLayout } from "../page";

const Favourites: NextPageWithLayout = () => {
  return (
    <>
      <Head>
        <title>{`My Favourites | Marketplace`}</title>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
        <meta name="description" content="View and edit your listings." />

        <meta property="og:title" content={`My Favourites | Marketplace`} />
        <meta
          property="og:description"
          content="View and edit your saved/favourited listings."
        />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Marketplace" />
      </Head>

      <HeadingSection
        title="My favourites"
        description="View and manage saved/favourited listings"
      />
    </>
  );
};

export default Favourites;

Favourites.getLayout = (page) => <PrimaryLayout>{page}</PrimaryLayout>;
