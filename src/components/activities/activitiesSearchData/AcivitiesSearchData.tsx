import React from "react";
import { getAllLocations } from "@/lib/actions/location-action";
import ActivitiesSearchForm from "@/components/packageSearchForms/ActivitiesSearchForm";

const ActivitiesSearchData = async () => {
    // Fetch locations on the server
    const { data: locations } = await getAllLocations({ page: 1, per_page: 10 });

    return <ActivitiesSearchForm locations={locations} />;
};

export default ActivitiesSearchData;
