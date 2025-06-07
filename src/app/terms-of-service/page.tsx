import React from "react";
import { TransparentNavbar } from "@/components/header/transparentNav/TransparentNav";
import Link from "next/link";

const termsData = {
  terms: [
    {
      id: 1,
      title: "User Agreement",
      content:
        "By using this website, you agree to abide by our policies and regulations.",
    },
    {
      id: 2,
      title: "Privacy Policy",
      content:
        "We collect user data to improve the website experience but never share it with third parties.",
    },
    {
      id: 3,
      title: "Liability",
      content:
        "The company is not responsible for any damages resulting from website usage.",
    },
    {
      id: 4,
      title: "Intellectual Property",
      content:
        "All content on this website, including text, graphics, logos, and images, is the property of the company.",
    },
    {
      id: 5,
      title: "Termination of Service",
      content:
        "We reserve the right to terminate or suspend access to our service without prior notice for any breach of terms.",
    },
    {
      id: 6,
      title: "Governing Law",
      content:
        "These terms are governed by the laws of your country, without regard to its conflict of law provisions.",
    },
    {
      id: 7,
      title: "Amendments",
      content:
        "We may update these terms from time to time, and it is your responsibility to review them periodically.",
    },
    {
      id: 8,
      title: "User Responsibilities",
      content:
        "Users must provide accurate information and not misuse the platform for illegal activities.",
    },
    {
      id: 9,
      title: "Refund Policy",
      content:
        "Refunds will be provided at our sole discretion, depending on the circumstances of the request.",
    },
    {
      id: 10,
      title: "Contact Information",
      content:
        "For any questions or concerns about these terms, please contact us at support@example.com.",
    },
  ],
};

const TermsService = () => {
  return (
    <>
      <div className="relative h-full :max-h-[600px] bg-about-us w-full  from-blue-900 via-blue-950 to-blue-950">
        <div className="bg-[#00000066] h-full w-full absolute top-0 bottom-0"></div>
        <TransparentNavbar isBgWhite={false} />
        <div className="w-full container pb-16 pt-8 m-auto relative  z-9">
          <div className="max-w-6xl m-auto py-20">
            <h1 className="mb-4 text-5xl  font-bold text-white text-center">
              Terms of Service
            </h1>
            <div className="flex gap-10 justify-center text-white  text-lg">
              <Link href="#" className="">
                Home
              </Link>
              .
              <Link href="#" className="">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="container m-auto mt-10 mb-10">
        {termsData.terms.map((term) => (
          <div key={term.id} className=" py-5 px-4">
            <h2 className="text-xl font-semibold">{term.title}</h2>
            <p className="text-gray-600">{term.content}</p>
          </div>
        ))}
      </div>
    </>
  );
};

export default TermsService;
