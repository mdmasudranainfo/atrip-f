import { NextResponse } from "next/server";
import { confirmBooking } from "@/lib/actions/booking-actions";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get("code");
  const paymentIntentId = searchParams.get("payment_intent");

  if (!code) {
    return new NextResponse("Missing booking code", { status: 400 });
  }

  const payload = {
    code,
    coupon_code: "",
    credit: 0,
    term_conditions: "on",
    payment_gateway: "stripe",
    payment_intent_id: paymentIntentId,
  };

  try {
    const { data, error } = await confirmBooking(payload);

    if (error) {
      console.error("Booking Error:", error);
      return new NextResponse("Booking failed", { status: 500 });
    }

    if (data?.url) {
      return NextResponse.redirect(data.url); // ✅ Proper redirect
    }

    return new NextResponse("No redirect URL from booking", { status: 500 });
  } catch (err) {
    console.error("Unexpected Error:", err);
    return new NextResponse("Something went wrong", { status: 500 });
  }
}
