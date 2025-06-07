import React from 'react'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { Card } from '@/components/ui/card'
import { AppWindowMac, CircleAlert, Dot, LandPlot } from 'lucide-react'

const VisaTermsAndConditions = ({termsConditions}:any) => {

    return (
        <Card className="w-full border-none">
            <Accordion type="single" collapsible defaultValue="policies">
                <AccordionItem value="policies" className="border-0">
                    <AccordionTrigger className="px-6 py-4 hover:no-underline">
                        <div className="flex items-center gap-2">
                        <CircleAlert color="blue" className="h-10 w-10 bg-blue-50 p-2 rounded-lg" />
                            <span className="text-lg leading-[26px] font-semibold">Visa Terms & Conditions</span>
                        </div>
                    </AccordionTrigger>
                    <AccordionContent className="px-6 pb-6 font-inter">
                        <div className="w-full ">
                            <div
                                className="text-base font-normal leading-7"
                                dangerouslySetInnerHTML={{ __html: termsConditions }}
                            />
                        </div>
                    </AccordionContent>
                </AccordionItem>
            </Accordion>
        </Card>
    )
}

export default VisaTermsAndConditions