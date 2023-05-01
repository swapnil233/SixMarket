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
    <>
      {/* Hero */}
      <section className="flex flex-col w-full text-center pb-4">
        {/* Title */}
        <h1 className="text-5xl lg:text-6xl mb-4 font-normal">
          {categoryInfo.name}
        </h1>
      </section>
    </>
  );
};

export default Home;

Home.getLayout = (page) => {
  return <PrimaryLayout>{page}</PrimaryLayout>;
};
