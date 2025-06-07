"use server";
import { notFound } from "next/navigation";
import { unstable_noStore as noStore } from "next/cache";
import { FilterAttribute } from '@/types/booking';
import { VisaRow } from "@/types/visa";

interface VisaParams {
  page?: number;
  limit?: number;
}

export const getVisas = async (params: VisaParams = {}) => {
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
  }/visa?${searchParams.toString()}`;

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
      attributes: (data?.attributes || []) as FilterAttribute[],
      priceRange: data?.min_max_price || [0, 100],
    };
  }
};

export const getVisaBySlug = async (slug: string) => {
  noStore();
  if (!slug) {
    throw new Error("Visa slug is required");
  }

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_ENDPOINT}/visa/${slug}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    }
  )
  
  if (!response.ok) {
    notFound();
  } else {
    const data = await response.json();
    return {
      data: data?.row ? data.row as VisaRow : null,
      gallery: data?.gallery ?? [],
      reviews: data?.review_list ?? [],
      error: data?.error ?? null,
    };
  }
};

export const getHotelFeaturedCards = async () => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_ENDPOINT}/hotel/featured`,
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
