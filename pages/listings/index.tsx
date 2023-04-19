import PrimaryLayout from "@/components/layout/primary/PrimaryLayout";
import { NextPageWithLayout } from "../page";

const index: NextPageWithLayout = () => {
  return <div>Listings</div>;
};

export default index;

index.getLayout = (page) => {
  return <PrimaryLayout>{page}</PrimaryLayout>;
};
