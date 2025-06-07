"use server";

import { unstable_noStore as noStore } from "next/cache";
import { auth } from "~/auth";
import { revalidatePath } from "next/cache";
import { getErrorMessage } from "@/lib/handle-error";

export async function refreshSession() {
  const session = await auth(); // Fetch updated session
  console.log("Session refreshed:", session);

  // Invalidate the cache for the desired path
  revalidatePath("/");
}

export interface PasswordChangeProps {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

// Password change
export async function passwordChange(payload: PasswordChangeProps) {
  noStore();

  const session = await auth();
  const accessToken = session?.accessToken || null;
  if (!accessToken) {
    return {
      data: null,
      error: "Unauthorized",
    };
  }

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    Accept: "application/json",
    Authorization: `Bearer ${accessToken}`,
  };
  //  console.log(JSON.stringify({current_password: payload.currentPassword, new_password: payload.newPassword}))
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_ENDPOINT}/auth/change-password`,
    {
      method: "POST",
      headers,
      body: JSON.stringify({
        current_password: payload.currentPassword,
        new_password: payload.newPassword,
      }),
    }
  );

  if (!res.ok || !res.body) {
    return {
      data: null,
      error: getErrorMessage("Failed to login"),
    };
  }

  const data = await res.json();

  console.log(data);

  if (data.status == 1) {
    return {
      data: data,
      error: null,
    };
  }

  return {
    data: null,
    error: data.message,
  };
}
