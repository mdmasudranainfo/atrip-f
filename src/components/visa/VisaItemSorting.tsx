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
import { useSearchParams, useRouter } from "next/navigation";

type SortOption = {
  label: string;
  value: string;
};
const sortOptions: SortOption[] = [
  { label: "Recommended", value: "" },
  { label: "Price: Low to High", value: "price_low_high" },
  { label: "Price: High to Low", value: "price_high_low" },
  { label: "Rating: High to Low", value: "rate_high_low" },
];
// Add these props to make it more flexible
interface SearchResultsHeaderProps {
  propertyCount: number
  label: string
}

// Update the component to use props
function VisatemSorting({
  propertyCount,
  label,
}: SearchResultsHeaderProps) {

  const router = useRouter();
  const searchParams = useSearchParams();

  const query = new URLSearchParams(searchParams.toString());

  const [selectedSort, setSelectedSort] = useState<string>(() => query.has("orderby") ? (query.get("orderby") || "") : sortOptions[0].value);

  const handleSortChange = (option: SortOption) => {
    setSelectedSort(option.value);

    if (option.value) {
      query.set("orderby", option.value);
    } else {
      query.delete("orderby");
    }

    // Push the updated query parameters as a string
    router.push(`?${query.toString()}`, { scroll: false });
  };

  return (
    <div className="flex items-center justify-between">
      <div className="text-gray-900">
        <span className="font-bold text-[5]">
          {propertyCount} properties found{" "}
        </span>
      </div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            className="flex items-center gap-2 text-[5] font-bold text-gray-600"
          >
            <SlidersHorizontal className="h-4 w-4" />
            {sortOptions.find(item => item.value == selectedSort)?.label || sortOptions[0].label}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-56">
          <DropdownMenuLabel>Sort by</DropdownMenuLabel>
          <DropdownMenuSeparator />
          {sortOptions.map((option) => (
            <DropdownMenuItem
              key={option.value}
              className={`${
                selectedSort === option.value ? "bg-gray-100" : ""
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
export default VisatemSorting;
