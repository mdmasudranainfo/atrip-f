import React from 'react'
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import { Card } from "@/components/ui/card";
import { AppWindow } from "lucide-react";

const A2aVisaOverview = ({overview, title}:any) => {
    
    return (
        <Card className="w-full border-none">
            <Accordion type="single" collapsible defaultValue="policies">
                <AccordionItem value="policies" className="border-0">
                    <AccordionTrigger className="px-6 py-4 hover:no-underline">
                        <div className="flex items-center gap-2">
                            <AppWindow color="blue" className="h-10 w-10 bg-blue-50  p-2 rounded-lg" />
                            <span className="text-base font-bold">{title}</span>
                        </div>
                    </AccordionTrigger>
                    <AccordionContent className="px-6 pb-6">
                        <div className="text-base font-normal leading-7" dangerouslySetInnerHTML={{ __html: overview }} />
                    </AccordionContent>
                </AccordionItem>
            </Accordion>
        </Card >
    )
}

export default A2aVisaOverview