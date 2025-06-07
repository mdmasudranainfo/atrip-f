"use client";

import { Button } from "@/components/ui/button";
import { CalendarIcon, Loader2 } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Calendar2 } from "@/components/ui/calendar2";
import { useState } from "react";
import { format } from "date-fns";
import { EventRow } from "@/types/activity";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { toast } from "sonner";
import { bookingAddToCart } from "@/lib/actions/booking-actions";
import { useRouter } from "next/navigation";
import { getErrorMessage } from "@/lib/handle-error";
import { Calendar } from "../ui/calendar";

const FormSchema = z.object({
  start_date: z.date(),
  start_time: z.string().optional(),
});

export default function ActivityBooking({ event }: { event: EventRow }) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [calendarOpen, setCalendarOpen] = useState(false);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  async function onSubmit(value: z.infer<typeof FormSchema>) {
    try {
      setIsLoading(true);

      const payload = {
        service_id: event.id,
        service_type: "event",
        time_slot: value.start_time,
        step: 0,
        ...value,
        start_date: format(value.start_date, "yyyy-MM-dd"),
      };

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

  let timeSlots: any[] = [];
  try {
    const rawTimeSlot = event?.time_slot;

    if (typeof rawTimeSlot === "string" && rawTimeSlot.trim() !== "") {
      timeSlots = [...new Set(JSON.parse(rawTimeSlot))];
    } else if (Array.isArray(rawTimeSlot)) {
      timeSlots = [...new Set(rawTimeSlot)];
    }
  } catch (err) {
    console.error("Failed to parse time_slot:", err);
    timeSlots = [];
  }

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          {/* Calendar Open Button */}
          <FormField
            control={form.control}
            name="start_date"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setCalendarOpen(true)}
                    className="w-full justify-start text-left font-normal"
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {field.value
                      ? format(field.value, "yyyy-MM-dd")
                      : "Select date"}
                  </Button>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Time Slot */}
          {timeSlots?.length ? (
            <FormField
              control={form.control}
              name="start_time"
              render={({ field }) => (
                <FormItem>
                  <Select
                    value={field.value}
                    onValueChange={(value) => field.onChange(value)}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select time slot" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className="max-h-60 overflow-y-auto">
                      {timeSlots.map((time: string) => (
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
          ) : null}

          <Button
            className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-white"
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              "Check availability"
            )}
          </Button>
        </form>
      </Form>

      {/* Calendar Dialog */}
      <Dialog open={calendarOpen} onOpenChange={setCalendarOpen}>
        <DialogContent className="sm:max-w-[450px] ">
          <DialogHeader>
            <DialogTitle>Select a Date</DialogTitle>
          </DialogHeader>
          <div className="flex justify-center items-center">
            <Calendar2
              mode="single"
              selected={form.watch("start_date")}
              onSelect={(val) => {
                if (val) {
                  form.setValue("start_date", val, {
                    shouldValidate: true,
                  });
                  setCalendarOpen(false); // Close modal after selection
                }
              }}
              initialFocus
            />
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
