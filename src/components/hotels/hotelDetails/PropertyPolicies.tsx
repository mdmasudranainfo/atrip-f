import { ArrowDownWideNarrow, Baby, Clock, ShieldCheck } from "lucide-react";
import type React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card } from "@/components/ui/card";

export default function PropertyPolicies({ policyDatas }: any) {
  return (
    <Card className="w-full border-none">
      <Accordion type="single" collapsible defaultValue="policies">
        <AccordionItem value="policies" className="border-0">
          <AccordionTrigger className="px-6 py-4 hover:no-underline">
            <div className="flex items-center gap-2">
              <ArrowDownWideNarrow className="h-5 w-5" />
              <span className="text-base font-bold">Policies</span>
            </div>
          </AccordionTrigger>
          <AccordionContent className="px-6 pb-6">
            <div className="grid gap-8">
              {(policyDatas || [])?.map((policy: any, index: number) => (
                <div key={index}>
                  <PolicyItem
                    icon={Clock}
                    title={policy?.title}
                    content={policy?.content}
                  />
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </Card>
  );
}

interface PolicyItemProps {
  icon: React.ElementType;
  title: string;
  content: string;
}

function PolicyItem({ icon: Icon, title, content }: PolicyItemProps) {
  return (
    <div className="flex gap-4">
      <Icon className="h-5 w-5 shrink-0" />
      <div className="grid sm:grid-cols-[250px,1fr] gap-3 font-normal">
        <div className="font-semibold">{title}</div>
        <div className="flex">
          <div className="text-sm font">{content}</div>
        </div>
      </div>
    </div>
  );
}
