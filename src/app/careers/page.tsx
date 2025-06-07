import React from "react";
import { TransparentNavbar } from "@/components/header/transparentNav/TransparentNav";
import OpenPositons from "@/components/openPositions/page";
import { getAllCareers } from "@/lib/actions/career-actions";

const Careers = async ({ searchParams }: any) => {
  const params = await searchParams;

  const result = await getAllCareers(params) || { data: [], page: 0, total_page: 0, total: 0 };
  const { data, page, total_page, total } = result;

  return (
    <>
      <div className="relative h-full :max-h-[600px] bg-about-us w-full  from-blue-900 via-blue-950 to-blue-950">
        <div className="bg-[#00000066] h-full w-full absolute top-0 bottom-0"></div>
        <TransparentNavbar isBgWhite={false} />
        <div className="w-full container pb-16 pt-8 m-auto  relative z-9">
          <div className="max-w-6xl m-auto">
            <h1 className="mb-4 text-5xl py-20 font-bold text-white text-center">
              Careers
            </h1>
          </div>
        </div>
      </div>

      <section className="!bg-white">
        {data?.length > 0 && (
            <OpenPositons careers={data} />
        )}
      </section>
    </>
  );
};

export default Careers;
