"use client";
import { useState } from "react";
import {
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { Button } from "../ui/button";
import { useSession } from "next-auth/react";

export default function CheckoutForm() {
  const stripe = useStripe();
  const elements = useElements();
  const { data: session, status } = useSession();
  const [message, setMessage] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js hasn't yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    setIsLoading(true);

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        // Make sure to change this to your payment completion page
        return_url: "http://localhost:3010",
      },
    });

    // This point will only be reached if there is an immediate error when
    // confirming the payment. Otherwise, your customer will be redirected to
    // your `return_url`. For some payment methods like iDEAL, your customer will
    // be redirected to an intermediate site first to authorize the payment, then
    // redirected to the `return_url`.
    if (error.type === "card_error" || error.type === "validation_error") {
      setMessage(error.message);
    } else {
      setMessage("An unexpected error occurred.");
    }

    setIsLoading(false);
  };

  const paymentElementOptions: {
    layout: "tabs" | "accordion";
  } = {
    layout: "accordion",
  };

  return (
    <form id="payment-form" onSubmit={handleSubmit}>
      <div className=" mb-4 ">
        <PaymentElement id="payment-element" options={paymentElementOptions} />
      </div>
      <Button
        type="submit"
        disabled={
          isLoading || !stripe || !elements || status !== "authenticated"
        }
        id="submit"
        className="bg-primary text-white py-7 px-5 rounded-lg mb-4 font-bold"
      >
        <span id="button-text">
          {isLoading ? (
            <div className="spinner" id="spinner"></div>
          ) : (
            <div className="my-4">
              <p>Confirm Booking</p>
            </div>
          )}
        </span>
      </Button>
      {/* Show any error or success messages */}
      {message && (
        <div id="payment-message" className="text-[#de1b42]">
          {message}
        </div>
      )}
    </form>
  );
}
