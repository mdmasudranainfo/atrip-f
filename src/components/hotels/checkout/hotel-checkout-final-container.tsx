"use client"

import { TransparentNavbar } from "@/components/header/transparentNav/TransparentNav";
import BookingDetails from "@/components/hotels/checkout/rightSidebar/BookingDetails";
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
import { Loader2 } from "lucide-react";


const formSchema = z.object({
  accepted: z.boolean({ message: "Please confirms terms and conditions" })
  .default(false)
  .refine((val) => val, "Please confirms terms and conditions"),
});
 
type FormSchema = z.infer<typeof formSchema>;


export default function  HotelCheckoutFinalContainer({ bookingData, hasLoggin }: { bookingData: any, hasLoggin: boolean }) {

  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      accepted: false,
    },
  });


  async function onSubmit(formData: FormSchema) {
      try {
          const payload = {
              code: bookingData.booking.code,
              coupon_code: "",
              credit: 0,
              term_conditions: formData.accepted? "on" : "off",
              payment_gateway: bookingData.booking?.gateway,
          }
  
          setIsLoading(true);
          const { data, error } = await confirmBooking(payload);
          if (error) {
          toast.error(`Error: ${getErrorMessage(error)}`);
          } else if (data) {
              window.location = data.url;
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
