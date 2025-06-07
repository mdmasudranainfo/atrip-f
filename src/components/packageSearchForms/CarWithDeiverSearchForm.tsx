"use client";
import * as React from "react";
import { Button } from "@/components/ui/button";
import { addDays, format } from "date-fns";
import { Search, CalendarIcon } from "lucide-react";
import { ChangeEventHandler, useState, useRef } from "react";
import { Location } from "@/lib/actions/location-action";
import { useRouter, useSearchParams } from "next/navigation";
import { parseUrlStrDate } from "@/lib/utils";
import SearchLocation from "@/components/filter/search-location";
import { FaSpinner } from "react-icons/fa"; // Import spinner icon
import { Popover, PopoverContent, PopoverTrigger, } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { useMediaQuery } from '@mantine/hooks';
import { Calendar } from "@/components/ui/calendar";
import { setHours, setMinutes } from "date-fns";
import { FaXmark } from "react-icons/fa6";
import { DatePickerWithRange } from "./date-time-range-picker/DatePickerWithRange";

const CarWithDeiverSearchForm = ({ locations = [] }: { locations: Location[] }) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const locationIdParams = searchParams.get("location_id");
  const startDateParams = searchParams.get("start");
  const endDateParams = searchParams.get("end");
  const triggerRef = useRef<HTMLButtonElement>(null);

  const [locationError, setLocationError] = useState<string>();
  const [selectedLocation, setSelectedLocation] = useState<number | undefined>(() => locationIdParams ? Number(locationIdParams) : undefined);

  const [loading, setLoading] = useState(false); // Add loading state

  const isMobileDevice = useMediaQuery('(max-width: 575px)');
  const [open, setOpen] = useState(false);
  const [openDatepickerDrawer, setOpenDatepickerDrawer] = useState(false);

  const [selected, setSelected] = useState<Date>();
  const [timeValue, setTimeValue] = useState<string>("00:00");
  const [singleDate, setSingleDate] = useState<Date | undefined>();

  const [dateRange, setDateRange] = useState<{ from: Date; to?: Date }>({
    from: parseUrlStrDate(startDateParams) || new Date(),
    to: parseUrlStrDate(endDateParams) || addDays(new Date(), 2),
  });

  const handleTimeChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    const time = e.target.value;
    if (!selected) {
      setTimeValue(time);
      return;
    }
    const [hours, minutes] = time.split(":").map((str) => parseInt(str, 10));
    const newSelectedDate = setHours(setMinutes(selected, minutes), hours);
    setSelected(newSelectedDate);
    setTimeValue(time);
  };

  // Open the date picker
  const handleDatepickerOpen = () => {
    if (isMobileDevice) {
      setOpenDatepickerDrawer(true);
    } else {
      setOpen(true);
    }
  };

  const handleCarFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true); // Start loading

    if (!selectedLocation) {
      setLocationError("Please select a location");
      setTimeout(() => setLocationError(undefined), 2000);
      setLoading(false); // Stop loading if validation fails
      return;
    }

    // Ensure singleDate is a valid Date object
    const selectedDate = singleDate ?? new Date(); // Fallback to current date if undefined

    // Merge date and time values
    const [hours, minutes] = timeValue.split(":").map(Number);
    const combinedDateTime = setHours(setMinutes(selectedDate, minutes), hours);

    const queryParams = new URLSearchParams({
      ...(selectedLocation && { location_id: selectedLocation.toString() }),
      ...(dateRange.from && { start: dateRange.from.toLocaleDateString() }),
      ...(dateRange.to && { end: dateRange.to.toLocaleDateString() }),
      // location_id: selectedLocation.toString(),
      // start: combinedDateTime.toISOString(),
    });

    await new Promise((resolve) => setTimeout(resolve, 1500)); // Simulate delay for loading state

    router.push(`/cars?${queryParams.toString()}`);
    setLoading(false); // Stop loading after submitting
  };

  return (
    <div className="w-full">

      {/* Datepicker Drawer */}
      <div className={`ll-custom-drawer datepicker w-full h-full bg-white fixed z-[999999999] ${openDatepickerDrawer ? 'top-10' : 'top-full'}  left-0 rounded-t-xl p-4 transition-all duration-500 shadow border`}>
        <div className="flex justify-end">
          <FaXmark onClick={() => setOpenDatepickerDrawer(false)} className="cursor-pointer" />
        </div>
        <div className="mt-2 w-full bg-white calender-wrapper">
          <Calendar
            mode="single"
            selected={singleDate}
            onSelect={setSingleDate}
            initialFocus
          />
        </div>
      </div>

      <div className="p-3 bg-white border rounded-lg rounded-t-none md:mx-0">
        <form
          onSubmit={handleCarFormSubmit}
          className="flex lg:flex-row flex-col items-start justify-start gap-2 "
        >

          <SearchLocation
            error={locationError}
            locationId={selectedLocation}
            placeholder="Search location..."
            initialLocations={locations}
            onChangeValue={setSelectedLocation}
          />

          <div className="md:w-5/12 w-full time-picker">
            <DatePickerWithRange
              dateRange={dateRange}
              setDateRange={setDateRange}
            />
          </div>

          {/* Search Button */}
          <Button
            type="submit"
            className="gap-2 px-4 pt-2 py-7 md:w-32 w-full text-md font-semibold text-white"
            disabled={loading} // Disable button when loading
          >

            <Search className="h-4 w-4" />
            {loading ? "Searching..." : "Search"}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default CarWithDeiverSearchForm;

{/* <input type="time" value={timeValue} onChange={handleTimeChange} className="text-xs font-semibold mb-1 cursor-pointer" /> */ }
