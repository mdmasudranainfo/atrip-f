"use server";

import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "~/auth";

// Booking add to cart
export const bookingAddToCart = async (bookingPayload: any) => {
  const session = await auth();
  const accessToken = session?.accessToken || null;

  if (!accessToken) {
    const nextHeader = await headers();
    const referer = nextHeader.get("referer") || "/";
    return redirect(
      `/api/auth/signin?callbackUrl=${encodeURIComponent(referer)}`
    );
  }

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_ENDPOINT}/booking/addToCart`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify(bookingPayload),
      }
    );

    const data = await response.json();

    if (data?.require_login == 1) {
      return {
        data: data ?? null,
        error: "Login required",
      };
    }

    if (data.status == 0) {
      return {
        data: null,
        error: data?.errors
          ? Object.values(data?.errors || {})[0]
          : data.message || "Something went wrong!",
      };
    }

    if (response.ok) {
      return {
        data: data ?? null,
        error: null,
      };
    }

    return {
      success: false,
      data: null,
      error: "Failed to book",
    };
  } catch (error) {
    return {
      success: false,
      data: null,
      error: "Failed to book",
    };
  }
};

export const bookingAddEnquiry = async (bookingPayload: any) => {
  const session = await auth();
  const accessToken = session?.accessToken || null;

  if (!accessToken) {
    const nextHeader = await headers();
    const referer = nextHeader.get("referer") || "/";
    return redirect(
      `/api/auth/signin?callbackUrl=${encodeURIComponent(referer)}`
    );
  }

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_ENDPOINT}/booking/addEnquiry`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify(bookingPayload),
      }
    );

    const data = await response.json();

    if (data?.require_login == 1) {
      return {
        data: data ?? null,
        error: "Login required",
      };
    }

    if (data?.status == 0) {
      return {
        data: null,
        error: data?.errors
          ? Object.values(data?.errors || {})[0]
          : data.message || "Something went wrong!",
      };
    }

    if (response.ok) {
      return {
        data: data ?? null,
        error: null,
      };
    }

    return {
      success: false,
      data: null,
      error: "Failed to send",
    };
  } catch (error) {
    return {
      success: false,
      data: null,
      error: "Failed to send",
    };
  }
};

// update Step
export const bookingUpdateStep = async (bookingPayload: any, slug: string) => {
  const session = await auth();
  const accessToken = session?.accessToken || null;

  if (!accessToken) {
    const nextHeader = await headers();
    const referer = nextHeader.get("referer") || "/";
    redirect(`/api/auth/signin?callbackUrl=${encodeURIComponent(referer)}`);
  }

  const formData = new FormData();

  Object.entries(bookingPayload).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      formData.append(
        key,
        typeof File !== "undefined" && value instanceof File
          ? value
          : typeof value === "object"
          ? JSON.stringify(value)
          : value.toString()
      );
    }
  });

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_ENDPOINT}/booking/updateStep/${slug}`,
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: formData,
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
      error: "Failed to book",
    };
  } catch (error) {
    return {
      success: false,
      data: null,
      error: "Failed to book",
    };
  }
};

// Booking update
export const bookingUpdateCart = async (bookingPayload: any, slug: string) => {
  const session = await auth();
  const accessToken = session?.accessToken || null;

  if (!accessToken) {
    const nextHeader = await headers();
    const referer = nextHeader.get("referer") || "/";
    redirect(`/api/auth/signin?callbackUrl=${encodeURIComponent(referer)}`);
  }

  const formData = new FormData();

  Object.entries(bookingPayload).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      formData.append(
        key,
        typeof File !== "undefined" && value instanceof File
          ? value
          : typeof value === "object"
          ? JSON.stringify(value)
          : value.toString()
      );
    }
  });

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_ENDPOINT}/booking/updateCart/${slug}`,
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: formData,
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
      error: "Failed to book",
    };
  } catch (error) {
    return {
      success: false,
      data: null,
      error: "Failed to book",
    };
  }
};

