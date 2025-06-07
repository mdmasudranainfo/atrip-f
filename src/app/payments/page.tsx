"use client";

import { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "@/components/checkout-form/CheckoutForm";
import { confirmationdData } from "@/utils/dummyJson/hotel";
import { toast } from "sonner";
import { useSession } from "next-auth/react";
import { confirmBooking } from "@/lib/actions/booking-actions";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || ""
);

export default function PaymentForm({ params = "" }: { params?: any }) {
  const [isLoading, setIsLoading] = useState(false);
  const { data: session, status } = useSession();
  const [clientSecret, setClientSecret] = useState(
    "pi_3P1NV5Dkrb6iYi292r30kwsU_secret_pQdtCdMzsE6dVX4mkpUCTHPey"
  );

  // useEffect(() => {
  //   // Create PaymentIntent as soon as the page loads
  //   fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/create-payment-intent`, {
  //     method: "POST",
  //     headers: { "Content-Type": "application/json" },
  //     body: JSON.stringify({ items: [{ id: "xl-tshirt" }] }),
  //   })
  //     .then((res) => res.json())
  //     .then((data: any) => setClientSecret(data.clientSecret));
  // }, []);

  const appearance: any = {
    theme: "stripe",
  };
  const options = {
    clientSecret,
    appearance,
  };
  // /
  const [message, setMessage] = useState<string>("");

  const handleSubmit = async () => {
    if (params) {
      toast.error("Please provide a booking code");
    }
    try {
      setIsLoading(true);
      const { success, data, error } = await confirmBooking({
        code: params,
        ...confirmationdData,
      });
      if (success) {
        toast.success("Booking successful");
        setIsLoading(false);
      } else {
        setMessage(`Error: ${error}`);
        setIsLoading(false);
      }
    } catch (err) {
      setMessage(
        `Error: ${
          err instanceof Error ? err.message : "Unknown error occurred"
        }`
      );
      setIsLoading(false);
    }
  };
  return (
    <div className="App">
      {/* <Button
        disabled={isLoading || status !== "authenticated"}
        onClick={handleSubmit}
      >
        {isLoading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Processing...
          </>
        ) : (
          "Confirm"
        )}
      </Button> */}
      <p>{message}</p>
      {clientSecret && (
        <Elements options={options} stripe={stripePromise}>
          <CheckoutForm />
        </Elements>
      )}
    </div>
  );
}