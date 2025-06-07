"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { LandPlot, ShieldQuestion } from "lucide-react";

interface FAQItem {
  title: string;
  content: string;
}

export default function FAQAccordion({ faqs }: { faqs: string }) {
  const data = JSON.parse(faqs).map((item: FAQItem) => ({
    title: item.title.trim(),
    content: item.content.trim(),
  }));

  return (
    <div className="w-full bg-white border-t-2 py-8">
      <div className="px-4">
        <div className="flex items-center gap-2 mb-6 px-2">
          <ShieldQuestion
            color="blue"
            className="h-10 w-10 bg-blue-50 p-2 rounded-lg"
          />
          <h3 className="text-md font-bold text-[#1A1A1A]">
            Frequently Asked Questions
          </h3>
        </div>
        <Accordion type="single" collapsible className="space-y-4">
          {data?.map((faq: FAQItem, index: number) => (
            <AccordionItem
              key={index}
              value={`item-${index}`}
              className="rounded-2xl bg-white shadow border border-gray-100"
            >
              <AccordionTrigger className="flex justify-between items-center px-6 py-4 text-base font-semibold text-[#1A1A1A] hover:bg-blue-50 rounded-2xl transition">
                {faq.title}
              </AccordionTrigger>
              <AccordionContent className="px-6 pb-4 text-gray-600 text-[15px] leading-relaxed">
                {faq.content}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  );
}
