"use client"

import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Loader2, User, UserRoundCog } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { formatPrice } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { getErrorMessage } from "@/lib/handle-error";
import { bookingUpdateCart } from "@/lib/actions/booking-actions";
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
import VisaPriceSummery from "@/components/visa/checkout/price-summery";


export interface UmrahPackage {
    name: string
    description: string
    max: number
    price: number
    type: string
    desc?: string
}
import { TransparentNavbar } from "@/components/header/transparentNav/TransparentNav";
import { EnquiryDialog } from "@/components/booking/enquiry-dialog";


const FormSchema = z.object({
  firstName: z.string().min(2, { message: "First name must be at least 2 characters." }),
  lastName: z.string().min(2, { message: "Last name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  phoneNumber: z.string().min(8, { message: "Please enter a valid phone number." }),
});

type FormSchema = z.infer<typeof FormSchema>;

export default function UmrahGuestInfo({bookingData}: {bookingData: any}) {

      const [selectedPackage, setSelectedPackage] = useState<any[]>([]);
      const router = useRouter();
      const [isLoading, setIsLoading] = useState(false);

      const form = useForm<z.infer<typeof FormSchema>>({
          resolver: zodResolver(FormSchema),
          defaultValues: {
              firstName: "",
              email: "",
              phoneNumber: "",
              lastName: "",
          },
        });
  
  
      const packages = bookingData?.booking?.booking_data?.person_types || []
  
      const updateQuantity = (item: UmrahPackage, _val: number) => {
          const _data = {
            name: item.name,
            des: item.desc,
            min: 0,
            max: _val,
            price: item.price,
            display_price: item.price.toString(),
            number: _val,
          }
          const _tmp = [...selectedPackage];
          const _index = selectedPackage.findIndex((_it) => _it.name == item.name)
          if(_index !== -1) {
            if(_val) {
              _tmp[_index] = _data;
            } else {
              _tmp.splice(_index, 1);
            }
          } else if(_val) {
            _tmp.push(_data);
          }
          setSelectedPackage(_tmp)
      }
  
  
  
      const totalPrice = packages?.length ? selectedPackage?.reduce((acc, item) => acc + (item.number * item.price), 0) : bookingData.booking.total
  
      const isValid = packages?.length ? !!selectedPackage.length : true

  
      async function onSubmit(formData: z.infer<typeof FormSchema>) {
        try {
            setIsLoading(true);
            const payload = {
                service_id: bookingData?.booking?.object_id,
                service_type: bookingData?.booking?.object_model,
                person_types: selectedPackage,
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

            {!!packages?.length && <Card className="p-4 space-y-4">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2 ">
                    <User className="h-5 w-5 text-blue-600 " />
                    <h2 className="text-xl">Guests Information</h2>
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    {/* Table Header */}
                    <div className="grid grid-cols-[auto,auto,auto] gap-4 mb-4 text-sm text-gray-500">
                    <div>TITLE</div>
                    <div className="text-center px-8">QUANTITY</div>
                    <div className="text-right">PRICE</div>
                    </div>

                    {/* Package Items */}
                    <div className="space-y-6">
                    {packages?.map((pkg : UmrahPackage, i: number) => {

                        const oldItem = selectedPackage?.find((_it) => _it.name == pkg.name)
                        const val = oldItem?.number || 0
                        
                    return (
                        <div
                        key={i}
                        className="grid grid-cols-[auto,auto,auto] gap-4 items-center py-10 border-t"
                        >
                        <div>
                            <h3 className="font-semibold">{pkg.name}</h3>
                            <p className="text-sm text-gray-500">{pkg?.description || pkg?.desc}</p>
                        </div>

                        <div className="flex items-center justify-between  h-10 rounded-md bg-gray-100">
                            <Button
                            variant="ghost"
                            size="icon"
                            disabled={val <= 0}
                            className="h-full px-3 hover:bg-transparent"
                            onClick={() => updateQuantity(pkg, val - 1)}
                            >
                            <span className="text-xl font-medium">−</span>
                            </Button>
                            <Input
                            type="number"
                            value={val}
                            onChange={(e) => {
                                const value = Number.parseInt(e.target.value);
                                if (!isNaN(value)) {
                                    updateQuantity(pkg, value)
                                }
                            }}
                            className="w-35 h-full border-0 bg-transparent text-center focus-visible:ring-0 focus-visible:ring-offset-0"
                            />
                            <Button
                            variant="ghost"
                            size="icon"
                            disabled={val >= pkg.max}
                            className="h-full px-3 hover:bg-transparent"
                            onClick={() => updateQuantity(pkg, val + 1)}
                            >
                            <span className="text-xl font-medium">+</span>
                            </Button>
                        </div>

                            <div className="text-right font-medium">
                                {formatPrice(Number(pkg.price || 0))}
                            </div>
                        </div>
                    )})}
                    </div>
                </CardContent>
            </Card>
            }



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
              <Button className="bg-primary text-white py-7 px-5 rounded-lg mb-4 font-bold" disabled={!isValid || isLoading} onClick={form.handleSubmit(onSubmit)}>
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
            packages={packages} 
            selectedPackage={selectedPackage} 
            totalPrice={totalPrice} 
            isValid={isValid} 
            onSubmit={form.handleSubmit(onSubmit)}
            serviceId={bookingData?.booking?.object_id}
            serviceType={bookingData?.booking?.object_model}
          />

        </div>
      </main>



    </div>
  );
}
