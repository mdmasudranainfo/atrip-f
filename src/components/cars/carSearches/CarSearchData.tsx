import React from "react";
import CarsSearchForm from "@/components/packageSearchForms/CarsSearchForm";
import { getAllLocations } from "@/lib/actions/location-action";

const CarSearchData = async () => {
    // Fetch locations on the server
    const { data: locations } = await getAllLocations({ page: 1, per_page: 10 });

    return <CarsSearchForm locations={locations} />;
};

export default CarSearchData;
