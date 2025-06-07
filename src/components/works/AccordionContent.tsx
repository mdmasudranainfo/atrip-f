"use client";

import * as Accordion from "@radix-ui/react-accordion";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

const TravelFaqAccordion = () => {
  return (
    <div className="container mx-auto py-4">
      <Accordion.Root type="single" collapsible className="w-full space-y-4">
        {accordionItems.map((item) => (
          <Accordion.Item
            key={item.id}
            value={item.id}
            className="border rounded-2xl shadow-sm bg-white"
          >
            <Accordion.Header>
              <Accordion.Trigger
                className={cn(
                  "group flex w-full items-center justify-between p-4 text-left font-medium text-gray-800 hover:bg-gray-50 transition rounded-2xl"
                )}
              >
                {item.title}
                <ChevronDown className="h-5 w-5 text-gray-500 transition-transform duration-200 group-data-[state=open]:rotate-180" />
              </Accordion.Trigger>
            </Accordion.Header>
            <Accordion.Content className="px-4 pb-4 text-gray-700 text-sm leading-relaxed">
              <div className="space-y-3">{item.content}</div>
            </Accordion.Content>
          </Accordion.Item>
        ))}
      </Accordion.Root>
    </div>
  );
};

export default TravelFaqAccordion;

const accordionItems = [
  {
    id: "who-we-are",
    title: "1. Who We Are",
    content: (
      <div>
        <p>
          Atrip. He operates as an established travel connection service that
          links travelers to multiple service provider networks. As a comparison
          platform, we connect customers with suitable travel options without
          engaging in product transactions.
        </p>
        <p>
          The mission of our organization focuses on providing simple travel
          organization solutions that lower expenses and maintain 100%
          visibility for all travelers.
        </p>
        <p>
          Our company will establish itself as the most dependable travel
          platform in the industry while offering assurance to travelers who
          need reliable experience-based trips.
        </p>
      </div>
    ),
  },
  {
    id: "how-service-works",
    title: "2. How Does Our Service Work?",
    content: (
      <div>
        <p>
          The platform allows users to plan their travel through an
          uncomplicated three-step process.
        </p>
        <p>
          By accessing the website atrip. Ae The B2C Travel platform provides
          users with access to several travel services that include flights,
          hotels, tours and car rentals.
        </p>
        <p>
          Our platform allows users to make effective price, package, and vendor
          comparisons. It also lets users discover exceptional price offers that
          match their specific needs.
        </p>
        <p>
          The service lets users choose their desired methods to contact health
          providers immediately.
        </p>
        <p>
          The provider allows you to confirm your travel reservations through
          their established channels.
        </p>
        <p>
          You can travel safely because Atrip.ae provides the most advantageous
          rates among its available options.
        </p>
      </div>
    ),
  },
  {
    id: "who-we-work-with",
    title: "3. Who Do We Work With?",
    content: (
      <div>
        <p>
          Our business operates through numerous reliable service providers,
          including:
        </p>
        <p>
          Tour Operators maintain relationships with businesses that provide
          activities, tour packages, and holiday packages.
        </p>
        <p>
          Companies that provide automobile rentals alongside chauffeur services
          as well as airport shuttle services operate within this sector.
        </p>
        <p>
          Visa Agencies work with applicants to handle visa procedures by
          providing application support and renewal assistance as well as
          changes.
        </p>
        <p>
          Easy Flight Searching and Quick Trip Booking are Available at
          Airlines.
        </p>
        <p>
          Booking hotels and resorts offers you an ideal stay in your desired
          accommodation.
        </p>
        <p>
          Quality and reliable service alongside superb customer assistance are
          guarantees for our selected partners following their thorough
          evaluation process.
        </p>
      </div>
    ),
  },
  {
    id: "how-we-make-money",
    title: "4. How Do We Make Money?",
    content: (
      <div>
        <p>
          Our business model collects a minimal commission from service
          providers whenever customers use our booking service.
        </p>
        <p>
          The company develops alliances with providers to deliver unique
          discount packages.
        </p>
        <p>
          Our revenues do not alter your viewable prices, so we focus on
          delivering maximum savings and superior customer satisfaction.
        </p>
      </div>
    ),
  },
  {
    id: "recommendation-system",
    title: "5. Our Recommendation Systems",
    content: (
      <div>
        <p>
          The advanced recommendation system we provide helps you reach
          knowledgeable decisions.
        </p>
        <p>
          The star rating system demonstrates provider assessment through user
          evaluations ranging from one to five stars.
        </p>
        <p>
          The quality of services becomes clearer through reading truthful
          reviews submitted by vacationers.
        </p>
        <p>
          Our company uses internal assessment protocols to establish quality
          ratings, confirming all listed providers&apos; legitimacy.
        </p>
      </div>
    ),
  },
  {
    id: "reviews-prices-payments",
    title: "6. Reviews, Prices, and Payments",
    content: (
      <div>
        <p>
          The platform lets users access truthful travel feedback to learn about
          service standards and quality.
        </p>
        <p>
          Users should check different provider prices to identify excellent
          pricing options.
        </p>
        <p>
          Customers should book directly through providers who offer multiple
          safe payment options.
        </p>
      </div>
    ),
  },
  {
    id: "ratings-scores",
    title:
      "7. Our service utilizes Star Ratings, Review Scores, and Quality Ratings.",
    content: (
      <div>
        <p>
          The rating system which we operate offers transparent assessments that
          foster trust building between client-service provider relationships.
        </p>
        <p>
          Guest star ratings reflect total satisfaction combined with overall
          feedback from customers.
        </p>
        <p>
          The review scores cover three specific aspects: service quality
          ratings, cost-per-value assessments, and customer assistance
          evaluations.
        </p>
        <p>
          A quality rating process from our company selects providers for
          addition to the platform.
        </p>
      </div>
    ),
  },
  {
    id: "help-advice",
    title: "8. Help & Advice",
    content: (
      <div>
        <p>
          Besides providing assistance to our clients we support them when they
          encounter travel plan obstacles.
        </p>
        <p>
          The staff at our company remains accessible round the clock to help
          clients overcome unexpected challenges.
        </p>
        <p>
          Overbooking incidents will trigger our service to help you obtain
          different travel arrangements promptly.
        </p>
        <p>
          Travel Advice provides expert advice concerning future travel
          restrictions, cancellations, and other service-related matters.
        </p>
        <br />
        <p className="font-semibold">Why Choose Atrip.Ae?</p>
        <p>
          You will find access to numerous trusted service providers through our
          vast network.
        </p>
        <p>
          Your satisfaction stands at the forefront of our mission so that we
          will help you throughout your journey.
        </p>
        <p>
          The time-saving convenience lets you access the best price offers
          through a single platform.
        </p>
        <p>
          Atrip. Ae provides an easy solution to experience the trip you have
          always dreamed of.
        </p>
        <p>
          Create your dream vacation by visiting the atrip page at this moment.
          Ae website right now.
        </p>
      </div>
    ),
  },
];
