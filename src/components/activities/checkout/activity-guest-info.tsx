"use client";

import { Button } from "@/components/ui/button";
import { useState } from "react";
import {
  ArrowDown,
  ChevronDown,
  Loader2,
  User,
  UserRoundCog,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { formatPrice } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { getErrorMessage } from "@/lib/handle-error";
import { bookingUpdateCart } from "@/lib/actions/booking-actions";
import PhoneInput from "react-phone-number-input";
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
  name: string;
  description: string;
  max: number;
  price: number;
  type: string;
  desc?: string;
}
import { TransparentNavbar } from "@/components/header/transparentNav/TransparentNav";
import { BookingTicketType } from "@/types/activity";
import ActivityPriceSummery from "@/components/activities/checkout/activity-price-summery";
import dayjs from "dayjs";
import MobileSummary from "./MobileSummary";

const FormSchema = z.object({
  firstName: z
    .string()
    .min(2, { message: "First name must be at least 2 characters." }),
  lastName: z
    .string()
    .min(2, { message: "Last name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  phoneNumber: z
    .string()
    .min(8, { message: "Please enter a valid phone number." }),
});

type FormSchema = z.infer<typeof FormSchema>;

export default function ActivityGuestInfo({
  bookingData,
}: {
  bookingData: any;
}) {
  const [selectedPackage, setSelectedPackage] = useState<any[]>(
    bookingData?.booking?.ticket_types || []
  );
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      firstName: bookingData?.booking?.first_name || "",
      lastName: bookingData?.booking?.last_name || "",
      phoneNumber: bookingData?.booking?.phone || "",
      email: bookingData?.booking?.email || "",
    },
  });

  const packages: BookingTicketType[] =
    bookingData?.booking?.booking_data?.ticket_types || [];

  // console.log("Booking Data Ac", bookingData?.booking?.ticket_types);
  const updateQuantity = (item: BookingTicketType, _val: number) => {
    const _data = {
      name: item.name,
      des: item?.des,
      min: 0,
      max: _val,
      price: item.price,
      display_price: item.price.toString(),
      number: _val,
    };
    const _tmp = [...selectedPackage];
    const _index = selectedPackage.findIndex((_it) => _it.name == item.name);
    if (_index !== -1) {
      if (_val) {
        _tmp[_index] = _data;
      } else {
        _tmp.splice(_index, 1);
      }
    } else if (_val) {
      _tmp.push(_data);
    }
    setSelectedPackage(_tmp);
  };

  const totalPrice = packages?.length
    ? selectedPackage?.reduce((acc, item) => acc + item.number * item.price, 0)
    : bookingData.booking.total;

  const isValid = packages?.length ? !!selectedPackage.length : true;

  async function onSubmit(formData: z.infer<typeof FormSchema>) {
    try {
      setIsLoading(true);
      const payload = {
        service_id: bookingData?.booking?.object_id,
        service_type: bookingData?.booking?.object_model,
        ticket_types: selectedPackage,
        ...formData,
      };

      const { data, error } = await bookingUpdateCart(
        payload,
        bookingData?.booking?.code
      );

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

  const [activeSummary, setActiveSummary] = useState(false);

  return (
    <div className="bg-white">
      <TransparentNavbar isBgWhite={true} />

      <main className="container mx-auto px-4">
        <div className="grid  lg:grid-cols-[70%,1fr] gap-4 md:p-5 px-0 py-6  grid-cols-1">
          <div className="space-y-4">
            <div className="border rounded-xl p-4 h-content overflow-hidden bg-cover bg-center  bg-[url(/images/bradcomed-banner.png)]">
              <h1 className="md:text-2xl font-bold  text-white">
                {bookingData?.service?.title}
              </h1>
              <h2 className="pt-1 md:text-md text-sm font-semibold  text-white">
                {dayjs(bookingData?.booking?.start_date).format("D MMMM YYYY")}{" "}
                {bookingData?.booking?.time_slot ? (
                  <span>({bookingData?.booking?.time_slot})</span>
                ) : (
                  ""
                )}
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

            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4"
              >
                {!!packages?.length && (
                  <Card className="md:p-4 p-2 py-4 space-y-6">
                    <CardHeader className="pb-0">
                      <CardTitle className="flex items-center gap-2 md:text-xl">
                        <User className="h-5 w-5 text-blue-600" />
                        Guests
                      </CardTitle>
                    </CardHeader>

                    <CardContent>
                      {/* Table Header */}
                      <div className="hidden md:grid grid-cols-3 gap-4 text-sm text-gray-500 mb-2">
                        <div>TITLE</div>
                        <div className="text-right mr-8">QUANTITY</div>
                        <div className="text-right">PRICE</div>
                      </div>

                      {/* Package Items */}
                      <div className="space-y-6">
                        {packages.map((pkg: BookingTicketType, i: number) => {
                          const oldItem = selectedPackage?.find(
                            (_it) => _it.name === pkg.name
                          );
                          const val = oldItem?.number || 0;

                          return (
                            <div
                              key={i}
                              className="grid grid-cols-3 gap-4 items-center border-t md:pt-6 pt-4"
                            >
                              {/* Title & Description */}
                              <div className="text-center md:text-left">
                                <h3 className="font-semibold md:text-base text-[12px]">
                                  {pkg.name}
                                </h3>
                                <p className="text-sm text-gray-500">
                                  {pkg.des}
                                </p>
                              </div>

                              {/* Quantity Selector */}
                              <div className="flex items-center justify-end md:space-x-4 ">
                                <Button
                                  variant="outline"
                                  size="icon"
                                  type="button"
                                  disabled={val <= 0}
                                  className="md:h-8 h-6 md:w-8 w-6 rounded-full bg-[#d1d8ec] hover:bg-primary hover:text-white ease-in-out duration-300 md:border border-none"
                                  onClick={() => updateQuantity(pkg, val - 1)}
                                >
                                  <span className="text-xl font-medium">−</span>
                                </Button>

                                <Input
                                  type="number"
                                  value={val}
                                  onChange={(e) => {
                                    const value = parseInt(e.target.value);
                                    if (!isNaN(value))
                                      updateQuantity(pkg, value);
                                  }}
                                  className=" w-12  h-8 border-0 bg-transparent text-end focus-visible:ring-0 focus-visible:ring-offset-0"
                                />

                                <Button
                                  variant="outline"
                                  size="icon"
                                  type="button"
                                  disabled={val >= pkg.max}
                                  className=" md:h-8 h-6 md:w-8 w-6 rounded-full bg-[#d1d8ec] hover:bg-primary hover:text-white ease-in-out duration-300 md:border border-none"
                                  onClick={() => updateQuantity(pkg, val + 1)}
                                >
                                  <span className="md:text-xl font-medium">
                                    +
                                  </span>
                                </Button>
                              </div>

                              {/* Price */}
                              <div className="md:text-right text-center md:text-lg text-[12px] font-semibold text-gray-800 w-full md:w-auto">
                                {formatPrice(Number(pkg.price || 0))}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </CardContent>
                  </Card>
                )}

                <Card className="p-4 md:p-8 space-y-6 shadow-md rounded-2xl border">
                  <CardHeader className="pb-0">
                    <CardTitle className="flex items-center gap-2 text-xl md:text-2xl font-semibold text-gray-800">
                      <UserRoundCog className="h-5 w-5 text-blue-600" />
                      Contact Information
                    </CardTitle>
                  </CardHeader>

                  <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    {/* First Name */}
                    <FormField
                      control={form.control}
                      name="firstName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-sm md:text-base font-medium text-gray-700">
                            First Name
                          </FormLabel>
                          <FormControl>
                            <Input
                              className="w-full h-11 px-4 text-sm border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:outline-none"
                              placeholder="Enter your first name"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* Last Name */}
                    <FormField
                      control={form.control}
                      name="lastName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-sm md:text-base font-medium text-gray-700">
                            Last Name
                          </FormLabel>
                          <FormControl>
                            <Input
                              className="w-full h-11 px-4 text-sm border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:outline-none"
                              placeholder="Enter your last name"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* Phone Number */}
                    <FormField
                      control={form.control}
                      name="phoneNumber"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-sm md:text-base font-medium text-gray-700">
                            Mobile Number
                          </FormLabel>
                          <FormControl>
                            <PhoneInput
                              international
                              defaultCountry="AE"
                              value={field.value}
                              onChange={field.onChange}
                              className="phone-input w-full"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* Email */}
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-sm md:text-base font-medium text-gray-700">
                            Email Address
                          </FormLabel>
                          <FormControl>
                            <Input
                              type="email"
                              className="w-full h-11 px-4 text-sm border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:outline-none"
                              placeholder="Enter your email address"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </CardContent>
                </Card>

                <div className="flex items-center gap-4">
                  <Button
                    className="bg-primary text-white py-7 px-5 rounded-lg mb-4 font-bold"
                    disabled={!isValid || isLoading}
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

          <ActivityPriceSummery
            bottomNavigation={true}
            text={"Par Parson"}
            timeSlot={bookingData?.booking?.time_slot}
            title={bookingData?.service?.title}
            date={bookingData?.booking?.start_date}
            isLoading={isLoading}
            packages={packages}
            selectedPackage={selectedPackage}
            totalPrice={totalPrice}
            isValid={isValid}
            onSubmit={form.handleSubmit(onSubmit)}
          />
        </div>
      </main>
    </div>
  );
}
