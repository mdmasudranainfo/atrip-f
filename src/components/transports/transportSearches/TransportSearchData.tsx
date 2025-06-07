import React from "react";
import TransportsSearchForm from "@/components/packageSearchForms/TransportsSearchForm";
import { getAllLocations } from "@/lib/actions/location-action";

const TransportSearchData = async () => {
    // Fetch locations on the server
    const { data: locations } = await getAllLocations({ page: 1, per_page: 10 });

    return <TransportsSearchForm locations={locations} />;
};

export default TransportSearchData;
