import PrimaryLayout from "@/components/layout/primary/PrimaryLayout";
import { NextPageWithLayout } from "@/pages/page";

const MyListingsPage: NextPageWithLayout = () => {
  return <>placeholder</>;
};

export default MyListingsPage;

MyListingsPage.getLayout = (page) => {
  return <PrimaryLayout>{page}</PrimaryLayout>;
};
