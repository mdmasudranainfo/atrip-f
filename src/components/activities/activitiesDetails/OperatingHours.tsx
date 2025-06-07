import { AppWindowMac, BetweenVerticalStart } from "lucide-react";
import { Card } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function OperatingHours({ data, operatingHours }: any) {
  return (
    <div className="w-full bg-white border-t-2 ">
      <Accordion type="single" collapsible>
        <AccordionItem value="policies" className="border-0">
          <AccordionTrigger className="px-6 py-4 hover:no-underline">
            <div className="flex items-center gap-2">
              <BetweenVerticalStart
                color="blue"
                className="h-10 w-10 bg-blue-50 p-2 rounded-lg"
              />
              <span className="text-lg leading-[26px] font-semibold">
                Operating Hours
              </span>
            </div>
          </AccordionTrigger>
          <AccordionContent className="px-7 pb-6 font-inter">
            <div className="w-full ">
              <h3 className=" font-semibold text-dark mb-4">{data}</h3>
              <ul className="space-y-4 w-full sm:w-6/12">
                {operatingHours?.map(
                  (
                    feature: { weekday: string; time: string | null },
                    index: number
                  ) => (
                    <li
                      key={index}
                      className="md:text-[18px]  flex items-start justify-between text-dark font-normal hover:font-semibold  "
                    >
                      <span className=" leading-7">{feature.weekday}</span>
                      <span className=" leading-7">
                        {feature.time ? feature.time : "Closed"}
                      </span>
                    </li>
                  )
                )}
              </ul>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
