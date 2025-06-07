import MapIframe from "@/components/map/map-iframe";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card } from "@/components/ui/card";
import { console } from "inspector";
import { LandPlot, MapPinned } from "lucide-react";

export default function ActivitiesMap({
  address,
  lat,
  lng,
}: {
  address: string;
  lat: string;
  lng: string;
}) {
  if (!lat || !lng) return;

  return (
    <div className="w-full bg-white border-t-2">
      <Accordion type="single" collapsible>
        <AccordionItem value="policies" className="border-0">
          <AccordionTrigger className="px-6 py-4 hover:no-underline">
            <div className="flex items-center gap-2">
              <MapPinned
                color="blue"
                className="h-10 w-10 bg-blue-50 p-2 rounded-lg"
              />
              <span className="text-base font-bold">Location Map</span>
            </div>
          </AccordionTrigger>
          <AccordionContent className="px-6 pb-6">
            {address}
            <MapIframe lat={lat} lng={lng} />
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
