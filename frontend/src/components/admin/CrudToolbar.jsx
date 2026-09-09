import { Search, Plus } from "lucide-react";
import Input from "../ui/Input.jsx";
import Select from "../ui/Select.jsx";
import Button from "../ui/Button.jsx";

const CrudToolbar = ({
  searchValue,
  onSearchChange,
  searchPlaceholder = "Search...",
  filters = [],
  onAddClick,
  addLabel = "Add New",
}) => {
  return (
    <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        {onSearchChange && (
          <div className="relative w-full sm:w-64">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
            <Input
              value={searchValue}
              onChange={(event) => onSearchChange(event.target.value)}
              placeholder={searchPlaceholder}
              className="pl-9"
            />
          </div>
        )}
        {filters.map((filter) => (
          <Select
            key={filter.id}
            value={filter.value}
            onChange={(event) => filter.onChange(event.target.value)}
            options={filter.options}
            className="sm:w-44"
          />
        ))}
      </div>

      {onAddClick && (
        <Button type="button" onClick={onAddClick}>
          <Plus className="h-4 w-4" />
          {addLabel}
        </Button>
      )}
    </div>
  );
};

export default CrudToolbar;
