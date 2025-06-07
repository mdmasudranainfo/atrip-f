import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import qs from "qs";

interface Tour {
  id: number;
  name: string;
  location: string;
  price: number;
}

const useTourFilter = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [filters, setFilters] = useState<any>({
    holidaysType: [],
    budget: [],
    country: [],
    cat_id: [],
    recommendedFor: [],
    meals: [],
    inclusions: [],
  });

  const filterTours = (tours: Tour[]) => {
    return tours.filter((tour) => {
      return true;
    });
  };
  const filteredTours = filterTours([]);

  const handleFilterChange = (filterName: string, values: string[]) => {
    const params = qs.parse(searchParams.toString(), {
      ignoreQueryPrefix: true,
    });

    params[filterName] = values;

    setFilters((prev: any) => ({
      ...prev,
      [filterName]: values,
    }));

    const queryString = qs.stringify(params, {
      addQueryPrefix: true,
      arrayFormat: "brackets",
      encode: false,
    });

    router.push(`/tour${queryString}`);
  };

  return {
    filters,
    filteredTours,
    setFilters,
    handleFilterChange,
  };
};

export default useTourFilter;
