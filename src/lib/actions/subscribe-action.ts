"use server"

import { auth } from '~/auth'
export async function subscribeEmail(email: string) {
  try {

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_ENDPOINT}/subscribe-email`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
            email: email,
        }),
      }
    )

    const data = await response.json()
    if (response.ok) {
      return {
        data: data.message,
        error: null,
      }
    }

    return {
        data: null,
        error: data.message,
    }

  } catch (error) {
    return {
        data: null,
        error: "Something went wrong",
    }
  }
}


export const reviewStore = async (updatedReviewData: any) => {
  const session = await auth();
  const accessToken = session?.accessToken || null;

  if (!accessToken) {
      return { success: false, data: null, error: "Unauthorized" };
  }

  try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/review/store`, {
          method: "POST",
          headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
              Authorization: `Bearer ${accessToken}`,
          },
          body: JSON.stringify(updatedReviewData),
      });
      const data = await response.json();
      return {
          success: response.ok,
          data: data || null,
          error: !response.ok ? data.error || "Request failed" : null,
      };
  } catch (error) {
      return {
          success: false,
          data: null,
          error: "Something went wrong",
      };
  }
};