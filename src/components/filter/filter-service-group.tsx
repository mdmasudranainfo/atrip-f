"use client";

import { useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { icons } from "~/public/icons/icons";
import { CarFront, Plane } from "lucide-react";
import { PiBuildingApartment } from "react-icons/pi";
import { BsPassport } from "react-icons/bs";
import UmrahSearchForm from "@/components/packageSearchForms/UmrahSearchForm";
import ChauffeurSearchForm from "@/components/packageSearchForms/ChauffeurSearchForm";
import { Location } from "@/lib/actions/location-action";
import FlightV2SearchForm from "@/components/packageSearchForms/FlightV2SearchForm";
import CarsSearchForm from "@/components/packageSearchForms/CarsSearchForm";
import VisaSearchForm from "@/components/packageSearchForms/VisaSearchForm";
import HotelSearchForm from "@/components/packageSearchForms/HotelSearchForm";
import HolidaySearchForm from "@/components/packageSearchForms/HolidaySearchForm";
import ActivitiesSearchForm from "@/components/packageSearchForms/ActivitiesSearchForm";
import TransportsSearchForm from "@/components/packageSearchForms/TransportsSearchForm";
import CarWithDeiverSearchForm from "@/components/packageSearchForms/CarWithDeiverSearchForm";
import A2aVisaSearchForm from "@/components/packageSearchForms/A2aVisaSearchForm";
import Link from "next/link";
import { removeSessionData } from "@/utils/sessionCache";

export default function FilterServiceGroup({
  selectedLocations,
  label,
  defaultValue,
}: {
  selectedLocations: Location[];
  label?: string;
  defaultValue: string;
}) {
  const [slug, setSlug] = useState("");

  useEffect(() => {
    const urlPath = window.location.pathname.replace("/", "");
    setSlug(urlPath);
  }, []);

  return (
    <div
      className={`filter-area w-full container pb-32 sm:pb-10 pt-0 m-auto relative page-${slug}`}
    >
      <div className="m-auto">
        {!!label && (
          <h1 className="mt-10 mb-2 text-2xl sm:text-5xl font-bold text-white mx-3 md:mx-0">
            {label}
          </h1>
        )}
        <div className=" w-full mx-auto md:mt-5">
          <Tabs defaultValue={defaultValue} className=" w-full mx-auto">
            <TabsList
              className={`page-main-tablist flex lg:mx-auto flex-row items-start lg:items-center gap-4 lg:gap-10 py-2 px-3 bg-primary-dark text-white rounded-b-none `}

              // ${defaultValue === "activities" ? "hidden" : ""}
            >
              <div className="md:grid grid-cols-8 flex xsm: w-full md:overflow-hidden overflow-x-auto md:pb-0 pb-2 md:gap-0 gap-[22px]">
                <TabsTrigger
                  className="h-[46px] cursor-default flex items-center lg:justify-center justify-start gap-2 font-semibold text-sm leading-4 tracking-tight"
                  value="activities"
                >
                  <Link
                    onClick={() => removeSessionData("activitiesData")}
                    href={"/activities"}
                    className="flex items-center gap-1"
                  >
                    <span>{icons.activitiesIcon}</span>
                    Attractions
                  </Link>
                </TabsTrigger>

                <TabsTrigger
                  className="h-[46px] cursor-default flex items-center lg:justify-center justify-start gap-2 font-semibold text-sm leading-4 tracking-tight"
                  value="transports"
                >
                  <Link
                    onClick={() => removeSessionData("transportData")}
                    href={"/transports"}
                    className="flex items-center gap-1"
                  >
                    <span>{icons.transportIcon}</span>
                    Transport
                  </Link>
                </TabsTrigger>

                {/* <TabsTrigger
                  className="h-[46px] flex items-center lg:justify-center justify-start gap-2 font-semibold text-sm leading-4 tracking-tight"
                  value="holiday"
                >
                  <span>{icons.holidayIcon}</span>
                  Holiday
                </TabsTrigger>
                <TabsTrigger
                  className="h-[46px] flex items-center lg:justify-center justify-start gap-2 font-semibold text-sm leading-4 tracking-tight"
                  value="hotel"
                >
                  <span>
                    <PiBuildingApartment size={22} />
                  </span>
                  Hotel
                </TabsTrigger>
                <TabsTrigger
                  className="h-[46px] flex items-center lg:justify-center justify-start gap-2 font-semibold text-sm leading-4 tracking-tight"
                  value="visa"
                >
                  <span>
                    <BsPassport size={22} />
                  </span>
                  Visa
                </TabsTrigger>
                <TabsTrigger
                  className="h-[46px] flex items-center lg:justify-center justify-start gap-2 font-semibold text-sm leading-4 tracking-tight"
                  value="cars"
                >
                  <span>
                    <CarFront className=" w-[22px] h-[22px]" />
                  </span>
                  Cars
                </TabsTrigger>
                <TabsTrigger
                  className="h-[46px] flex items-center lg:justify-center justify-start gap-2 font-semibold text-sm leading-4 tracking-tight"
                  value="flight"
                >
                  <span>
                    <Plane className=" h-[22] w-[22]" />
                  </span>{" "}
                  Flight
                </TabsTrigger>
                <TabsTrigger
                  className="h-[46px] flex items-center lg:justify-center justify-start gap-2 font-semibold text-sm leading-4 tracking-tight"
                  value="umrah"
                >
                  <span>{icons.umrahIcon}</span>
                  Umrah
                </TabsTrigger>
                <TabsTrigger
                  className="h-[46px] flex items-center lg:justify-center justify-start gap-2 font-semibold text-sm leading-4 tracking-tight"
                  value="chauffeur"
                >
                  <span>{icons.carDriverIcon}</span>
                  Chauffeur
                </TabsTrigger> */}
              </div>
            </TabsList>
            {/* <MobileMenuSlider /> */}
            <div className="container mx-auto !px-0">
              <TabsContent className="h-28 mt-0 text-dark" value="activities">
                <ActivitiesSearchForm locations={selectedLocations} />
              </TabsContent>
              <TabsContent className="h-28 mt-0 text-dark" value="Transport">
                <TransportsSearchForm locations={selectedLocations} />
              </TabsContent>
              <TabsContent className="h-28 mt-0 text-dark" value="holiday">
                <HolidaySearchForm locations={selectedLocations} />
              </TabsContent>
              <TabsContent className="h-28 mt-0 text-dark" value="hotel">
                <HotelSearchForm locations={selectedLocations} />
              </TabsContent>
              <TabsContent className="h-28 mt-0 text-dark" value="visa">
                <VisaSearchForm locations={selectedLocations} />
              </TabsContent>
              <TabsContent className="h-28 mt-0 text-dark" value="cars">
                <CarsSearchForm locations={selectedLocations} />
              </TabsContent>
              <TabsContent className="h-28 mt-0 text-dark" value="flight">
                <FlightV2SearchForm locations={selectedLocations} />
              </TabsContent>
              <TabsContent className="h-28 mt-0 text-dark" value="umrah">
                <UmrahSearchForm />
              </TabsContent>
              <TabsContent className="h-28 mt-0" value="chauffeur">
                <ChauffeurSearchForm locations={selectedLocations} />
              </TabsContent>
              <TabsContent className="h-28 mt-0" value="transports">
                <TransportsSearchForm locations={selectedLocations} />
              </TabsContent>
              <TabsContent className="h-28 mt-0" value="chauffeur-with-car">
                <CarWithDeiverSearchForm locations={selectedLocations} />
              </TabsContent>
              <TabsContent className="h-28 mt-0" value="a2a-visa">
                <A2aVisaSearchForm locations={selectedLocations} />
              </TabsContent>
            </div>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
