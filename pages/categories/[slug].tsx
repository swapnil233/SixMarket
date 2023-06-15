import HeadingSection from "@/components/layout/heading/HeadingSection";
import PrimaryLayout from "@/components/layout/primary/PrimaryLayout";
import { Category, Listing } from "@prisma/client";
import axios from "axios";
import Head from "next/head";
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
      <Head>
        <title>{`${categoryInfo.name} | Marketplace`}</title>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
        <meta
          name="description"
          content={`View and filter through the listings and ads within ${categoryInfo.name}.`}
        />

        <meta property="og:title" content={`Categories | Marketplace`} />
        <meta
          property="og:description"
          content={`View and filter through the listings and ads within ${categoryInfo.name}.`}
        />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Marketplace" />
      </Head>

      <HeadingSection
        title={categoryInfo.name}
        description={`View and filter through the listings and ads within ${categoryInfo.name}.`}
      />
    </>
  );
};

export default Home;

Home.getLayout = (page) => {
  return <PrimaryLayout>{page}</PrimaryLayout>;
};
