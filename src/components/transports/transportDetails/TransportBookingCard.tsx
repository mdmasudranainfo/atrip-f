"use client";

import { CalendarIcon, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

import { useState } from "react";
import { formatPrice, getSellPrice } from "@/lib/utils";
import { bookingAddToCart } from "@/lib/actions/booking-actions";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { getErrorMessage } from "@/lib/handle-error";
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import BookingAttraction from "@/components/layouts/booking-attraction";

const FormSchema = z.object({
    start_date: z.date(),
    end_date: z.date(),
})

export default function TransportBookingSummary({transport}: {transport: any}) {

  const [selectedPackage, setSelectedPackage] = useState<any[]>([]);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  })

  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const sellPrice = getSellPrice(transport.price, transport.sale_price)


  async function onSubmit(value: z.infer<typeof FormSchema>) {

  try {

    setIsLoading(true);

    const payload = {
      service_id: transport.id,
      service_type:  'transport',
      number: 1,
      extra_price: selectedPackage,
      guests: 1,
      ...value,
      start_date: format(value.start_date, "yyyy-MM-dd"),
      end_date: format(value.end_date, "yyyy-MM-dd")
    }

    const { data, error } = await bookingAddToCart(payload);

    console.log('data, error', data, error)
    console.log("🚀 ~ onSubmit ~ data:33", data);
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

    <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
    <Card className="w-full  xl:max-w-md mx-auto shadow-none ">
      <CardContent className="p-6 space-y-6">
        {/* Header */}
        <div className="space-y-1">
          <h2 className="text-xl font-semibold">{transport.title}</h2>
          <div className="flex justify-between items-center">
            <p className="text-lg font-medium">{formatPrice(sellPrice)}</p>
          </div>
        </div>

        <FormField
          control={form.control}
          name="start_date"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Start Date</FormLabel>
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
                        <span>Pick a date</span>
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

      <FormField
          control={form.control}
          name="end_date"
          render={({ field }) => (
            <FormItem>
              <FormLabel>End Date</FormLabel>
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
                        <span>Pick a date</span>
                        )}
                    </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={(val) => {
                            if(val) {
                                form.setValue('end_date', val, {shouldValidate: true})
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

        {/* Location and Date Selection */}
        {transport.extra_price.map((transportPackage: any, index: number) => (
          <div className="space-y-2" key={index}>
              <label className="text-sm font-medium">{transportPackage.name}</label>
              <input
                  type="number"
                  min={Number(transportPackage.min || 0)}
                  max={Number(transportPackage.max || 1)}
                  defaultValue={0}
                  className="w-full p-2 h-8 border rounded"

                  
                  onChange={(e) => {

                    const _val = Number(e.target.value || 0)
                    const _data = {
                      name: transportPackage.name,
                      price: transportPackage.price,
                      type: "one_time",
                      enable: 1,
                      price_html: transportPackage.price.toString(),
                      price_type: null,
                      number: _val,
                    }

                    setSelectedPackage((prev) => {
                      const _tmp = [...prev];
                      const _index = prev.findIndex((_it) => _it.name == transportPackage.name)
                      if(_index !== -1) {
                        if(_val) {
                          _tmp[_index] = _data;
                        } else {
                          _tmp.splice(_index, 1);
                        }
                      } else if(_val) {
                        _tmp.push(_data);
                      }

                      console.log('_tmp', _tmp)
                      return _tmp;
                    })

                  }}
              />
              <p className='text-sm'>{formatPrice(Number(transportPackage.price || 0))} per person</p>
          </div>
        ))}
        
        {/* Availability Now Button */}
        <Button disabled={isLoading} className="w-full h-11 bg-blue-600 hover:bg-blue-700 text-white font-bold" type="submit">
          {isLoading ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                "Reserve"
            )}
        </Button>

        {/* Collapsible Sections */}
        <BookingAttraction />
        
      </CardContent>
    </Card>
    </form>
    </Form>
  )
}
