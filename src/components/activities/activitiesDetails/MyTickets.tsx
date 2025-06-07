import { Ticket } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card, CardContent } from "@/components/ui/card";

export default function MyTickets({ myTicket }: any) {
  return (
    <div className="w-full bg-white border-t-2">
      <Accordion type="single" collapsible>
        <AccordionItem value="policies" className="border-0">
          <AccordionTrigger className="px-6 py-4 hover:no-underline">
            <div className="flex items-center gap-2">
              <Ticket
                color="blue"
                className="h-10 w-10 bg-blue-50 p-2 rounded-lg"
              />
              <p className="text-lg leading-[26px] font-semibold">
                Your Tickets
              </p>
            </div>
          </AccordionTrigger>
          <AccordionContent className="">
            <CardContent className="space-y-6 text-base font-normal leading-6 text-dark">
              <div className="w-full">
                <article className="prose prose-slate prose-lead:text-secondary-foreground dark:prose-invert xl:prose-md w-full mx-auto max-w-4xl">
                  <div
                    className="font-normal leading-7"
                    dangerouslySetInnerHTML={{ __html: myTicket }}
                  />
                </article>
              </div>
            </CardContent>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
