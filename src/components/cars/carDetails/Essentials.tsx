import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card } from "@/components/ui/card";
import { ChevronDown, ChevronUp, HandPlatter } from "lucide-react";
import React, { useState, useRef } from "react";

const Essentials = ({ essential }: { essential?: string }) => {
  const [visibleCharCount, setVisibleCharCount] = useState(1500);
  const contentRef = useRef<HTMLDivElement>(null);

  const content = essential || "";
  const isFullyVisible = visibleCharCount >= content.length;
  const visibleContent = content.slice(0, visibleCharCount);

  const handleToggle = () => {
    if (isFullyVisible) {
      // Collapse to initial state and scroll to top
      setVisibleCharCount(1500);
      if (contentRef.current) {
        contentRef.current.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    } else {
      // Reveal more content
      setVisibleCharCount((prev) => prev + 1500);
    }
  };

  return (
    <Card className="w-full border-none rounded-none">
      <Accordion
        type="single"
        collapsible
        // defaultValue="policies"
        className="border-none"
      >
        <AccordionItem value="policies" className="border-none">
          <AccordionTrigger className="px-6 pt-4 hover:no-underline">
            <div className="flex items-center gap-2">
              <HandPlatter
                color="blue"
                className="h-10 w-10 bg-blue-50 p-2 rounded-lg"
              />
              <span className="text-base font-bold">Service Provided</span>
            </div>
          </AccordionTrigger>

          <AccordionContent className="md:px-6 px-2 pb-6">
            <div className="w-full" ref={contentRef}>
              <article className="prose prose-slate prose-lead:text-secondary-foreground dark:prose-invert xl:prose-md w-full mx-auto max-w-4xl">
                <div
                  className="font-normal leading-7"
                  dangerouslySetInnerHTML={{ __html: visibleContent }}
                />
                {content.length > 1500 && (
                  <button
                    onClick={handleToggle}
                    className="mt-4 text-blue-600 hover:underline px-2 flex items-center gap-1"
                  >
                    <span>{isFullyVisible ? "See less" : "See more"}</span>
                    {isFullyVisible ? (
                      <ChevronUp />
                    ) : (
                      <ChevronDown className="mt-1" />
                    )}
                  </button>
                )}
              </article>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </Card>
  );
};

export default Essentials;
