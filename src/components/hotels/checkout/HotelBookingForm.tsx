"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { bookingUpdateCart } from "@/lib/actions/booking-actions";
import { getErrorMessage } from "@/lib/handle-error";
import { BookedData } from "@/types/hotel-types";
import {
  Bed,
  CigaretteIcon,
  Loader2,
} from "lucide-react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import { toast } from "sonner";

type PaymentGateway = {
  name: string;
  is_offline: boolean;
};

interface BookingData {
  code: string;
  user: {
    email: string | null;
    address: string | null;
    address2: string | null;
    city: string | null;
    country: string | null;
    phone: string | null;
    zip_code: string | null;
    state: string | null;
    first_name: string | null;
    last_name: string | null;
  };
  booking: BookedData;
  gateways: Record<string, PaymentGateway>
}
// Form data type
type BookingFormData = {
  address_line_1?: string | null;
  address_line_2?: string | null;
  city?: string | null;
  state?: string | null;
  zip_code?: string | null;
  first_name?: string;
  last_name?: string;
  country: string | null;
  phone: string;
  email: string;
  smokingPreference: string;
  bedPreference: string;
  payment_gateway: string;
  airportTransfer: string;
  floorPreference: string;
  customer_notes: string;
  smoke: boolean;
  bed_preference: number;
};

