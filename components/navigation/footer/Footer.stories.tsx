import { Meta, StoryFn } from "@storybook/react";
import Footer, { IFooter } from "./Footer";
import { mockFooterProps } from "./Footer.mocks";

export default {
  title: "navigation/Footer",
  component: Footer,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {},
} as Meta<typeof Footer>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: StoryFn<typeof Footer> = (args) => <Footer {...args} />;

export const Base = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args

Base.args = {
  ...mockFooterProps.base,
} as IFooter;
