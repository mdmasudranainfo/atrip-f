"use client";
import { Button } from "@/components/ui/button";
import { Location } from "@/lib/actions/location-action";
import { addDays } from "date-fns";
import { ChevronDown, ChevronUp, Search } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useState } from "react";
import { MemberInput } from "../hotels/MemberInput/page";
import { DatePickerWithRange } from "./date-time-range-picker/DatePickerWithRange";
import { parseUrlStrDate } from "@/lib/utils";
import SearchLocation from "@/components/filter/search-location";
import { useMediaQuery } from '@mantine/hooks';
import { FaXmark } from "react-icons/fa6";

const HotelSearchForm = ({ locations = [] }: { locations: Location[] }) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const locationIdFromParams = searchParams.get("location_id");
  const startDateFromParams = searchParams.get("start");
  const endDateFromParams = searchParams.get("end");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [loader, setLoader] = useState(false);
  const [openRoomsDrawer, setOpenRoomsDrawer] = useState(false);
  const isMobileDevice = useMediaQuery('(max-width: 575px)');


  const [dateRange, setDateRange] = useState<{ from: Date; to: Date }>({
    from: parseUrlStrDate(startDateFromParams) || new Date(),
    to: parseUrlStrDate(endDateFromParams) || addDays(new Date(), 2),
  });

  const [selectedLocation, setSelectedLocation] = useState<number | undefined>(() => locationIdFromParams ? Number(locationIdFromParams) : undefined);
  const [locationError, setLocationError] = useState<string>()
  const [loading, setLoading] = useState<boolean>(false); // Loading state

  const [bookInfo, setBookInfo] = useState({
    adults: 1,
    children: 0,
    rooms: 1,
  });

  // const handleHotelFormSubmit = (e: React.FormEvent) => {
  //   e.preventDefault();
  //   setLoader(true);
  //   setDropdownOpen(false);

  //   if (!selectedLocation) {
  //     setLocationError("Please select a location");
  //     setTimeout(() => setLocationError(undefined), 2000);
  //     setLoader(false);
  //     return;
  //   }

  //   try {
  //     const queryParams = new URLSearchParams();

  //     const params: Record<string, string | number | undefined> = {
  //       location_id: selectedLocation,
  //       start: dateRange.from?.toLocaleDateString(),
  //       end: dateRange.to?.toLocaleDateString(),
  //       adults: bookInfo.adults,
  //       children: bookInfo.children,
  //       rooms: bookInfo.rooms,
  //     };

  //     Object.entries(params).forEach(([key, value]) => {
  //       if (value !== undefined) queryParams.append(key, value.toString());
  //     });

  //     if (!selectedLocation) {
  //       setLocationError("Please select a location");
  //       setTimeout(() => setLocationError(undefined), 2000);

  //       setLoader(false)
  //       return;
  //     }
  //     router.push(`/hotels${queryParams.toString() ? `?${queryParams}` : ""}`);
  //   } catch (error) {
  //     console.error("Error submitting hotel form:", error);
  //   } finally {
  //     setLoader(false);
  //   }
  // };

  const handleHotelFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoader(true);
    setDropdownOpen(false);

    if (!selectedLocation) {
      setLocationError("Please select a location");
      setTimeout(() => setLocationError(undefined), 2000);
      setLoader(false);
      return;
    }

    try {
      const queryParams = new URLSearchParams();

      const params: Record<string, string | number | undefined> = {
        location_id: selectedLocation,
        start: dateRange.from?.toLocaleDateString(),
        end: dateRange.to?.toLocaleDateString(),
        adults: bookInfo.adults,
        children: bookInfo.children,
        rooms: bookInfo.rooms,
      };

      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined) queryParams.append(key, value.toString());
      });

      if (!selectedLocation) {
        setLocationError("Please select a location");
        setTimeout(() => setLocationError(undefined), 2000);
        setLoader(false);
        return;
      }

      router.push(`/hotels${queryParams.toString() ? `?${queryParams}` : ""}`);

      // Simulate API call delay (remove in real implementation)
      await new Promise((resolve) => setTimeout(resolve, 2000));

    } catch (error) {
      console.error("Error submitting hotel form:", error);
    } finally {
      setLoader(false);
    }
  };



  return (
    <div className="w-full ">
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

      <div className="landing-page-hotel-filter-area p-3 bg-white border rounded-lg rounded-t-none md:mx-0">
        <form
          onSubmit={handleHotelFormSubmit}
          className="hotel-filter-form flex flex-col md:flex-row items-start justify-start gap-2"
        >

          <SearchLocation error={locationError} locationId={selectedLocation} placeholder="Search location..." initialLocations={locations}
            onChangeValue={setSelectedLocation}
          />

          {/* Date Picker */}
          <div className="hotel-filter-datepicker w-full flex-1">
            <DatePickerWithRange
              dateRange={dateRange}
              setDateRange={setDateRange}
            />
          </div>

          {/* Rooms and Guests */}
          <div className="hotel-filter-roomguests relative border rounded-md flex-1 py-1 px-2 w-full">
            <div>
              <button
                type="button"
                className="hotel-room-counter w-full text-left flex items-center justify-between px-2 py-1 focus:ring-0 focus:outline-none font-semibold text-dark text-sm"
                onClick={() => {
                  if (isMobileDevice) {
                    setOpenRoomsDrawer(true);
                  } else {
                    setDropdownOpen(!dropdownOpen);
                  }
                }}
              >
                <div>
                  <p className="font-semibold text-dark text-sm">Rooms</p>
                  {bookInfo.rooms} Rooms
                </div>
                <div className="divider w-px h-10 bg-gray-300"></div>
                <div>
                  <p className="font-semibold text-dark text-sm">Adults</p>
                  {bookInfo.adults} Adults
                </div>
                <div className="divider w-px h-10 bg-gray-300"></div>
                <div>
                  <p className="font-semibold text-dark text-sm">Children</p>
                  {bookInfo.children} Children
                </div>
                <div className="dropdown-arrow">
                  {dropdownOpen ? (
                    <ChevronUp className="w-4 h-4" />
                  ) : (
                    <ChevronDown className="w-4 h-4" />
                  )}
                </div>
              </button>
            </div>

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
            className="hotel-filter-serch-btn gap-2 px-4 pt-2 py-7 md:w-32 w-full text-md font-semibold text-white"
            disabled={loading} // Disable button during loading
          >
            <Search className="h-4 w-4" />
            {loading ? "Searching..." : "Search"}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default HotelSearchForm;
