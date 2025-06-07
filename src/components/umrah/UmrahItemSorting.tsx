"use client";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { SlidersHorizontal } from "lucide-react";
import { useState } from "react";
type SortOption = {
  label: string;
  value: string;
};
const sortOptions: SortOption[] = [
  { label: "Price: Low to High", value: "price_asc" },
  { label: "Price: High to Low", value: "price_desc" },
  { label: "Most Popular", value: "popular" },
];

// Add these props to make it more flexible
interface SearchResultsHeaderProps {
  propertyCount: number;
  onSortChange?: (option: SortOption) => void;
}

// Update the component to use props
function UmrahItemSorting({
  propertyCount,
  onSortChange,
}: SearchResultsHeaderProps) {
  const [selectedSort, setSelectedSort] = useState<SortOption>(sortOptions[0]);

  const handleSortChange = (option: SortOption) => {
    setSelectedSort(option);
    onSortChange?.(option);
  };

  return (
    <div className="flex items-center justify-between">
      <div className="text-gray-900">
        <span className="font-bold text-[5]">
          {propertyCount} results found{" "}
        </span>
      </div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            className="flex items-center gap-2 text-[5] font-bold text-gray-600"
          >
            <SlidersHorizontal className="h-4 w-4" />
            {selectedSort.label}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-56">
          <DropdownMenuLabel>Sort by</DropdownMenuLabel>
          <DropdownMenuSeparator />
          {sortOptions.map((option) => (
            <DropdownMenuItem
              key={option.value}
              className={`${
                selectedSort.value === option.value ? "bg-gray-100" : ""
              }`}
              onClick={() => handleSortChange(option)}
            >
              {option.label}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
export default UmrahItemSorting;
