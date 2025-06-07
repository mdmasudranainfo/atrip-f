import React from "react";
import { TransparentNavbar } from "@/components/header/transparentNav/TransparentNav";
import Link from "next/link";

const termsData = {
  terms: [
    {
      id: 1,
      title: "1. Scope of This Section",
      content: (
        <div className="">
          Corresponding terms and conditions exclusively address Chauffeur
          Services (renting a car with a driver) that users obtain through
          Atrip.ae. <br /> The Chauffeur Services Terms and Conditions function
          together with the General Terms and Conditions, which control all
          platform services.
        </div>
      ),
    },
    {
      id: 2,
      title: "2. Contractual Relationship",
      content: (
        <div className="">
          <p>Atrip. Ae&apos;s Role:</p>
          <p>
            Through its intermediary function, Atrip.ae enables customers to
            find the chauffeur services that service providers offer.
          </p>
          <p>
            Customers form a direct contract with the Service Provider after
            they book a car with driver service.
          </p>
          <p>
            This contract does not involve Atrip. As a participating party,
            service fulfillment rests exclusively with the terms specified in
            these conditions.
          </p>
        </div>
      ),
    },
    {
      id: 3,
      title: "3. What Atrip. ae Will Do",
      content: (
        <div className="">
          <p>Platform Services:</p>
          <p>
            Users can quickly check and contrast through our Platform and make
            bookings for Chauffeur Services.
            <br /> <br />
            Your Booking will be sent to you and the service provider after the
            reservation process.
            <br /> <br />
            Customer Support:
            <br /> <br />
            The Help Center functions around the clock to support guests with
            all concerns about bookings, schedule changes, and reservation
            cancellation procedures.
          </p>
        </div>
      ),
    },
    {
      id: 4,
      title: "4. What You Need to Do",
      content: (
        <div className="">
          <p>Accurate Information:</p>
          <p>
            The booking success requires exact complete contact details from you
            which ensure proper service delivery.
          </p>
          <p>Compliance with Terms:</p>
          <p>You agree to comply with:</p>
          <p>
            General Terms and Conditions of Atrip.ae
            <br /> <br />
            You will find the exclusive terms of the Service Provider when you
            check out.
            <br /> <br /> A failure to obey these terms will lead to an extra
            cost assessment and/or Booking termination.
          </p>
        </div>
      ),
    },
    {
      id: 5,
      title: "5. Price and Payment",
      content: (
        <div className="">
          <p>Payment Processing:</p>
          <p>
            Atrip.ae will facilitate the payment process for your Booking.
            Customers will see all costs in the final payment display before
            confirming their purchase.
          </p>{" "}
          <br />
          <p>Transparent Pricing:</p>
          <br />
          The currency used for all prices is UAE Dirhams (AED) unless
          additional or separate terms state otherwise. The customer remains
          responsible for any conversion fees that occur when using money in
          foreign currencies.
        </div>
      ),
    },
    {
      id: 6,
      title: "6. Cancellations, Amendments, Refunds,",
      content: (
        <div className="">
          <p>Amendment and Cancellation Policies:</p>
          <p>
            The booking process shows different amendment and cancellation rules
            provided by Service Providers.
            <br /> <br /> Different services follow rules that do not allow
            refunds and maintain cancellation fees.
            <br />
            However, mainly after the complementing of your booking, you can
            cancel anytime without a nonrefundable{" "}
          </p>
          <br />
          <p>Refund Eligibility:</p>
          <p>
            Atrip.ae manages refunds through Service Provider policy terms and
            the Platform terms established by Atrip.ae.
          </p>
        </div>
      ),
    },
    {
      id: 7,
      title: "7. Liability and Responsibility",
      content: (
        <div className="">
          <p>Atrip. Ae&apos;s Limited Liability:</p>
          <p>
            Users of atrip.ae are not responsible for problems that emerge
            during the Chauffeur Service utilization, including matters such as:
          </p>

          <div className="">
            <br />
            Service quality,
            <br /> Safety concerns,
            <br />
            The changes and cancellations made by the Service Provider to
            Chauffeur services present limits to our liability. <br /> <br />
            Atrip.ae is responsible only for managing the booking process, so
            its liability remains limited.
            <br /> <br /> Service Provider Responsibility:
            <br />
            The Service Provider must fulfill the abovementioned duties as the
            sole party responsible.
            <br /> Delivering the service as described, <br />
            Customers receive safe and satisfactory services.
          </div>
        </div>
      ),
    },
    {
      id: 8,
      title: "8. Dispute Resolution",
      content: (
        <div className="">
          <p>Customer Support:</p>
          <p>
            Reach out to our Help Center for booking support via its 24/7
            availability. We maintain a Help Center that operates 24 hours daily
            for your assistance.
            <br /> <br />
            Atrip.ae will collaborate with the service provider to find a timely
            and equitable solution to the matter at hand.
          </p>
          <p>Governing Law:</p>
          <br />
          <p>
            UAE laws apply to any disputes that will be resolved through
            arbitration or Dubai courts.
          </p>
        </div>
      ),
    },
    {
      id: 9,
      title: "9. Intellectual Property",
      content: (
        <div className="">
          <p>Platform Content:</p>
          <p>
            The entire content found on Atrip.ae demands permission for usage
            because copyright protects descriptions images and logos.
          </p>
          <p>Customer Reviews:</p>
          <p>
            Your feedback on the PlatformPlatform becomes a property of Atrip
            and is for use in platform displays and promotional materials.
          </p>
        </div>
      ),
    },
    {
      id: 10,
      title: "10. Amendments to These Terms Updates:",
      content: (
        <div className="">
          <p>
            The company can update the terms of service at Atrip.ae at any time.
            Atrip.ae communicates significant Platform updates to users through
            email notifications on the site.
          </p>
          <p>Acceptance:</p>
          <p>
            Users who reserve Chauffeur Service through Atrip. We become bound
            by the established terms that appear below.
          </p>
        </div>
      ),
    },
  ],
};
const termsData2 = {
  terms: [
    {
      id: 1,
      title: "1. Incident Reporting",
      content: (
        <div className="">
          <p>Immediate Notification:</p>
          <br />
          <p>
            All customers needing to report incidents, such as accidents,
            vehicle problems, or service disruptions, should communicate
            immediately with the service provider and Atrip—ae&apos;s help
            center. <br /> <br /> The Service Provider includes chauffeur-driven
            services in combination with car rental firms.
            <br /> <br /> Atrip. Ae&apos;s 24/7 Help Center.
            <br /> Documentation:
            <br /> <br />
            The service documents all incidents by requesting customers to take
            photos and videos and write notes that help resolve the issue.
          </p>{" "}
        </div>
      ),
    },
    {
      id: 2,
      title: "2. Atrip. ae's Role  incase any Incident",
      content: (
        <div className="">
          <p>ASupport and Assistance:</p> <br />
          <p>
            Atrip.ae gives instant customer support that includes the following
            actions for anyone encountering a crisis:
          </p>
          <p>
            Atrip.ae assists the service provider in establishing alternative
            transportation solutions, such as vehicle replacements or additional
            driving help.
          </p>{" "}
          <br />
          <p>
            The company will assist customers through the insurance claim
            process when it applies to their situation.
          </p>
          <p>Communication:</p> <br />
          <p>
            Atrip will manage the customer-service-provider connection to
            process quick and equitable incident resolution
          </p>
        </div>
      ),
    },
    {
      id: 3,
      title: "3. Liability and Responsibility",
      content: (
        <div className="">
          <p>Service Provider Responsibility:</p>
          <p>
            A chauffeur or car rental company bears full responsibility for
            their services.
            <br /> <br />
            Vehicle maintenance and its condition
            <br /> <br />
            The conduct and professionalism of the driver,
            <br /> <br />
            Any problems that occur throughout the course of service protocols.
          </p>
        </div>
      ),
    },
    {
      id: 4,
      title: "Atrip. Ae's Limited Liability:",
      content: (
        <div className="">
          <p>
            Atrip.ae operates as a platform that functions exclusively as a
            connector between users while remaining exempt from any potential
            liability.
          </p>{" "}
          <br />
          <p>
            The Service Provider bears responsibility for creating accidents,
            inflicting injuries, or producing damages on behalf of their
            clients.
          </p>
          <p>
            Delays, cancellations,
            <br />{" "}
          </p>
          <p>Loss or theft of personal belongings during the service.</p> <br />
          <p>
            The extent of our company&apos;s obligations in incident resolution
            is restricted to providing communication assistance and support.
            <br /> <br />
            Service Provider Insurance:
            <br /> <br />
            Service Providers using the Atrip. Ae PlatformPlatform must
            demonstrate valid insurance for their vehicles alongside driver
            insurance requirements. <br /> <br /> Before traveling, users must
            check the insurance information directly with their service
            provider.
            <br /> <br />
            Customer Responsibility:
            <br /> All customers need to acquire travel or personal insurance
            coverage that protects them from unexpected events such as medical
            emergencies, losses, or canceled trips.
            <br />
            Medical emergencies,
            <br /> Loss of personal belongings,
            <br />
            Trip Terminations or Delays
          </p>
        </div>
      ),
    },
    {
      id: 5,
      title: "5. Dispute Resolution",
      content: (
        <div className="">
          <p>Customer Support:</p>
          <p>
            Reach out to our Help Center for booking support via its 24/7
            availability. We maintain a Help Center that operates 24 hours daily
            for your assistance.
          </p>
          <br />
          <p>
            Our team will assist the Service Provider through swift and fair
            resolution of all issues.
          </p>{" "}
          <br />
          <p>Governing Law:</p>
          <br />
          All disputes pertaining to this agreement will be decided according to
          UAE legal standards, while arbitration and the courts of Dubai will
          serve as resolution options.
        </div>
      ),
    },
    {
      id: 6,
      title: "6. Cancellations, Amendments, Refunds,",
      content: (
        <div className="">
          <p>Amendment and Cancellation Policies:</p>
          <p>
            The booking process shows different amendment and cancellation rules
            provided by Service Providers.
            <br /> <br /> Different services follow rules that do not allow
            refunds and maintain cancellation fees.
            <br />
            However, mainly after the complementing of your booking, you can
            cancel anytime without a nonrefundable{" "}
          </p>
          <br />
          <p>Refund Eligibility:</p>
          <p>
            Atrip.ae manages refunds through Service Provider policy terms and
            the Platform terms established by Atrip.ae.
          </p>
        </div>
      ),
    },
    {
      id: 7,
      title: "7. Liability and Responsibility",
      content: (
        <div className="">
          <p>Atrip. Ae&apos;s Limited Liability:</p>
          <p>
            Users of atrip.ae are not responsible for problems that emerge
            during the Chauffeur Service utilization, including matters such as:
          </p>

          <div className="">
            <br />
            Service quality,
            <br /> Safety concerns,
            <br />
            The changes and cancellations made by the Service Provider to
            Chauffeur services present limits to our liability. <br /> <br />
            Atrip.ae is responsible only for managing the booking process, so
            its liability remains limited.
            <br /> <br /> Service Provider Responsibility:
            <br />
            The Service Provider must fulfill the abovementioned duties as the
            sole party responsible.
            <br /> Delivering the service as described, <br />
            Customers receive safe and satisfactory services.
          </div>
        </div>
      ),
    },
    {
      id: 8,
      title: "8. Dispute Resolution",
      content: (
        <div className="">
          <p>Customer Support:</p>
          <p>
            Reach out to our Help Center for booking support via its 24/7
            availability. We maintain a Help Center that operates 24 hours daily
            for your assistance.
            <br /> <br />
            Atrip.ae will collaborate with the service provider to find a timely
            and equitable solution to the matter at hand.
          </p>
          <p>Governing Law:</p>
          <br />
          <p>
            UAE laws apply to any disputes that will be resolved through
            arbitration or Dubai courts.
          </p>
        </div>
      ),
    },
    {
      id: 9,
      title: "9. Intellectual Property",
      content: (
        <div className="">
          <p>Platform Content:</p>
          <p>
            The entire content found on Atrip.ae demands permission for usage
            because copyright protects descriptions images and logos.
          </p>
          <p>Customer Reviews:</p>
          <p>
            Your feedback on the PlatformPlatform becomes a property of Atrip
            and is for use in platform displays and promotional materials.
          </p>
        </div>
      ),
    },
    {
      id: 10,
      title: "10. Amendments to These Terms Updates:",
      content: (
        <div className="">
          <p>
            The company can update the terms of service at Atrip.ae at any time.
            Atrip.ae communicates significant Platform updates to users through
            email notifications on the site.
          </p>
          <p>Acceptance:</p>
          <p>
            Users who reserve Chauffeur Service through Atrip. We become bound
            by the established terms that appear below.
          </p>
        </div>
      ),
    },
  ],
};

