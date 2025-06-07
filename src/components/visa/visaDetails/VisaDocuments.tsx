import {
  ArrowDownWideNarrow,
  Baby,
  Calendar,
  Clock,
  PawPrint,
  Users,
} from "lucide-react";
import type React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card } from "@/components/ui/card";


export default function VisaDocuments({documents, title}:any) {
  return (
    <Card className="w-full border-none">
      <Accordion type="single" collapsible defaultValue="policies">
        <AccordionItem value="policies" className="border-0">
          <AccordionTrigger className="px-6 py-4 hover:no-underline">
            <div className="flex items-center gap-2">
              <ArrowDownWideNarrow className="h-5 w-5" />
              <span className="text-base font-bold">{title} Documents</span>
            </div>
          </AccordionTrigger>
          <AccordionContent className="px-6 pb-6">
            <div className="w-full max-w-2xl space-y-8">
              <div
                className="text-base font-normal leading-7"
                dangerouslySetInnerHTML={{ __html: documents }}
              />
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </Card>
  );
}

