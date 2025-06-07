"use client";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ChevronDown, ChevronUp, Search } from "lucide-react";
import { MemberInput } from "../hotels/MemberInput/page";
import React from "react";
import { useRouter } from "next/navigation";

export default function UmrahSearchForm() {
  const [bookInfo, setBookInfo] = React.useState({
    adults: 1,
    children: 0,
    rooms: 1,
  });

  const [selectedTransport, setSelectedTransport] = React.useState("air");
  const [selectedPackage, setSelectedPackage] = React.useState("individual");

  const [dropdownOpen, setDropdownOpen] = React.useState(false);

  React.useEffect(() => {
    if (selectedPackage === "individual") {
      setBookInfo({ adults: 1, children: 0, rooms: 0 });
    } else if (selectedPackage === "group" || selectedPackage === "family") {
      setBookInfo({ adults: 1, children: 0, rooms: 1 });
    }
  }, [selectedPackage]);

  const router = useRouter();
  const handleUmrahFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const queryParams = new URLSearchParams({
      package: selectedPackage,
      transport: selectedTransport,
      adults: bookInfo.adults.toString(),
      children: bookInfo.children.toString(),
      rooms: bookInfo.rooms.toString(),
    });

    const url = `/umrah${queryParams.toString() ? `?${queryParams.toString()}` : ""
      }`;
    router.push(url);
  };

  return (
    <div className="md:mx-0 mx-3">
      <form
        onSubmit={handleUmrahFormSubmit}
        className="w-full bg-white rounded-[10px] rounded-t-none shadow-lg p-4 flex flex-col md:flex-row gap-4 items-start "
      >
        {/* Package Selection */}
        <div className="flex-1 !border !border-white-frosted h-[58px] px-3 py-1 rounded-lg w-full">
          <div className="text-sm text-dark-gray font-semibold">Package</div>
          <Select
            value={selectedPackage}
            onValueChange={(value) => setSelectedPackage(value)}
          >
            <SelectTrigger className="w-full !bg-transparent !outline-none !h-0 !py-4 font-bold mt-2 !px-0 !border-none !shadow-none !m-0 focus:!ring-0 focus:!ring-offset-0">
              <SelectValue placeholder="Group" className="text-dark" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="individual">Individual</SelectItem>
              <SelectItem value="family">Family</SelectItem>
              <SelectItem value="group">Group</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex-1 !border !border-white-frosted h-[58px] px-3 py-1 rounded-lg w-full">
          <div className="text-sm text-dark-gray font-semibold">Travel</div>
          <Select
            value={selectedTransport}
            onValueChange={setSelectedTransport}
          >
            <SelectTrigger className="w-full !bg-transparent !outline-none !h-0 !py-4 !px-0 font-bold mt-2 !border-none !shadow-none !m-0  focus:!ring-0 focus:!ring-offset-0">
              <SelectValue className="text-dark" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="air">By Air</SelectItem>
              <SelectItem value="train">By Train</SelectItem>
              <SelectItem value="bus">By Bus</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Rooms and Guests */}
        {selectedPackage !== "individual" && (
          <div className="relative border rounded-md flex-1 py-1 px-2 w-full">
            <p className="text-sm text-gray-500 font-semibold">
              Rooms and Guests
            </p>
            <button
              type="button"
              className="w-full text-left flex items-center justify-between px-2 py-1 focus:ring-0 focus:outline-none font-semibold text-dark text-sm"
              onClick={() => setDropdownOpen(!dropdownOpen)}
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
                {selectedPackage === "individual" && (
                  <MemberInput
                    label="Adults"
                    value={bookInfo.adults}
                    onChange={(value) =>
                      setBookInfo({ ...bookInfo, adults: value })
                    }
                    min={1}
                  />
                )}

                {(selectedPackage === "group" ||
                  selectedPackage === "family") && (
                    <>
                      <MemberInput
                        label="Adults"
                        value={bookInfo.adults}
                        onChange={(value) =>
                          setBookInfo({ ...bookInfo, adults: value })
                        }
                        min={1}
                      />
                      <MemberInput
                        label="Children"
                        value={bookInfo.children}
                        onChange={(value) =>
                          setBookInfo({ ...bookInfo, children: value })
                        }
                      />
                      <MemberInput
                        label="Rooms"
                        value={bookInfo.rooms}
                        onChange={(value) =>
                          setBookInfo({ ...bookInfo, rooms: value })
                        }
                        min={1}
                      />
                    </>
                  )}

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
        )}

        {/* <div className="flex items-end w-full"> */}
        <Button className="gap-2 px-4 pt-2 py-7 md:w-32 w-full text-md font-semibold text-white">
          <Search className="w-5 h-5 font-bold" />
          Search
        </Button>
        {/* </div> */}
      </form>
    </div>
  );
}
