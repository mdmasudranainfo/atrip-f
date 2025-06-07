"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card, CardContent } from "@/components/ui/card";
import { PackagePlus } from "lucide-react";
import React from "react";

interface InclusionsProps {
  content: string; // This is the JSON string from the API
}

const Inclusions = ({ content }: InclusionsProps) => {
  // Parse the JSON string to get an array of inclusions.
  // const inclusionsArray: string[] = JSON.parse(content || "[]");

  return (
    <div className="w-full bg-white border-t-2">
      <Accordion type="single" collapsible>
        <AccordionItem value="policies" className="border-none">
          <AccordionTrigger className="px-6 py-4 hover:no-underline">
            <div className="flex items-center gap-2">
              <PackagePlus
                color="blue"
                className="h-10 w-10 bg-blue-50 p-2 rounded-lg"
              />
              <h3 className="text-base font-bold">Inclusions</h3>
            </div>
          </AccordionTrigger>
          <AccordionContent className="border-none ">
            <Card className="w-full border-none bg-white shadow-none ">
              <CardContent className="shadow-none border-none ">
                <div className="w-full">
                  <article className="prose prose-slate prose-lead:text-secondary-foreground dark:prose-invert xl:prose-md w-full mx-auto max-w-4xl">
                    <div
                      className="font-normal leading-7"
                      dangerouslySetInnerHTML={{ __html: content }}
                    />
                  </article>
                </div>
              </CardContent>
            </Card>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default Inclusions;
