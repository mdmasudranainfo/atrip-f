"use client";

import { useState } from "react";
import { Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { TransparentNavbar } from "@/components/header/transparentNav/TransparentNav";
import Dropzone from "@/components/ui/dropzone";
import VisaPriceSummery from "./price-summery";
import PhoneInput from 'react-phone-number-input';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { toast } from "sonner";
import { CountryDropdown } from "@/components/ui/country-dropdown";
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
import { useRouter } from "next/navigation"
import { bookingUpdateCart } from "@/lib/actions/booking-actions";
import { getErrorMessage } from "@/lib/handle-error";
import { EnquiryDialog } from "@/components/booking/enquiry-dialog";

const MAX_FILE_SIZE = 5 * 1024 * 1024 // 5MB
const ACCEPTED_FILE_TYPES = ["application/pdf", "image/jpeg", "image/png"]

const FormSchema = z.object({
    firstName: z.string().min(2, { message: "First name must be at least 2 characters." }),
    email: z.string().email({ message: "Please enter a valid email address." }),
    phoneNumber: z.string().min(8, { message: "Please enter a valid phone number." }),
    nationality: z.string().min(1, { message: "Please select your nationality." }),
    passportCopy: z
      .instanceof(File)
      .refine((file) => file.size <= MAX_FILE_SIZE, "File size must be less than 5MB.")
      .refine((file) => ACCEPTED_FILE_TYPES.includes(file.type), "Only PDF, JPEG and PNG files are accepted."),
    passportPhoto: z
      .instanceof(File)
      .refine((file) => file.size <= MAX_FILE_SIZE, "File size must be less than 5MB.")
      .refine((file) => ACCEPTED_FILE_TYPES.includes(file.type), "Only PDF, JPEG and PNG files are accepted."),
    bankStatements: z
      .instanceof(File)
      .refine((file) => file.size <= MAX_FILE_SIZE, "File size must be less than 5MB.")
      .refine((file) => ACCEPTED_FILE_TYPES.includes(file.type), "Only PDF, JPEG and PNG files are accepted.")
      .optional(),
});
   
type FormSchema = z.infer<typeof FormSchema>;

export default function VisaDocumentForm({bookingData}: {bookingData: any}) {
    const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);

  const packages = bookingData?.service?.extra_price || []
  const selectedPackage: any[] = bookingData?.booking?.package_price || []

  const totalPrice = packages?.length ? selectedPackage?.reduce((acc, item) => acc + (item.number * item.price), 0) : bookingData.booking.total
  
  const isValid = true;

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
        firstName: "",
        email: "",
        phoneNumber: "",
        nationality: "",
        bankStatements: undefined,
    },
  });
 
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

      <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>

        <div className="grid  lg:grid-cols-[70%,1fr] gap-4 md:p-5 px-0 py-6  grid-cols-1">
          <div className="space-y-4">
            <div className="border rounded-xl p-4 h-content ">
              <h1 className="text-2xl font-bold">Azerbaijan Visa</h1>
              <p className="text-sm pt-3 ">
                Fill out the form and apply online{" "}
              </p>
            </div>
            <div>

            <div className="space-y-6">
      {/* Name Input */}

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
            name="nationality"
            render={({ field }) => (
                <FormItem>
                <FormLabel>Select Nationality</FormLabel>
                <CountryDropdown
                    placeholder="Select your nationality"
                    defaultValue={field.value}
                    onChange={(country) => {
                    field.onChange(country.alpha3);
                    }}
                />
                <FormMessage />
                </FormItem>
            )}
        />

        <FormField
          control={form.control}
          name="passportCopy"
          render={({ field: { onChange } }) => (
            <FormItem>
              <FormLabel className="text-base">Passport Copy Of Passenger</FormLabel>
              <FormControl>
                <Dropzone 
                    maxFiles={1} 
                    mautiple={false} 
                    onChangeValue={(files) => onChange(files[0])}
                    accept={{
                        'image/jpeg': [],
                        'image/png': [],
                        'application/pdf': [],
                    }} 
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="passportPhoto"
          render={({ field: { onChange } }) => (
            <FormItem>
              <FormLabel className="text-base">Passport Size Photo Of Passenger</FormLabel>
              <FormControl>
                <Dropzone 
                    maxFiles={1} 
                    mautiple={false} 
                    onChangeValue={(files) => onChange(files[0])}
                    accept={{
                        'image/jpeg': [],
                        'image/png': [],
                        'application/pdf': [],
                    }} 
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="bankStatements"
          render={({ field: { onChange } }) => (
            <FormItem>
              <FormLabel className="text-base">Last 3 months Bank Statements (Optional)</FormLabel>
              <FormControl>
              <Dropzone 
                    maxFiles={1} 
                    mautiple={false} 
                    onChangeValue={(files) => onChange(files[0])}
                    accept={{
                        'image/jpeg': [],
                        'image/png': [],
                        'application/pdf': [],
                    }} 
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

    </div>




            </div>
          </div>



        <VisaPriceSummery 
            isLoading={isLoading} 
            packages={packages} 
            selectedPackage={selectedPackage} 
            totalPrice={totalPrice} 
            isValid={isValid} 
            onSubmit={form.handleSubmit(onSubmit)}
            serviceId={bookingData?.booking?.object_id}
            serviceType={bookingData?.booking?.object_model}
        />
            <div className="space-x-2">
                <EnquiryDialog
                  className="py-7 px-5 rounded-lg mb-4 font-bold"
                  serviceId={bookingData?.booking?.object_id}
                  serviceType={bookingData?.booking?.object_model}
                />
                <Button type="submit" disabled={isLoading} className="text-white">
                {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : "Book Now"}
                </Button> 
            </div>


        </div>
        </form>
    </Form>


      </main>
    </div>
  );
}
