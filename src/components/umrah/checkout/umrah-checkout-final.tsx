"use client";

import { useState } from "react";
import { Loader2 } from "lucide-react";
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
import 'react-phone-number-input/style.css';
import { confirmBooking } from "@/lib/actions/booking-actions";
import { getErrorMessage } from "@/lib/handle-error";
import Link from "next/link";
import { EnquiryDialog } from "@/components/booking/enquiry-dialog";

const formSchema = z.object({
    accepted: z.boolean({ message: "Please confirms terms and conditions" })
    .default(false)
    .refine((val) => val, "Please confirms terms and conditions"),
});
   
type FormSchema = z.infer<typeof formSchema>;

export default function UmrahCheckoutFinal({bookingData}: {bookingData: any}) {

  const [isLoading, setIsLoading] = useState(false);

  const packages = bookingData?.booking?.booking_data?.person_types || []
  const selectedPackage: any[] = bookingData?.booking?.package_price || []

  const totalPrice = packages?.length ? selectedPackage?.reduce((acc, item) => acc + (item.number * item.price), 0) : bookingData.booking.total

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
            payment_gateway: "stripe",
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

      <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>

        <div className="grid  lg:grid-cols-[70%,1fr] gap-4 md:p-5 px-0 py-6  grid-cols-1">
          <div className="space-y-4">
            <div className="border rounded-xl p-4 h-content ">
              <h1 className="text-2xl font-bold">{bookingData?.service?.title}</h1>
              <p className="text-sm pt-3 ">
                Fill out the form and apply online{" "}
              </p>
            </div>
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

        <VisaPriceSummery 
            isLoading={isLoading} 
            packages={packages} 
            selectedPackage={selectedPackage} 
            totalPrice={totalPrice} 
            isValid={true}
            onSubmit={form.handleSubmit(onSubmit)}
            finalStep={true}
        />

        </div>
        </form>
    </Form>


      </main>
    </div>
  );
}
