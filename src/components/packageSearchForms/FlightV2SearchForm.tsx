"use client";
import { Button } from "@/components/ui/button";
import { Location } from "@/lib/actions/location-action";
import { addDays, format } from "date-fns";
import {
  ChevronDown,
  ChevronUp,
  CalendarIcon,
  Search,
} from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useState } from "react";
import { MemberInput } from "../hotels/MemberInput/page";
import { Circle } from "lucide-react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import SearchLocation from "@/components/filter/search-location";
import { cn } from "@/lib/utils";
import { parseUrlStrDate } from "@/lib/utils";
import { DatePickerWithRange } from "./date-time-range-picker/DatePickerWithRange";
import { useMediaQuery } from '@mantine/hooks';
import { FaXmark } from "react-icons/fa6";


const FlightV2SearchForm = ({ locations = [] }: { locations: Location[] }) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const fromLocationIdFromParams = searchParams.get("from_where");
  const toLocationIdFromParams = searchParams.get("to_where");

  const [fromLocation, setFromLocation] = useState<number | undefined>(() => fromLocationIdFromParams ? Number(fromLocationIdFromParams) : undefined);
  const [toLocation, setToLocation] = useState<number | undefined>(() => toLocationIdFromParams ? Number(toLocationIdFromParams) : undefined);

  const [locationFromError, setLocationFromError] = useState<string>()
  const [locationToError, setLocationToError] = useState<string>()
  const [loading, setLoading] = useState<boolean>(false); // Loading state

  const startDateFromParams = searchParams.get("start");
  const endDateFromParams = searchParams.get("end");
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const [openRoomsDrawer, setOpenRoomsDrawer] = useState(false);
  const isMobileDevice = useMediaQuery('(max-width: 575px)');

  const [selected, setSelected] = useState(() => searchParams.get("way") || "one-way");
  const [open, setOpen] = useState(false);
  const [openDatepickerDrawer, setOpenDatepickerDrawer] = useState(false);

  const [singleDate, setSingleDate] = useState<Date | undefined>();
  const [dateRange, setDateRange] = useState<{ from: Date; to: Date }>({
    from: parseUrlStrDate(startDateFromParams) || new Date(),
    to: parseUrlStrDate(endDateFromParams) || addDays(new Date(), 2),
  });

  const [bookInfo, setBookInfo] = useState({
    adults: 1,
    children: 0,
  });

  const handleHotelFormSubmit = async (e: React.FormEvent) => {  // <-- Add async here
    e.preventDefault();
    setLoading(true); // Start loading when form is submitted
    setDropdownOpen(false);

    if (!fromLocation || !toLocation) {
      if (!fromLocation) {
        setLocationFromError("Please select a location");
      }
      if (!toLocation) {
        setLocationToError("Please select a location");
      }

      setTimeout(() => {
        setLocationFromError(undefined);
        setLocationToError(undefined);
      }, 2000);
      setLoading(false); // Stop loading if validation fails
      return;
    }

    const queryParams = new URLSearchParams();

    const _date = selected === 'round-way' ? {
      start: dateRange.from?.toLocaleDateString(),
      end: dateRange.to?.toLocaleDateString(),
    } : {
      start: singleDate?.toLocaleDateString(),
    };

    const params: Record<string, string | number | undefined> = {
      from_where: fromLocation,
      to_where: toLocation,
      adults: bookInfo.adults,
      children: bookInfo.children,
      way: selected,
      ..._date,
    };

    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined) queryParams.append(key, value.toString());
    });

    // Await the router.push to ensure the loading state is stopped after the navigation
    await router.push(`/flight${queryParams.toString() ? `?${queryParams}` : ""}`);
    setLoading(false); // Stop loading after submission
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

      {/* Rooms/Guests Drawer */}
      <div className={`ll-custom-drawer w-full h-full bg-white fixed z-[999999999] ${openRoomsDrawer ? 'top-10' : 'top-full'}  left-0 rounded-t-xl p-4 transition-all duration-500 shadow border`}>
        <div className="flex justify-end">
          <FaXmark onClick={() => setOpenRoomsDrawer(false)} className="cursor-pointer" />
        </div>
        <div className="mt-2 w-full bg-white">
          <MemberInput
            label="Adults"
            value={bookInfo.adults}
            onChange={(value) =>
              setBookInfo((prev) => ({ ...prev, adults: value }))
            }
            min={1}
          />
          <MemberInput
            label="Children"
            value={bookInfo.children}
            onChange={(value) =>
              setBookInfo((prev) => ({ ...prev, children: value }))
            }
          />

          <button
            type="button"
            className="w-full mt-2 bg-primary text-white py-2 rounded-md"
            onClick={() => {
              setDropdownOpen(false);
              setOpenRoomsDrawer(false);
            }}
          >
            Done
          </button>
        </div>
      </div>

      <div className="p-3 bg-white border rounded-lg rounded-t-none md:mx-0">
        <form onSubmit={handleHotelFormSubmit}>
          <RadioGroup
            value={selected}
            onValueChange={setSelected}
            className="flex items-center flex-wrap gap-6"
          >

            {/* One Way */}
            <div className="flex items-center space-x-2">
              <RadioGroupItem
                value="one-way"
                id="one-way"
                className="peer sr-only"
              />
              <Label
                htmlFor="one-way"
                className={`flex items-center gap-2 cursor-pointer select-none text-sm font-semibold  ${selected === "one-way"
                  ? "text-primary font-semibold"
                  : "text-muted-foreground"
                  }`}
              >
                <div className="relative w-4 h-4">
                  <Circle
                    className={`absolute inset-0 w-4 h-4 stroke-[3] transition-all duration-200 ${selected === "one-way"
                      ? "stroke-primary"
                      : "stroke-muted-foreground"
                      }`}
                  />
                  {selected === "one-way" && (
                    <Circle className="absolute inset-0 w-4 h-4 stroke-primary fill-primary scale-50" />
                  )}
                </div>
                One Way
              </Label>
            </div>

            {/* Round Way */}
            <div className="flex items-center space-x-2">
              <RadioGroupItem
                value="round-way"
                id="round-way"
                className="peer sr-only"
              />
              <Label
                htmlFor="round-way"
                className={`flex items-center gap-2 cursor-pointer select-none text-sm font-semibold ${selected === "round-way"
                  ? "text-primary font-semibold"
                  : "text-muted-foreground"
                  }`}
              >
                <div className="relative w-4 h-4">
                  <Circle
                    className={`absolute inset-0 w-4 h-4 stroke-[3] transition-all duration-200 ${selected === "round-way"
                      ? "stroke-primary"
                      : "stroke-muted-foreground"
                      }`}
                  />
                  {selected === "round-way" && (
                    <Circle className="absolute inset-0 w-4 h-4 stroke-primary fill-primary scale-50" />
                  )}
                </div>
                Round Way
              </Label>
            </div>

          </RadioGroup>

          <div className="flex lg:flex-row flex-col items-start justify-start gap-2 mt-4">
            <div className="search-location from">
            <SearchLocation
              error={locationFromError}
              locationId={fromLocation}
              desabledId={toLocation}
              placeholder="From location"
              initialLocations={locations}
              onChangeValue={setFromLocation}
            />
            </div>

            <div className="search-location to">
            <SearchLocation
              error={locationToError}
              locationId={toLocation}
              desabledId={fromLocation}
              placeholder="To location"
              initialLocations={locations}
              onChangeValue={setToLocation}
            />
             </div>

            {/* Date Picker */}
            <div className="flex md:flex-row flex-col w-full gap-2 basis-[30%] flight-date-picker">
              {/* From Single Date Picker */}
              {selected === "one-way" ? (
                <div className="w-full border py-[6px] px-3 rounded-lg md:mb-0 mb-3">
                  <Popover>
                    <p className="text-sm font-bold">Date</p>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "justify-start text-left font-semibold !text-dark border-none h-0 shadow-none p-0",
                          !singleDate && "text-muted-foreground"
                        )}
                        onClick={handleDatepickerOpen}
                      >
                        <CalendarIcon />
                        {singleDate ? (
                          format(singleDate, "PPP")
                        ) : (
                          <span>Pick a date</span>
                        )}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      {!isMobileDevice && (
                        <Calendar
                          mode="single"
                          selected={singleDate}
                          onSelect={setSingleDate}
                          initialFocus
                        />
                      )}
                    </PopoverContent>
                  </Popover>
                </div>
              ) : ""}

              {/* To Date Range Picker */}
              {selected === "round-way" ? (
                <div className="w-full">
                  <DatePickerWithRange
                    dateRange={dateRange}
                    setDateRange={setDateRange}
                  />
                </div>
              ) : ""}
            </div>

            {/* Guests */}
            <div className="relative border rounded-md  py-1 px-2 w-full basis-[20%] guest-area">
              <p className="text-sm text-gray-500 font-semibold">
                Guests
              </p>
              <button
                type="button"
                className="w-full text-left flex items-center justify-between px-2 py-1 focus:ring-0 focus:outline-none font-semibold text-dark text-sm"
                onClick={() => {
                  if (isMobileDevice) {
                    setOpenRoomsDrawer(true);
                  } else {
                    setDropdownOpen(!dropdownOpen);
                  }
                }}
              >
                {bookInfo.adults} Adults, {bookInfo.children} Children,{" "}
                {dropdownOpen ? (
                  <ChevronUp className="w-4 h-4" />
                ) : (
                  <ChevronDown className="w-4 h-4" />
                )}
              </button>

              {dropdownOpen && (
                <div className="absolute z-10 mt-2 w-full bg-white border rounded-lg shadow-lg p-4">
                  <MemberInput
                    label="Adults"
                    value={bookInfo.adults}
                    onChange={(value) =>
                      setBookInfo((prev) => ({ ...prev, adults: value }))
                    }
                    min={1}
                  />
                  <MemberInput
                    label="Children"
                    value={bookInfo.children}
                    onChange={(value) =>
                      setBookInfo((prev) => ({ ...prev, children: value }))
                    }
                  />

                  <button
                    type="button"
                    className="w-full mt-2 bg-primary text-white py-2 rounded-md"
                    onClick={() => setDropdownOpen(false)}
                  >
                    Done
                  </button>
                </div>
              )}
            </div>

            {/* Search Button */}
            <Button
              type="submit"
              className="gap-2 px-4 pt-2 py-7 md:w-32 w-full text-md font-semibold text-white"
              disabled={loading} // Disable button during loading
            >
              <Search className="h-4 w-4" />
              {loading ? "Searching..." : "Search"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FlightV2SearchForm;
