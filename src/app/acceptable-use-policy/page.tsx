import React from "react";
import { TransparentNavbar } from "@/components/header/transparentNav/TransparentNav";
import Link from "next/link";

const privacyPolicyData = {
  terms: [
    {
      id: 1,
      title: "1. Introduction",
      content: (
        <div>
          Atrip.ae implements active measures to monitor your privacy status and
          to defend personal information. Our Privacy Policy explains all the
          procedures that determine personal information collection and
          protection procedures.
        </div>
      ),
    },
    {
      id: 2,
      title: "2. Information We Collect",
      content: (
        <div>
          <strong>Personal Information:</strong> <br />
          Atrip.ae uses name, email address, phone number, and specific contact
          information. <br />
          The payment information which includes card data helps our
          organization process bookings. <br />
          Travel-related services need your passport and visa information to
          complete the booking process.
          <br />
          <br />
          <strong>Booking Information:</strong> <br />
          People need the following details to schedule their orders: dates of
          departure with specified vacant locations and preferred options.{" "}
          <br />
          The platform collects data regarding Providers who operate as hotels
          and airline operators.
          <br />
          <br />
          <strong>Technical Information:</strong> <br />
          IP address, browser type, device information, and operating system.{" "}
          <br />
          The platform uses information from cookies to improve user experience
          throughout the platform.
        </div>
      ),
    },
    {
      id: 3,
      title: "3. How We Use Your Information",
      content: (
        <div>
          <strong>Service Delivery:</strong> <br />
          Part of the booking processing system functions include delivering all
          requested services throughout its operational phase. <br />
          Your bookings require information about their data along with their
          modification details, which you must provide.
          <br />
          <br />
          <strong>Improvement of Services:</strong> <br />
          Our company has established an objective which combines platform
          improvement with user behavior analysis. <br />
          The system allows personalized use that generates targeted
          suggestions.
          <br />
          <br />
          <strong>Marketing and Promotions:</strong> <br />
          Your consent permission enables our company to provide promotional
          content in combination with newsletters and organizational news
          updates. <br />
          Your preferred interests determine which relevant advertisements the
          website presents to you.
          <br />
          <br />
          <strong>Legal and Security Purposes:</strong> <br />
          Our company adheres to legal requirements and implements additional
          specific regulations at both the local and national levels. <br />
          The detection of fraudulent or abusive actions, together with security
          breach prevention, functions as an essential functionality.
        </div>
      ),
    },
    {
      id: 4,
      title: "4. How We Share Your Information",
      content: (
        <div>
          <strong>Service Providers:</strong> <br />
          The booking procedures of hotels and airlines and drivers require your
          data as their service providers.
          <br />
          <br />
          <strong>Third-Party Partners:</strong> <br />
          The information gets distributed to specific trusted third-party
          companies which support marketing activities alongside providing
          analytics services and handling payments.
          <br />
          <br />
          <strong>Legal Requirements:</strong> <br />
          The law authorities will gain access to your information to maintain
          our rights, safety, and posture.
        </div>
      ),
    },
    {
      id: 5,
      title: "5. Data Security",
      content: (
        <div>
          <strong>Protection Measures:</strong> <br />
          All maintained data under protection follows industry-standard
          encryption protocols as well as security protocols. <br />
          The system conducts programmed security evaluations together with
          scheduled maintenance procedures in order to guarantee full data
          protection.
          <br />
          <br />
          <strong>Access Control:</strong> <br />
          Your personal information is secured because only authorized workers
          can access these data points.
        </div>
      ),
    },
    {
      id: 6,
      title: "6. Your Rights",
      content: (
        <div>
          <strong>Access and Correction:</strong> <br />
          Every customer can access their personal details and alter them at
          their convenience through an easy process.
          <br />
          <br />
          <strong>Data Deletion:</strong> <br />
          The request for data deletion exists for you, although legal and
          contractual requirements may limit its execution.
          <br />
          <br />
          <strong>Opt-Out:</strong> <br />
          Every marketing email provides complete unsubscribe instructions to
          help users prevent additional mailing by clicking the unsubscribe
          link.
        </div>
      ),
    },
    {
      id: 7,
      title: "7. Cookies and Tracking",
      content: (
        <div>
          <strong>Use of Cookies:</strong> <br />
          The website&apos;s cookies enable visitors to link to forms so the
          website can perform statistical analysis for visitor activities.
          <br />
          <br />
          <strong>Cookie Management:</strong> <br />
          Your browser provides complete control to manage cookies while letting
          you disable them.
        </div>
      ),
    },

    {
      id: 8,
      title: "8. Children's Privacy",
      content: (
        <div>
          <strong>Age Restriction:</strong> <br />
          Young people under eighteen years are advised to stay away from our
          services because of the intended usage limitations. <br />
          The company does not seek personal data from users who have not
          reached the age of eighteen.
        </div>
      ),
    },
    {
      id: 9,
      title: "9. International Data Transfers",
      content: (
        <div>
          Your data will be transferred and processed outside the UAE in
          territories with data protection regulations different from those in
          the country.
        </div>
      ),
    },
    {
      id: 10,
      title: "10. Changes to This Policy",
      content: (
        <div>
          <strong>Updates:</strong> <br />
          This Privacy Policy might get altered periodically. Significant
          platform changes will be delivered through website notifications and
          platform alerts.
          <br />
          <br />
          <strong>Acceptance:</strong> <br />
          Your agreement to the Privacy Policy terms becomes valid using
          Atrip—ae services.
        </div>
      ),
    },
    {
      id: 11,
      title: "11. Contact Us",
      content: (
        <div>
          <p>
            If you have any questions or concerns about this Privacy Policy,
            feel free to contact us:
          </p>
          <p>
            <strong>Email:</strong>{" "}
            <a href="mailto:book@atrip.ae" className="text-blue-500 underline">
              book@atrip.ae
            </a>
          </p>
          <p>
            <strong>Phone:</strong> +971-56 286 4704
          </p>
        </div>
      ),
    },
  ],
};

const Acceptable = () => {
  return (
    <>
      <div className="relative h-full :max-h-[600px] bg-about-us w-full  from-blue-900 via-blue-950 to-blue-950">
        <div className="bg-[#00000066] h-full w-full absolute top-0 bottom-0"></div>
        <TransparentNavbar isBgWhite={false} />
        <div className="w-full container pb-16 pt-8 m-auto relative  z-9">
          <div className="max-w-6xl m-auto py-20">
            <h1 className="mb-4 text-5xl  font-bold text-white text-center">
              Privacy Policy
            </h1>
            <div className="flex gap-10 justify-center text-white  text-lg">
              <Link href="#" className="">
                Home
              </Link>
              .
              <Link href="#" className="">
                Privacy Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="container m-auto mt-10 mb-10">
        {privacyPolicyData.terms.map((term) => (
          <div key={term.id} className=" py-5 px-4">
            <h2 className="text-xl font-semibold">{term.title}</h2>
            <p className="text-gray-600">{term.content}</p>
          </div>
        ))}
      </div>
    </>
  );
};

export default Acceptable;
