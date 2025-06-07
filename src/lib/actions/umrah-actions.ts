"use server";
import { FilterAttribute } from "@/types/booking";
import { unstable_noStore } from "next/cache";
interface UmrahParams {
  page?: number;
  limit?: number;
}

export const getUmrah = async (params: UmrahParams = {}) => {
  const searchParams = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      searchParams.append(key, value.toString());
    }
  });
  const response = await fetch(
    `${
      process.env.NEXT_PUBLIC_API_ENDPOINT
    }/umrah?${searchParams.toString()}&limit=5&page=${params?.page || 1}`,
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
    error: data?.error,
    attributes: (data?.attributes || []) as FilterAttribute[],
    priceRange: data?.min_max_price || [0, 100],
  };
};

export const getUmrahBySlug = async (slug: string) => {
  unstable_noStore();
  if (!slug) {
    throw new Error("Umrah ID is required");
  }

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_ENDPOINT}/umrah/${slug}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    }
  );

  if (!response.ok) {
    throw new Error(`Failed to fetch umrah details for ID: ${slug}`);
  }

  const data = await response.json();

  return {
    alldata: data,
    data: data?.row ?? null,
    reviewList: data?.review_list ?? null,
    tabsData: data?.translation ?? null,
    error: data?.error ?? null,
  };
};

export const getUmrahFeaturedCards = async () => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_ENDPOINT}/umrah/featured`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    }
  );

  if (response.ok) {
    const data = await response.json();
    return {
      data: data?.rows,
    };
  }
};
