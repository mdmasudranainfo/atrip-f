"use server";

import { unstable_noStore as noStore } from "next/cache";
import { auth } from "~/auth";
import { getErrorMessage } from "../handle-error";
import { FlightData } from "@/types/flight-book-data";
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';

export const getAllFlight = async (params: any) => {
  const searchParams = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      searchParams.append(key, value.toString());
    }
  });

  const response = await fetch(
    `${
      process.env.NEXT_PUBLIC_API_ENDPOINT
    }/flight?${searchParams.toString()}&limit=5&page=${params?.page || 1}`,
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
    data: data,
    page: data?.rows?.current_page || 1,
    total_page: data?.rows?.last_page || 0,
    limit: data?.rows?.per_page || 10,
    total: data?.rows?.total || 0,
    error: data?.error,
    priceRange: data?.min_max_price || [0, 100],
  };
};

export const getFlightBySlug = async (
  slug: number | string
): Promise<{ data: any }> => {
  if (!slug) {
    throw new Error("Flight ID is required");
  }

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_ENDPOINT}/flight/${slug}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    }
  );

  if (!response.ok) {
    throw new Error(`Failed to fetch flight details for ID: ${slug}`);
  }
  const data = await response.json();
  return { data: data };
};

// Flight ticket booking data for dialogue
export async function flightBookingData(id: number) {
  noStore();

  const session = await auth()

  const accessToken = session?.accessToken || null;
  if (!accessToken) {
    const nextHeader = await headers()
    const referer = nextHeader.get("referer") || "/";
    redirect(`/api/auth/signin?callbackUrl=${encodeURIComponent(referer)}`);
  }

  const _headers: Record<string, string> = {
    "Content-Type": "application/json",
    Accept: "application/json",
    Authorization: `Bearer ${accessToken}`,
  };

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_ENDPOINT}/flight/getData/${id}`,
    {
      method: "GET",
      headers: _headers,
    }
  );

  if (!res.ok || !res.body) {
    return {
      data: null,
      error: getErrorMessage("Something went wrong"),
    };
  }

  const data = await res.json();

  if (data.status == 1) {
    return {
      data: data?.data ? (data.data as FlightData) : null,
      error: null,
    };
  }

  return {
    data: null,
    error: data.message,
  };
}
