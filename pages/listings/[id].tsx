import PrimaryLayout from "@/components/layout/primary/PrimaryLayout";
import { Carousel } from "@mantine/carousel";
import { Image, Listing } from "@prisma/client";
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { NextPageWithLayout } from "../page";

const IndividualListing: NextPageWithLayout = () => {
  const router = useRouter();
  const { id } = router.query;

  const [listingInfo, setListingInfo] = useState<Listing>();

  useEffect(() => {
    const fetchListingData = async () => {
      try {
        const res = await axios.get(`/api/listings/${id}`);
        setListingInfo(res.data);
      } catch (error: any) {
        console.error("Error fetching listings data:", error.message);
      }
    };

    id && fetchListingData();
  }, [id]);

  console.log(listingInfo);

  return (
    <div>
      {/* Hero */}
      <div className="pt-14 pb-14 flex flex-col w-full">
        <div className="max-w-6xl mx-auto sm:px-4 px-6">
          <section>
            <Carousel
              slideSize="80%"
              height={400}
              slideGap="xs"
              loop
              withIndicators
            >
              {listingInfo?.images.map((image: Image, index: number) => (
                <Carousel.Slide key={index}>
                  <img
                    src={image.url}
                    alt="d"
                    className="w-full h-full object-cover"
                  />
                </Carousel.Slide>
              ))}
            </Carousel>
          </section>
          <section className="text-center pb-4">
            {/* Title */}
            <div className="md:max-w-5xl mx-auto">
              <h1 className="text-5xl lg:text-6xl mb-4 font-normal">
                {listingInfo?.name}
              </h1>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default IndividualListing;

IndividualListing.getLayout = (page) => {
  return <PrimaryLayout>{page}</PrimaryLayout>;
};
