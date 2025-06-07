"use client";

import { Button } from "@/components/ui/button";
import { addDays } from "date-fns";
import { ChevronDown, ChevronUp, Search } from "lucide-react";
import { useState } from "react";
import { MemberInput } from "../hotels/MemberInput/page";
import { DatePickerWithRange } from "./date-time-range-picker/DatePickerWithRange";
import { useRouter, useSearchParams } from "next/navigation";
import { Location } from "@/lib/actions/location-action";
import qs from "qs";
import { parseUrlStrDate } from "@/lib/utils";
import SearchLocation from "@/components/filter/search-location";
import { useMediaQuery } from '@mantine/hooks';
import { FaXmark } from "react-icons/fa6";

const FLeetsSearchForm = ({ locations = [] }: { locations: Location[] }) => {

  const router = useRouter();
  const searchParams = useSearchParams();
  const [openRoomsDrawer, setOpenRoomsDrawer] = useState(false);
  const locationIdFromParams = searchParams.get("location_id");
  const startDateFromParams = searchParams.get("start");
  const endDateFromParams = searchParams.get("end");
  const isMobileDevice = useMediaQuery('(max-width: 575px)');

  const [dateRange, setDateRange] = useState<{ from: Date; to: Date }>({
    from: parseUrlStrDate(startDateFromParams) || new Date(),
    to: parseUrlStrDate(endDateFromParams) || addDays(new Date(), 2),
  });

  const [selectedLocation, setSelectedLocation] = useState<number | undefined>(() => locationIdFromParams ? Number(locationIdFromParams) : undefined);
  const [locationError, setLocationError] = useState<string>();

  const [bookInfo, setBookInfo] = useState({
    adults: 1,
    children: 0,
    rooms: 1,
  });

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [loading, setLoading] = useState(false); // Added loading state

  const handleFleetsFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true); // Start loading
    setDropdownOpen(false);

    if (!selectedLocation) {
      setLocationError("Please select a location");
      setTimeout(() => setLocationError(undefined), 2000);
      setLoading(false); // Stop loading
      return;
    }

    const queryParams = qs.stringify(
      {
        location_id: selectedLocation || undefined,
        start: dateRange.from?.toISOString().split("T")[0],
        end: dateRange.to?.toISOString().split("T")[0],
        ...bookInfo,
      },
      {
        skipNulls: true,
        addQueryPrefix: true,
      }
    );

    router.push(`/fleets${queryParams}`);

    // Simulating loading for 2 seconds, remove in production
    setTimeout(() => {
      setLoading(false); // Stop loading after 2 seconds
    }, 2000);
  };

  return (
    <div className="w-full">

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
          <MemberInput
            label="Rooms"
            value={bookInfo.rooms}
            onChange={(value) =>
              setBookInfo((prev) => ({ ...prev, rooms: value }))
            }
            min={1}
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
        <form
          onSubmit={handleFleetsFormSubmit}
          className="flex lg:flex-row flex-col items-start justify-start gap-2 "
        >
          {/* Destination */}
          <SearchLocation error={locationError} locationId={selectedLocation} placeholder="Search location..." initialLocations={locations}
            onChangeValue={setSelectedLocation}
          />

          {/* Check-in, Nights, Check-out Container */}
          <div className="md:w-5/12 w-full">
            <DatePickerWithRange
              dateRange={dateRange}
              setDateRange={setDateRange}
            />
          </div>

          {/* Rooms and Guests */}
          <div className="relative border rounded-md flex-1 py-1 px-2 w-full">
            <p className="text-sm text-gray-500 font-semibold">
              Rooms and Guests
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
              {bookInfo.rooms} Rooms
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
                <MemberInput
                  label="Rooms"
                  value={bookInfo.rooms}
                  onChange={(value) =>
                    setBookInfo((prev) => ({ ...prev, rooms: value }))
                  }
                  min={1}
                />

                <Button
                  type="button"
                  className="w-full mt-2 bg-primary text-white rounded-md"
                  onClick={() => setDropdownOpen(false)}
                >
                  Done
                </Button>
              </div>
            )}
          </div>

          {/* Search Button */}
          <Button
            type="submit"
            className="gap-2 px-4 pt-2 py-7 md:w-32 w-full text-md font-semibold text-white"
            disabled={loading} // Disabling button when loading
          >

            <Search className="h-4 w-4" />
            {loading ? "Searching..." : "Search"}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default FLeetsSearchForm;
