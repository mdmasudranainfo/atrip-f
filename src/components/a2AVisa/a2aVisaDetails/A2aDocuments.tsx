import { AppWindow } from "lucide-react";
import type React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card } from "@/components/ui/card";
import HowToApplyA2aVisa from "@/components/a2AVisa/a2aVisaDetails/A2aApply";
import A2aVisaOverview from "@/components/a2AVisa/a2aVisaDetails/A2aOverview";
import A2aVisaFaq from "@/components/a2AVisa/a2aVisaDetails/A2aFaq";
import A2aVisaTermsAndConditions from "@/components/a2AVisa/a2aVisaDetails/A2aT&C";

export default function A2aVisaDocuments({tabData, title}:any) {
  
  return (
    <div>
      <div className='pt-5'>
        <A2aVisaOverview 
            overview={tabData?.overview}
            title={tabData?.title}
        />
      </div>
      <div className='pt-5'>
        <Card className="w-full border-none">
          <Accordion type="single" collapsible defaultValue="policies">
            <AccordionItem value="policies" className="border-0">
              <AccordionTrigger className="px-6 py-4 hover:no-underline">
                <div className="flex items-center gap-2">
                  <AppWindow color="blue" className="h-10 w-10 bg-blue-50  p-2 rounded-lg" />
                  <span className="text-base font-bold">{title} Documents</span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="px-6 pb-6">
                <div className="w-full max-w-2xl space-y-8">
                  <div
                    className="text-base font-normal leading-7"
                    dangerouslySetInnerHTML={{ __html: tabData?.documents }}
                  />
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </Card>
      </div>
      <div className='pt-5'>
          <HowToApplyA2aVisa 
              howToApply={tabData?.how_to_apply}
          />
      </div>
      <div className='pt-5'>
          <A2aVisaTermsAndConditions 
              termsConditions={tabData?.terms_conditions}
          />
      </div>
      <div className='pt-5'>
          <A2aVisaFaq 
              faqs={tabData?.faqs}
          />
      </div>
    </div>
  );
}

