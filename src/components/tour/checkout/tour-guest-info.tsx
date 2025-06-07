"use client"

import { Button } from "@/components/ui/button";
import { useState } from "react";
import { CalendarIcon, Loader2, MinusCircle, PlusCircle, UserRoundCog } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { getErrorMessage } from "@/lib/handle-error";
import { bookingUpdateCart } from "@/lib/actions/booking-actions";
import PhoneInput from 'react-phone-number-input';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useFieldArray } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import VisaPriceSummery from "@/components/visa/checkout/price-summery";
import { EnquiryDialog } from '@/components/booking/enquiry-dialog';


export interface UmrahPackage {
    name: string
    description: string
    max: number
    price: number
    type: string
    desc?: string
}
import { TransparentNavbar } from "@/components/header/transparentNav/TransparentNav";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";

const TravelerForm = z.object({
  firstName: z.string().min(2, { message: "First name must be at least 2 characters." }),
  lastName: z.string().min(2, { message: "Last name must be at least 2 characters." }),
  dateOfBirth: z.date(),
});

const formSchema = z.object({
  firstName: z.string().min(2, { message: "First name must be at least 2 characters." }),
  lastName: z.string().min(2, { message: "Last name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  phoneNumber: z.string().min(8, { message: "Please enter a valid phone number." }),
  travellers: z.array(TravelerForm).min(1),
});

type FormSchema = z.infer<typeof formSchema>;

export default function TourGuestInfo({bookingData}: {bookingData: any}) {

      const router = useRouter();
      const [isLoading, setIsLoading] = useState(false);

      const form = useForm<FormSchema>({
          resolver: zodResolver(formSchema),
          defaultValues: {
              firstName: "",
              email: "",
              phoneNumber: "",
              lastName: "",
              travellers: [
                {
                  firstName: "",
                  lastName: "",
                  dateOfBirth: new Date(),
                },
              ],
          },
        });

      // Setup field array for travelers
      const { fields, append, remove } = useFieldArray({
        control: form.control,
        name: "travellers",
      })

      const travellersData = form.watch("travellers")
      const totalPrice = bookingData.booking.total * travellersData.length;

  
      async function onSubmit(formData: FormSchema) {
        try {
            setIsLoading(true);
            const payload = {
                service_id: bookingData?.booking?.object_id,
                service_type: bookingData?.booking?.object_model,
                ...formData,
            }

            const { data, error } = await bookingUpdateCart(payload, bookingData?.booking?.code);

            if (data?.booking_code) {
              router.push(`/booking/${data?.booking_code}`);
            } else {
              toast.error(`Error: ${error}`);
            }
            
        } catch (err) {
            toast.error(getErrorMessage(err));
        } finally {
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
                Fill out the form and apply online{" "}
              </p>
            </div>


            <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <Card className="p-4 space-y-4">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2 ">
                    <UserRoundCog className="h-5 w-5 text-blue-600 " />
                    <h2 className="text-xl">Traveler{"'"}s Information</h2>
                    <div className="text-sm text-muted-foreground">Passport must have 6 month validity</div>
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">


                {fields.map((field, index) => (
                <div key={field.id} className="bg-muted/50 p-4 rounded-md space-y-4">
                  <div className="flex justify-between items-center">
                    <h4 className="font-medium">Adult {index + 1}</h4>
                    {index > 0 && (
                      <Button type="button" variant="ghost" size="sm" onClick={() => remove(index)}>
                        <MinusCircle className="h-4 w-4 mr-2" />
                        Remove
                      </Button>
                    )}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name={`travellers.${index}.firstName`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>First Name</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name={`travellers.${index}.lastName`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Last Name</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name={`travellers.${index}.dateOfBirth`}
                      render={({ field }) => (
                        <FormItem className="md:col-span-2">
                          <FormLabel>Date of Birth</FormLabel>
                          <FormControl>
                            <Popover>
                              <PopoverTrigger asChild>
                                <Button
                                  variant="outline"
                                  className={cn(
                                    "w-full justify-start text-left font-normal",
                                    !field.value && "text-muted-foreground",
                                  )}
                                >
                                  <CalendarIcon className="mr-2 h-4 w-4" />
                                  {field.value ? format(field.value, "PPP") : "Select date"}
                                </Button>
                              </PopoverTrigger>
                              <PopoverContent className="w-auto p-0" align="start">
                                <Calendar
                                  mode="single"
                                  selected={field.value}
                                  onSelect={field.onChange}
                                  disabled={(date) => date > new Date()}
                                  initialFocus
                                />
                              </PopoverContent>
                            </Popover>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
              ))}

              {fields.length < 2 && (
                <Button
                  type="button"
                  variant="outline"
                  className="w-full"
                  onClick={() =>
                    append({
                      firstName: "",
                      lastName: "",
                      dateOfBirth: new Date(),
                    })
                  }
                >
                  <PlusCircle className="h-4 w-4 mr-2" />
                  Add Another Adult
                </Button>
              )}


                </CardContent>
              </Card>

            <Card className="p-4 space-y-4">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2 ">
                    <UserRoundCog className="h-5 w-5 text-blue-600 " />
                    <h2 className="text-xl">Contact Information</h2>
                    </CardTitle>
                </CardHeader>
                <CardContent className="grid md:grid-cols-2 gap-3">

                <FormField
                  control={form.control}
                  name="firstName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-base">First Name of Applicant</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter your first name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="lastName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-base">Last Name of Applicant</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter your last name" {...field} />
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
                      <FormLabel className="text-base">Enter Mobile Number With WhatsApp Account</FormLabel>
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
                      <FormLabel className="text-base">Enter Valid Email</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter your email address" type="email" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                </CardContent>
            </Card>

          <div className="flex items-center gap-4">
              <EnquiryDialog
                className="py-7 px-5 rounded-lg mb-4 font-bold"
                serviceId={bookingData?.booking?.object_id}
                serviceType={bookingData?.booking?.object_model}
              />
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

          <VisaPriceSummery 
            isLoading={isLoading} 
            packages={[]} 
            selectedPackage={[]}
            totalPrice={totalPrice} 
            isValid={true} 
            onSubmit={form.handleSubmit(onSubmit)}
            serviceId={bookingData?.booking?.object_id}
            serviceType={bookingData?.booking?.object_model}
          />

        </div>
      </main>



    </div>
  );
}
