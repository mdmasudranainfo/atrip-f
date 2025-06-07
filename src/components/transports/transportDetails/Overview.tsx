import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card } from "@/components/ui/card";
import { LandPlot } from "lucide-react";
import TransportFAQs from "@/components/transports/transportDetails/TransportFaq";
import Essentials from "@/components/transports/transportDetails/Essentials";
import GreatChoice from "@/components/transports/transportDetails/GreatChoice";
import Included from "@/components/transports/transportDetails/Include";

const TransportOverview = ({ transportData }: { transportData: any }) => {
  return (
    <div>
      <Card className="w-full border-none">
        <Accordion type="single" collapsible defaultValue="policies">
          <AccordionItem value="policies" className="border-none">
            <AccordionTrigger className="px-6 py-4 hover:no-underline">
              <div className="flex items-center gap-2">
                <LandPlot color="blue" className="h-5 w-5" />
                <span className="text-base font-bold">Overview</span>
              </div>
            </AccordionTrigger>
            <AccordionContent className="px-6 pb-6">
              <div className="grid gap-4">
                <div
                  className="text-sm font-normal leading-7"
                  dangerouslySetInnerHTML={{ __html: transportData?.content }}
                ></div>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </Card>
      <div className='pt-5'>
        <GreatChoice 
          greatChoice={transportData?.great_choice}
        />
      </div>
      <div className='pt-5'>
          <Included
              include={transportData?.include}
          />
      </div>
      <div className='pt-5'>
          <Essentials
            essential={transportData?.pre_pick_up}
          />
      </div>
      <div className='pt-5'>
        <TransportFAQs 
          faqs={transportData?.faqs}
        />
      </div>
    </div>
  );
};

export default TransportOverview;
