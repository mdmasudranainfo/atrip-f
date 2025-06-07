"use client";
import { useState } from "react";
import { BudgetRange } from "@/types/tourTypes";
import { useRouter, useSearchParams } from "next/navigation";
import qs from "qs";

const useBudgetRangeFilter = (endPoint: string) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [range, setRange] = useState<[number, number]>([0, 200]);
  const [selectedRange, setSelectedRange] = useState<BudgetRange | null>(null);
  const [expandedBudget, setExpandedBudget] = useState(true);

  const handleFilterChange = (filterName: string, values: string[]) => {
    const currentParams = qs.parse(searchParams.toString());

    if (values.length > 0) {
      currentParams[filterName] = values.join(";");
    } else {
      delete currentParams[filterName];
    }
    const queryString = qs.stringify(currentParams, { encode: false });

    router.push(`/${endPoint}?${queryString}`);
  };
  // Budget slider handler
  const handleSliderChange = (value: number[]) => {
    setRange([value[0], value[1]]);
    setSelectedRange(null);
    handleFilterChange("price_range", [
      value[0].toString(),
      value[1].toString(),
    ]);
  };
  // Budget button selection handler
  const handleRangeClick = (budgetRange: BudgetRange) => {
    setSelectedRange(budgetRange);
    setRange([budgetRange.min, budgetRange.max ?? 100000]);
    handleFilterChange("price_range", [
      budgetRange.min.toString(),
      budgetRange.max?.toString() || "100000",
    ]);
  };

  return {
    range,
    setRange,
    selectedRange,
    setSelectedRange,
    expandedBudget,
    setExpandedBudget,
    handleSliderChange,
    handleRangeClick,
    handleFilterChange,
  };
};

export default useBudgetRangeFilter;
