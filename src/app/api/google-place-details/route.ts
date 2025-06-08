// app/api/google-place-details/route.ts
import { NextResponse } from "next/server";
import axios from "axios";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const placeId = searchParams.get("place_id");

  if (!placeId) {
    return new NextResponse("Missing place_id", { status: 400 });
  }

  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
  const endpoint = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&key=${apiKey}`;

  try {
    const res = await axios.get(endpoint);
    return NextResponse.json(res.data);
  } catch (error) {
    console.error("Google Places Details error:", error);
    return new NextResponse("Failed to fetch place details", { status: 500 });
  }
}
