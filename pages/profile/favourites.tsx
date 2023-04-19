import PrimaryLayout from "@/components/layout/primary/PrimaryLayout";
import { NextPageWithLayout } from "../page";

const Favourites: NextPageWithLayout = () => {
  return <div>favourites</div>;
};

export default Favourites;

Favourites.getLayout = (page) => <PrimaryLayout>{page}</PrimaryLayout>;