const termsData3 = {
  terms: [
    {
      id: 1,
      title: "1. Scope of This Section",
      content: (
        <div>
          <p>
            These rules regulate the use of Activity Tickets acquired through
            Atrip.ae by customers in Dubai, Abu Dhabi, and across the UAE.
          </p>
          <br />
          <p>
            Atrip.ae maintains these conditions in conjunction with the General
            Terms and Conditions to manage activity bookings on the platform.
          </p>
        </div>
      ),
    },
    {
      id: 2,
      title: "2. The Platform’s Minimal Role in Contractual Relationships",
      content: (
        <div>
          <p>
            Atrip.ae functions as an intermediary allowing service providers and
            third-party aggregators to list and sell activity tickets.
          </p>
          <br />
          <p>
            Bookings result in a direct agreement between the user and either
            the service provider or third-party aggregator, as indicated during
            booking.
          </p>
          <br />
          <p>
            Atrip.ae is not involved in the service fulfillment and remains
            outside this contract.
          </p>
        </div>
      ),
    },
    {
      id: 3,
      title: "3. What We Will Do",
      content: (
        <div>
          <p>
            <strong>Platform Services:</strong>
          </p>
          <p>
            We enable search, comparison, and booking of tickets. Booking
            details are shared with both the user and the provider/aggregator.
          </p>
          <br />
          <p>
            <strong>Customer Support:</strong>
          </p>
          <p>
            Our 24/7 Help Center assists with booking, cancellations, and
            general support.
          </p>
        </div>
      ),
    },
    {
      id: 4,
      title: "4. What You Need to Do",
      content: (
        <div>
          <p>
            <strong>Accurate Information:</strong>
          </p>
          <p>
            Provide complete and correct contact details to ensure communication
            and booking delivery.
          </p>
          <br />
          <p>
            <strong>Compliance with Terms:</strong>
          </p>
          <p>
            You must follow Atrip.ae’s General Terms and the service
            provider/aggregator’s terms displayed during checkout.
            Non-compliance can result in cancellations and additional fees.
          </p>
        </div>
      ),
    },
    {
      id: 5,
      title: "5. Price and Payment",
      content: (
        <div>
          <p>
            <strong>Payment Processing:</strong>
          </p>
          <p>
            All booking payments are screened by our system. Total charges,
            including fees and taxes, are clearly shown before confirmation.
          </p>
          <br />
          <p>
            <strong>Transparent Pricing:</strong>
          </p>
          <p>
            Prices are in AED unless otherwise noted. Users are responsible for
            any currency exchange fees.
          </p>
        </div>
      ),
    },
    {
      id: 6,
      title: "6. Cancellations, Amendments, and Refunds",
      content: (
        <div>
          <p>
            <strong>Policies:</strong>
          </p>
          <p>
            Cancellation and amendment policies depend on the
            provider/aggregator and are shown at booking time. Some activities
            are non-refundable and may incur fees.
          </p>
          <br />
          <p>
            <strong>Refund Eligibility:</strong>
          </p>
          <p>
            Refunds are subject to the terms of the provider or aggregator. Most
            services on our platform are non-refundable.
          </p>
        </div>
      ),
    },
    {
      id: 7,
      title: "7. Liability and Responsibility",
      content: (
        <div>
          <p>
            <strong>Limited Platform Liability:</strong>
          </p>
          <p>
            Atrip.ae is not liable for issues with service performance.
            Responsibility lies with the service provider or aggregator.
          </p>
          <br />
          <p>
            They are accountable for service quality, safety, timely execution,
            and customer satisfaction.
          </p>
        </div>
      ),
    },
    {
      id: 8,
      title: "8. Dispute Resolution",
      content: (
        <div>
          <p>
            <strong>Customer Support:</strong>
          </p>
          <p>
            Our 24/7 Help Center helps resolve disputes by coordinating with the
            provider or aggregator fairly and quickly.
          </p>
          <br />
          <p>
            <strong>Governing Law:</strong>
          </p>
          <p>
            UAE laws apply. Disputes may be settled via Dubai arbitration or
            legal court procedures.
          </p>
        </div>
      ),
    },
    {
      id: 9,
      title: "9. Intellectual Property",
      content: (
        <div>
          <p>
            <strong>Platform Content:</strong>
          </p>
          <p>
            All content (descriptions, logos, images) on the Platform is
            protected and cannot be reused without permission.
          </p>
          <br />
          <p>
            <strong>Customer Reviews:</strong>
          </p>
          <p>
            By submitting reviews, users grant Atrip.ae the right to use the
            feedback for website and marketing purposes.
          </p>
        </div>
      ),
    },
    {
      id: 10,
      title: "10. Terms Updates and Acceptance",
      content: (
        <div>
          <p>
            Atrip.ae may update these terms at any time. Notifications will be
            sent via email or platform alerts.
          </p>
          <br />
          <p>
            Booking activity tickets on Atrip.ae signifies acceptance of these
            terms and conditions.
          </p>
        </div>
      ),
    },
  ],
};