export default function HotelBookingForm({
  bookingData,
}: {
  bookingData: BookingData;
}) {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { data: session } = useSession();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    control,
  } = useForm<BookingFormData>({
    defaultValues: {
      phone: bookingData.user.phone || undefined,
      address_line_1: bookingData.user.address,
      address_line_2: bookingData.user.address2,
      city: bookingData.user.city,
      state: bookingData.user.state,
      zip_code: bookingData.user.zip_code,
      country: bookingData.user.country,
      first_name: bookingData.user?.first_name || undefined,
      last_name: bookingData.user?.last_name || undefined,
      email: bookingData.user?.email || undefined,
      payment_gateway: "offline_payment",
      customer_notes: "",
      smokingPreference: "non-smoking",
      bedPreference: "large-bed",
    },
  });

  async function onSubmit(formData: BookingFormData) {
    try {
        setIsLoading(true);
        const additional_preferences: Record<string, string> = {
          floorPreference: formData.floorPreference,
          smokingPreference: formData.smokingPreference,
          bedPreference: formData.bedPreference,
          airportTransfer: formData.airportTransfer,
        };
    
        const payload = {
          service_id: bookingData?.booking?.object_id,
          service_type: bookingData?.booking?.object_model,
          ...formData,
          additional_preferences,
        };

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
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full mx-auto space-y-6"
    >
      <Card className="border-[#DADFE6] shadow-none rounded-lg">
        <CardContent className="pt-6">
          <div className="space-y-6">
            <h2 className="text-xl font-semibold">Enter your details</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="first_name" className="text-[#1a1a1a] text-sm font-medium capitalize">First Name</Label>
                <Input
                  id="first_name"
                  className="shadow-none border-[#DADFE6]"
                  defaultValue={session?.user?.first_name}
                  {...register("first_name", {
                    required: session?.user?.first_name
                      ? false
                      : "First name is required",
                  })}
                  placeholder="Enter first name"
                />
                {errors.first_name && (
                  <p className="text-sm text-red-500">
                    {errors.first_name.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="last_name" className="text-[#1a1a1a] text-sm font-medium capitalize">Last Name</Label>
                <Input
                  id="last_name"
                  className="shadow-none border-[#DADFE6]"
                  defaultValue={session?.user?.last_name}
                  {...register("last_name", {
                    required: session?.user?.last_name
                      ? false
                      : "Last name is required",
                  })}
                  placeholder="Enter last name"
                />
                {errors.last_name && (
                  <p className="text-sm text-red-500">
                    {errors.last_name.message}
                  </p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="phone" className="text-[#1a1a1a] text-sm font-medium capitalize">Mobile Number</Label>
                <Controller
                  name="phone"
                  control={control}
                  rules={{ required: "Phone number is required" }}
                  render={({ field: { onChange, value } }) => (
                    <PhoneInput
                      id="phone"
                      international
                      defaultCountry="AE"
                      value={value}
                      onChange={onChange}
                      className="flex-1 border-[#ddd] border login-country rounded-md px-3 py-0 text-base"
                      placeholder="Enter phone number"
                    />
                  )}
                />
                {errors.phone && (
                  <p className="text-sm text-red-500">{errors.phone.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="text-[#1a1a1a] text-sm font-medium capitalize">Email Address</Label>
                <Input
                  id="email"
                  className="shadow-none border-[#DADFE6]"
                  type="email"
                  defaultValue={session?.user?.email}
                  {...register("email", {
                    required: session?.user?.email
                      ? false
                      : "Email is required",
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: "Please enter a valid email address",
                    },
                  })}
                  placeholder="Enter email address"
                />
                {errors.email && (
                  <p className="text-sm text-red-500">{errors.email.message}</p>
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      {/* Special request */}
      <Card className="border-[#DADFE6] shadow-none">
        <CardContent className="pt-6">
          <div className="space-y-6">
            <h2 className="text-xl font-semibold">Special requests</h2>

            <div className="space-y-4">
              <Label className="text-[#1a1a1a] text-sm font-medium capitalize">Set your preference</Label>
              <RadioGroup
                defaultValue="non-smoking"
                className="flex gap-4"
                onValueChange={(value) =>
                  setValue(
                    "smokingPreference",
                    value as "smoking" | "non-smoking"
                  )
                }
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="non-smoking" id="non-smoking" />
                  <Label
                    htmlFor="non-smoking"
                    className="flex items-center gap-2 text-[#1a1a1a] text-sm font-medium capitalize"
                  >
                    <CigaretteIcon className="h-4 w-4" />
                    Non-smoking
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="smoking" id="smoking" />
                  <Label
                    htmlFor="smoking"
                    className="flex items-center gap-2 text-[#1a1a1a] text-sm font-medium capitalize"
                  >
                    <CigaretteIcon className="h-4 w-4" />
                    Smoking
                  </Label>
                </div>
              </RadioGroup>
            </div>

            <div className="space-y-4">
              <Label className="text-[#1a1a1a] text-sm font-medium capitalize">Which bed setup would you prefer?</Label>
              <RadioGroup
                defaultValue="large-bed"
                className="flex gap-4"
                onValueChange={(value) =>
                  setValue("bedPreference", value as "large-bed" | "twin-bed")
                }
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="large-bed" id="large-bed" />
                  <Label
                    htmlFor="large-bed"
                    className="flex items-center gap-2 text-[#1a1a1a] text-sm font-medium capitalize"
                  >
                    <Bed className="h-4 w-4" />I would like a large bed
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="twin-bed" id="twin-bed" />
                  <Label
                    htmlFor="twin-bed"
                    className="flex items-center gap-2 text-[#1a1a1a] text-sm font-medium capitalize"
                  >
                    <Bed className="h-4 w-4" />I would like two single beds
                  </Label>
                </div>
              </RadioGroup>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Payment option */}
      <Card className="border-[#DADFE6] shadow-none rounded-lg">
        <CardContent className="pt-6">
          <div className="space-y-6">
            <h2 className="text-xl font-semibold">Payment Options</h2>
            <RadioGroup
              className="space-y-2"
              defaultValue="offline_payment"
              onValueChange={(value) =>
                setValue(
                  "payment_gateway",
                  value as "offline_payment" | "stripe" | 'paypal'
                )
              }
            >

              {Object.entries(bookingData.gateways).map(([key, gateway]) => (
                <div key={key} className="flex items-center space-x-2">
                  <RadioGroupItem value={key} id={`${key}_payment`} />
                  <div className="grid">
                    <Label htmlFor={`${key}_payment`} className="flex items-center gap-1 text-[#1a1a1a] text-sm font-medium capitalize">
                      {gateway.name}
                    </Label>
                    <p className="text-sm text-muted-foreground">
                      {gateway.is_offline ? '' : 'Secure your booking with immediate payment'}
                    </p>
                  </div>
                </div>
              ))}

            </RadioGroup>
          </div>
        </CardContent>
      </Card>
      {/* Additional preferences */}
      <Card className="border-[#DADFE6] shadow-none rounded-lg">
        <CardContent className="pt-6">
          <div className="space-y-6">
            <h2 className="text-xl font-semibold">
              Additional preferences (Optional)
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-4">
                <RadioGroup
                  onValueChange={(value) =>
                    setValue("airportTransfer", value)
                  }
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem
                      value="transfer-needed"
                      id="transfer-needed"
                    />
                    <Label htmlFor="transfer-needed" className="text-[#1a1a1a] text-sm font-medium capitalize">
                      I would like to request airport transfer
                    </Label>
                  </div>
                </RadioGroup>
              </div>

              <div className="space-y-4">
                <RadioGroup
                  onValueChange={(value) =>
                    setValue("floorPreference", value)
                  }
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="high-floor" id="high-floor" />
                    <Label htmlFor="high-floor" className="text-[#1a1a1a] text-sm font-medium capitalize">
                      I would like a room on a high floor
                    </Label>
                  </div>
                </RadioGroup>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Query */}
      <Card className="border-[#DADFE6] shadow-none rounded-lg">
        <CardContent className="pt-6">
          <div className="space-y-6">
            <h2 className="text-xl font-semibold">Special requests</h2>
            <div className="space-y-2">
              <Label htmlFor="special-requests" className="text-[#1a1a1a] text-sm font-medium capitalize">
                Please write your requests in English or Simplified Chinese.
                (optional)
              </Label>
              <textarea
                id="special-requests"
                {...register("customer_notes")}
                className="w-full min-h-[120px] px-3 py-2 rounded-md border border-input bg-background text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                placeholder="Write your special requests here..."
              />
            </div>
          </div>
        </CardContent>
      </Card>
    
  
      <Button
        type="submit"
        disabled={isLoading}
        className="bg-blue-600 text-white px-10 py-5 rounded-lg mb-4 font-bold"
      >
        {isLoading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Processing...
          </>
        ) : (
          " Next Step"
        )}
      </Button>
    </form>
  );
}
