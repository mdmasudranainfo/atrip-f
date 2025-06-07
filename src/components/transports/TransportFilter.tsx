"use client";

import { FilterAttribute } from "@/types/booking";
import MultiFilterOption from "@/components/multifilter/multi-filter-option";
import SearchFilter from "@/components/multifilter/search-filter";
import { cn } from "@/lib/utils";
import PriceFilter from "@/components/multifilter/price-filter";

export default function TransportsFilter({
  attributes,
  params,
  baseUrl,
  priceRange,
}: {
  attributes: FilterAttribute[];
  params: any;
  baseUrl: string;
  priceRange?: number[];
}) {
  return (
    <div
      className={cn(
        "w-full lg:max-w-xs bg-white shadow-lg rounded-lg overflow-y-scroll max-h-[100vh] "
      )}
    >
      <SearchFilter
        params={params}
        baseUrl={baseUrl}
        label={"Search Properties"}
      />
      <PriceFilter
        range={priceRange || [0, 100]}
        name="price_range"
        params={params}
        baseUrl={baseUrl}
      />
      <MultiFilterOption
        attributes={attributes}
        params={params}
        baseUrl={baseUrl}
      />
    </div>
  );
}
