import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card } from "@/components/ui/card";
import { IncludeExclude, IncludeExcludeProps } from "@/types/tourTypes";
import { LandPlot, X } from "lucide-react";

export default function IncludeAndExcludes({ includes, excludes }: IncludeExcludeProps) {
  return (
    <Card className="w-full border-none shadow-none">
      <Accordion type="single" collapsible defaultValue="policies">
        <AccordionItem value="policies" className="border-0">
          <AccordionTrigger className="px-6 py-4 hover:no-underline">
            <div className="flex items-center gap-2">
              <LandPlot color="blue" className="h-5 w-5" />
              <span className="text-base font-bold">Package Includes</span>
            </div>
          </AccordionTrigger>
          {includes?.map((include: IncludeExclude) => (
            <AccordionContent className="px-6 pb-6" key={include?.title}>
              <div className="grid gap-4">
                <div className="flex items-center gap-2 font-medium text-sm">
                  <X size={18} />
                  <span className="">{include?.title}</span>
                </div>
              </div>
            </AccordionContent>
          ))}
        </AccordionItem>
      </Accordion>
      {/*  */}
      <Accordion type="single" collapsible defaultValue="policies">
        <AccordionItem value="policies" className="border-0">
          <AccordionTrigger className="px-6 py-4 hover:no-underline">
            <div className="flex items-center gap-2">
              <LandPlot color="blue" className="h-5 w-5" />
              <span className="text-base font-bold">Package Excludes</span>
            </div>
          </AccordionTrigger>
          {excludes?.map((exclude: IncludeExclude) => (
            <AccordionContent className="px-6 pb-6" key={exclude?.title}>
              <div className="grid gap-4">
                <div className="flex items-center gap-2 font-medium text-sm">
                  <X size={18} />
                  <span className="">{exclude?.title}</span>
                </div>
              </div>
            </AccordionContent>
          ))}
        </AccordionItem>
      </Accordion>
    </Card>
  );
}
