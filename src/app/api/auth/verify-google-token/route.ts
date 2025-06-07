import { NextResponse } from "next/server";
import { OAuth2Client } from "google-auth-library";

const client = new OAuth2Client(process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID);

export async function POST(req: Request) {
  try {
    const { credential } = await req.json();

    if (!credential) {
      return NextResponse.json(
        { message: "Missing credential" },
        { status: 400 }
      );
    }

    const ticket = await client.verifyIdToken({
      idToken: credential,
      audience: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();

    return NextResponse.json({
      verified: true,
      email: payload?.email,
      name: payload?.name,
      picture: payload?.picture,
    });
  } catch (err) {
    return NextResponse.json(
      { message: "Verification failed" },
      { status: 401 }
    );
  }
}
