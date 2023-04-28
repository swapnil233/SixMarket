// pages/profile/[id].tsx

import PrimaryLayout from "@/components/layout/primary/PrimaryLayout";
import { NextPageWithLayout } from "@/pages/page";

export async function getServerSideProps() {
  return {
    props: {
      user: "placeholder",
    },
  };
}

const MyListing: NextPageWithLayout = () => {
  return <>placeholder</>;
};

export default MyListing;

MyListing.getLayout = (page) => {
  return <PrimaryLayout>{page}</PrimaryLayout>;
};