// Booking checkout
export const confirmBooking = async (confirmationdData: any) => {
  const session = await auth();

  const accessToken = session?.accessToken || null;
  if (!accessToken) {
    const nextHeader = await headers();
    const referer = nextHeader.get("referer") || "/";
    redirect(`/api/auth/signin?callbackUrl=${encodeURIComponent(referer)}`);
  }

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_ENDPOINT}/booking/doCheckout`,
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify(confirmationdData),
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

    const data = await response.json();

    return {
      success: response.ok,
      data: data ?? null,
      error: data.error ?? null,
    };
  } catch (error) {
    console.log(error);
    return {
      success: false,
      data: null,
      error: "Failed to confirm booking",
    };
  }
};

// Fetch booking
export const fetchBooking = async (slug: string) => {
  const session = await auth();
  const accessToken = session?.accessToken || null;
  if (!accessToken) {
    throw new Error("Unauthorized");
  }

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_ENDPOINT}/booking/${slug}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    if (response.ok) {
      const data = await response.json();
      return {
        data: data ?? null,
        error: null,
      };
    }

    const data = await response.json();

    return {
      success: response.ok,
      data: data ?? null,
      error: data.error ?? null,
    };
  } catch (error) {
    return {
      success: false,
      data: null,
      error: "Failed to confirm booking",
    };
  }
};

// Fetch checkout data
export const fetchBookingCheckoutData = async (slug: string) => {
  const session = await auth();
  const accessToken = session?.accessToken || null;
  if (!accessToken) {
    return {
      success: false,
      data: null,
      error: "Unauthorized",
    };
  }

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_ENDPOINT}/booking/${slug}/checkout`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    if (response.ok) {
      const data = await response.json();
      return {
        data: data ?? null,
        error: null,
      };
    }

    const data = await response.json();

    return {
      success: response.ok,
      data: data ?? null,
      error: data.error ?? null,
    };
  } catch (error) {
    return {
      success: false,
      data: null,
      error: "Failed to confirm booking",
    };
  }
};

// Booking payment callback confirm
export const bookingGatewayCallbackConfirm = async (
  gateway: string,
  slug: string,
  sessionId: string
) => {
  const session = await auth();
  const accessToken = session?.accessToken || null;
  if (!accessToken) {
    return {
      success: false,
      data: null,
      error: "Unauthorized",
    };
  }

  const searchParams = new URLSearchParams();
  searchParams.append("c", slug);
  searchParams.append("session_id", sessionId);

  try {
    const response = await fetch(
      `${
        process.env.NEXT_PUBLIC_API_ENDPOINT
      }/booking/confirm/${gateway}?${searchParams.toString()}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    if (response.ok) {
      const data = await response.json();
      return {
        data: data ?? null,
        error: null,
      };
    }

    const data = await response.json();

    return {
      success: response.ok,
      data: data ?? null,
      error: data.error ?? null,
    };
  } catch (error) {
    return {
      success: false,
      data: null,
      error: "Failed to confirm booking",
    };
  }
};

// Fetch booking history
export const getBookingHistory = async () => {
  const session = await auth();
  const accessToken = session?.accessToken || null;
  if (!accessToken) {
    throw new Error("Unauthorized");
  }

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_ENDPOINT}/user/booking-history`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    if (response.ok) {
      const data = await response.json();
      return {
        data: data ?? null,
        error: null,
      };
    }

    const data = await response.json();

    return {
      success: response.ok,
      data: data ?? null,
      error: data.error ?? null,
    };
  } catch (error) {
    return {
      success: false,
      data: null,
      error: "Failed to confirm booking",
    };
  }
};

export const getBookingHistoryById = async (id: string | number) => {
  const session = await auth();
  const accessToken = session?.accessToken || null;

  if (!accessToken) {
    return { success: false, data: null, error: "Unauthorized" };
  }

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_ENDPOINT}/user/booking-history/${id}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    const data = await response.json();

    return {
      success: response.ok,
      data: response.ok ? data : null,
      error: response.ok ? null : data.error ?? "Unknown error",
    };
  } catch (error) {
    return {
      success: false,
      data: null,
      error: "Failed to retrieve booking details",
    };
  }
};
