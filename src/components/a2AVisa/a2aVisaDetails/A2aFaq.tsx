import React from 'react'
import { CircleAlert } from "lucide-react";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import { Card } from "@/components/ui/card";

const A2aVisaFaq = ({faqs}:any) => {
    const faqsData = JSON.parse(faqs);
    return (
        <Card className="w-full border-none">
            <Accordion type="single" value="header" disabled>
                <AccordionItem value="header" className="border-0">
                    <AccordionTrigger className="px-6 py-4 hover:no-underline">
                        <div className="flex items-center gap-2">
                            <CircleAlert color="blue" className="h-10 w-10 bg-blue-100 p-2 rounded-lg" />
                            <span className="text-base font-bold">FAQs</span>
                        </div>
                    </AccordionTrigger>
                    <AccordionContent className="px-6 pb-6">
                        <Accordion type="single" collapsible className="w-full">
                            {faqsData && faqsData.length > 0 ? (
                                faqsData.map((faq:any, index: number) => (
                                    <AccordionItem key={index} value={`item-${index}`} className="border-0">
                                    <AccordionTrigger className="py-4 text-base leading-6 font-semibold hover:no-underline">
                                        {faq.title}
                                    </AccordionTrigger>
                                    <AccordionContent className="text-base font-normal">
                                        {faq.content}
                                    </AccordionContent>
                                    </AccordionItem>
                                ))
                            ) : (
                            <p className="text-gray-500">No FAQs available.</p>
                            )}
                        </Accordion>
                    </AccordionContent>
                </AccordionItem>
            </Accordion>
        </Card>
    )
}

export default A2aVisaFaq