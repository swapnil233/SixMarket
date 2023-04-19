import { Meta, StoryFn } from "@storybook/react";
import TravelCard, { ITravelCard } from "./TravelCard";
import { mockTravelCardProps } from "./TravelCard.mocks";

export default {
  title: "cards/TravelCard",
  component: TravelCard,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {},
} as Meta<typeof TravelCard>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: StoryFn<typeof TravelCard> = (args) => <TravelCard {...args} />;

export const Base = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args

Base.args = {
  ...mockTravelCardProps.base,
} as ITravelCard;
