"use client";
import { Button } from "@/components/ui/button";
import { Location } from "@/lib/actions/location-action";
import { Search } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import SearchLocation from "@/components/filter/search-location";

const A2aVisaSearchForm = ({ locations = [] }: { locations: Location[] }) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const fromLocationIdFromParams = searchParams.get("from_where");
  const toLocationIdFromParams = searchParams.get("to_where");

  const [fromLocation, setFromLocation] = useState<number | undefined>(() => fromLocationIdFromParams ? Number(fromLocationIdFromParams) : undefined);
  const [toLocation, setToLocation] = useState<number | undefined>(() => toLocationIdFromParams ? Number(toLocationIdFromParams) : undefined);

  const [locationFromError, setLocationFromError] = useState<string>();
  const [locationToError, setLocationToError] = useState<string>();

  const [loading, setLoading] = useState(false); // Add loading state

  const handleA2aVisaFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true); // Set loading to true when the form is submitted

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
        setLoading(false); // Reset loading state
      }, 2000);
      return;
    }

    const queryParams = new URLSearchParams();
    if (fromLocation) queryParams.set("from_where", fromLocation.toString());
    if (toLocation) queryParams.set("to_where", toLocation.toString());

    router.push(`/a2a-visa${queryParams.toString() ? `?${queryParams}` : ""}`);

    // Simulate a loading period (e.g., API call) - Remove in production
    setTimeout(() => {
      setLoading(false); // Reset loading after the simulated time
    }, 2000);
  };

  return (
    <div className="w-full m-auto">
      <div className="p-3 bg-white border rounded-lg rounded-t-none md:mx-0">
        <form
          onSubmit={handleA2aVisaFormSubmit}
          className="flex lg:flex-row flex-col items-start justify-start gap-2"
        >
          <SearchLocation
            error={locationFromError}
            locationId={fromLocation}
            desabledId={toLocation}
            placeholder="Search location..."
            initialLocations={locations}
            onChangeValue={setFromLocation}
          />

          <SearchLocation
            error={locationToError}
            locationId={toLocation}
            desabledId={fromLocation}
            placeholder="Search location..."
            initialLocations={locations}
            onChangeValue={setToLocation}
          />

          {/* Search Button */}
          <Button
            type="submit"
            className="gap-2 px-4 pt-2 h-[50px] md:w-32 w-full text-md font-semibold text-white"
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

export default A2aVisaSearchForm;
