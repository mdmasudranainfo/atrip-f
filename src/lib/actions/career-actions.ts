"use server";

import { unstable_noStore as noStore } from "next/cache";
import { notFound } from "next/navigation";
interface CareersParams {
  page?: number;
  limit?: number;
}

export const getAllCareers = async (params: CareersParams = {}) => {
  noStore();
  const searchParams = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (value) {
      searchParams.append(key, value.toString());
    }
  });

  // Ensure pagination parameters are included
  searchParams.set("limit", "10");
  searchParams.set("page", params.page?.toString() || "1");

  const url = `${
    process.env.NEXT_PUBLIC_API_ENDPOINT
  }/career?${searchParams.toString()}`;

  const response = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  });

  if (response.ok) {
    const data = await response.json();
    return {
      data: data?.rows?.data ?? [],
      page: data?.rows?.current_page || 1,
      total_page: data?.rows?.last_page || 0,
      limit: data?.rows?.per_page || 10,
      total: data?.rows?.total || 0,
      error: data?.error,
    };
  }
};

export const getCareerBySlug = async (slug: string) => {
  noStore();
  if (!slug) {
    throw new Error("Career slug is required");
  }

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_ENDPOINT}/career/${slug}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    }
  );

  if (!response.ok) {
    notFound();
  } else {
    const data = await response.json();
    return {
      data: data?.row ?? null,
      gallery: data?.gallery ?? [],
      reviews: data?.review_list ?? [],
      error: data?.error ?? null,
    };
  }
};
