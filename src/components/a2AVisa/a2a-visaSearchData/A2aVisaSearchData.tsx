import React from "react";
import A2aVisaSearchForm from "@/components/packageSearchForms/A2aVisaSearchForm";
import { Location } from "@/lib/actions/location-action";

const A2aVisaSearchData = async ({selectedLocations}: {selectedLocations: Location[]}) => {
    return <A2aVisaSearchForm locations={selectedLocations} />;
};

export default A2aVisaSearchData;
