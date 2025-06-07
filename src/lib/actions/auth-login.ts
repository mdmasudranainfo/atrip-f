"use server";

import { unstable_noStore as noStore } from "next/cache"
import { auth } from "~/auth";
import { revalidatePath } from "next/cache";
import { getErrorMessage } from "@/lib/handle-error"

export async function refreshSession() {
  await auth(); // Fetch updated session
  
  // Invalidate the cache for the desired path
  revalidatePath("/");
}


export async function loginByCredential(credential: {email: string, password: string}) {
  noStore();

  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  };

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/auth/login`, {
    method: 'POST',
    headers,
    body: JSON.stringify({email: credential.email, password: credential.password, device_name: "Web"}),
  })

  if (!res.ok || !res.body) {
    return {
      data: null,
      error: getErrorMessage("Failed to login"),
    }
  }

  const data = await res.json();

  return {
    data: data && data.user?.id ? {
      token: data.access_token,
      id: data.user.id,
      first_name: data.user.first_name,
      last_name: data.user.last_name,
      email: data.user.email,
      phone: data.user?.phone,
      countryCode: data.user?.country,
      avatar_url: data.user?.avatar_url,
      display_name: data.user?.display_name,
      need_update_pw: data.user?.need_update_pw,
      role: data.user?.role,
      accessToken: data.access_token,
    } : null,
    error: null,
  }
}



export async function loginByOauthCredential(credential: {
  provider: string,
  access_token: string,
  name: string,
  email: string,
}) {
  noStore();

  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  };

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/auth/oauth-login`, {
    method: 'POST',
    headers,
    body: JSON.stringify(credential),
  })

  if (!res.ok || !res.body) {
    return {
      data: null,
      error: getErrorMessage("Failed to login"),
    }
  }

  const data = await res.json();

  return {
    data: data,
    error: null,
  }
}

