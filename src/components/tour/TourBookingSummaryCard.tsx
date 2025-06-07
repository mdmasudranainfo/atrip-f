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
import { formatPrice, getSellPrice, parseUrlStrDate } from '@/lib/utils';
import { bookingAddToCart } from '@/lib/actions/booking-actions';
import { toast } from "sonner";
import { getErrorMessage } from '@/lib/handle-error';
import BookingAttraction from "@/components/layouts/booking-attraction";
import { useSearchParams } from "next/navigation";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage,
  } from "@/components/ui/form"

const FormSchema = z.object({
    start_date: z.date(),
})

const TourBookingSummaryCard = ({ tourDetailsData }: { tourDetailsData: TourData }) => {

    const router = useRouter()
    const [isLoading, setIsLoading] = useState(false)
    const searchParams = useSearchParams();

    const startDate = searchParams.get('start') ? parseUrlStrDate(searchParams.get('start')) : undefined
    const sellPrice = getSellPrice(tourDetailsData.price, tourDetailsData.sale_price)

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            ...(startDate ? {start_date: startDate} : {})
        }
    })

    async function onSubmit(value: z.infer<typeof FormSchema>) {
        try {
            setIsLoading(true);

            const payload = {
                service_id: tourDetailsData.id,
                service_type: "tour",
                step: 1,
                guests: 1,
                ...value,
                start_date: format(value.start_date, "yyyy-MM-dd"),
            }

            const { data, error } = await bookingAddToCart(payload);
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
        <div className="border w-full h-auto rounded-lg bg-white shadow-none p-5">
            <h1 className="font-bold text-xl pt-2">{tourDetailsData?.title}</h1>
            <p className="my-2 font-bold">{formatPrice(Number(sellPrice || 0))}</p>

            <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}  className="space-y-4">

        <FormField
          control={form.control}
          name="start_date"
          render={({ field }) => (
            <FormItem>
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
                    <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={(val) => {
                            if(val) {
                                form.setValue('start_date', val, {shouldValidate: true})
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

        <Button className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-white" type="submit" disabled={isLoading}>
            {isLoading ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                "Check availability"
            )}
        </Button>
      </form>
    </Form>

            

            {/* Booking Benefits Section */}
            <BookingAttraction />
        </div>
    );
}

export default TourBookingSummaryCard