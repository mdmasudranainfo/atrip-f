"use client";

import { useEffect, useState } from "react";
import { Loader2, CreditCard, ChevronDown, ChevronLeft } from "lucide-react";
import { TransparentNavbar } from "@/components/header/transparentNav/TransparentNav";
import { Checkbox } from "@/components/ui/checkbox";
import VisaPriceSummery from "@/components/visa/checkout/price-summery";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { toast } from "sonner";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import "react-phone-number-input/style.css";
import {
  bookingUpdateStep,
  confirmBooking,
} from "@/lib/actions/booking-actions";
import { getErrorMessage } from "@/lib/handle-error";
import Link from "next/link";
import ActivityPriceSummery from "./activity-price-summery";
import dayjs from "dayjs";
import { Elements, useElements, useStripe } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

import CheckoutPage from "./StripeCheckout";
import convertToSubcurrency from "@/lib/convertToSubcurrency";
import MobileSummary from "./MobileSummary";

// Luhn validation for card numbers
function isValidCreditCard(number: string): boolean {
  const digits = number.replace(/\D/g, "");
  if (digits.length < 13 || digits.length > 19) return false;

  let sum = 0;
  let shouldDouble = false;

  for (let i = digits.length - 1; i >= 0; i--) {
    let digit = parseInt(digits.charAt(i));
    if (shouldDouble) {
      digit *= 2;
      if (digit > 9) digit -= 9;
    }
    sum += digit;
    shouldDouble = !shouldDouble;
  }

  return sum % 10 === 0;
}

const FormSchema = z.object({
  accepted: z
    .boolean({ message: "Please confirm terms and conditions" })
    .refine((val) => val, "Please confirm terms and conditions"),
  cardHolderName: z
    .string()
    .min(3, { message: "Name must be at least 3 characters" })
    .regex(/^[a-zA-Z\s]+$/, {
      message: "Name can only contain letters and spaces",
    }),
  cardNumber: z.string().refine((val) => isValidCreditCard(val), {
    message: "Invalid card number",
  }),
  expiryDate: z
    .string()
    .regex(/^(0[1-9]|1[0-2])\/\d{2}$/, {
      message: "Expiry must be in MM/YY format",
    })
    .refine(
      (val) => {
        const [month, year] = val.split("/");
        const expiry = new Date(2000 + parseInt(year), parseInt(month) - 1);
        return expiry > new Date();
      },
      { message: "Card has expired" }
    ),
  cvcNumber: z.string().regex(/^[0-9]{3,4}$/, {
    message: "CVC must be 3 or 4 digits",
  }),
});

type FormSchema = z.infer<typeof FormSchema>;

