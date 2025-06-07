import React from 'react'
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import { Card } from "@/components/ui/card";
import { AppWindow } from "lucide-react";
import VisaDocuments from "@/components/visa/visaDetails/VisaDocuments";
import HowToApplyVisa from "@/components/visa/visaDetails/HowToApplyVisa";
import VisaTermsAndConditions from "@/components/visa/visaDetails/VisaTermsAndConditions";
import VisaFaq from "@/components/visa/visaDetails/VisaFaq";

const VisaOverview = ({tabData, title}:any) => {

    return (
        <div>
            <Card className="w-full border-none">
                <Accordion type="single" collapsible defaultValue="policies">
                    <AccordionItem value="policies" className="border-0">
                        <AccordionTrigger className="px-6 py-4 hover:no-underline">
                            <div className="flex items-center gap-2">
                                <AppWindow color="blue" className="h-5 w-5" />
                                <span className="text-base font-bold">{title} Online</span>
                            </div>
                        </AccordionTrigger>
                        <AccordionContent className="px-6 pb-6">
                            <div className="text-base font-normal leading-7" dangerouslySetInnerHTML={{ __html: tabData?.overview }} />
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>
            </Card >
            <div className='pt-5'>
                <VisaDocuments 
                    documents={tabData.documents}
                    title={tabData?.title}
                />
            </div>
            <div className='pt-5'>
                <HowToApplyVisa 
                    howToApply={tabData.how_to_apply}
                />
            </div>
            <div className='pt-5'>
                <VisaTermsAndConditions 
                    termsConditions={tabData.terms_conditions}
                />
            </div>
            <div className='pt-5'>
                <VisaFaq 
                    faqs={tabData.faqs}
                />
            </div>
        </div>
        
    )
}

export default VisaOverview