const B2BData = {
  terms: [
    {
      id: 1,
      title: "1. Definitions",
      content: (
        <div>
          <p>
            Using Atrip.ae enables users to link with reliable service providers
            who will make travel easier. The business partnership with Atrip.ae
            comprises organizations offering activities, hotels, transport, and
            additional services. Atrip.ae operates as a platform that serves
            end-user travelers seeking service bookings.
          </p>
        </div>
      ),
    },
    {
      id: 2,
      title: "2. Scope of Services",
      content: (
        <div>
          <p>
            Partners must offer services through Atrip.ae including activities,
            hotel bookings, transportation, car rentals (with professional
            drivers), visa processing, travel packages for
            individuals/families/groups, air ticketing, and Holy Journey
            pilgrimage packages.
          </p>
        </div>
      ),
    },
    {
      id: 3,
      title: "3. Partner Responsibilities",
      content: (
        <div>
          <p>
            Partners are expected to maintain high-quality, safe, and reliable
            services, provide accurate service and pricing details, perform
            timely service delivery, offer responsive support, and comply with
            all laws and regulations.
          </p>
        </div>
      ),
    },
    {
      id: 4,
      title: "4. Atrip.ae Responsibilities",
      content: (
        <div>
          <p>
            Atrip.ae provides an easy-to-use system for managing listings,
            delivers marketing support, facilitates client-partner connections,
            and ensures transparent communication.
          </p>
        </div>
      ),
    },
    {
      id: 5,
      title: "5. Pricing and Payments",
      content: (
        <div>
          <p>
            Partners control their service pricing and must keep them
            competitive and clear. Atrip.ae applies a platform service fee, and
            payments to partners are made within 1–10 days post-service unless
            delays are required to confirm customer satisfaction.
          </p>
        </div>
      ),
    },
    {
      id: 6,
      title: "6. Cancellations and Refunds",
      content: (
        <div>
          <p>
            Partners must define and communicate their cancellation policies
            clearly. Refunds must be processed per the stated partner policies
            in case of cancellations or service issues.
          </p>
        </div>
      ),
    },
    {
      id: 7,
      title: "7. Dispute Resolution",
      content: (
        <div>
          <p>
            Atrip.ae can act as a mediator in client disputes. However,
            responsibility for handling client issues rests with the service
            provider.
          </p>
        </div>
      ),
    },
    {
      id: 8,
      title: "8. Termination of Partnership",
      content: (
        <div>
          <p>
            Atrip.ae may terminate any partnership for breach of agreement.
            Partners may also end the partnership with written notice given [X]
            days in advance.
          </p>
        </div>
      ),
    },
    {
      id: 9,
      title: "9. Confidentiality",
      content: (
        <div>
          <p>
            All partners must maintain confidentiality regarding client data and
            any sensitive business information shared via Atrip.ae.
          </p>
        </div>
      ),
    },
    {
      id: 10,
      title: "10. Amendments",
      content: (
        <div>
          <p>
            Atrip.ae holds the right to modify these terms. Partners will be
            notified before any changes take effect.
          </p>
        </div>
      ),
    },
    {
      id: 11,
      title: "11. Governing Law",
      content: (
        <div>
          <p>
            This partnership is governed by UAE law. Any partner directly
            communicating with clients without Atrip.ae&apos;s knowledge
            violates the agreement and undermines trust. A formal process is in
            place to handle such violations.
          </p>{" "}
          <br /> <br />
          <p>
            Atrip. Ae embraces clear communication and builds vigorous partner
            relationships through every interaction aspect. Any service provider
            that makes direct contact with clients outside Atrip. Ae&apos;s
            knowledge maintains an illegal breach of partnership terms, which
            erodes the trust built between Atrip. Ae and its clients. The
            following approach serves when such situations emerge:
          </p>
        </div>
      ),
    },
  ],
};

