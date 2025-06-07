"use client"

import { TransparentNavbar } from "@/components/header/transparentNav/TransparentNav";
import BookingDetails from "@/components/hotels/checkout/rightSidebar/BookingDetails";
import HotelInfoCard from "@/components/hotels/checkout/rightSidebar/HotelInfoCard";
import PriceSummary from "@/components/hotels/checkout/rightSidebar/PriceSummary";
import Timeline from "@/components/hotels/checkout/timeLine";
import Link from "next/link";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useState } from "react";
import { toast } from "sonner";
import { getErrorMessage } from "@/lib/handle-error";
import { confirmBooking } from "@/lib/actions/booking-actions";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { CreditCard, Loader2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";



// Luhn algorithm for credit card validation
function isValidCreditCard(number: string): boolean {
  const digits = number.replace(/\D/g, "")
  if (digits.length < 13 || digits.length > 19) return false

  let sum = 0
  let shouldDouble = false

  // Loop through values starting from the rightmost digit
  for (let i = digits.length - 1; i >= 0; i--) {
    let digit = Number.parseInt(digits.charAt(i))

    if (shouldDouble) {
      digit *= 2
      if (digit > 9) digit -= 9
    }

    sum += digit
    shouldDouble = !shouldDouble
  }

  return sum % 10 === 0
}


const formSchema = z.object({
  accepted: z.boolean({ message: "Please confirms terms and conditions" })
  .default(false)
  .refine((val) => val, "Please confirms terms and conditions"),

  cardHolderName: z
  .string()
  .min(3, { message: "Name must be at least 3 characters" })
  .regex(/^[a-zA-Z\s]+$/, { message: "Name can only contain letters and spaces" }),

cardNumber: z
  .string()
  .min(1, { message: "Card number is required" })
  .refine((val) => isValidCreditCard(val), {
    message: "Invalid card number",
  }),

expiryDate: z
  .string()
  .regex(/^(0[1-9]|1[0-2])\/([0-9]{2})$/, {
    message: "Expiry date must be in MM/YY format",
  })
  .refine(
    (val) => {
      const [month, year] = val.split("/")
      const expiry = new Date(2000 + Number.parseInt(year), Number.parseInt(month) - 1)
      const today = new Date()
      return expiry > today
    },
    {
      message: "Card has expired",
    },
  ),

cvcNumber: z.string().regex(/^[0-9]{3,4}$/, {
  message: "CVC must be 3 or 4 digits",
}),

});
 
type FormSchema = z.infer<typeof formSchema>;


export default function  HotelCheckoutFinalCard({ bookingData, hasLoggin }: { bookingData: any, hasLoggin: boolean }) {

  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      accepted: false,
      cardHolderName: "",
      cardNumber: "",
      expiryDate: "",
      cvcNumber: "",
    },
  });


    // Format card number with spaces
    const formatCardNumber = (value: string) => {
      const digits = value.replace(/\D/g, "")
      const groups = []
  
      for (let i = 0; i < digits.length; i += 4) {
        groups.push(digits.slice(i, i + 4))
      }
  
      return groups.join(" ")
    }
  
    // Format expiry date with slash
    const formatExpiryDate = (value: string) => {
      const digits = value.replace(/\D/g, "")
  
      if (digits.length <= 2) {
        return digits
      }
  
      return `${digits.slice(0, 2)}/${digits.slice(2, 4)}`
    }


  async function onSubmit(formData: FormSchema) {
      try {
          const payload = {
              code: bookingData.booking.code,
              coupon_code: "",
              credit: 0,
              term_conditions: formData.accepted? "on" : "off",
              payment_gateway: "offline_payment",
              ...formData,
          }
  
          setIsLoading(true);
          const { data, error } = await confirmBooking(payload);
          if (error) {
          toast.error(`Error: ${getErrorMessage(error)}`);
          } else if (data) {
            toast.success("Booking confirmed! You will pay at the property");
          router.push(`/booking/${bookingData.booking.code}/success`);
          } else {
          toast.error(`Error: ${error}`);
          setIsLoading(false);
          }
      } catch (error) {
          toast.error(`Error: ${getErrorMessage(error)}`);
          setIsLoading(false);
      } finally {
          setIsLoading(false);
      }
  }




  return (
    <div className="bg-white">
      <TransparentNavbar isBgWhite={true} />
      <main className="container mx-auto px-4">
        <div className="my-2 sm:my-10">
          <Timeline currentStep={(bookingData?.booking?.step || 0) + 1} />
        </div>

        <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="grid  lg:grid-cols-[70%,1fr] gap-4 md:p-5 px-0 py-6  grid-cols-1">
          <div className="space-y-4">
            {!hasLoggin && (
              <div className="border rounded-xl p-4 h-20 flex items-center justify-between">
                <p>
                  <Link
                    href={"/sign-in"}
                    className="text-blue-600 hover:underline"
                  >
                    Sign in
                  </Link>{" "}
                  to book with your saved details or{" "}
                  <Link
                    href={"sign-up"}
                    className="text-blue-600 hover:underline"
                  >
                    register
                  </Link>{" "}
                  to manage your bookings on the go!
                </p>
              </div>
            )}


            <div>
                <div className="space-y-6">








<Card>
      <CardContent className="pt-6">
        <div className="flex items-center gap-2 mb-6">
          <CreditCard className="h-5 w-5 text-primary" />
          <h2 className="text-xl font-semibold">Pay with Credit or Debit card</h2>
        </div>
            <FormField
              control={form.control}
              name="cardHolderName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Card Holder Name</FormLabel>
                  <FormControl>
                    <Input placeholder="John Doe" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="cardNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Card Number</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="1234 5678 9012 3456"
                      maxLength={19}
                      {...field}
                      onChange={(e) => {
                        const formatted = formatCardNumber(e.target.value)
                        field.onChange(formatted)
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="expiryDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>MM/YY</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="MM/YY"
                        maxLength={5}
                        {...field}
                        onChange={(e) => {
                          const formatted = formatExpiryDate(e.target.value)
                          field.onChange(formatted)
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="cvcNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>CVC Number</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="123"
                        maxLength={4}
                        type="password"
                        {...field}
                        onChange={(e) => {
                          // Only allow digits
                          const value = e.target.value.replace(/\D/g, "")
                          field.onChange(value)
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
      </CardContent>
    </Card>


                    <FormField
                        control={form.control}
                        name="accepted"
                        render={({ field }) => (
                            <FormItem>

                            <div className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 shadow">
                                <FormControl>
                                    <Checkbox
                                    checked={field.value}
                                    onCheckedChange={field.onChange}
                                    />
                                </FormControl>
                                <div className="space-y-1 leading-none">
                                    <FormLabel>
                                    By proceeding, I acknowledge that I have read and agree to the <Link href={"/terms-and-condition"} target="_blank">Terms and Conditions</Link> and <Link href={"/acceptable-use-policy"} target="_blank">Privacy Policy</Link>
                                    </FormLabel>
                                </div>
                            </div>


                            <FormMessage />
                            </FormItem>
                        )}
                    />



                    <div className="space-x-2">
                        <Button type="submit" disabled={isLoading} className="text-white">
                        {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : "Confirm Booking"}
                        </Button> 
                    </div>
                </div>
            </div>    


          </div>

          {/* summary */}
          <div className="lg:px-4 px-0 space-y-4">
            <BookingDetails bookedData={bookingData?.booking} showChangeSelection={false} />
            <PriceSummary bookedData={bookingData?.booking} showBookingButton={true} isLoading={isLoading} onSubmit={form.handleSubmit(onSubmit)} />
          </div>
        </div>

        </form>
    </Form>


      </main>
    </div>
  )
}
