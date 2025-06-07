"use client";

import { Button } from "@/components/ui/button";
import { Location } from "@/lib/actions/location-action";
import { Search } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import SearchLocation from "@/components/filter/search-location";
import SearchEvents from "../filter/SearchEvents";
import SearchLocationWithType from "../filter/SearchLocationWithType";

const ActivitiesSearchForm = ({
  locations = [],
}: {
  locations: Location[];
}) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const locationIdFromParams = searchParams.get("location_id");
  const searchQuery = searchParams.get("service_name");

  const [selectedLocation, setSelectedLocation] = useState<number | undefined>(
    () => (locationIdFromParams ? Number(locationIdFromParams) : undefined)
  );
  const [searchInput, setSearchInput] = useState<string>(searchQuery || "");
  const [locationError, setLocationError] = useState<string>();
  const [loading, setLoading] = useState<boolean>(false); // Add loading state

  const handleActivitiesFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true); // Set loading to true when submitting

    const queryParams = new URLSearchParams(String(searchParams));
    if (selectedLocation) {
      queryParams.set("location_id", selectedLocation.toString());
    } else {
      queryParams.delete("location_id");
      setLocationError("Please select a location");
      setTimeout(() => setLocationError(undefined), 2000);
      setLoading(false); // Set loading to false when validation fails
      return;
    }

    if (searchInput) {
      queryParams.set("service_name", searchInput);
    } else {
      queryParams.delete("service_name");
    }

    // Simulate delay or actual API call
    await new Promise((resolve) => setTimeout(resolve, 2000)); // Simulate API delay

    router.push(
      `/activities${queryParams.toString() ? `?${queryParams}` : ""}`
    );

    setLoading(false); // Set loading to false after search is complete
  };

  return (
    <div className="w-full m-auto">
      <div className="p-3 bg-white border rounded-lg rounded-t-none md:mx-0">
        <form
          className="flex lg:flex-row flex-col items-start justify-start gap-2"
          onSubmit={handleActivitiesFormSubmit}
        >
          {/* Custom Input Field */}

          <SearchEvents />

          {/* <input
            type="text"
            className="md:flex-1 py-4 w-full border outline-none rounded-md px-3 font-bold text-dark text-[15px] placeholder:text-dark"
            placeholder="Name"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
          /> */}

          <SearchLocationWithType
            type="attraction"
            error={locationError}
            locationId={selectedLocation}
            placeholder="Search location..."
            initialLocations={locations}
            onChangeValue={setSelectedLocation}
          />
          {/* Search Button */}
          <Button
            type="submit"
            className="gap-2 px-4 pt-2 py-7 md:w-32 w-full text-md font-semibold text-white"
            disabled={loading} // Disable button while loading
          >
            <Search className="h-4 w-4 font-bold" />
            {loading ? "Searching..." : "Search"}{" "}
            {/* Change text based on loading state */}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default ActivitiesSearchForm;
