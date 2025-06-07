"use client";

import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { DateRange } from "react-day-picker";
import { useState, useRef } from "react";
import { useMediaQuery } from '@mantine/hooks';
import { FaXmark } from "react-icons/fa6";

export function DatePickerWithRange({
  className,
  setDateRange,
  dateRange,
}: any) {

  const [open, setOpen] = useState(false);
  const [width, setWidth] = useState(0);

  const triggerRef = useRef<HTMLButtonElement>(null);
  const [openDatepickerDrawer, setOpenDatepickerDrawer] = useState(false);
  const isMobileDevice = useMediaQuery('(max-width: 575px)');

  // Update width when popover opens or window resizes
  const updateWidth = () => {
    if (triggerRef.current) {
      setWidth(triggerRef.current.offsetWidth);
    }
  };

  // Open the date picker
  const handleDatepickerOpen = () => {
    if (isMobileDevice) {
      setOpenDatepickerDrawer(true);
    } else {
      setOpen(true);
    }
  };

  return (
    <div className={cn("grid gap-2", className)}>

      {/* Datepicker Drawer */}
      <div className={`ll-custom-drawer datepicker w-full h-full bg-white fixed z-[999999999] ${openDatepickerDrawer ? 'top-10' : 'top-full'}  left-0 rounded-t-xl p-4 pb-16 transition-all duration-500 shadow border overflow-y-auto`}>
        <div className="flex justify-end">
          <FaXmark onClick={() => setOpenDatepickerDrawer(false)} className="cursor-pointer" />
        </div>
        <div className="mt-2 w-full bg-white calender-wrapper">
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={dateRange?.from}
            selected={dateRange}
            onSelect={setDateRange}
            numberOfMonths={2}
            fromDate={new Date()}
          />
        </div>
      </div>

      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant={"outline"}
            ref={triggerRef}
            className={cn(
              "flex justify-between md:inline-block text-left font-normal h-[58px] w-full",
              !dateRange && "text-muted-foreground"
            )}
            onClick={handleDatepickerOpen}
          >
            <div className="flex flex-col md:float-start md:overflow-hidden date-flex">
              <div className="flex items-center gap-2">
                <label
                  htmlFor="date"
                  className="font-semibold text-dark text-sm"
                >
                  From
                </label>
              </div>

              <div className="flex items-center gap-1">
                <CalendarIcon />
                {dateRange?.from ? (
                  dateRange.to ? (
                    <div className="font-semibold text-dark text-sm">
                      {format(dateRange.from, "dd LLL, y")}
                    </div>
                  ) : (
                    format(dateRange.from, "dd LLL, y")
                  )
                ) : (
                  <span>Pick a date</span>
                )}
              </div>
            </div>
            <div className="dates-divider w-px h-full bg-gray-300 md:float-start md:overflow-hidden md:ml-5 md:mr-3"></div>
            <div className="to-date-wrapper flex flex-col md:float-start md:overflow-hidden date-flex">
              <div className="flex items-center gap-2">
                <label
                  htmlFor="date"
                  className="font-semibold text-dark text-sm"
                >
                  To
                </label>
              </div>
              <div className="flex items-center gap-1">
                <CalendarIcon />
                {dateRange?.from ? (
                  dateRange.to ? (
                    <div className="font-semibold text-dark text-sm">
                      {format(dateRange.to, "dd LLL, y")}
                    </div>
                  ) : (
                    format(dateRange.from, "dd LLL, y")
                  )
                ) : (
                  <span>Pick a date</span>
                )}
              </div>
            </div>
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          {!isMobileDevice && (
            <Calendar
              initialFocus
              mode="range"
              defaultMonth={dateRange?.from}
              selected={dateRange}
              onSelect={setDateRange}
              numberOfMonths={2}
              fromDate={new Date()}
            />
          )}
        </PopoverContent>
      </Popover>
    </div>
  );
}