const B2BData2 = {
  terms: [
    {
      id: 1,
      title: "1. Prohibition of Direct Contact",
      content: (
        <div>
          <p>
            Service providers must get permission from Atrip.Ae and inform
            clients about our platform role before initiating direct contact.
          </p>
          <p>
            All clients need to know their booking requests on Atrip.Ae
            originated from Atrip.Ae platforms.
          </p>
        </div>
      ),
    },
    {
      id: 2,
      title: "2. Consequences of Violation",
      content: (
        <div>
          <p>
            Partners must initially receive official alerts when they break the
            rules.
          </p>
          <p>
            Repeated violations will result in partners&apos; suspension for a
            certain period on the Atrip—Ae platform.
          </p>
          <p>
            Atrip will permanently terminate partnerships. The agreement can be
            terminated if partners break their promises a second time by
            committing serious offenses.
          </p>
        </div>
      ),
    },
    {
      id: 3,
      title: "3. Communication Guidelines with Clients",
      content: (
        <div>
          <p>
            Customers requiring client communication need to follow specific
            guidelines during their interactions.
          </p>
          <p>
            The booking originates from Atrip.Ae, as the client obtained their
            inquiry through this platform.
          </p>
          <p>
            The client must approve before a partner proceeds with additional
            information sharing or promotional offers.
          </p>
          <p>
            Communication should reflect the contractual terms set through
            Atrip.Ae.
          </p>
        </div>
      ),
    },
    {
      id: 4,
      title: "4. Reporting Violations",
      content: (
        <div>
          <p>
            The client should report all unwanted contact from their partners to
            Atrip.Ae.
          </p>
          <p>
            Atrip.Ae performs immediate investigations when such matters arise.
          </p>
          <p>
            When addressing this issue, the organization will take proper action
            that leads to client satisfaction.
          </p>
          <p>
            Clients should report their issues through the email address{" "}
            <strong>info@atrip.ae</strong>.
          </p>
        </div>
      ),
    },
    {
      id: 5,
      title: "5. Building Trust",
      content: (
        <div>
          <p>
            Our top priority at every stage of our dealings is focusing directly
            on our clients&apos; satisfaction.
          </p>
          <p>
            Partners at Atrip.Ae must uphold complete professionalism and
            maintain absolute transparency in all their actions.
          </p>
          <p>
            Atrip.Ae is dedicated to sustaining a trustworthy and transparent
            client-partner relationship.
          </p>
          <p>
            Operational platform integrity depends on the platform&apos;s strict
            protocols when investigating all reported security breaches.
          </p>
        </div>
      ),
    },
  ],
};

