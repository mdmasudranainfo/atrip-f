"use client";
import * as React from "react";
import { Button } from "@/components/ui/button";
import { addDays } from "date-fns";
import { Search } from "lucide-react";
import { useState } from "react";
import { Location } from "@/lib/actions/location-action";
import { DatePickerWithRange } from "./date-time-range-picker/DatePickerWithRange";
import { useRouter, useSearchParams } from "next/navigation";
import SearchLocation from "@/components/filter/search-location";
import { parseUrlStrDate } from "@/lib/utils";
import SearchTransport from "./SearchTransport";
import SearchLocationWithType from "../filter/SearchLocationWithType";

const TransportsSearchForm = ({
  locations = [],
}: {
  locations: Location[];
}) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const locationIdParams = searchParams.get("location_id");
  const startDateParams = searchParams.get("start");
  const endDateParams = searchParams.get("end");

  const [locationError, setLocationError] = useState<string>();
  const [selectedLocation, setSelectedLocation] = useState<number | undefined>(
    () => (locationIdParams ? Number(locationIdParams) : undefined)
  );

  const [dateRange, setDateRange] = useState<{ from?: Date; to?: Date }>({
    from: parseUrlStrDate(startDateParams) || new Date(),
    to: parseUrlStrDate(endDateParams) || addDays(new Date(), 2),
  });

  const handleTransportFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedLocation) {
      setLocationError("Please select a location");
      setTimeout(() => setLocationError(undefined), 2000);
      return;
    }

    const queryParams = new URLSearchParams({
      ...(selectedLocation && { location_id: selectedLocation.toString() }),
      ...(dateRange.from && { start: dateRange.from.toLocaleDateString() }),
      ...(dateRange.to && { end: dateRange.to.toLocaleDateString() }),
    });

    router.push(
      `/transports${queryParams.toString() ? `?${queryParams}` : ""}`
    );
  };

  return (
    <div className="w-full">
      <div className="p-3 bg-white border rounded-lg rounded-t-none md:mx-0">
        <form
          onSubmit={handleTransportFormSubmit}
          className="flex lg:flex-row flex-col items-start justify-start gap-2 "
        >
          {/* Check-in, Nights, Check-out Container */}
          <div className="md:w-5/12  w-full">
            {/* <DatePickerWithRange
              dateRange={dateRange}
              setDateRange={setDateRange}
            /> */}
            <SearchTransport />
          </div>
          <SearchLocationWithType
            type="transport"
            error={locationError}
            locationId={selectedLocation}
            placeholder="Search Your location..."
            initialLocations={locations}
            onChangeValue={setSelectedLocation}
          />

          {/* Search Button */}
          <Button
            type="submit"
            className="gap-2 px-4 pt-2 py-7 md:w-32 w-full text-md font-semibold text-white"
          >
            <Search className="h-4 w-4" />
            Search
          </Button>
        </form>
      </div>
    </div>
  );
};

export default TransportsSearchForm;
