import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card } from "@/components/ui/card";
import { LandPlot } from "lucide-react";
import React from "react";
import Itinerary from "@/components/umrah/umrahDetails/Itinerary";
import ImportantNotes from "@/components/umrah/umrahDetails/Notes";
import PackageExcludes from "@/components/umrah/umrahDetails/PackageExclueds";
import PackageIncludes from "@/components/umrah/umrahDetails/PackageIncludes";
import UmrahHotel from "@/components/umrah/umrahDetails/UmrahHotel";
import TourOverview from "@/components/tour/tourDetails/Overview";

const UmrahVisaDoc = ({umrahtabsData}:any) => {

  return (
    <div>
      <div className="pt-5">
        <TourOverview overview={umrahtabsData?.content} />
      </div>
      <div className="pt-5">
        <Card className="w-full border-none">
          <Accordion
            type="single"
            collapsible
            defaultValue="policies"
            className="border-none"
          >
            <AccordionItem value="policies" className="border-none">
              <AccordionTrigger className="px-6 py-4 hover:no-underline">
                <div className="flex items-center gap-2">
                  <LandPlot color="blue" className="h-5 w-5" />
                  <span className="text-base font-bold">Documents</span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="px-6 pb-6">
                <div className="grid gap-4">
                  <div
                    className="grid gap-4"
                    dangerouslySetInnerHTML={{ __html: umrahtabsData?.short_desc }}
                  />
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </Card>
      </div>
      <div className="pt-5">
        <ImportantNotes notes={umrahtabsData?.note}/>
      </div>
      <div className="pt-5">
        <PackageIncludes includes={umrahtabsData?.include} />
        <PackageExcludes excludes={umrahtabsData?.exclude} />
      </div>
      <div className="pt-5">
        <Itinerary itineraryData={umrahtabsData?.itinerary} />
      </div>
      <div className="pt-5">
        <UmrahHotel hotels={umrahtabsData.hotel} hotelBed={umrahtabsData?.hotel_bed} hotelServiceIncluding={umrahtabsData?.hotel_service_including}  />
      </div>
    </div>
  );
};

export default UmrahVisaDoc;
