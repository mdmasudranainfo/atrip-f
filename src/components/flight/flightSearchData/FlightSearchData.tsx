import FlightV2SearchForm from "@/components/packageSearchForms/FlightV2SearchForm";
import { getAllLocations } from "@/lib/actions/location-action";
import React, { Suspense } from "react";

const FlightSearchData = async () => {
  const { data: locations } = await getAllLocations({ page: 1, per_page: 10 });
  return <Suspense fallback={<div>Loading filters...</div>}>
    <FlightV2SearchForm locations={locations} />
  </Suspense>
    ;
};

export default FlightSearchData;
