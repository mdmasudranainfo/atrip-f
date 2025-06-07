"use server";

import { FilterAttribute } from "@/types/booking";

interface CarsParams {
  page?: number;
  limit?: number;
}

export const getAllCars = async (params: CarsParams = {}) => {
  const searchParams = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      searchParams.append(key, value.toString());
    }
  });
  const response = await fetch(
    `${
      process.env.NEXT_PUBLIC_API_ENDPOINT
    }/car?${searchParams.toString()}&limit=5&page=${params?.page || 1}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    }
  );

  const data = await response.json();

  return {
    data: data?.rows?.data ?? [],
    page: data?.rows?.current_page || 1,
    total_page: data?.rows?.last_page || 0,
    limit: data?.rows?.per_page || 10,
    total: data?.rows?.total || 0,
    error: data?.error || null,
    attributes: (data?.attributes || []) as FilterAttribute[],
    priceRange: data?.min_max_price || [0, 100],
  };
};

export const getCarsBySlug = async (slug: string) => {
  if (!slug) {
    throw new Error("Hotel ID is required");
  }

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_ENDPOINT}/car/${slug}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    }
  );

  if (!response.ok) {
    throw new Error(`Failed to fetch car details for ID: ${slug}`);
  }

  const data = await response.json();

  return {
    data: data?.row ?? null,
    reviews: data?.review_list?.data ?? [],
    error: data.error ?? null,
  };
};
