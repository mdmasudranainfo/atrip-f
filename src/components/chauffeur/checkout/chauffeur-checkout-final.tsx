"use client";

import { Button } from "@/components/ui/button";
import { useState } from "react";
import { CalendarIcon, Loader2, UserRoundCog } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { getErrorMessage } from "@/lib/handle-error";
import {
  bookingUpdateCart,
  confirmBooking,
} from "@/lib/actions/booking-actions";
import PhoneInput from "react-phone-number-input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useSearchParams } from "next/navigation";

export interface UmrahPackage {
  name: string;
  description: string;
  max: number;
  price: number;
  type: string;
  desc?: string;
}
import { TransparentNavbar } from "@/components/header/transparentNav/TransparentNav";
import CarPriceSummery from "@/components/cars/checkout/car-price-summery";
import { Checkbox } from "@/components/ui/checkbox";
import Link from "next/link";
import { generateTimeSlots, parseUrlStrDate } from "@/lib/utils";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import SearchLocation from "@/components/filter/search-location";
import { Location } from "@/lib/actions/location-action";
import dayjs from "dayjs";

const FormSchema = z.object({
  travelerName: z
    .string()
    .min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  phoneNumber: z
    .string()
    .min(8, { message: "Please enter a valid phone number." }),
  accepted: z
    .boolean({ message: "Please confirms terms and conditions" })
    .default(false)
    .refine((val) => val, "Please confirms terms and conditions"),
  pickupLocation: z.number({ message: "Select pickup location" }),
  dropLocation: z.number({ message: "Select drop location" }).optional(),
  start_date: z.date({ message: "Pickup date required" }),
  start_time: z.string().min(3, "Pickup time required"),
});

type FormSchema = z.infer<typeof FormSchema>;

export default function ChauffeurCheckoutFinal({
  bookingData,
  selectedLocations,
}: {
  bookingData: any;
  selectedLocations: Location[];
}) {
  const searchParams = useSearchParams();

  const [isLoading, setIsLoading] = useState(false);
  const timeSlots = generateTimeSlots("00:00", "23:30");
  const _sDate = bookingData?.booking?.start_date || undefined;
  const location_id = searchParams.get("location_id");

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      travelerName: "",
      email: "",
      phoneNumber: "",
      start_date: (_sDate ? dayjs(_sDate).toDate() : undefined) || undefined,
      start_time: undefined,

      pickupLocation: location_id ? Number(location_id) : undefined,
      dropLocation: location_id ? Number(location_id) : undefined,
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
      };
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
        start_date: formData.start_date
          ? format(formData.start_date, "yyyy-MM-dd")
          : null,
      };

      const { data, error } = await bookingUpdateCart(
        payload,
        bookingData?.booking?.code
      );
      if (data?.booking_code) {
        await onFinalSubmit();
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
              <h1 className="text-2xl font-bold">
                {bookingData?.service?.title}
              </h1>
              <p className="text-sm pt-3 ">
                Secure comprehensive health and dental coverage
              </p>
            </div>

            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4"
              >
                <Card className="p-4 space-y-4">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 ">
                      <UserRoundCog className="h-5 w-5 text-blue-600 " />
                      <h2 className="text-xl">Traveler{"'"}s Information</h2>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="grid gap-3">
                    <div className="space-y-3">
                      <FormField
                        control={form.control}
                        name="pickupLocation"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-base">
                              Pick-Up Location
                            </FormLabel>
                            <FormControl>
                              <SearchLocation
                                error={undefined}
                                locationId={field.value}
                                placeholder="Select location"
                                initialLocations={selectedLocations || []}
                                inputSize={2}
                                onChangeValue={field.onChange}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="dropLocation"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-base">
                              Drop Off Location
                            </FormLabel>
                            <FormDescription className="text-xs mt-0">
                              Optional, Required for one way transfer only
                            </FormDescription>
                            <FormControl>
                              <SearchLocation
                                error={undefined}
                                locationId={field.value}
                                placeholder="Select location"
                                initialLocations={selectedLocations || []}
                                onChangeValue={field.onChange}
                                inputSize={2}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <div className="grid gap-3 md:grid-cols-2">
                      <FormField
                        control={form.control}
                        name="start_date"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-base">
                              Pickup Date
                            </FormLabel>
                            <FormControl>
                              <Popover>
                                <PopoverTrigger asChild>
                                  <Button
                                    variant="outline"
                                    className="w-full justify-start text-left font-normal"
                                  >
                                    <CalendarIcon className="mr-2 h-4 w-4" />
                                    {field.value ? (
                                      format(field.value, "yyyy-MM-dd")
                                    ) : (
                                      <span>Select date</span>
                                    )}
                                  </Button>
                                </PopoverTrigger>
                                <PopoverContent
                                  className="w-auto p-0"
                                  align="start"
                                >
                                  <Calendar
                                    mode="single"
                                    selected={field.value}
                                    onSelect={(val) => {
                                      if (val) {
                                        form.setValue("start_date", val, {
                                          shouldValidate: true,
                                        });
                                      }
                                    }}
                                    initialFocus
                                  />
                                </PopoverContent>
                              </Popover>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="start_time"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-base">
                              Pickup Time
                            </FormLabel>
                            <Select
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                            >
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Time Slot" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {timeSlots.map((time) => (
                                  <SelectItem value={time} key={time}>
                                    {time}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="travelerName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-base">Name</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Enter your first name"
                                {...field}
                              />
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
                            <FormLabel className="text-base">
                              Mobile Number
                            </FormLabel>
                            <FormControl>
                              <PhoneInput
                                value={field.value}
                                onChange={field.onChange}
                                international
                                defaultCountry="AE"
                                className="flex-1 border-[#ddd] border login-country rounded-md px-3 py-0 text-base"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-base">Email</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Enter your email address"
                              type="email"
                              {...field}
                            />
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
                            By proceeding, I acknowledge that I have read and
                            agree to the{" "}
                            <Link href={"/terms-and-condition"} target="_blank">
                              Terms and Conditions
                            </Link>{" "}
                            and{" "}
                            <Link
                              href={"/acceptable-use-policy"}
                              target="_blank"
                            >
                              Privacy Policy
                            </Link>
                          </FormLabel>
                        </div>
                      </div>

                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="flex items-center gap-4">
                  <Button
                    className="bg-primary text-white py-7 px-5 rounded-lg mb-4 font-bold"
                    disabled={isLoading}
                    onClick={form.handleSubmit(onSubmit)}
                  >
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
