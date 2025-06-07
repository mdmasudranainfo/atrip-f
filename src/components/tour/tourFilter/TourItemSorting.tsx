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
import qs from "qs";
import { useRouter } from "next/navigation";

type SortOption = {
  label: string;
  value: string;
};
const sortOptions: SortOption[] = [
  { label: "Price: Low to High", value: "price_low_high" },
  { label: "Price: High to Low", value: "price_high_low" },
  { label: "Most Popular", value: "rate_high_low" },
];


interface SearchResultsHeaderProps {
  propertyCount: number;
  onSortChange?: (option: SortOption) => void;
}

function TourItemSorting({
  propertyCount,
  onSortChange,
}: SearchResultsHeaderProps) {
  const [selectedSort, setSelectedSort] = useState<SortOption>(sortOptions[0]);
  const router = useRouter();

  const handleSortChange = (option: SortOption) => {
    setSelectedSort(option);

    let priceRange = "";
    switch (option.value) {
      case "price_low_high":
        priceRange = "220;1763"; 
        break;
      case "price_high_low":
        priceRange = "1763;220"; 
        break;
      case "rate_high_low":
        priceRange = "220;1763"; 
        break;
      default:
        priceRange = "220;1763";
    }
 
    const params = qs.parse(window.location.search, {
      ignoreQueryPrefix: true,
    });
 
    params["orderby"] = option.value;
    params["price_range"] = priceRange;
 
    const queryString = qs.stringify(params, {
      addQueryPrefix: true,
      arrayFormat: "brackets",
      encode: false,
    });
    
    router.push(`/tour${queryString}`);

    
    onSortChange?.(option);
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
            {selectedSort?.label}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-56">
          <DropdownMenuLabel>Sort by</DropdownMenuLabel>
          <DropdownMenuSeparator />
          {sortOptions?.map((option) => (
            <DropdownMenuItem
              key={option?.value}
              className={`${selectedSort?.value === option?.value ? "bg-gray-100" : ""
                }`}
              onClick={() => handleSortChange(option)}
            >
              {option?.label}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

export default TourItemSorting;
