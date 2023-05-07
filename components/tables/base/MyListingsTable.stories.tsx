import { Meta, StoryFn } from "@storybook/react";
import MyListingsTable, { IMyListingsTable } from "./MyListingsTable";
import { mockMyListingsTableProps } from "./MyListingsTable.mocks";

export default {
  title: "tables/MyListingsTable",
  component: MyListingsTable,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {},
} as Meta<typeof MyListingsTable>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: StoryFn<typeof MyListingsTable> = (args) => (
  <MyListingsTable {...args} />
);

export const Base = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args

Base.args = {
  ...mockMyListingsTableProps.base,
} as IMyListingsTable;
