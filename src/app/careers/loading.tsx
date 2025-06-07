import React from "react";
import { Skeleton } from "@/components/ui/skeleton";
import HeaderSkeleton from "@/components/skeletons/HotelFrom";

const Careerloader = () => {
  return (
    <>
      <div className="container mx-auto md:px-0 px-2 py-4">
        <HeaderSkeleton />
      </div>

      <div className="w-full bg-white  py-[200px] m-auto  relative z-9">
        <Skeleton className="h-7 w-[200px] m-auto" />
      </div>

      <div className="container mx-auto my-32">
        <div className="flex flex-col gap-5">
          <Skeleton className="h-10 w-[350px] m-auto " />
          <Skeleton className="h-4 w-[550px] m-auto" />
        </div>

        <div className="mt-20">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="p-6 w-full max-w-6xl m-auto border rounded-lg mb-10">
              <div className="flex justify-between items-center mb-6">
                <Skeleton className="h-8 w-[400px]" />
                <Skeleton className="h-8 w-28" />
              </div>

              <div className="space-y-2 mb-8">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-[90%]" />
              </div>

              <div className="space-y-4">
                {[...Array(5)].map((_, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <Skeleton className="h-4 w-4 rounded-full" />
                    <Skeleton className="h-4 w-[60%]" />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

    </>
  )
};

export default Careerloader;
