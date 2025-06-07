import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card } from "@/components/ui/card";
import { LandPlot } from "lucide-react";
import React from "react";

const Essentials = ({ essential }: { essential?: string }) => {
  return (
    <Card className="w-full border-none">
      <Accordion
        type="single"
        collapsible
        defaultValue="policies"
        className="border-none"
      >
        <AccordionItem value="policies" className="border-none">
          <AccordionTrigger className="px-6 pt-4 hover:no-underline">
            <div className="flex items-center gap-2">
              <LandPlot color="blue" className="h-5 w-5" />
              <span className="text-base font-bold">
                Pre-Pick-Up Essentials
              </span>
            </div>
          </AccordionTrigger>
          <AccordionContent className="px-6 pb-6">
            <div className="grid gap-4">
              {essential && essential.trim() ? (
                <div
                  className="text-sm font-normal leading-7"
                  dangerouslySetInnerHTML={{ __html: essential }}
                ></div>
              ) : (
                <p className="text-gray-500">Loading...</p>
              )}
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </Card>
  );
};

export default Essentials;