export default function ActivityCheckoutFinal({
  bookingData,
}: {
  bookingData: any;
}) {
  const [isLoading, setIsLoading] = useState(false);

  const packages = bookingData?.booking?.ticket_types || [];
  const selectedPackage: any[] = bookingData?.booking?.ticket_types || [];

  const totalPrice = packages?.length
    ? selectedPackage?.reduce((acc, item) => acc + item.number * item.price, 0)
    : bookingData.booking.total;

  //
  // back option

  const StepUpdate = async () => {
    const payloadData = {
      step: 0,
    };
    const { data, error } = await bookingUpdateStep(
      payloadData,
      bookingData.booking.code
    );

    if (error) {
      toast.error(`Error: ${getErrorMessage(error)}`);
    } else if (data?.status) {
      window.location.reload();
    } else {
      toast.error(`Unknown error occurred.`);
    }
  };

  useEffect(() => {
    // Push a dummy state to history stack so that we can detect back
    history.pushState(null, "", window.location.href);

    const handlePopState = (event: PopStateEvent) => {
      console.log("Back button pressed!");

      const confirmed = window.confirm("Are you sure you want to go back?");

      if (confirmed) {
        // ✅ Go back manually
        StepUpdate();
        // window.location.reload();
      } else {
        // ❌ Prevent back by pushing the current state again
        history.pushState(null, "", window.location.href);
      }
    };

    window.addEventListener("popstate", handlePopState);

    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, []);

  //

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      accepted: false,
      cardHolderName: "",
      cardNumber: "",
      expiryDate: "",
      cvcNumber: "",
    },
  });
  const payload = {
    code: bookingData.booking.code,
    coupon_code: "",
    credit: 0,
    term_conditions: "on",
    payment_gateway: "strip",
  };
  async function onSubmit(formData: z.infer<typeof FormSchema>) {
    try {
      const payload = {
        code: bookingData.booking.code,
        coupon_code: "",
        credit: 0,
        term_conditions: formData.accepted ? "on" : "off",
        payment_gateway: "offline_payment",
      };

      setIsLoading(true);
      const { data, error } = await confirmBooking(payload);
      if (error) {
        toast.error(`Error: ${getErrorMessage(error)}`);
      } else if (data) {
        window.location = data.url;
      } else {
        toast.error(`Unknown error occurred.`);
      }
    } catch (error) {
      toast.error(`Error: ${getErrorMessage(error)}`);
    } finally {
      setIsLoading(false);
    }
  }

  if (process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY === undefined) {
    throw new Error("NEXT_PUBLIC_STRIPE_PUBLIC_KEY is not defined");
  }
  const stripePromise = loadStripe(
    process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
  );

  const [activeSummary, setActiveSummary] = useState(false);

  return (
    <div className="bg-white">
      <TransparentNavbar isBgWhite={true} />
      <main className="container mx-auto px-4">
        <div className="grid lg:grid-cols-[70%,1fr] gap-4 md:p-5 px-0 py-6 grid-cols-1">
          <div className="space-y-4">
            <Button
              onClick={() => StepUpdate()}
              variant="primary"
              className="w-full flex md:hidden  items-center"
            >
              <ChevronLeft className="mt-[2px]" />
              <span>Back</span>
            </Button>
            <div className="border rounded-xl p-4 h-content overflow-hidden bg-cover bg-center bg-[url(/images/bradcomed-banner.png)]">
              <h1 className="md:text-2xl font-bold text-white">
                {bookingData?.service?.title}
              </h1>
              <h2 className="pt-1 md:text-md text-sm font-semibold text-white">
                {dayjs(bookingData?.booking?.start_date).format("D MMMM YYYY")}{" "}
                <span> ({bookingData?.booking?.time_slot})</span>
              </h2>
              <div className="md:hidden block text-white">
                <div
                  onClick={() => setActiveSummary(!activeSummary)}
                  className="flex cursor-pointer justify-between items-center text-lg"
                >
                  <p>Total Payable</p>
                  <p className="font-bold flex items-center">
                    <span> AED {totalPrice}</span>
                    <ChevronDown
                      className={`ml-2 transition-transform duration-300 ${
                        activeSummary ? "rotate-180" : ""
                      }`}
                    />
                  </p>
                </div>

                <div
                  className={`overflow-hidden transition-all duration-400 ease-linear ${
                    activeSummary ? "max-h-[1000px]" : "max-h-0"
                  }`}
                >
                  <div className="mt-4">
                    <MobileSummary
                      packages={packages}
                      selectedPackage={selectedPackage}
                      totalPrice={totalPrice}
                    />
                  </div>
                </div>
              </div>
            </div>
            {/* stripe  */}

            <Elements
              stripe={stripePromise}
              options={{
                mode: "payment",
                amount: convertToSubcurrency(totalPrice),
                currency: "aed",
              }}
            >
              <CheckoutPage payload={payload} amount={totalPrice} />
            </Elements>
          </div>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <ActivityPriceSummery
                bottomNavigation={false}
                text={
                  bookingData.booking.object_model == "transport"
                    ? "Par Hour"
                    : "Par Parson"
                }
                timeSlot={bookingData?.booking?.time_slot}
                title={bookingData?.service?.title}
                date={bookingData?.date} // ← Add this line
                isLoading={isLoading}
                packages={packages}
                selectedPackage={selectedPackage}
                totalPrice={totalPrice}
                isValid={true}
                onSubmit={form.handleSubmit(onSubmit)}
              />
            </form>
          </Form>
        </div>
      </main>
    </div>
  );
}
