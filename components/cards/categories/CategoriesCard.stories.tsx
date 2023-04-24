import { Meta, StoryFn } from "@storybook/react";
import CategoriesCard, { ICategoriesCard } from "./CategoriesCard";
import { mockCategoriesCardProps } from "./CategoriesCard.mocks";

export default {
  title: "cards/CategoriesCard",
  component: CategoriesCard,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {},
} as Meta<typeof CategoriesCard>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: StoryFn<typeof CategoriesCard> = (args) => (
  <CategoriesCard {...args} />
);

export const Base = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args

Base.args = {
  ...mockCategoriesCardProps.base,
} as ICategoriesCard;
