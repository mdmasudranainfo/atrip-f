"use server";
import { notFound } from "next/navigation";
import { unstable_noStore as noStore } from "next/cache";
import { EventActivityRow, EventBookingData, EventRow } from "@/types/activity";
import { Review } from "@/types/review";
import { FilterAttribute } from "@/types/booking";

interface QueryParams {
  page?: number;
  limit?: number;
}

export const getActivities = async (params: QueryParams = {}) => {
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
  }/event?${searchParams.toString()}`;

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
      data: (data?.rows?.data ?? []) as EventActivityRow[],
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

export const getActivityBySlug = async (slug: string) => {
  noStore();
  if (!slug) {
    notFound();
  }

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_ENDPOINT}/event/${slug}`,
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
      data: data?.row ? (data.row as EventRow) : null,
      reviews: data?.review_list ? (data.review_list?.data as Review[]) : [],
      booking_data: data.booking_data as EventBookingData,
      error: data?.error ?? null,
    };
  }
};

export const getActivityFeaturedCards = async () => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_ENDPOINT}/event/featured`,
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
