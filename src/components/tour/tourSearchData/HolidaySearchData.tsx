
import HolidaySearchForm from "@/components/packageSearchForms/HolidaySearchForm";
import { getAllLocations } from "@/lib/actions/location-action";
import React from "react";

const HolidaySearchData = async () => {
    // Fetch locations on the server
    const { data: locations } = await getAllLocations({ page: 1, per_page: 10 });

    return <HolidaySearchForm locations={locations} />;
};

export default HolidaySearchData;
