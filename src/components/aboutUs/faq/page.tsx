"use client"; 

import { useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function FAQSection() {
  const [activeItem, setActiveItem] = useState<string | null>(null);

  const faqs = [
    {
      question: "What is the policy on additional drivers?",
      answer:
        "Yes, you can try us for free for 30 days. If you want, we'll provide you with a free, personalized 30-minute onboarding",
    },
    {
      question: "What are the lease payments based on?",
      answer:
        "Our lease payments are calculated based on various factors including vehicle value, term length, and mileage.",
    },
    {
      question: "What is your cancellation policy?",
      answer:
        "We offer flexible cancellation options. Please contact our customer service for details.",
    },
    {
      question: "Can other info be added to an invoice?",
      answer:
        "Yes, additional information can be added to your invoice upon request.",
    },
    {
      question: "Can other info be added to an invoice?",
      answer:
        "Yes, we can customize invoices with additional information as needed.",
    },
    {
      question: "What are the additional costs to lease a vehicle?",
      answer:
        "Additional costs may include insurance, maintenance, and any optional add-ons.",
    },
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold mb-4 text-dark">
          Frequently Asked Questions
        </h2>
        <p className="text-dark md:max-w-[70%] w-full m-auto">
          Some questions about Chauffeur Service are asked frequently. We have
          answered the most frequent of those frequent questions below.
        </p>
      </div>

      <Accordion type="single" collapsible className="w-full space-y-4">
        {faqs?.map((faq, index) => (
          <AccordionItem
            key={index}
            value={`item-${index}`}
            className={`bg-card rounded-lg border-none px-4 ${
              activeItem === `item-${index}` ? "bg-[#F9F9FF]" : ""
            }`}
          >
            <AccordionTrigger
              className="text-left text-1xl text-dark font-semibold py-6 hover:no-underline"
              onClick={() =>
                setActiveItem(
                  activeItem === `item-${index}` ? null : `item-${index}`
                )
              }
            >
              {faq.question}
            </AccordionTrigger>
            <AccordionContent className="pb-6 text-dark">
              {faq.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
