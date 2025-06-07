import Link from "next/link";
import React from "react";

export default function JobListing({ careers }: any) {
  interface Career {
    id: string | number;
    title: string;
    country: { name: string };
    salary: number;
    designation: string;
    description: string;
    slug: string;
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-16">
      <div className="text-center mb-12">
        <h1 className="text-5xl font-bold text-gray-900 mb-4">
          Open positions
        </h1>
        <p className="text-lg text-dark">
          We are a 100% remote team spread all across the world. Join us!
        </p>
      </div>

      {careers.map((career: Career, index: number) => (
        <div key={index} className="border border-[#9a9a9ab6] rounded-[10px] shadow-sm bg-white p-6 hover:shadow-md transition-shadow mb-10">
          <div className="flex justify-between items-start mb-4">
            <h2 className="text-2xl font-semibold text-gray-900">
              {career.title}
            </h2>
            <Link
              href={`/job-application-form/${career.slug}`}
              className="text-primary hover:text-blue-700 font-semibold inline-flex items-center"
            >
              Apply job
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M7 17L17 7M17 7H7M17 7V17"
                  stroke="#3264FF"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </Link>
          </div>
          <div className="short-desc text-sm mt-5 font-sans"
            dangerouslySetInnerHTML={{
              __html: career.description,
            }}>
          </div>
        </div>
      ))}
    </div>
  );
}
