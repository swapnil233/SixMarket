import PrimaryLayout from "@/components/layout/primary/PrimaryLayout";
import { NextPageWithLayout } from "../page";

const Home: NextPageWithLayout = () => {
  return (
    <div>
      {/* Hero */}
      <div className="pt-14 pb-14 flex flex-col w-full">
        <div className="max-w-6xl mx-auto sm:px-4 px-6">
          <section className="text-center pb-4">
            {/* Title */}
            <div className="md:max-w-5xl mx-auto">
              <h1 className="text-5xl lg:text-6xl mb-4 font-normal">
                Category Name
              </h1>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Home;

Home.getLayout = (page) => {
  return <PrimaryLayout>{page}</PrimaryLayout>;
};
