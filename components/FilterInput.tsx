import { ChangeEvent, FC } from "react";

interface FilterInputProps {
  onFilterTextChange: (text: string) => void;
}

const FilterInput: FC<FilterInputProps> = ({ onFilterTextChange }) => {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    onFilterTextChange(e.target.value);
  };

  return (
    <form className="flex flex-col col-span-full">
      <label className="text-lg mb-2">Filter by name</label>
      <input
        placeholder="Start searching..."
        className="rounded border-slate-700 border-solid border-2 px-2 py-1 mb-4"
        onChange={handleChange}
      ></input>
    </form>
  );
};

export default FilterInput;
