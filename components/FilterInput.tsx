import { Input } from "@mantine/core";
import { IconFilter } from "@tabler/icons-react";
import { ChangeEvent, FC } from "react";

interface FilterInputProps {
  onFilterTextChange: (_text: string) => void;
}

const FilterInput: FC<FilterInputProps> = ({ onFilterTextChange }) => {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    onFilterTextChange(e.target.value);
  };

  return (
    <form className="flex flex-col col-span-full">
      <label className="text-base mb-2 text-slate-600">Filter</label>
      <Input
        icon={<IconFilter size="1rem" />}
        className="mb-8"
        variant="default"
        size="sm"
        onChange={handleChange}
        placeholder="Start typing..."
      />
    </form>
  );
};

export default FilterInput;
