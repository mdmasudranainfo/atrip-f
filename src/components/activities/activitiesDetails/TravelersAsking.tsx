"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card, CardContent } from "@/components/ui/card";
import { LandPlot } from "lucide-react";
import React from "react";

interface AskingProps {
  content: string; // This is the JSON string from the API
}

const TravelersAsking = ({ content }: AskingProps) => {
  // Parse the JSON string to get an array of inclusions.
  // const inclusionsArray: string[] = JSON.parse(content || "[]");

  return (
    <div className="w-full bg-white border-t-2">
      <Accordion type="single" collapsible defaultValue="policies">
        <AccordionItem value="policies" className="border-none">
          <AccordionTrigger className="px-6 py-4 hover:no-underline">
            <div className="flex items-center gap-2">
              <LandPlot color="blue" className="h-5 w-5" />
              <h3 className="text-base font-bold">Travelers Asking</h3>
            </div>
          </AccordionTrigger>
          <AccordionContent className="px-6 border-none ">
            <Card className="w-full border-none bg-white shadow-none ">
              <CardContent className="shadow-none border-none ">
                <div className="w-full">
                  <article className="prose prose-slate prose-lead:text-secondary-foreground dark:prose-invert xl:prose-md w-full mx-auto max-w-4xl">
                    <div
                      className=" text-sm font-normal leading-7"
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

export default TravelersAsking;
