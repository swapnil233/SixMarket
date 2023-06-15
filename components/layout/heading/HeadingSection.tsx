import { FC } from "react";

export interface IHeadingSection {
  title: string;
  description?: string;
}

const HeadingSection: FC<IHeadingSection> = ({ title, description }) => {
  return (
    <section className="w-full pb-8">
      <h1 className="text-3xl font-normal flex flex-col mb-4">{title}</h1>
      <h2 className="text-base leading-6 text-gray-600">{description || ""}</h2>
    </section>
  );
};

export default HeadingSection;
