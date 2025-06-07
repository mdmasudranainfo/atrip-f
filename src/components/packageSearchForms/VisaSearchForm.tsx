"use client";
import { Button } from "@/components/ui/button";
import { Location } from "@/lib/actions/location-action";
import { Search } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import SearchLocation from "@/components/filter/search-location";

const VisaSearchForm = ({ locations = [] }: { locations: Location[] }) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const fromLocationIdFromParams = searchParams.get("from_where");
  const toLocationIdFromParams = searchParams.get("to_where");

  const [fromLocation, setFromLocation] = useState<number | undefined>(
    () => (fromLocationIdFromParams ? Number(fromLocationIdFromParams) : undefined)
  );
  const [toLocation, setToLocation] = useState<number | undefined>(
    () => (toLocationIdFromParams ? Number(toLocationIdFromParams) : undefined)
  );

  const [locationFromError, setLocationFromError] = useState<string>();
  const [locationToError, setLocationToError] = useState<string>();

  const [loading, setLoading] = useState<boolean>(false); // Loading state

  const handleVisaFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true); // Start loading when form is submitted

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
      setLoading(false); // Stop loading after validation
      return;
    }

    const queryParams = new URLSearchParams();
    if (fromLocation) queryParams.set("from_where", fromLocation.toString());
    if (toLocation) queryParams.set("to_where", toLocation.toString());

    // Simulate a delay for the API request or form submission
    setTimeout(() => {
      router.push(`/visa${queryParams.toString() ? `?${queryParams}` : ""}`);
      setLoading(false); // Stop loading after submission
    }, 2000); // Simulate a delay of 2 seconds
  };

  return (
    <div className="w-full m-auto">
      <div className="p-3 bg-white border rounded-lg rounded-t-none md:mx-0">
        <form
          onSubmit={handleVisaFormSubmit}
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
            className="gap-2 px-4 pt-2 py-7 md:w-32 w-full text-md font-semibold text-white"
            disabled={loading} // Disable button during loading
          >
            <Search className="h-4 w-4" />

            {loading ? " Searching..." : " Search"}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default VisaSearchForm;
