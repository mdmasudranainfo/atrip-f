import { HelpCircle } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card } from "@/components/ui/card";
import { FAQ } from "@/types/tourTypes";

export default function TourFAQs({ faqs }: { faqs: FAQ[] }) {

  return (
    <Card className="w-full border-none">
      <Accordion type="single" value="header" collapsible>
        <AccordionItem value="header" className="border-0">
          <AccordionTrigger className="px-6 py-4 hover:no-underline">
            <div className="flex items-center gap-2">
              <HelpCircle className="h-5 w-5 text-blue-600" />
              <span className="text-base font-bold">FAQs</span>
            </div>
          </AccordionTrigger>
          <AccordionContent className="px-6 pb-6">
            <Accordion type="single" collapsible className="w-full">
              {faqs?.map((faq, index) => (
                <AccordionItem
                  key={index}
                  value={`item-${index}`}
                  className="border-0"
                >
                  <AccordionTrigger className="py-4 text-sm font-semibold hover:no-underline">
                    {faq?.title}
                  </AccordionTrigger>
                  <AccordionContent className="text-sm font-normal">
                    {faq?.content}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </Card>
  );
}
