import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card } from "@/components/ui/card";
import { LandPlot, X } from "lucide-react";

export default function PackageExcludes({excludes}:any) {
  return (
    <Card className="w-full border-none shadow-none">
      <Accordion type="single" collapsible defaultValue="policies">
        <AccordionItem value="policies" className="border-0">
          <AccordionTrigger className="px-6 py-4 hover:no-underline">
            <div className="flex items-center gap-2">
              <LandPlot color="blue" className="h-5 w-5" />
              <span className="text-base font-bold">Package Excludes</span>
            </div>
          </AccordionTrigger>
          {excludes?.map((exclude: any) => (
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
