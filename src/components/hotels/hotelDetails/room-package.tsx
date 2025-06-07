"use client";
import { Button } from "@/components/ui/button";
import { bookingAddToCart } from "@/lib/actions/booking-actions";
import { HotelType, Package, RoomType } from "@/types/hotel-types";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Bed,
  Dumbbell,
  Info,
  Loader2,
  Users,
  Utensils,
  WavesLadder,
  Wifi,
  CheckCircle
} from "lucide-react";
import { redirect, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { Form } from "@/components/ui/form";
import { parseUrlStrDate, taxRateToAmount } from "@/lib/utils";
import { format } from "date-fns";
import { getErrorMessage } from "@/lib/handle-error";
import DiscountPriceBadge from "@/components/booking/discount-price-badge";
import { AiOutlineClose } from "react-icons/ai";
import 'react-tooltip/dist/react-tooltip.css'
import { Tooltip } from 'react-tooltip'
import TaxVatLabel from "@/components/booking/tax-vat-label";

const bookingRoomSchema = z.object({
  id: z.number(),
  number_selected: z.number().min(1, "Select at least one room"),
});

const bookingExtraServiceSchema = z.object({
  name: z.string(),
  price: z.number(),
  type: z.enum(["one_time", "per_day"]),
  enable: z.number(),
  price_html: z.string(),
  price_type: z.string().optional().nullable(),
});

const bookingCartRequestSchema = z.object({
  service_id: z.number(),
  service_type: z.enum(["hotel"]),
  start_date: z.string(),
  end_date: z.string(),
  adults: z.number(),
  children: z.number().default(0),
  rooms: z.array(bookingRoomSchema),
  extra_price: z.array(bookingExtraServiceSchema).optional().nullable(),
});

export type BookingCartRequestSchema = z.infer<typeof bookingCartRequestSchema>;

const RoomPackage = ({
  roomPackage,
  hotelDetails,
  room,
}: {
  roomPackage?: Package;
  hotelDetails: HotelType;
  room: RoomType;
}) => {
  const searchParams = useSearchParams();
  const _startDateFromParams = searchParams.get("start");
  const _endDateFromParams = searchParams.get("end");

  const _startDate = parseUrlStrDate(_startDateFromParams)
  const startDate = _startDate ? format(_startDate, 'yyyy-MM-dd') : '';
  const _endDate = parseUrlStrDate(_endDateFromParams)
  const endDate = _endDate ? format(_endDate, 'yyyy-MM-dd') : '';

  const hasDate = !!(startDate && endDate);

  const [selectedRoom, setSelectedRoom] = useState<any>({
    room: {},
    quantity: "0",
  });

  const packagePrice = roomPackage?.price ? Number(roomPackage.price) : 0;
  const sellPrice = Number(room.price) + packagePrice;
  const comparePrice = Number(room?.compare_price || 0);


  const taxAmount = taxRateToAmount(sellPrice, hotelDetails?.tax_rate || 0)


  const form = useForm<BookingCartRequestSchema>({
    resolver: zodResolver(bookingCartRequestSchema),
    values: {
      start_date: startDate,
      end_date: endDate,
      service_id: hotelDetails.id,
      service_type: "hotel",
      adults: 1,
      children: 0,
      extra_price: roomPackage ? [
        {
          name: roomPackage.name,
          price: packagePrice,
          type: "one_time",
          enable: 1,
          price_html: roomPackage.price.toString(),
          price_type: null,
        },
      ] : [],
      rooms: [
        {
          id: room.id,
          number_selected: 1,
        },
      ],
    },
  });

  const [error, setError] = useState<boolean>(false);
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  async function onSubmit(value: BookingCartRequestSchema) {

    try {
      setIsLoading(true);

      const { data, error } = await bookingAddToCart(value);

      if (data?.booking_code) {
        router.push(`/booking/${data?.booking_code}`);
      } else {

        if(error == 'Login required') {
          const referer = document.referrer || "/"
          router.replace(`/api/auth/signin?callbackUrl=${encodeURIComponent(referer)}`)
        }
        toast.error(`Error: ${error}`);
      }
    } catch (err) {
      toast.error(getErrorMessage(err));
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="grid sm:grid-cols-[520px,200px,1fr] border items-center rounded-sm">
          {/* Your Choice Col */}
          <div className="choice-col space-y-2 p-5 flex flex-col gap-3">
            <div className="flex items-center gap-2">
              <h4 className="font-semibold">{roomPackage?.name || room.title}</h4>
              <div className="cursor-pointer">
                {hotelDetails?.additional?.trim() && (
                  <>
                    <button id="my-anchor-element" className="IconButton" type="button">
                      <Info className="w-4 h-4 text-gray-400" />
                    </button>
                    <Tooltip anchorSelect="#my-anchor-element"
                      openOnClick={true}
                      positionStrategy="fixed"
                      style={{
                        width: "50%",
                        border: "1px solid #ff0000",
                        borderRadius: "20px",
                        backgroundColor: "#F6F7FA",
                        color: "#000",
                        fontWeight: "400",
                        zIndex: 99,
                        padding: "20px",
                        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
                      }}
                    >
                      <div className="content">
                        {hotelDetails?.additional}
                      </div>
                    </Tooltip>
                  </>
                )}

              </div>
            </div>
            {(!!hotelDetails?.nearest_location) && <p className="text-md text-gray-600">
              {hotelDetails?.nearest_location?.distance_in_km} Km From (
              {hotelDetails?.nearest_location?.name})
            </p>}
            <div className="flex items-start gap-3 text-sm text-gray-600">
              {roomPackage?.terms?.map((term: string, idx: number) => (
                <div
                  key={idx}
                  className="flex items-start gap-1 font-semibold text-sm"
                >
                  {term.toLowerCase().includes("room") ? (
                    <div className="w-4 h-4 mx-1">
                      <Bed className="w-4 h-4 mx-1" />
                    </div>
                  ) : term.toLowerCase().includes("wifi") ? (
                    <Wifi className="w-4 h-4 mx-1" />
                  ) : term.toLowerCase().includes("swimming") ? (
                    <div className="w-4 h-4 mx-1">
                      <WavesLadder className="w-4 h-4 mx-1" />
                    </div>
                  ) : term.toLowerCase().includes("gym") ? (
                    <div className="w-4 h-4 mx-1">
                      <Dumbbell className="w-4 h-4 mx-1" />
                    </div>
                  ) : term.toLowerCase().includes("restaurant") ? (
                    <Utensils className="w-4 h-4 mx-1" />
                  ) : null}
                  <span>{term.charAt(0).toUpperCase() + term.slice(1)}</span>
                </div>
              ))}
            </div>
            <p className="text-xs text-gray-500 font-semibold">
              {/* {hotelDetails?.cancellation} */}
            </p>
          </div>

          {/* Sleep Col */}
          <div className="sleep-col space-y-2 p-4 h-full border-x">
            <div className="flex items-center gap-1">
              <Users className="w-4 h-4 text-gray-400" />
              <span className="text-sm">
                {room?.adults} Adults, {room?.children} Children
              </span>
            </div>
          </div>

          {/* Pricing & Reservation - Aligned to Right */}
          <div className="price-col space-y-4 p-4 justify-self-end">
            <DiscountPriceBadge sellPrice={sellPrice} comparePrice={comparePrice} />
            <TaxVatLabel taxAmount={taxAmount} className="text-right font-normal" />
            <Button
              type="submit"
              disabled={isLoading || !hasDate}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold"
            >
              <CheckCircle size={12} color="#fff" />
              {isLoading ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                "Reserve"
              )}
            </Button>

            {/* {room?.stock > 0 && room?.stock <= 10 && <div className="text-pink-500 font-medium text-xs text-right">Only {room.stock} left at this price</div>} */}
          </div>
        </div>
      </form>
    </Form>
  );
};

export default RoomPackage;
