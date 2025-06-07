"use client";

import { useEffect } from "react";
import googleOneTap from "google-one-tap";
import { signIn, useSession } from "next-auth/react";

export default function GoogleOneTap() {
  const { data: session, status } = useSession();
  useEffect(() => {
    if (status === "loading" || session?.user) return;
    googleOneTap({
      client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!,
      auto_select: true,
      cancel_on_tap_outside: false,
      context: "signin",
      callback: async () => {
        // Redirect to NextAuth Google login
        signIn("google"); // redirect flow
      },
    });
  }, []);

  return null;
}
