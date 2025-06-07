import HotelSearchForm from "@/components/packageSearchForms/HotelSearchForm";
import { getAllLocations } from "@/lib/actions/location-action";
import React, { Suspense } from "react";

const HotelSearchData = async () => {
  const { data: locations } = await getAllLocations({ page: 1, per_page: 10 });
  return <Suspense fallback={<div>Loading filters...</div>}>
    <HotelSearchForm locations={locations} />
  </Suspense>
    ;
};

export default HotelSearchData;
