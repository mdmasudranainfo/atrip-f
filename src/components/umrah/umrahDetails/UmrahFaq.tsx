import { HelpCircle } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card } from "@/components/ui/card";

export default function UmrahFAQs() {
  const faqs = [
    {
      question: "Is it mandatory for me to obtain a visa to enter UAE?",
      answer:
        "You can request an early check-in or late check-out by contacting our front desk team directly. These requests are subject to availability and may incur additional charges.",
    },
    {
      question: "Can I change my plan later?",
      answer:
        "Yes, you can modify your plan depending on availability. Please note that changes may affect the pricing and are subject to our modification policies.",
    },
    {
      question: "What is your cancellation policy?",
      answer:
        "Our cancellation policy varies depending on the rate type and length of stay. Please refer to your booking confirmation for specific details about your reservation's cancellation policy.",
    },
    {
      question: "Can other info be added to an invoice?",
      answer:
        "Yes, additional information such as company details, tax ID, or special references can be added to your invoice. Please contact our billing department with your specific requirements.",
    },
    {
      question: "How does billing work?",
      answer:
        "We process billing at the time of booking for the full amount. Any additional charges during your stay will be processed at check-out.",
    },
    {
      question: "How do I change my account email?",
      answer:
        "You can update your account email through your profile settings. After making the change, we'll send a verification link to your new email address.",
    },
  ];

  return (
    <Card className="w-full border-none">
      <Accordion type="single" value="header" collapsible>
        <AccordionItem value="header" className="border-0">
          <AccordionTrigger className="px-6 py-4 hover:no-underline">
            <div className="flex items-center gap-2">
              <HelpCircle className="h-5 w-5 text-blue-600" />
              <span className="text-base font-bold">FAQs</span>
            </div>
          </AccordionTrigger>
          <AccordionContent className="px-6 pb-6">
            <Accordion type="single" collapsible className="w-full">
              {faqs?.map((faq, index) => (
                <AccordionItem
                  key={index}
                  value={`item-${index}`}
                  className="border-0"
                >
                  <AccordionTrigger className="py-4 text-sm font-semibold hover:no-underline">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-sm font-normal">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </Card>
  );
}
