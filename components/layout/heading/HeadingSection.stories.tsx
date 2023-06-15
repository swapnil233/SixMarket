import { Meta, StoryFn } from "@storybook/react";
import HeadingSection, { IHeadingSection } from "./HeadingSection";
import { mockHeadingSectionProps } from "./HeadingSection.mocks";

export default {
  title: "layout/HeadingSection",
  component: HeadingSection,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {},
} as Meta<typeof HeadingSection>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: StoryFn<typeof HeadingSection> = (args) => (
  <HeadingSection {...args} />
);

export const Base = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args

Base.args = {
  ...mockHeadingSectionProps.base,
} as IHeadingSection;
