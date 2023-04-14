import { Card } from "flowbite-react";
import { FC } from "react";

interface AdCardProps {}

const AdCard: FC<AdCardProps> = ({}) => {
  return (
    <div className="max-w-sm">
      <Card
        imgAlt="Meaningful alt text for an image that is not purely decorative"
        imgSrc="https://flowbite.com/docs/images/blog/image-1.jpg"
      >
        <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          32 inch Samsung smart tv
        </h5>
        <p className="font-normal text-gray-700 dark:text-gray-400">
          Here are the biggest enterprise technology acquisitions of 2021 so
          far, in reverse chronological order.
        </p>
      </Card>
    </div>
  );
};

export default AdCard;
