import FilterInput from "@/components/FilterInput";
import CategoriesCard from "@/components/cards/categories/CategoriesCard";
import PrimaryLayout from "@/components/layout/primary/PrimaryLayout";
import { Skeleton } from "@mantine/core";
import { Category } from "@prisma/client";
import axios, { AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import { NextPageWithLayout } from "../page";

const Home: NextPageWithLayout = () => {
  const [filterText, setFilterText] = useState("");
  const [categories, setCategories] = useState<Category[] | null>(null);

  // Fetch all categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const categories: AxiosResponse<Category[] | null> = await axios.get(
          "/api/categories"
        );

        setCategories(categories.data);
      } catch (error) {
        console.error("Error fetching recent listings:", error);
      }
    };

    fetchCategories();
  }, []);

  const handleFilterTextChange = (text: string) => {
    setFilterText(text);
  };

  const filteredCategories = categories?.filter((category) =>
    category.name?.toLowerCase().includes(filterText.toLowerCase())
  );

  const emptyStateMessage = (
    <p className="text-lg text-gray-600">
      Sorry, we couldn&apos;t find what you&apos;re looking for...
    </p>
  );

  return (
    <div>
      {/* Hero */}
      <div className="pt-14 pb-14 flex flex-col w-full">
        <div className="max-w-6xl mx-auto sm:px-4 px-6">
          <section className="text-center pb-4">
            {/* Title */}
            <div className="md:max-w-5xl mx-auto">
              <h1 className="text-5xl lg:text-6xl mb-4 font-normal">
                Find the{" "}
                <span className="text-blue-800 font-medium">perfect</span> item
              </h1>
            </div>
            {/* Subtitle */}
            <div className="max-w-3xl mx-auto">
              <p className="text-xl text-slate-600">
                Narrow down your search by looking at one of our 30+ categories
              </p>
            </div>
          </section>
        </div>
      </div>

      {/* Categories */}
      <div className="pb-12 flex flex-col w-full">
        <div className="max-w-6xl w-full mx-auto sm:px-4 px-6">
          <section className="md:pb-12 pb-20">
            <FilterInput onFilterTextChange={handleFilterTextChange} />
            <div className="grid grid-cols-2 lg:grid-cols-5 md:grid-cols-4 sm:grid-cols-3 col-span-full gap-4">
              {/* Recently posted listings */}
              {categories ? (
                filteredCategories!.length > 0 ? (
                  filteredCategories!.map((category, index) => (
                    <CategoriesCard
                      key={index}
                      slug={category.slug}
                      thumbnail={category.thumbnail!}
                      title={category.name}
                    />
                  ))
                ) : (
                  <h1 className="col-span-full">{emptyStateMessage}</h1>
                )
              ) : (
                <>
                  <Skeleton w={210} h={190} />
                  <Skeleton w={210} h={190} />
                  <Skeleton w={210} h={190} />
                  <Skeleton w={210} h={190} />
                  <Skeleton w={210} h={190} />
                  <Skeleton w={210} h={190} />
                  <Skeleton w={210} h={190} />
                  <Skeleton w={210} h={190} />
                  <Skeleton w={210} h={190} />
                  <Skeleton w={210} h={190} />
                </>
              )}
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
