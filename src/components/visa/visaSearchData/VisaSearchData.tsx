import React from "react";
import { getAllLocations } from "@/lib/actions/location-action";
import VisaSearchForm from "@/components/packageSearchForms/VisaSearchForm";

const VisaSearchData = async () => {
    // Fetch locations on the server
    const { data: locations } = await getAllLocations({ page: 1, per_page: 10 });

    return <VisaSearchForm locations={locations} />;
};

export default VisaSearchData;
