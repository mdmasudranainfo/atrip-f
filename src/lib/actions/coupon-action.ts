"use server";

import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "~/auth";

// Apply coupon
export const applyCoupon = async (bookingCode: string, couponCode: string) => {
  const session = await auth();
  const accessToken = session?.accessToken || null;

  if (!accessToken) {
    const nextHeader = await headers();
    const referer = nextHeader.get("referer") || "/";
    redirect(`/api/auth/signin?callbackUrl=${encodeURIComponent(referer)}`);
  }

  // console.log(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/booking/${bookingCode}/apply-coupon`, accessToken, JSON.stringify({coupon_code: couponCode}))

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_ENDPOINT}/booking/${bookingCode}/apply-coupon`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({ coupon_code: couponCode }),
      }
    );

    if (response.ok) {
      const data = await response.json();

      if (data.status == 0) {
        return {
          data: null,
          error: data?.errors
            ? Object.values(data?.errors || {})[0]
            : data.message || "Something went wrong!",
        };
      }

      return {
        data: data ?? null,
        error: null,
      };
    }

    return {
      success: false,
      data: null,
      error: "Failed to apply coupon",
    };
  } catch (error) {
    return {
      success: false,
      data: null,
      error: "Failed to apply coupon",
    };
  }
};

// Remove coupon
export const removeCoupon = async (bookingCode: string, couponCode: string) => {
  const session = await auth();
  const accessToken = session?.accessToken || null;

  if (!accessToken) {
    const nextHeader = await headers();
    const referer = nextHeader.get("referer") || "/";
    redirect(`/api/auth/signin?callbackUrl=${encodeURIComponent(referer)}`);
  }

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_ENDPOINT}/booking/${bookingCode}/remove-coupon`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({ coupon_code: couponCode }),
      }
    );

    if (response.ok) {
      const data = await response.json();

      if (data.status == 0) {
        return {
          data: null,
          error: data?.errors
            ? Object.values(data?.errors || {})[0]
            : data.message || "Something went wrong!",
        };
      }

      return {
        data: data ?? null,
        error: null,
      };
    }

    return {
      success: false,
      data: null,
      error: "Failed to remove coupon",
    };
  } catch (error) {
    return {
      success: false,
      data: null,
      error: "Failed to remove coupon",
    };
  }
};
