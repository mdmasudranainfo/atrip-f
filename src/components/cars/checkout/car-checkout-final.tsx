"use client"

import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Loader2, UserRoundCog } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { getErrorMessage } from "@/lib/handle-error";
import { bookingUpdateCart, confirmBooking } from "@/lib/actions/booking-actions";
import PhoneInput from 'react-phone-number-input';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";


export interface UmrahPackage {
    name: string
    description: string
    max: number
    price: number
    type: string
    desc?: string
}
import { TransparentNavbar } from "@/components/header/transparentNav/TransparentNav";
import CarPriceSummery from "@/components/cars/checkout/car-price-summery";
import { Checkbox } from "@/components/ui/checkbox";
import Link from "next/link";


const FormSchema = z.object({
  travelerName: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  phoneNumber: z.string().min(8, { message: "Please enter a valid phone number." }),
  accepted: z.boolean({ message: "Please confirms terms and conditions" })
  .default(false)
  .refine((val) => val, "Please confirms terms and conditions"),
});

type FormSchema = z.infer<typeof FormSchema>;

export default function CarCheckoutFinal({bookingData}: {bookingData: any}) {
      const [isLoading, setIsLoading] = useState(false);

      const form = useForm<z.infer<typeof FormSchema>>({
          resolver: zodResolver(FormSchema),
          defaultValues: {
              travelerName: "",
              email: "",
              phoneNumber: "",
          },
        });

      async function onFinalSubmit() {
          try {
              const payload = {
                  code: bookingData.booking.code,
                  coupon_code: "",
                  credit: 0,
                  term_conditions: "on",
                  payment_gateway: "stripe",
              }
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
  
      async function onSubmit(formData: z.infer<typeof FormSchema>) {
        try {
            setIsLoading(true);
            const payload = {
                service_id: bookingData?.booking?.object_id,
                service_type: bookingData?.booking?.object_model,
                ...formData,
            }

            const { data, error } = await bookingUpdateCart(payload, bookingData?.booking?.code);

            if (data?.booking_code) {
              await onFinalSubmit()
            } else {
              setIsLoading(false);
              toast.error(`Error: ${error}`);
            }
            
        } catch (err) {
          toast.error(getErrorMessage(err));
          setIsLoading(false);
        }
    }



  return (
    <div className="bg-white">
      <TransparentNavbar isBgWhite={true} />



<main className="container mx-auto px-4">
        <div className="grid  lg:grid-cols-[70%,1fr] gap-4 md:p-5 px-0 py-6  grid-cols-1">
            <div className="space-y-4">
            <div className="border rounded-xl p-4 h-content ">
              <h1 className="text-2xl font-bold">{bookingData?.service?.title}</h1>
              <p className="text-sm pt-3 ">
              Secure comprehensive health and dental coverage
              </p>
            </div>


            <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <Card className="p-4 space-y-4">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2 ">
                    <UserRoundCog className="h-5 w-5 text-blue-600 " />
                    <h2 className="text-xl">Traveler{"'"}s Information</h2>
                    </CardTitle>
                </CardHeader>
                <CardContent className="grid md:grid-cols-2 gap-3">

                <FormField
                  control={form.control}
                  name="travelerName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-base">Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter your first name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />


                <FormField
                  control={form.control}
                  name="phoneNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-base">Mobile Number</FormLabel>
                      <FormControl>
                        <PhoneInput value={field.value} onChange={field.onChange} international defaultCountry="AE" className="flex-1 border-[#ddd] border login-country rounded-md px-3 py-0 text-base" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-base">Email</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter your email address" type="email" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

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

          <div className="flex items-center gap-4">
              <Button className="bg-primary text-white py-7 px-5 rounded-lg mb-4 font-bold" disabled={isLoading} onClick={form.handleSubmit(onSubmit)}>
              {isLoading ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  ) : (
                  "Next Page"
              )}
              </Button>
          </div>

          </form>
          </Form>

          </div>




          <CarPriceSummery 
            isLoading={isLoading} 
            bookingData={bookingData}
            onSubmit={form.handleSubmit(onSubmit)}
          />
        </div>
      </main>



    </div>
  );
}
