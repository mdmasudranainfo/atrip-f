"use client";

import { Card } from "@/components/ui/card";
import { ChevronDown, ChevronUp } from "lucide-react";
import { cn, formatPrice } from "@/lib/utils";
import { BudgetRange } from "@/types/tourTypes";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";
import { Slider } from "@/components/ui/slider";

function extractPriceRange(
  min: number,
  max: number,
  priceRangeQuery: any
): number[] {
  if (priceRangeQuery) {
    const [min, max] = priceRangeQuery.split(";").map(Number);

    // If max is empty or not provided, set it to min + 1
    const finalMax = isNaN(max) ? min + 1 : max;

    return [Number(min), Number(finalMax)] as [number, number];
  }

  return [Number(min), Number(max)] as [number, number];
}

function generatePriceRanges(min: number, max: number, maxRanges = 4) {
  const ranges: { min: number; max: number | null; label: string }[] = [];

  // Ensure max is defined and adjust the upper limit
  const upperLimit = max ?? min * 3;
  const step = Math.ceil((upperLimit - min) / maxRanges);

  let currentMin = min;
  for (let i = 0; i < maxRanges; i++) {
    const currentMax = Math.ceil(currentMin + step);

    if (currentMax >= upperLimit || i === maxRanges - 1) {
      ranges.push({
        min: currentMin,
        max: null,
        label: `>${formatPrice(currentMin)}`,
      });
      break;
    }

    ranges.push({
      min: currentMin,
      max: currentMax,
      label: `${formatPrice(currentMin)} - ${formatPrice(currentMax)}`,
    });
    currentMin = currentMax + 1;
  }

  return ranges;
}

export default function PriceFilter({
  params,
  range,
  name,
  baseUrl,
}: {
  baseUrl: string;
  params: any;
  range: number[];
  name: string;
}) {
  const quickRanges = generatePriceRanges(range[0] || 0, range[1] || 0);
  const [expandedBudget, setExpandedBudget] = useState<boolean>(true);

  const router = useRouter();
  const query = new URLSearchParams(params);

  const [searchQuery, setSearchQuery] = useState<number[]>(
    extractPriceRange(range[0] || 0, range[1] || 0, params[name] || "")
  );

  // Inside the Search Component...
  const debouncedUpdateURL = useDebouncedCallback(
    (newSearchParams: URLSearchParams) => {
      router.push(`${baseUrl}?${newSearchParams.toString()}`);
    },
    100
  );

  const handleFilterChange = (priceRange: number[]) => {
    query.delete(name);
    query.set(name, `${priceRange[0]};${priceRange[1]}`);
    debouncedUpdateURL(query);
  };

  range[0] = 0; // This is my code

  return (
    <div className="w-full px-4 py-4 pb-6">
      {/* Header with Toggle Button */}
      <div
        className="flex items-center justify-between cursor-pointer text-primary-dark"
        onClick={() => setExpandedBudget((prev: boolean) => !prev)}
      >
        <span className="font-semibold text-base text-primary-dark leading-6">
          Budget
        </span>
        {expandedBudget ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
      </div>

      {expandedBudget && (
        <div className="mt-5">
          {/* Slider with Min/Max Display */}
          <div className="mb-2 px-1">
            <Slider
              min={0}
              max={range[1]}
              step={10}
              defaultValue={range}
              value={searchQuery}
              onValueChange={(value) => {
                setSearchQuery([Number(value[0]), Number(value[1])]);
              }}
              onValueCommit={handleFilterChange}
              minStepsBetweenThumbs={2}
              className="w-full h-2 bg-primary-dark/90 rounded-xl"
            />
          </div>
          <div className="flex justify-between text-primary-dark font-medium text-sm mt-2">
            <span>Min: AED {searchQuery[0]}</span>
            <span>Max: AED {searchQuery[1]}</span>
          </div>

          {/* Budget Range Buttons */}
          {/* <div className="flex justify-between flex-wrap gap-2 mt-4 ">
            {quickRanges.map((budget: BudgetRange) => (
              <button
                key={budget?.label}
                onClick={() => {
                  const _data = [
                    budget.min || range[0],
                    budget.max || range[1],
                  ];
                  setSearchQuery(_data);
                  handleFilterChange(_data);
                }}
                className="group"
              >
                <Card
                  className={cn(
                    "px-2 py-2.5 text-center transition-colors justify-center items-center text-primary-dark text-sm leading-5 rounded-lg shadow-none border-none",
                    "bg-white-lightSlate hover:bg-gray-100 flex",
                    searchQuery[0] === budget.min &&
                      searchQuery[1] === budget.max &&
                      "bg-white-lightSlate ring-2 ring-info/90"
                  )}
                >
                  <span className="text-sm font-medium text-primary-dark">
                    {budget?.label}
                  </span>
                </Card>
              </button>
            ))}
          </div> */}
        </div>
      )}
    </div>
  );
}
