import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card } from "@/components/ui/card";
import { LandPlot, MessageSquareX } from "lucide-react";

export default function CancelationPolicy({ cancelationPolicyData }: any) {
  const isArray = Array.isArray(cancelationPolicyData);
  return (
    <div className="w-full bg-white border-t-2">
      <Accordion type="single" collapsible>
        <AccordionItem value="policies" className="border-0">
          <AccordionTrigger className="px-6 py-4 hover:no-underline">
            <div className="flex items-center gap-2">
              <MessageSquareX
                color="blue"
                className="h-10 w-10 bg-blue-50 p-2 rounded-lg"
              />
              <span className="text-base font-bold">Cancellation policy</span>
            </div>
          </AccordionTrigger>
          <AccordionContent className="md:px-6 px-2 pb-6">
            {/* {!isArray && cancelationPolicyData ? (
                <div
                  className="text-base font-normal leading-7"
                  dangerouslySetInnerHTML={{ __html: cancelationPolicyData }}
                />
              ) : (
                <p className="text-gray-500">No information available.</p>
              )} */}

            <div className="w-full">
              <article className="prose prose-slate prose-lead:text-secondary-foreground dark:prose-invert xl:prose-md w-full mx-auto max-w-4xl">
                <div
                  className="font-normal leading-7"
                  dangerouslySetInnerHTML={{ __html: cancelationPolicyData }}
                />
              </article>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
