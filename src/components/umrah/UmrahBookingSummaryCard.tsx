"use client"
import React, { useState } from 'react'
import { Button } from '../ui/button';
import { CalendarIcon, Loader2 } from 'lucide-react';
import { format } from "date-fns";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from '../ui/calendar';
import { TourData } from '@/types/tourTypes';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from "zod";
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { formatPrice, getSellPrice } from '@/lib/utils';
import { bookingAddToCart } from '@/lib/actions/booking-actions';
import { toast } from "sonner";
import { getErrorMessage } from '@/lib/handle-error';
import BookingAttraction from "@/components/layouts/booking-attraction";

const bookingPersonTypeSchema = z.object({
    name: z.string(),
    des: z.string(),
    min: z.number(),
    max: z.number(),
    price: z.number(),
    display_price: z.number(),
    number: z.number(),
});

const bookingExtraServiceSchema = z.object({
    name: z.string(),
    price: z.number(),
    type: z.enum(["one_time", "per_day"]),
    number: z.number(),
    enable: z.number(),
    price_html: z.string(),
    price_type: z.string().optional().nullable(),
});

const bookingCartRequestSchema = z.object({
    service_id: z.number(),
    service_type: z.enum(["umrah"]).default("umrah"),

    start_date: z.string(),
    person_types: z.array(bookingPersonTypeSchema).optional().nullable(),
    extra_price: z.array(bookingExtraServiceSchema).optional().nullable(),
    guests: z.number().default(1),
});

export type BookingCartRequestSchema = z.infer<typeof bookingCartRequestSchema>;

const UmrahBookingSummaryCard = ({ tourDetailsData }: { tourDetailsData: TourData }) => {
    const sellPrice = getSellPrice(tourDetailsData.price, tourDetailsData.sale_price)
    
    const { handleSubmit, setValue, formState: { errors } } = useForm<BookingCartRequestSchema>({
        resolver: zodResolver(bookingCartRequestSchema),
        defaultValues: {
            service_id: tourDetailsData.id,
            service_type: "umrah",
            person_types: null,
            extra_price: [],
            guests: 1
        },
    });

    const [pickupDate, setPickupDate] = useState<Date | null>(null);
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);

    const onSubmit = async (value: BookingCartRequestSchema) => {
        if (!pickupDate) {
            toast.error("Please select a pickup date.");
            return;
        }

        try {
            setIsLoading(true);
            const { data, error } = await bookingAddToCart(value);
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
    };

    return (
        <div className="border w-full h-auto rounded-lg bg-white shadow-none p-5">
            <h1 className="font-bold text-xl pt-2">{tourDetailsData?.title}</h1>
            <p className="my-2 font-bold">{formatPrice(sellPrice)}</p>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                {/* Pick-up Date */}
                <div className="space-y-2">
                    <label className="text-sm font-medium">Pick-up Date</label>
                    <Popover>
                        <PopoverTrigger asChild>
                            <Button
                                variant="outline"
                                className={`w-full justify-start text-left font-normal py-4 sm:py-6 ${
                                    !pickupDate ? "border-red-500" : ""
                                }`}
                            >
                                <CalendarIcon className="mr-2 h-4 w-4" />
                                {pickupDate ? format(pickupDate, "PP") : <span>Pick a date</span>}
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                                mode="single"
                                selected={pickupDate ?? undefined}
                                onSelect={(date) => {
                                    setPickupDate(date ?? null);  // Ensure it's either Date or null
                                    if (date) setValue("start_date", format(date, "yyyy-MM-dd"));
                                }}                                
                            />
                        </PopoverContent>
                    </Popover>
                    {!pickupDate && <p className="text-red-500 text-sm">Please select a pickup date.</p>}
                </div>

                {/* Submit Button */}
                <Button
                    type="submit"
                    className="py-4 sm:py-6 w-full font-bold"
                    variant="primary"
                >
                    {isLoading ? (
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    ) : (
                        "Check availability"
                    )}
                </Button>
            </form>

            {/* Booking Benefits Section */}
            <BookingAttraction />
        </div>
    );
}

export default UmrahBookingSummaryCard;
