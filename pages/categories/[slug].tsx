import PrimaryLayout from "@/components/layout/primary/PrimaryLayout";
import { Category, Listing } from "@prisma/client";
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { IGetCategoryAndAssociatedListingsResponse } from "../api/categories/[slug]";
import { NextPageWithLayout } from "../page";

const Home: NextPageWithLayout = () => {
  const router = useRouter();
  const { slug } = router.query;

  const [categoryInfo, setCategoryInfo] = useState<Category>({
    id: "",
    name: "",
    slug: "",
    thumbnail: "",
  });
  const [listingsInCategory, setListingsInCategory] = useState<Listing[]>([]);

  useEffect(() => {
    const fetchCategoryAndListingsData = async () => {
      try {
        const res = await axios.get<IGetCategoryAndAssociatedListingsResponse>(
          `/api/categories/${slug}`
        );

        setCategoryInfo(res.data.category);
        setListingsInCategory(res.data.allListingsInCategory);
      } catch (error: any) {
        console.error(
          "Error fetching category and listings data:",
          error.message
        );
      }
    };

    slug && fetchCategoryAndListingsData();
  }, [slug]);

  return (
    <div>
      {/* Hero */}
      <div className="pt-14 pb-14 flex flex-col w-full">
        <div className="max-w-6xl mx-auto sm:px-4 px-6">
          <section className="text-center pb-4">
            {/* Title */}
            <div className="md:max-w-5xl mx-auto">
              <h1 className="text-5xl lg:text-6xl mb-4 font-normal">
                {categoryInfo.name}
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
