import React from "react";
import { Skeleton } from "@/components/ui/skeleton";
import ItemSorting from "@/components/hotels/hotelFilter/ItemSorting";
import SkeletonHotelFrom from "@/components/skeletons/HotelFrom";
import HeaderSkeleton from "@/components/skeletons/HotelFrom";

const Umrahlodar = () => {
  return (
    <>
      {/* <div className="fixed inset-0 bg-white  flex items-center justify-center z-50">
        <div className="w-16 h-16 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
      </div> */}
      <div className="container mx-auto  md:px-0 px-2 py-4">
        <HeaderSkeleton />
        <div className="w-full  pb-16 pt-8 m-auto relative">
          <div className="max-w-6xl m-auto">
            <Skeleton className="h-10 w-32 mb-5" />
            <div className="flex lg:flex-row flex-col items-center  justify-start gap-2">
              <div className="border rounded-md flex-1 py-2 px-2 w-full">
                <Skeleton className="h-4 w-32 mb-2" />
                <Skeleton className="h-8 w-full" />
              </div>
              <div className="flex border rounded-md flex-1 md:flex-row flex-col w-full">
                <div className="px-4 py-2 flex-1">
                  <Skeleton className="h-4 w-24 mb-2" />
                  <Skeleton className="h-8 w-full" />
                </div>
                <div className="p-4">
                  <Skeleton className="h-8 w-full" />
                </div>
              </div>
              <div className="border rounded-md flex-1 py-2 px-2 w-full">
                <Skeleton className="h-4 w-40 mb-2" />
                <Skeleton className="h-8 w-full" />
              </div>
              <Skeleton className="h-14 w-32" />
            </div>
          </div>
        </div>

        <div className=" mt-8 flex flex-col md:flex-row lg:space-x-8 items-start px-4 sm:px-0">
          <div className="lg:block hidden w-full max-w-xs">
            <div className="w-full lg:max-w-xs bg-white shadow-lg rounded-lg overflow-hidden">
              <div className="w-full lg:max-w-md space-y-4 p-4 border-b border-white-frosted">
                <Skeleton className="h-8 w-[200px] mb-4 mt-4" />
                <div className="relative">
                  {/* Skeleton for the search icon */}
                  <div>
                    <Skeleton className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 transform" />
                    <Skeleton className="h-12 w-full mt-4" />
                  </div>
                  {/* <Skeleton className="w-full pl-10 text-base" /> */}
                </div>
              </div>
              <div className="p-4 pb-0">
                <Skeleton className="h-8 w-full  mb-2 mt-2" />
              </div>
              <div className="p-4 pt-0 flex items-center justify-between flex-wrap">
                <Skeleton className="h-8 w-16  mb-6 mt-2" />
                <Skeleton className="h-8 w-16  mb-6 mt-2" />
                <Skeleton className="h-8 w-16  mb-6 mt-2" />
                <Skeleton className="h-8 w-16  mb-6 mt-2" />
              </div>

              {/* budget sec */}
              <div className="p-4 pt-0">
                <div className=" pt-0 pb-0">
                  <Skeleton className="h-8 w-full  mb-2 mt-2" />
                </div>
                <div>
                  <Skeleton className="h-3 w-full mt-2" />
                  <div className="flex justify-between">
                    <Skeleton className="h-3 w-16 mt-2" />
                    <Skeleton className="h-3 w-[80px] mt-2" />
                  </div>
                  <div className=" pt-0 flex items-center justify-between flex-wrap">
                    <Skeleton className="h-8 w-16 mt-2" />
                    <Skeleton className="h-8 w-16 mt-2" />
                    <Skeleton className="h-8 w-16 mt-2" />
                    <Skeleton className="h-8 w-16 mt-2" />
                    <Skeleton className="h-8 w-16 mt-2" />
                    <Skeleton className="h-8 w-16 mt-2" />
                    <Skeleton className="h-8 w-16 mt-2" />
                    <Skeleton className="h-8 w-16 mt-2" />
                  </div>
                </div>
              </div>
              <div className="divide-y divide-white-frosted p-4">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="divide-y divide-white-frosted">
                    <div>
                      <Skeleton className="h-8 w-full  mb-6 mt-2" />
                      <Skeleton className="h-5 w-1/2 mb-4" />
                      <Skeleton className="h-5 w-full mb-4" />
                      <Skeleton className="h-5 w-3/4 mb-4" />
                      <Skeleton className="h-5 w-3/4 mb-4" />
                      <Skeleton className="h-5 w-full mb-4" />
                      <Skeleton className="h-5 w-3/4 mb-4" />
                      <Skeleton className="h-5 w-full mb-4" />
                    </div>
                  </div>
                ))}
              </div>

            </div>
          </div>

          <div className="w-full sm:flex-1 max-w-6xl">
            <div className="flex justify-between flex-wrap">
              <Skeleton className="h-7 w-[200px]" />
              <Skeleton className="h-7 w-[300px]" />
            </div>
            {/* <ItemSorting propertyCount={0} /> */}
            {[...Array(5)].map((_, i) => (
              <div className="mt-4" key={i}>

                <div className="overflow-hidden bg-white rounded-lg p-4 h-auto border-none w-full md:h-72">
                  <div className="flex flex-col md:flex-row gap-6 md:gap-10">
                    {/* Image Section */}
                    <Skeleton className="relative w-full h-56 sm:h-64  md:w-64" />


                    {/* Content Section */}
                    <div className="flex flex-1 flex-col gap-2">
                      <div className="flex flex-col lg:flex-row items-start justify-between">
                        <div className="space-y-6">
                          {/* Hotel Name & Rating */}
                          <div className="flex flex-col lg:flex-row items-start lg:items-center gap-2">
                            <Skeleton className="h-7 w-[250px]" />
                          </div>



                          {/* Location & Distance */}
                          <div className="flex flex-col md:flex-row items-start md:items-center gap-2 text-sm text-blue-600">
                            <div className="flex items-center gap-2">
                              <Skeleton className="h-3 w-[60px]" />
                              <Skeleton className="h-3 w-[80px]" />
                              <Skeleton className="h-1 w-1" />
                              <Skeleton className="h-3 w-[70px]" />
                              <Skeleton className="h-1 w-1" />
                            </div>
                            <div className="flex gap-2 items-center justify-center">
                              <Skeleton className="h-[14px] m-auto w-[14px]" />
                              <Skeleton className="h-full w-full" />
                            </div>
                          </div>
                          <div className="flex items-center  gap-1">
                            <Skeleton className="h-[20px] w-[30px]" />
                            <Skeleton className="h-[20px] w-[30px]" />
                            <Skeleton className="h-[20px] w-[30px]" />
                            <Skeleton className="h-[20px] w-[30px]" />
                            <Skeleton className="h-[20px] w-[30px]" />
                          </div>
                        </div>

                        <div className="md:flex items-center gap-2 mt-3 sm:mt-0 hidden">
                          <div className="rounded px-2 py-1 text-sm  text-center">
                            <Skeleton className="h-4 w-[80px] mb-3 m-auto" />
                            <Skeleton className="h-3 w-[130px] mt-3" />
                          </div>
                          <div className="p-2  flex items-center">
                            <Skeleton className="h-10 w-10" />
                          </div>
                        </div>
                      </div>

                      {/* Room Info */}
                      <div className="mt-2 sm:mt-auto flex flex-col sm:flex-row justify-between items-center text-sm gap-4">
                        <div className="flex items-center gap-4 flex-wrap">
                          <Skeleton className="h-3 w-[130px]" />
                          <Skeleton className="h-3 w-[130px]" />
                          <Skeleton className="h-3 w-[130px]" />
                          <Skeleton className="h-3 w-[130px]" />
                        </div>

                        {/* Price & CTA */}
                        <div className="text-right flex flex-col  gap-2">
                          <Skeleton className="h-5 w-[150px]" />
                          <Skeleton className="py-5 px-0" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </>
  )
};

export default Umrahlodar;
