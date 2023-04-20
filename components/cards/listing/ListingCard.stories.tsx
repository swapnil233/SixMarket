import { Meta, StoryFn } from "@storybook/react";
import ListingCard, { IListingCard } from "./ListingCard";
import { mockListingCardProps } from "./ListingCard.mocks";

export default {
  title: "cards/ListingCard",
  component: ListingCard,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {},
} as Meta<typeof ListingCard>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: StoryFn<typeof ListingCard> = (args) => (
  <ListingCard {...args} />
);

export const Base = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args

Base.args = {
  ...mockListingCardProps.base,
} as IListingCard;