interface IData {
  label: string;
  id: string;
}

const data: IData[] = [
  {
    label: "Transport Rent Car with Driver ",
    id: "transport",
  },
  {
    label: "Activity Tickets  ",
    id: "activity",
  },
  {
    label: "B2B",
    id: "B2B",
  },
];

const TableOfContent = () => {
  return (
    <div className="p-4">
      <ul className="list-disc">
        {data?.map((item: IData) => (
          <li key={item?.id}>
            <a className="text-blue-600" href={`#${item.id}`}>
              {item?.label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};
const TermsPage = () => {
  return (
    <div className="">
      <div className="relative h-full :max-h-[600px] bg-about-us w-full  from-blue-900 via-blue-950 to-blue-950">
        <div className="bg-[#00000066] h-full w-full absolute top-0 bottom-0"></div>
        <TransparentNavbar isBgWhite={false} />
        <div className="w-full container pb-16 pt-8 m-auto relative  z-9">
          <div className="max-w-6xl m-auto py-20">
            <h1 className="mb-4 text-5xl  font-bold text-white text-center">
              Terms And Conditions
            </h1>
            <div className="flex gap-10 justify-center text-white  text-lg">
              <Link href="#" className="">
                Home
              </Link>
              .
              <Link href="#" className="">
                Terms And Privacy Policy
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/*  */}

      <div className="">
        <div className="container m-auto mt-10 mb-10 " id="transport">
          <TableOfContent />
          <h1 className="md:text-4xl py-4 font-semibold text-lg">
            Terms and Conditions for Transport Rent Car with Driver (Chauffeur
            Services) on Atrip.ae
          </h1>
          {termsData.terms.map((term) => (
            <div key={term.id} className=" py-5 px-4">
              <h2 className="text-xl font-semibold">{term.title}</h2>
              <p className="text-gray-600">{term.content}</p>
            </div>
          ))}
        </div>

        <div className="container m-auto mt-10 mb-10">
          <TableOfContent />
          <h1 className="md:text-4xl py-4 font-semibold text-lg">
            Incident Reliability and Liability for Chauffeur Services on
            Atrip.ae
          </h1>
          {termsData2.terms.map((term) => (
            <div key={term.id} className=" py-5 px-4">
              <h2 className="text-xl font-semibold">{term.title}</h2>
              <p className="text-gray-600">{term.content}</p>
            </div>
          ))}
        </div>

        <div className="container m-auto mt-10 mb-10" id="activity">
          <TableOfContent />
          <h1 className="md:text-4xl py-4 font-semibold text-lg">
            Terms and Conditions for Activity Tickets on Atrip.ae
          </h1>
          {termsData3.terms.map((term) => (
            <div key={term.id} className=" py-5 px-4">
              <h2 className="text-xl font-semibold">{term.title}</h2>
              <p className="text-gray-600">{term.content}</p>
            </div>
          ))}
        </div>

        <div className="container m-auto mt-10 mb-10" id="B2B">
          <TableOfContent />
          <h1 className="md:text-4xl py-4 font-semibold text-lg">
            B2B Terms and Conditions – Atrip.Ae
          </h1>
          <p>
            The trusted partner Atrip. Ae offers seamless travel solutions to
            its clients through its B2B Terms and Conditions Atrip. Ae
            establishes contractual agreements for business partnerships that
            serve activities, hotels, transport, car rentals, chauffeur
            services, visa assistance, holiday packages, air tickets, Ata visa
            changes, and Umrah packages. Our partners accept all contractual
            terms that follow when they join our platform.
          </p>
          {B2BData.terms.map((term) => (
            <div key={term.id} className=" py-5 px-4">
              <h2 className="text-xl font-semibold">{term.title}</h2>
              <p className="text-gray-600">{term.content}</p>
            </div>
          ))}

          <TableOfContent />

          {B2BData2.terms.map((term) => (
            <div key={term.id} className=" py-5 px-4">
              <h2 className="text-xl font-semibold">{term.title}</h2>
              <p className="text-gray-600">{term.content}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TermsPage;
