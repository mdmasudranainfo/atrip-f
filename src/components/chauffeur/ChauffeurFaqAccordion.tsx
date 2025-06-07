"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "What is the policy on additional drivers?",
    answer:
      "How quick is quick? For most design, we're talking 2-3 business days. We balance speed with quality,ensuring you get top-notch design swiftly",
  },
  {
    question: "What are the lease payments based on?",
    answer:
      "How quick is quick? For most design, we're talking 2-3 business days. We balance speed with quality,ensuring you get top-notch design swiftly",
  },
  {
    question: "What is your cancellation policy?",
    answer:
      "How quick is quick? For most design, we're talking 2-3 business days. We balance speed with quality,ensuring you get top-notch design swiftly",
  },
  {
    question: "Can other info be added to an invoice?",
    answer:
      "How quick is quick? For most design, we're talking 2-3 business days. We balance speed with quality,ensuring you get top-notch design swiftly",
  },
  {
    question: "What do I need to give you to get started?",
    answer:
      "How quick is quick? For most design, we're talking 2-3 business days. We balance speed with quality,ensuring you get top-notch design swiftly",
  },
  {
    question: "Can other info be added to an invoice?",
    answer:
      "How quick is quick? For most design, we're talking 2-3 business days. We balance speed with quality,ensuring you get top-notch design swiftly",
  },
  {
    question: "What are the additional costs to lease a vehicle?",
    answer:
      "How quick is quick? For most design, we're talking 2-3 business days. We balance speed with quality,ensuring you get top-notch design swiftly",
  },
];

export default function FAQAccordion() {
  return (
    <section className="w-full bg-[#F8F9FB] py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-4">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
              Questions And Answers
            </h2>
          </div>
          <div className="lg:col-span-8">
            <Accordion type="single" collapsible className="space-y-4">
              {faqs?.map((faq, index) => (
                <AccordionItem
                  key={index}
                  value={`item-${index}`}
                  className=" rounded-lg px-6"
                >
                  <AccordionTrigger className="hover:no-underline py-4 text-base font-bold text-[#1A1A1A]">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-600 pb-4">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </div>
    </section>
  );
}
