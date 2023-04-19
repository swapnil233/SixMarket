import PrimaryLayout from "@/components/layout/primary/PrimaryLayout";
import { NextPageWithLayout } from "../page";

const MyAds: NextPageWithLayout = () => {
  return <div>My ads</div>;
};

export default MyAds;

MyAds.getLayout = (page) => <PrimaryLayout>{page}</PrimaryLayout>;
