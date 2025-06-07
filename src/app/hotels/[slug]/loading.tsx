import React from "react";
import { Skeleton } from "@/components/ui/skeleton";
import HeaderSkeleton from "@/components/skeletons/HotelFrom";

const HotelDetailsloader = () => {
  return (
    <>
      <div className="container mx-auto md:px-0 px-2 py-4">
        <HeaderSkeleton />

        <main className=" m-auto min-h-screen p-4 !shadow-none">
          <div className="bg-white md:p-6 p-4  !shadow-none rounded-lg">
            {/* Back Link */}
            <Skeleton className="h-3 w-[200px] mb-[30px] inline-block" />

            {/* Header Section */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4">
              <div className="flex md:flex-row flex-col justify-between w-full gap-7 md:gap-0">
                <div>
                  <Skeleton className="h-7 w-[300px] inline-block mb-1" />
                  <Skeleton className="h-5 w-[330px]" />
                </div>
                <div className="flex flex-col md:justify-end md:items-end items-start">
                  <Skeleton className="h-2 w-[110px] inline-block mb-2" />
                  <Skeleton className="h-5 w-[80px] inline-block mb-2" />
                  <Skeleton className="h-8 w-[140px] inline-block mb-2" />
                </div>
              </div>
            </div>

            <div className="mt-4 flex gap-2 items-center mb-4">
              <div className="hidden lg:flex items-center space-x-1">
                <Skeleton className="h-4 w-6" />
                <Skeleton className="h-4 w-6" />
                <Skeleton className="h-4 w-6" />
                <Skeleton className="h-4 w-6" />
                <Skeleton className="h-4 w-6" />
              </div>
              <Skeleton className="h-8 w-10" />
              <Skeleton className="h-3 w-[200px]" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              <Skeleton className="md:col-span-1 aspect-[4/3] overflow-hidden rounded-lg" />
              <div className="grid grid-cols-2 gap-2">
                <Skeleton className="relative aspect-[4/3] overflow-hidden rounded-lg" />
                <Skeleton className="relative aspect-[4/3] overflow-hidden rounded-lg" />
                <Skeleton className="relative aspect-[4/3] overflow-hidden rounded-lg" />
                <Skeleton className="relative aspect-[4/3] overflow-hidden rounded-lg" />
              </div>
            </div>
          </div>

          {/* Tabs menu */}
          <div className="w-full my-6  bg-white p-7 rounded-lg">
            <div className="flex flex-wrap gap-5">
              <Skeleton className="h-6 w-[90px]" />
              <Skeleton className="h-6 w-[130px]" />
              <Skeleton className="h-6 w-[130px]" />
              <Skeleton className="h-6 w-[100px]" />
              <Skeleton className="h-6 w-[60px]" />
              <Skeleton className="h-6 w-[100px]" />
              <Skeleton className="h-6 w-[80px]" />
            </div>
            <div className=" mt-10 grid grid-cols-[350px,1fr] gap-4">
              <div className="">
                <Skeleton className=" h-3 w-[200px] mb-4" />
                <div className="border p-4 ">
                  <Skeleton className=" h-[170px] my-3 w-full inline-block" />
                  <div className="space-y-2 mb-5">
                    <Skeleton className=" h-5 w-[200px]" />
                    <Skeleton className=" h-2 w-[150px]" />
                    <Skeleton className=" h-2 w-[280px]" />

                    <Skeleton className=" h-2 w-[80px]" />
                    <Skeleton className=" h-2 w-[100px]" />
                    <Skeleton className=" h-2 w-[70px]" />
                    <Skeleton className=" h-2 w-[40px]" />
                    <Skeleton className=" h-8 w-[130px]" />

                  </div>
                </div>
              </div>

              <div className="rounded-lg">
                <div className="grid grid-cols-[520px,200px,1fr] items-center" >
                  {/* Room Details */}
                  <div className="h-full">
                    <Skeleton className=" h-3 w-[200px] mb-4" />
                    <div className="space-y-2 border border-r-0 p-5 flex flex-col gap-3 h-full">
                      <div className="flex items-center gap-2">
                        <Skeleton className=" h-3 w-[100px]" />
                        <Skeleton className=" h-4 w-4" />
                      </div>
                      <Skeleton className=" h-3 w-[240px]" />
                      <div className="flex items-center gap-3 text-sm text-gray-600">

                        <div className="flex items-center gap-1 font-semibold"  >
                          <div className="flex items-center">
                            <Skeleton className=" h-4 w-4 mx-1" />
                            <Skeleton className=" h-4 w-[60px] mx-1" />
                          </div>

                          <div className="flex items-center">
                            <Skeleton className=" h-4 w-4 mx-1" />
                            <Skeleton className=" h-4 w-[50px] mx-1" />
                          </div>

                          <div className="flex items-center">
                            <Skeleton className=" h-4 w-4 mx-1" />
                            <Skeleton className=" h-4 w-[70px] mx-1" />
                          </div>

                          <div className="flex items-center">
                            <Skeleton className=" h-4 w-4 mx-1" />
                            <Skeleton className=" h-4 w-[40px] mx-1" />
                          </div>

                          <Skeleton className=" h-4 w-[70px] mx-1" />
                        </div>
                      </div>
                      <Skeleton className=" h-2 w-[350px] mx-1" />
                    </div>
                  </div>

                  {/* Guests */}
                  <div className="h-full">
                    <Skeleton className=" h-3 w-[100px] mb-4" />
                    <div className="space-y-2 p-4 h-full border">
                      <div className="flex items-center gap-1">
                        <Skeleton className=" h-4 w-4 " />
                        <Skeleton className=" h-4 w-[70px] " />
                      </div>
                    </div>
                  </div>

                  {/* Pricing & Reservation - Aligned to Right */}
                  <div className="h-full">
                    <Skeleton className=" h-3 w-[200px] mb-4 text-right ml-auto" />
                    <div className="space-y-4 text-right p-4 justify-self-end border border-l-0 h-full">
                      <div className="space-y-1">
                        <div className="flex items-end flex-col gap-2 justify-end">
                          <Skeleton className=" h-3 w-[200px]" />
                          <Skeleton className=" h-5 w-[150px]" />
                          <Skeleton className=" h-4 w-[220px] inline-block mb-3" />
                          <Skeleton className=" h-10 w-[160px]" />
                          <Skeleton className=" h-3 w-[140px]" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-[520px,200px,1fr] items-center" >
                  {/* Room Details */}
                  <div className="h-full">
                    <Skeleton className=" h-3 w-[200px] mb-4" />
                    <div className="space-y-2 border border-r-0 p-5 flex flex-col gap-3 h-full border-t-0">
                      <div className="flex items-center gap-2">
                        <Skeleton className=" h-3 w-[100px]" />
                        <Skeleton className=" h-4 w-4" />
                      </div>
                      <Skeleton className=" h-3 w-[240px]" />
                      <div className="flex items-center gap-3 text-sm text-gray-600">

                        <div className="flex items-center gap-1 font-semibold"  >
                          <div className="flex items-center">
                            <Skeleton className=" h-4 w-4 mx-1" />
                            <Skeleton className=" h-4 w-[60px] mx-1" />
                          </div>

                          <div className="flex items-center">
                            <Skeleton className=" h-4 w-4 mx-1" />
                            <Skeleton className=" h-4 w-[50px] mx-1" />
                          </div>

                          <div className="flex items-center">
                            <Skeleton className=" h-4 w-4 mx-1" />
                            <Skeleton className=" h-4 w-[70px] mx-1" />
                          </div>

                          <div className="flex items-center">
                            <Skeleton className=" h-4 w-4 mx-1" />
                            <Skeleton className=" h-4 w-[40px] mx-1" />
                          </div>

                          <Skeleton className=" h-4 w-[70px] mx-1" />
                        </div>
                      </div>
                      <Skeleton className=" h-2 w-[350px] mx-1" />
                    </div>
                  </div>

                  {/* Guests */}
                  <div className="h-full">
                    <Skeleton className=" h-3 w-[100px] mb-4" />
                    <div className="space-y-2 p-4 h-full border border-t-0">
                      <div className="flex items-center gap-1">
                        <Skeleton className=" h-4 w-4 " />
                        <Skeleton className=" h-4 w-[70px] " />
                      </div>
                    </div>
                  </div>

                  {/* Pricing & Reservation - Aligned to Right */}
                  <div className="h-full">
                    <Skeleton className=" h-3 w-[200px] mb-4 text-right ml-auto" />
                    <div className="space-y-4 text-right p-4 justify-self-end border border-l-0 border-t-0 h-full">
                      <div className="space-y-1">
                        <div className="flex items-end flex-col gap-2 justify-end">
                          <Skeleton className=" h-3 w-[200px]" />
                          <Skeleton className=" h-5 w-[150px]" />
                          <Skeleton className=" h-4 w-[220px] inline-block mb-3" />
                          <Skeleton className=" h-10 w-[160px]" />
                          <Skeleton className=" h-3 w-[140px]" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>

      </div>
    </>
  )
};

export default HotelDetailsloader;
