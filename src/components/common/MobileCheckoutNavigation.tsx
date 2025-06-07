import * as Dialog from "@radix-ui/react-dialog";
import { X, Calendar as CalendarIcon, Loader2 } from "lucide-react";
import { format } from "date-fns";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";

import {
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { formatPrice } from "@/lib/utils";
import DatePickerModal from "../dataPiker/DatePickerModal";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

interface IProps {
  data: any;
  sellPrice: number;
  form: any; // Replace with your form type
  onSubmit: (data: any) => void; // Replace with your submit handler type
  isLoading: boolean;
}

export default function MobileCheckout({
  data,
  sellPrice,
  form,
  onSubmit,
  isLoading,
}: IProps) {
  const [calendarOpen, setCalendarOpen] = useState(false);
  let timeSlots: any[] = [];
  try {
    const rawTimeSlot = data?.time_slot;

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
    <Dialog.Root>
      <Dialog.Trigger asChild>
        {/* Mobile bottom bar */}
        <div className="px-6 py-4 rounded-t-xl fixed bottom-0 z-50 border-t-2 md:hidden flex justify-between items-center bg-white w-full">
          <p className="text-lg leading-6 font-medium text-dark">
            {formatPrice(sellPrice)}
          </p>
          <Button
            onClick={() => setCalendarOpen(true)}
            size="xl"
            className="text-white px-14"
          >
            Check Availability
          </Button>
        </div>
      </Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/40 z-50" />
        <Dialog.Content className="fixed inset-x-0 bottom-0 z-50 bg-white rounded-t-2xl p-4 max-h-[90vh] overflow-y-auto">
          <div className="flex justify-end">
            <Dialog.Close asChild>
              <button className="text-gray-500 hover:text-gray-700">
                <X className="h-5 w-5" />
              </button>
            </Dialog.Close>
          </div>

          <Card className="px-5 py-6 bg-white rounded-lg shadow-md">
            <CardContent className="p-0 sm:p-0 mt-4">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                  <FormField
                    control={form.control}
                    name="start_date"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <>
                            <Button
                              variant="outline"
                              onClick={() => setCalendarOpen(true)}
                              className="w-full justify-start text-left font-normal"
                            >
                              <CalendarIcon className="mr-2 h-4 w-4" />
                              {field.value ? (
                                format(field.value, "yyyy-MM-dd")
                              ) : (
                                <span>Select date</span>
                              )}
                            </Button>

                            <DatePickerModal
                              open={calendarOpen}
                              onOpenChange={setCalendarOpen}
                              value={field.value}
                              onSelect={(val) => {
                                form.setValue("start_date", val, {
                                  shouldValidate: true,
                                });
                              }}
                            />
                          </>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

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
                    disabled={isLoading}
                    type="submit"
                    className="w-full h-11 mt-4 bg-blue-600 hover:bg-blue-700 text-white font-bold"
                  >
                    {isLoading ? (
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    ) : (
                      "Check Availability"
                    )}
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
