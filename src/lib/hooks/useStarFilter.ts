import { useRouter } from "next/navigation";
import React from "react";

const useStarFilter = () => {
  const [expandedRating, setExpandedRating] = React.useState(false);
  const [selectedStarRating, setSelectedStarRating] = React.useState<
    string | null
  >(null);

  const handleToggle = () => {
    setExpandedRating((prev) => !prev);
  };

  const router = useRouter();
  const searchParams = typeof window !== "undefined" ? new URLSearchParams(window.location.search) : new URLSearchParams();

  const handleFilterChange = (filterName: any, values: string[]) => {
    const params = new URLSearchParams(searchParams.toString());

    if (values.length > 0) {
      params.set(filterName, values.join(","));
    } else {
      params.delete(filterName);
    }

    router.push(`/tour?${params.toString()}`);
  };

  const handleStarRatingChange = (rating: string) => {
    setSelectedStarRating((prev) => (prev === rating ? null : rating));
    handleFilterChange(
      "star_rate[]",
      selectedStarRating === rating ? [] : [rating]
    );
  };

  return {
    expandedRating,
    handleToggle,
    selectedStarRating,
    handleStarRatingChange,
  };
};

export default useStarFilter;
