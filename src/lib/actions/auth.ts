"use server";
import { UserData } from "@/types/user";
import { auth } from "~/auth";

interface FormDataType {
  term: number;
  email: string;
  first_name: string;
  last_name: string;
  mobile: string;
  password: string;
}
export const registerNewUser = async (formData: FormDataType) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_ENDPOINT}/auth/register`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(formData),
      }
    );

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
      error: "Registration failed",
    };
  }
};

export const userLogout = async () => {
  const session = await auth();
  const accessToken = session?.accessToken || null;
  if (!accessToken) {
    throw new Error("Unauthorized");
  }
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_ENDPOINT}/auth/logout`,
      {
        method: "POST",
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

export const getProfileInfo = async () => {
  const session = await auth();
  const accessToken = session?.accessToken || null;
  if (!accessToken) {
    throw new Error("Unauthorized");
  }
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_ENDPOINT}/auth/me`,
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
      data: data ?? null,
      error: data.error ?? null,
    };
  } catch (error) {
    return {
      success: false,
      data: null,
      error: "Failed to",
    };
  }
};

//
export const profileUpdate = async (formData: any) => {
  const session = await auth();
  const accessToken = session?.accessToken || null;
  if (!accessToken) {
    throw new Error("Unauthorized");
  }
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_ENDPOINT}/auth/me`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify(formData),
      }
    );

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

export const getTicketCat = async () => {

  const url = `${
    process.env.NEXT_PUBLIC_API_ENDPOINT
  }/ticket`;

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
      data: data?.rows ?? [],
      error: data?.error,
    };
  }
};
