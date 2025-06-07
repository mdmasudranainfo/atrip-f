"use server"
import { unstable_noStore as noStore } from "next/cache"

export const getCampaign = async () => {
  noStore(); // Ensure caching is disabled

  const url = `${process.env.NEXT_PUBLIC_API_ENDPOINT}/campaign`;

  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });
    const data = await response.json();
    return {
      data: data?.rows ?? [],
      error: null
    };
  } catch (error) {
    console.error("Error fetching campaigns:", error);

    return {
      data: [],
      error: "An unknown error occurred",
    };
  }
};
