import React from "react";
import { Skeleton } from "@/components/ui/skeleton";
import HeaderSkeleton from "@/components/skeletons/HotelFrom";
import PrivateChauffeurCard from "@/components/skeletons/PrivateChauffeur";
import FooterSkeleton from "@/components/skeletons/FooterSkeleton";

const Homeloader = () => {
  return (
    <>
      <div className="container mx-auto md:px-0 px-2 py-4">
        <HeaderSkeleton />
      </div>

      <div className="w-full bg-white  py-[200px] m-auto  relative z-9">
        <Skeleton className="h-8 w-[600px] m-auto mb-4" />
        <Skeleton className="h-4 w-[400px] m-auto mb-14" />
        <div className="relative">
          <div className="container mx-auto max-w-4xl py-6 px-5 border rounded-lg grid lg:grid-cols-8 md:grid-cols-6 sm:grid-cols-4 grid-cols-2 xsm:w-full ">
            <Skeleton className="h-6 w-[100px] m-auto" />
            <Skeleton className="h-6 w-[100px] m-auto" />
            <Skeleton className="h-6 w-[100px] m-auto" />
            <Skeleton className="h-6 w-[100px] m-auto" />
            <Skeleton className="h-6 w-[100px] m-auto" />
            <Skeleton className="h-6 w-[100px] m-auto" />
            <Skeleton className="h-6 w-[100px] m-auto" />
            <Skeleton className="h-6 w-[100px] m-auto" />
          </div>

          <div className="container mx-auto border-t-0 max-w-3xl gap-5 py-6 px-5 border rounded-lg grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-2 xsm:w-full ">
            <Skeleton className="h-10 w-full m-auto" />
            <Skeleton className="h-10 w-full m-auto" />
            <Skeleton className="h-10 w-full m-auto" />
            <Skeleton className="h-10 w-[170px] m-auto" />
          </div>
        </div>
      </div>

      <div className="container mx-auto md:px-0 px-2 py-4">
        {/* heroooo */}
        <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-5 mt-[80px]">
          <Skeleton className="h-[300px] w-full m-auto" />
          <Skeleton className="h-[300px] w-full m-auto" />
          <Skeleton className="h-[300px] w-full m-auto" />
        </div>

        {/* Offer Slider */}
        <div className="flex flex-wrap gap-3 justify-center mt-5">
          <Skeleton className="h-3 w-3 rounded-full" />
          <Skeleton className="h-3 w-3 rounded-full" />
          <Skeleton className="h-3 w-3 rounded-full" />
        </div>

        {/* Recommended Attractions */}
        <div className="my-24">
          <Skeleton className="h-8 w-[700px] mb-[50px] mx-auto" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 px-6 sm:px-0">
            <div className="w-full border rounded-lg mx-auto ">
              <div className="p-0">
                <Skeleton className="aspect-[16/9] w-full rounded-t-lg" />
              </div>
              <div className="p-4 space-y-4">
                {/* {/ Entry Ticket Label /} */}
                <Skeleton className="h-4 w-24" />

                {/* {/ Title /} */}
                <Skeleton className="h-8 w-full sm:w-3/4" />

                {/* {/ Details Row /} */}
                <div className="flex flex-col md:flex-row flex-wrap gap-4">
                  <div className="flex items-center gap-2">
                    <Skeleton className="h-5 w-5 rounded-full" />
                    <Skeleton className="h-4 w-32" />
                  </div>
                  <div className="flex items-center gap-2">
                    <Skeleton className="h-5 w-5 rounded-full" />
                    <Skeleton className="h-4 w-24" />
                  </div>
                  <div className="flex items-center gap-2">
                    <Skeleton className="h-5 w-5 rounded-full" />
                    <Skeleton className="h-4 w-36" />
                  </div>
                </div>

                {/* {/ Price and Rating Row /} */}
                <div className="flex flex-col md:flex-row sm:items-center flex-wrap gap-5 sm:justify-between pt-4 ">
                  <div className="space-y-2 w-full">
                    <Skeleton className="h-4 w-12" />
                    <div className="flex items-center gap-2 w-full">
                      <Skeleton className="h-7 w-24" />
                      <Skeleton className="h-4 w-20" />
                    </div>
                  </div>

                  <div className="flex items-center gap-4 mt-4 sm:mt-0 w-full">
                    <div className="space-y-1 w-full">
                      <Skeleton className="h-4 w-12" />
                      <Skeleton className="h-3 w-20" />
                    </div>
                    <Skeleton className="h-10 w-12 rounded-md" />
                  </div>
                </div>
              </div>
            </div>

            <div className="w-full border rounded-lg mx-auto ">
              <div className="p-0">
                <Skeleton className="aspect-[16/9] w-full rounded-t-lg" />
              </div>
              <div className="p-4 space-y-4">
                {/* {/ Entry Ticket Label /} */}
                <Skeleton className="h-4 w-24" />

                {/* {/ Title /} */}
                <Skeleton className="h-8 w-full sm:w-3/4" />

                {/* {/ Details Row /} */}
                <div className="flex flex-col md:flex-row flex-wrap gap-4">
                  <div className="flex items-center gap-2">
                    <Skeleton className="h-5 w-5 rounded-full" />
                    <Skeleton className="h-4 w-32" />
                  </div>
                  <div className="flex items-center gap-2">
                    <Skeleton className="h-5 w-5 rounded-full" />
                    <Skeleton className="h-4 w-24" />
                  </div>
                  <div className="flex items-center gap-2">
                    <Skeleton className="h-5 w-5 rounded-full" />
                    <Skeleton className="h-4 w-36" />
                  </div>
                </div>

                {/* {/ Price and Rating Row /} */}
                <div className="flex flex-col md:flex-row sm:items-center flex-wrap gap-5 sm:justify-between pt-4 ">
                  <div className="space-y-2 w-full">
                    <Skeleton className="h-4 w-12" />
                    <div className="flex items-center gap-2 w-full">
                      <Skeleton className="h-7 w-24" />
                      <Skeleton className="h-4 w-20" />
                    </div>
                  </div>

                  <div className="flex items-center gap-4 mt-4 sm:mt-0 w-full">
                    <div className="space-y-1 w-full">
                      <Skeleton className="h-4 w-12" />
                      <Skeleton className="h-3 w-20" />
                    </div>
                    <Skeleton className="h-10 w-12 rounded-md" />
                  </div>
                </div>
              </div>
            </div>

            <div className="w-full border rounded-lg mx-auto ">
              <div className="p-0">
                <Skeleton className="aspect-[16/9] w-full rounded-t-lg" />
              </div>
              <div className="p-4 space-y-4">
                {/* {/ Entry Ticket Label /} */}
                <Skeleton className="h-4 w-24" />

                {/* {/ Title /} */}
                <Skeleton className="h-8 w-full sm:w-3/4" />

                {/* {/ Details Row /} */}
                <div className="flex flex-col md:flex-row flex-wrap gap-4">
                  <div className="flex items-center gap-2">
                    <Skeleton className="h-5 w-5 rounded-full" />
                    <Skeleton className="h-4 w-32" />
                  </div>
                  <div className="flex items-center gap-2">
                    <Skeleton className="h-5 w-5 rounded-full" />
                    <Skeleton className="h-4 w-24" />
                  </div>
                  <div className="flex items-center gap-2">
                    <Skeleton className="h-5 w-5 rounded-full" />
                    <Skeleton className="h-4 w-36" />
                  </div>
                </div>

                {/* {/ Price and Rating Row /} */}
                <div className="flex flex-col md:flex-row sm:items-center flex-wrap gap-5 sm:justify-between pt-4 ">
                  <div className="space-y-2 w-full">
                    <Skeleton className="h-4 w-12" />
                    <div className="flex items-center gap-2 w-full">
                      <Skeleton className="h-7 w-24" />
                      <Skeleton className="h-4 w-20" />
                    </div>
                  </div>

                  <div className="flex items-center gap-4 mt-4 sm:mt-0 w-full">
                    <div className="space-y-1 w-full">
                      <Skeleton className="h-4 w-12" />
                      <Skeleton className="h-3 w-20" />
                    </div>
                    <Skeleton className="h-10 w-12 rounded-md" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Your Private Chauffeur for all your journeys */}
        <div>
          <Skeleton className="h-10 w-[72%] mb-[50px] mx-auto" />
          <div className=" grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-6 sm:px-0">
            {[...Array(3)].map((_, i) => (
              <PrivateChauffeurCard key={i} />
            ))}
          </div>
        </div>

        {/* Top Destination for your Vacation */}
        <div className="my-24">
          <Skeleton className="h-8 w-[700px] mb-[50px] mx-auto" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 px-6 sm:px-0">
            <div className="w-full border rounded-lg mx-auto ">
              <div className="p-0">
                <Skeleton className="aspect-[16/9] w-full rounded-t-lg" />
              </div>
              <div className="p-4 space-y-4">
                {/* {/ Entry Ticket Label /} */}
                <Skeleton className="h-4 w-[230px]" />

                {/* {/ Title /} */}
                <Skeleton className="h-8 w-full md:w-[260px]" />

                {/* {/ Details Row /} */}
                <div className="flex flex-col md:flex-row flex-wrap gap-4">
                  <div className="flex items-center gap-2">
                    <Skeleton className="h-5 w-5 rounded-full" />
                    <Skeleton className="h-4 w-24" />
                  </div>
                  <div className="flex items-center gap-2">
                    <Skeleton className="h-5 w-5 rounded-full" />
                    <Skeleton className="h-4 w-20" />
                  </div>
                  <div className="flex items-center gap-2">
                    <Skeleton className="h-5 w-5 rounded-full" />
                    <Skeleton className="h-4 w-36" />
                  </div>
                  <div className="flex items-center gap-2">
                    <Skeleton className="h-5 w-5 rounded-full" />
                    <Skeleton className="h-4 w-24" />
                  </div>
                  <div className="flex items-center gap-2">
                    <Skeleton className="h-5 w-5 rounded-full" />
                    <Skeleton className="h-4 w-36" />
                  </div>
                </div>

                {/* {/ Price and Rating Row /} */}
                <div className="flex flex-col md:flex-row sm:items-center flex-wrap gap-5 sm:justify-between pt-4 ">
                  <div className="space-y-2 w-full">
                    <Skeleton className="h-4 w-12" />
                    <div className="flex items-center gap-2 w-full">
                      <Skeleton className="h-7 w-24" />
                      <Skeleton className="h-4 w-20" />
                    </div>
                  </div>

                  <div className="flex items-center gap-4 mt-4 sm:mt-0 w-full">
                    <div className="space-y-1 w-full">
                      <Skeleton className="h-4 w-12" />
                      <Skeleton className="h-3 w-20" />
                    </div>
                    <Skeleton className="h-10 w-12 rounded-md" />
                  </div>
                </div>
              </div>
            </div>

            <div className="w-full border rounded-lg mx-auto ">
              <div className="p-0">
                <Skeleton className="aspect-[16/9] w-full rounded-t-lg" />
              </div>
              <div className="p-4 space-y-4">
                {/* {/ Entry Ticket Label /} */}
                <Skeleton className="h-4 w-[230px]" />

                {/* {/ Title /} */}
                <Skeleton className="h-8 w-full md:w-[260px]" />

                {/* {/ Details Row /} */}
                <div className="flex flex-col md:flex-row flex-wrap gap-4">
                  <div className="flex items-center gap-2">
                    <Skeleton className="h-5 w-5 rounded-full" />
                    <Skeleton className="h-4 w-24" />
                  </div>
                  <div className="flex items-center gap-2">
                    <Skeleton className="h-5 w-5 rounded-full" />
                    <Skeleton className="h-4 w-20" />
                  </div>
                  <div className="flex items-center gap-2">
                    <Skeleton className="h-5 w-5 rounded-full" />
                    <Skeleton className="h-4 w-36" />
                  </div>
                  <div className="flex items-center gap-2">
                    <Skeleton className="h-5 w-5 rounded-full" />
                    <Skeleton className="h-4 w-24" />
                  </div>
                  <div className="flex items-center gap-2">
                    <Skeleton className="h-5 w-5 rounded-full" />
                    <Skeleton className="h-4 w-36" />
                  </div>
                </div>

                {/* {/ Price and Rating Row /} */}
                <div className="flex flex-col md:flex-row sm:items-center flex-wrap gap-5 sm:justify-between pt-4 ">
                  <div className="space-y-2 w-full">
                    <Skeleton className="h-4 w-12" />
                    <div className="flex items-center gap-2 w-full">
                      <Skeleton className="h-7 w-24" />
                      <Skeleton className="h-4 w-20" />
                    </div>
                  </div>

                  <div className="flex items-center gap-4 mt-4 sm:mt-0 w-full">
                    <div className="space-y-1 w-full">
                      <Skeleton className="h-4 w-12" />
                      <Skeleton className="h-3 w-20" />
                    </div>
                    <Skeleton className="h-10 w-12 rounded-md" />
                  </div>
                </div>
              </div>
            </div>

            <div className="w-full border rounded-lg mx-auto ">
              <div className="p-0">
                <Skeleton className="aspect-[16/9] w-full rounded-t-lg" />
              </div>
              <div className="p-4 space-y-4">
                {/* {/ Entry Ticket Label /} */}
                <Skeleton className="h-4 w-[230px]" />

                {/* {/ Title /} */}
                <Skeleton className="h-8 w-full md:w-[260px]" />

                {/* {/ Details Row /} */}
                <div className="flex flex-col md:flex-row flex-wrap gap-4">
                  <div className="flex items-center gap-2">
                    <Skeleton className="h-5 w-5 rounded-full" />
                    <Skeleton className="h-4 w-24" />
                  </div>
                  <div className="flex items-center gap-2">
                    <Skeleton className="h-5 w-5 rounded-full" />
                    <Skeleton className="h-4 w-20" />
                  </div>
                  <div className="flex items-center gap-2">
                    <Skeleton className="h-5 w-5 rounded-full" />
                    <Skeleton className="h-4 w-36" />
                  </div>
                  <div className="flex items-center gap-2">
                    <Skeleton className="h-5 w-5 rounded-full" />
                    <Skeleton className="h-4 w-24" />
                  </div>
                  <div className="flex items-center gap-2">
                    <Skeleton className="h-5 w-5 rounded-full" />
                    <Skeleton className="h-4 w-36" />
                  </div>
                </div>

                {/* {/ Price and Rating Row /} */}
                <div className="flex flex-col md:flex-row sm:items-center flex-wrap gap-5 sm:justify-between pt-4 ">
                  <div className="space-y-2 w-full">
                    <Skeleton className="h-4 w-12" />
                    <div className="flex items-center gap-2 w-full">
                      <Skeleton className="h-7 w-24" />
                      <Skeleton className="h-4 w-20" />
                    </div>
                  </div>

                  <div className="flex items-center gap-4 mt-4 sm:mt-0 w-full">
                    <div className="space-y-1 w-full">
                      <Skeleton className="h-4 w-12" />
                      <Skeleton className="h-3 w-20" />
                    </div>
                    <Skeleton className="h-10 w-12 rounded-md" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Best Hotels for Your Next Trip */}
        <div className="my-24">
          <Skeleton className="h-10 w-[700px] mb-[50px] mx-auto" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 px-6 sm:px-0">
            <div className="w-full border rounded-lg mx-auto ">
              <div className="p-0">
                <Skeleton className="aspect-[16/9] w-full rounded-t-lg" />
              </div>
              <div className="p-4 space-y-4">
                {/* {/ Entry Ticket Label /} */}
                <Skeleton className="h-4 w-[230px]" />

                {/* {/ Title /} */}
                <div className="flex gap-3 flex-wrap justify-between items-center">
                  <Skeleton className="h-8 w-[300px]" />
                  <div className="flex flex-wrap gap-1">
                    <Skeleton className="h-4 w-4 rounded-none" />
                    <Skeleton className="h-4 w-4 rounded-none" />
                    <Skeleton className="h-4 w-4 rounded-none" />
                    <Skeleton className="h-4 w-4 rounded-none" />
                    <Skeleton className="h-4 w-4 rounded-none" />
                  </div>
                </div>

                {/* {/ Details Row /} */}
                <div className="flex flex-col md:flex-row flex-wrap gap-4">
                  <div className="flex items-center gap-2">
                    <Skeleton className="h-3 w-28" />
                  </div>
                  <div className="flex items-center gap-2">
                    <Skeleton className="h-2 w-2 rounded-full" />
                    <Skeleton className="h-3 w-20" />
                  </div>
                </div>

                {/* {/ Price and Rating Row /} */}
                <div className="flex flex-col md:flex-row sm:items-center flex-wrap gap-5 sm:justify-between pt-4 ">
                  <div className="space-y-2 md:w-auto w-full">
                    <Skeleton className="h-4 w-12" />
                    <div className="flex items-center gap-2 w-full">
                      <Skeleton className="h-7 w-24" />
                      <Skeleton className="h-4 w-20" />
                    </div>
                  </div>

                  <div className="flex items-center gap-4 mt-4 sm:mt-0 lg:w-auto w-full">
                    <div className="space-y-1 w-full">
                      <Skeleton className="h-4 w-12" />
                      <Skeleton className="h-3 w-20" />
                    </div>
                    <Skeleton className="h-10 w-12 rounded-md" />
                  </div>
                </div>
              </div>
            </div>

            <div className="w-full border rounded-lg mx-auto ">
              <div className="p-0">
                <Skeleton className="aspect-[16/9] w-full rounded-t-lg" />
              </div>
              <div className="p-4 space-y-4">
                {/* {/ Entry Ticket Label /} */}
                <Skeleton className="h-4 w-[230px]" />

                {/* {/ Title /} */}
                <div className="flex gap-3 flex-wrap justify-between items-center">
                  <Skeleton className="h-8 w-[300px]" />
                  <div className="flex flex-wrap gap-1">
                    <Skeleton className="h-4 w-4 rounded-none" />
                    <Skeleton className="h-4 w-4 rounded-none" />
                    <Skeleton className="h-4 w-4 rounded-none" />
                    <Skeleton className="h-4 w-4 rounded-none" />
                    <Skeleton className="h-4 w-4 rounded-none" />
                  </div>
                </div>

                {/* {/ Details Row /} */}
                <div className="flex flex-col md:flex-row flex-wrap gap-4">
                  <div className="flex items-center gap-2">
                    <Skeleton className="h-3 w-28" />
                  </div>
                  <div className="flex items-center gap-2">
                    <Skeleton className="h-2 w-2 rounded-full" />
                    <Skeleton className="h-3 w-20" />
                  </div>
                </div>

                {/* {/ Price and Rating Row /} */}
                <div className="flex flex-col md:flex-row sm:items-center flex-wrap gap-5 sm:justify-between pt-4 ">
                  <div className="space-y-2 md:w-auto w-full">
                    <Skeleton className="h-4 w-12" />
                    <div className="flex items-center gap-2 w-full">
                      <Skeleton className="h-7 w-24" />
                      <Skeleton className="h-4 w-20" />
                    </div>
                  </div>

                  <div className="flex items-center gap-4 mt-4 sm:mt-0 lg:w-auto w-full">
                    <div className="space-y-1 w-full">
                      <Skeleton className="h-4 w-12" />
                      <Skeleton className="h-3 w-20" />
                    </div>
                    <Skeleton className="h-10 w-12 rounded-md" />
                  </div>
                </div>
              </div>
            </div>

            <div className="w-full border rounded-lg mx-auto ">
              <div className="p-0">
                <Skeleton className="aspect-[16/9] w-full rounded-t-lg" />
              </div>
              <div className="p-4 space-y-4">
                {/* {/ Entry Ticket Label /} */}
                <Skeleton className="h-4 w-[230px]" />

                {/* {/ Title /} */}
                <div className="flex gap-3 flex-wrap justify-between items-center">
                  <Skeleton className="h-8 w-[300px]" />
                  <div className="flex flex-wrap gap-1">
                    <Skeleton className="h-4 w-4 rounded-none" />
                    <Skeleton className="h-4 w-4 rounded-none" />
                    <Skeleton className="h-4 w-4 rounded-none" />
                    <Skeleton className="h-4 w-4 rounded-none" />
                    <Skeleton className="h-4 w-4 rounded-none" />
                  </div>
                </div>

                {/* {/ Details Row /} */}
                <div className="flex flex-col md:flex-row flex-wrap gap-4">
                  <div className="flex items-center gap-2">
                    <Skeleton className="h-3 w-28" />
                  </div>
                  <div className="flex items-center gap-2">
                    <Skeleton className="h-2 w-2 rounded-full" />
                    <Skeleton className="h-3 w-20" />
                  </div>
                </div>

                {/* {/ Price and Rating Row /} */}
                <div className="flex flex-col md:flex-row sm:items-center flex-wrap gap-5 sm:justify-between pt-4 ">
                  <div className="space-y-2 md:w-auto w-full">
                    <Skeleton className="h-4 w-12" />
                    <div className="flex items-center gap-2 w-full">
                      <Skeleton className="h-7 w-24" />
                      <Skeleton className="h-4 w-20" />
                    </div>
                  </div>

                  <div className="flex items-center gap-4 mt-4 sm:mt-0 lg:w-auto w-full">
                    <div className="space-y-1 w-full">
                      <Skeleton className="h-4 w-12" />
                      <Skeleton className="h-3 w-20" />
                    </div>
                    <Skeleton className="h-10 w-12 rounded-md" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Top Destination for your Vacation */}
        <div className="my-24">
          <Skeleton className="h-8 w-[700px] mb-[50px] mx-auto" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 px-6 sm:px-0">
            <div className="w-full border rounded-lg mx-auto ">
              <div className="p-0">
                <Skeleton className="aspect-[16/9] w-full rounded-t-lg" />
              </div>
              <div className="p-4 space-y-4">
                {/* {/ Entry Ticket Label /} */}
                <Skeleton className="h-4 w-[230px]" />

                {/* {/ Title /} */}
                <Skeleton className="h-8 w-full md:w-[260px]" />

                {/* {/ Details Row /} */}
                <div className="flex flex-col md:flex-row flex-wrap gap-4">
                  <div className="flex items-center gap-2">
                    <Skeleton className="h-5 w-5 rounded-full" />
                    <Skeleton className="h-4 w-24" />
                  </div>
                  <div className="flex items-center gap-2">
                    <Skeleton className="h-5 w-5 rounded-full" />
                    <Skeleton className="h-4 w-20" />
                  </div>
                  <div className="flex items-center gap-2">
                    <Skeleton className="h-5 w-5 rounded-full" />
                    <Skeleton className="h-4 w-36" />
                  </div>
                  <div className="flex items-center gap-2">
                    <Skeleton className="h-5 w-5 rounded-full" />
                    <Skeleton className="h-4 w-24" />
                  </div>
                  <div className="flex items-center gap-2">
                    <Skeleton className="h-5 w-5 rounded-full" />
                    <Skeleton className="h-4 w-36" />
                  </div>
                </div>

                <div className="mt-3 mb-8">
                  <Skeleton className="h-3 w-full mb-2" />
                  <Skeleton className="h-3 w-[50%]" />
                </div>

                {/* {/ Price and Rating Row /} */}
                <div className="flex flex-col md:flex-row sm:items-center flex-wrap gap-5 sm:justify-between pt-4 ">
                  <div className="space-y-2 w-full">
                    <Skeleton className="h-4 w-12" />
                    <div className="flex items-center gap-2 w-full">
                      <Skeleton className="h-7 w-24" />
                      <Skeleton className="h-4 w-20" />
                    </div>
                  </div>

                  <div className="flex items-center gap-4 mt-4 sm:mt-0 w-full">
                    <div className="space-y-1 w-full">
                      <Skeleton className="h-4 w-12" />
                      <Skeleton className="h-3 w-20" />
                    </div>
                    <Skeleton className="h-10 w-12 rounded-md" />
                  </div>
                </div>
              </div>
            </div>

            <div className="w-full border rounded-lg mx-auto ">
              <div className="p-0">
                <Skeleton className="aspect-[16/9] w-full rounded-t-lg" />
              </div>
              <div className="p-4 space-y-4">
                {/* {/ Entry Ticket Label /} */}
                <Skeleton className="h-4 w-[230px]" />

                {/* {/ Title /} */}
                <Skeleton className="h-8 w-full md:w-[260px]" />

                {/* {/ Details Row /} */}
                <div className="flex flex-col md:flex-row flex-wrap gap-4">
                  <div className="flex items-center gap-2">
                    <Skeleton className="h-5 w-5 rounded-full" />
                    <Skeleton className="h-4 w-24" />
                  </div>
                  <div className="flex items-center gap-2">
                    <Skeleton className="h-5 w-5 rounded-full" />
                    <Skeleton className="h-4 w-20" />
                  </div>
                  <div className="flex items-center gap-2">
                    <Skeleton className="h-5 w-5 rounded-full" />
                    <Skeleton className="h-4 w-36" />
                  </div>
                  <div className="flex items-center gap-2">
                    <Skeleton className="h-5 w-5 rounded-full" />
                    <Skeleton className="h-4 w-24" />
                  </div>
                  <div className="flex items-center gap-2">
                    <Skeleton className="h-5 w-5 rounded-full" />
                    <Skeleton className="h-4 w-36" />
                  </div>
                </div>

                <div className="mt-3 mb-8">
                  <Skeleton className="h-3 w-full mb-2" />
                  <Skeleton className="h-3 w-[50%]" />
                </div>

                {/* {/ Price and Rating Row /} */}
                <div className="flex flex-col md:flex-row sm:items-center flex-wrap gap-5 sm:justify-between pt-4 ">
                  <div className="space-y-2 w-full">
                    <Skeleton className="h-4 w-12" />
                    <div className="flex items-center gap-2 w-full">
                      <Skeleton className="h-7 w-24" />
                      <Skeleton className="h-4 w-20" />
                    </div>
                  </div>

                  <div className="flex items-center gap-4 mt-4 sm:mt-0 w-full">
                    <div className="space-y-1 w-full">
                      <Skeleton className="h-4 w-12" />
                      <Skeleton className="h-3 w-20" />
                    </div>
                    <Skeleton className="h-10 w-12 rounded-md" />
                  </div>
                </div>
              </div>
            </div>

            <div className="w-full border rounded-lg mx-auto ">
              <div className="p-0">
                <Skeleton className="aspect-[16/9] w-full rounded-t-lg" />
              </div>
              <div className="p-4 space-y-4">
                {/* {/ Entry Ticket Label /} */}
                <Skeleton className="h-4 w-[230px]" />

                {/* {/ Title /} */}
                <Skeleton className="h-8 w-full md:w-[260px]" />

                {/* {/ Details Row /} */}
                <div className="flex flex-col md:flex-row flex-wrap gap-4">
                  <div className="flex items-center gap-2">
                    <Skeleton className="h-5 w-5 rounded-full" />
                    <Skeleton className="h-4 w-24" />
                  </div>
                  <div className="flex items-center gap-2">
                    <Skeleton className="h-5 w-5 rounded-full" />
                    <Skeleton className="h-4 w-20" />
                  </div>
                  <div className="flex items-center gap-2">
                    <Skeleton className="h-5 w-5 rounded-full" />
                    <Skeleton className="h-4 w-36" />
                  </div>
                  <div className="flex items-center gap-2">
                    <Skeleton className="h-5 w-5 rounded-full" />
                    <Skeleton className="h-4 w-24" />
                  </div>
                  <div className="flex items-center gap-2">
                    <Skeleton className="h-5 w-5 rounded-full" />
                    <Skeleton className="h-4 w-36" />
                  </div>
                </div>

                <div className="mt-3 mb-8">
                  <Skeleton className="h-3 w-full mb-2" />
                  <Skeleton className="h-3 w-[50%]" />
                </div>

                {/* {/ Price and Rating Row /} */}
                <div className="flex flex-col md:flex-row sm:items-center flex-wrap gap-5 sm:justify-between pt-4 ">
                  <div className="space-y-2 w-full">
                    <Skeleton className="h-4 w-12" />
                    <div className="flex items-center gap-2 w-full">
                      <Skeleton className="h-7 w-24" />
                      <Skeleton className="h-4 w-20" />
                    </div>
                  </div>

                  <div className="flex items-center gap-4 mt-4 sm:mt-0 w-full">
                    <div className="space-y-1 w-full">
                      <Skeleton className="h-4 w-12" />
                      <Skeleton className="h-3 w-20" />
                    </div>
                    <Skeleton className="h-10 w-12 rounded-md" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Your Private Chauffeur for all your journeys */}
        <div>
          <Skeleton className="h-10 w-[72%] mb-[50px] mx-auto" />
          <div className=" grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-6 sm:px-0">
            {[...Array(3)].map((_, i) => (
              <PrivateChauffeurCard key={i} />
            ))}
          </div>
        </div>

        {/* Visa Services */}
        <div className="my-24">
          <Skeleton className="h-8 w-[700px] mb-[50px] mx-auto" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 px-6 sm:px-0">
            <div className="w-full border rounded-lg mx-auto ">
              <div className="p-0">
                <Skeleton className="aspect-[16/9] w-full rounded-t-lg" />
              </div>
              <div className="p-4 space-y-4">
                {/* {/ Entry Ticket Label /} */}
                <Skeleton className="h-4 w-[230px]" />

                {/* {/ Title /} */}
                <Skeleton className="h-8 w-full md:w-[260px]" />

                {/* {/ Details Row /} */}
                <div className="flex flex-col gap-4">
                  <div className="flex items-center gap-2">
                    <Skeleton className="h-5 w-5 rounded-full" />
                    <Skeleton className="h-4 w-24" />
                  </div>
                  <div className="flex items-center gap-2">
                    <Skeleton className="h-5 w-5 rounded-full" />
                    <Skeleton className="h-4 w-32" />
                  </div>
                  <div className="flex items-center gap-2">
                    <Skeleton className="h-5 w-5 rounded-full" />
                    <Skeleton className="h-4 w-36" />
                  </div>
                  <div className="flex items-center gap-2">
                    <Skeleton className="h-5 w-5 rounded-full" />
                    <Skeleton className="h-4 w-24" />
                  </div>
                </div>

                {/* {/ Price and Rating Row /} */}
                <div className="flex  flex-wrap gap-5 justify-between pt-4 ">
                  <div className="space-y-2 ">
                    <Skeleton className="h-4 w-12" />
                    <div className="flex items-center gap-2 w-full">
                      <Skeleton className="h-7 w-24" />
                      <Skeleton className="h-4 w-20" />
                    </div>
                  </div>

                  <div className="flex items-center gap-4 mt-4 sm:mt-0">
                    <div className="space-y-1 w-full">
                      <Skeleton className="h-4 w-12" />
                      <Skeleton className="h-3 w-20" />
                    </div>
                    <Skeleton className="h-10 w-12 rounded-md" />
                  </div>
                </div>
              </div>
            </div>

            <div className="w-full border rounded-lg mx-auto ">
              <div className="p-0">
                <Skeleton className="aspect-[16/9] w-full rounded-t-lg" />
              </div>
              <div className="p-4 space-y-4">
                {/* {/ Entry Ticket Label /} */}
                <Skeleton className="h-4 w-[230px]" />

                {/* {/ Title /} */}
                <Skeleton className="h-8 w-full md:w-[260px]" />

                {/* {/ Details Row /} */}
                <div className="flex flex-col gap-4">
                  <div className="flex items-center gap-2">
                    <Skeleton className="h-5 w-5 rounded-full" />
                    <Skeleton className="h-4 w-24" />
                  </div>
                  <div className="flex items-center gap-2">
                    <Skeleton className="h-5 w-5 rounded-full" />
                    <Skeleton className="h-4 w-32" />
                  </div>
                  <div className="flex items-center gap-2">
                    <Skeleton className="h-5 w-5 rounded-full" />
                    <Skeleton className="h-4 w-36" />
                  </div>
                  <div className="flex items-center gap-2">
                    <Skeleton className="h-5 w-5 rounded-full" />
                    <Skeleton className="h-4 w-24" />
                  </div>
                </div>

                {/* {/ Price and Rating Row /} */}
                <div className="flex  flex-wrap gap-5 justify-between pt-4 ">
                  <div className="space-y-2 ">
                    <Skeleton className="h-4 w-12" />
                    <div className="flex items-center gap-2 w-full">
                      <Skeleton className="h-7 w-24" />
                      <Skeleton className="h-4 w-20" />
                    </div>
                  </div>

                  <div className="flex items-center gap-4 mt-4 sm:mt-0">
                    <div className="space-y-1 w-full">
                      <Skeleton className="h-4 w-12" />
                      <Skeleton className="h-3 w-20" />
                    </div>
                    <Skeleton className="h-10 w-12 rounded-md" />
                  </div>
                </div>
              </div>
            </div>

            <div className="w-full border rounded-lg mx-auto ">
              <div className="p-0">
                <Skeleton className="aspect-[16/9] w-full rounded-t-lg" />
              </div>
              <div className="p-4 space-y-4">
                {/* {/ Entry Ticket Label /} */}
                <Skeleton className="h-4 w-[230px]" />

                {/* {/ Title /} */}
                <Skeleton className="h-8 w-full md:w-[260px]" />

                {/* {/ Details Row /} */}
                <div className="flex flex-col gap-4">
                  <div className="flex items-center gap-2">
                    <Skeleton className="h-5 w-5 rounded-full" />
                    <Skeleton className="h-4 w-24" />
                  </div>
                  <div className="flex items-center gap-2">
                    <Skeleton className="h-5 w-5 rounded-full" />
                    <Skeleton className="h-4 w-32" />
                  </div>
                  <div className="flex items-center gap-2">
                    <Skeleton className="h-5 w-5 rounded-full" />
                    <Skeleton className="h-4 w-36" />
                  </div>
                  <div className="flex items-center gap-2">
                    <Skeleton className="h-5 w-5 rounded-full" />
                    <Skeleton className="h-4 w-24" />
                  </div>
                </div>

                {/* {/ Price and Rating Row /} */}
                <div className="flex  flex-wrap gap-5 justify-between pt-4 ">
                  <div className="space-y-2 ">
                    <Skeleton className="h-4 w-12" />
                    <div className="flex items-center gap-2 w-full">
                      <Skeleton className="h-7 w-24" />
                      <Skeleton className="h-4 w-20" />
                    </div>
                  </div>

                  <div className="flex items-center gap-4 mt-4 sm:mt-0">
                    <div className="space-y-1 w-full">
                      <Skeleton className="h-4 w-12" />
                      <Skeleton className="h-3 w-20" />
                    </div>
                    <Skeleton className="h-10 w-12 rounded-md" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Top Destination for your Vacation */}
        <div className="my-24">
          <Skeleton className="h-8 w-[700px] mb-[50px] mx-auto" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 px-6 sm:px-0">
            <div className="w-full border rounded-lg mx-auto ">
              <div className="p-0">
                <Skeleton className="aspect-[16/9] w-full rounded-t-lg" />
              </div>
              <div className="p-4 space-y-4">
                {/* {/ Entry Ticket Label /} */}
                <Skeleton className="h-4 w-[230px]" />

                {/* {/ Title /} */}
                <Skeleton className="h-8 w-full md:w-[260px]" />

                {/* {/ Details Row /} */}
                <div className="flex flex-col md:flex-row flex-wrap gap-4">
                  <div className="flex items-center gap-2">
                    <Skeleton className="h-5 w-5 rounded-full" />
                    <Skeleton className="h-4 w-24" />
                  </div>
                  <div className="flex items-center gap-2">
                    <Skeleton className="h-5 w-5 rounded-full" />
                    <Skeleton className="h-4 w-20" />
                  </div>
                  <div className="flex items-center gap-2">
                    <Skeleton className="h-5 w-5 rounded-full" />
                    <Skeleton className="h-4 w-36" />
                  </div>
                  <div className="flex items-center gap-2">
                    <Skeleton className="h-5 w-5 rounded-full" />
                    <Skeleton className="h-4 w-24" />
                  </div>
                  <div className="flex items-center gap-2">
                    <Skeleton className="h-5 w-5 rounded-full" />
                    <Skeleton className="h-4 w-36" />
                  </div>
                </div>

                {/* {/ Price and Rating Row /} */}
                <div className="flex flex-col md:flex-row sm:items-center flex-wrap gap-5 sm:justify-between pt-4 ">
                  <div className="space-y-2 w-full">
                    <Skeleton className="h-4 w-12" />
                    <div className="flex items-center gap-2 w-full">
                      <Skeleton className="h-7 w-24" />
                      <Skeleton className="h-4 w-20" />
                    </div>
                  </div>

                  <div className="flex items-center gap-4 mt-4 sm:mt-0 w-full">
                    <div className="space-y-1 w-full">
                      <Skeleton className="h-4 w-12" />
                      <Skeleton className="h-3 w-20" />
                    </div>
                    <Skeleton className="h-10 w-12 rounded-md" />
                  </div>
                </div>
              </div>
            </div>

            <div className="w-full border rounded-lg mx-auto ">
              <div className="p-0">
                <Skeleton className="aspect-[16/9] w-full rounded-t-lg" />
              </div>
              <div className="p-4 space-y-4">
                {/* {/ Entry Ticket Label /} */}
                <Skeleton className="h-4 w-[230px]" />

                {/* {/ Title /} */}
                <Skeleton className="h-8 w-full md:w-[260px]" />

                {/* {/ Details Row /} */}
                <div className="flex flex-col md:flex-row flex-wrap gap-4">
                  <div className="flex items-center gap-2">
                    <Skeleton className="h-5 w-5 rounded-full" />
                    <Skeleton className="h-4 w-24" />
                  </div>
                  <div className="flex items-center gap-2">
                    <Skeleton className="h-5 w-5 rounded-full" />
                    <Skeleton className="h-4 w-20" />
                  </div>
                  <div className="flex items-center gap-2">
                    <Skeleton className="h-5 w-5 rounded-full" />
                    <Skeleton className="h-4 w-36" />
                  </div>
                  <div className="flex items-center gap-2">
                    <Skeleton className="h-5 w-5 rounded-full" />
                    <Skeleton className="h-4 w-24" />
                  </div>
                  <div className="flex items-center gap-2">
                    <Skeleton className="h-5 w-5 rounded-full" />
                    <Skeleton className="h-4 w-36" />
                  </div>
                </div>

                {/* {/ Price and Rating Row /} */}
                <div className="flex flex-col md:flex-row sm:items-center flex-wrap gap-5 sm:justify-between pt-4 ">
                  <div className="space-y-2 w-full">
                    <Skeleton className="h-4 w-12" />
                    <div className="flex items-center gap-2 w-full">
                      <Skeleton className="h-7 w-24" />
                      <Skeleton className="h-4 w-20" />
                    </div>
                  </div>

                  <div className="flex items-center gap-4 mt-4 sm:mt-0 w-full">
                    <div className="space-y-1 w-full">
                      <Skeleton className="h-4 w-12" />
                      <Skeleton className="h-3 w-20" />
                    </div>
                    <Skeleton className="h-10 w-12 rounded-md" />
                  </div>
                </div>
              </div>
            </div>

            <div className="w-full border rounded-lg mx-auto ">
              <div className="p-0">
                <Skeleton className="aspect-[16/9] w-full rounded-t-lg" />
              </div>
              <div className="p-4 space-y-4">
                {/* {/ Entry Ticket Label /} */}
                <Skeleton className="h-4 w-[230px]" />

                {/* {/ Title /} */}
                <Skeleton className="h-8 w-full md:w-[260px]" />

                {/* {/ Details Row /} */}
                <div className="flex flex-col md:flex-row flex-wrap gap-4">
                  <div className="flex items-center gap-2">
                    <Skeleton className="h-5 w-5 rounded-full" />
                    <Skeleton className="h-4 w-24" />
                  </div>
                  <div className="flex items-center gap-2">
                    <Skeleton className="h-5 w-5 rounded-full" />
                    <Skeleton className="h-4 w-20" />
                  </div>
                  <div className="flex items-center gap-2">
                    <Skeleton className="h-5 w-5 rounded-full" />
                    <Skeleton className="h-4 w-36" />
                  </div>
                  <div className="flex items-center gap-2">
                    <Skeleton className="h-5 w-5 rounded-full" />
                    <Skeleton className="h-4 w-24" />
                  </div>
                  <div className="flex items-center gap-2">
                    <Skeleton className="h-5 w-5 rounded-full" />
                    <Skeleton className="h-4 w-36" />
                  </div>
                </div>

                {/* {/ Price and Rating Row /} */}
                <div className="flex flex-col md:flex-row sm:items-center flex-wrap gap-5 sm:justify-between pt-4 ">
                  <div className="space-y-2 w-full">
                    <Skeleton className="h-4 w-12" />
                    <div className="flex items-center gap-2 w-full">
                      <Skeleton className="h-7 w-24" />
                      <Skeleton className="h-4 w-20" />
                    </div>
                  </div>

                  <div className="flex items-center gap-4 mt-4 sm:mt-0 w-full">
                    <div className="space-y-1 w-full">
                      <Skeleton className="h-4 w-12" />
                      <Skeleton className="h-3 w-20" />
                    </div>
                    <Skeleton className="h-10 w-12 rounded-md" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Helping to grow the next generation of 100+ flights */}
        <div className="my-24">
          <Skeleton className="h-5 w-[52%] mb-[50px] mx-auto" />

          <div className="flex flex-wrap justify-between items-center gap-6">
            <Skeleton className="h-10 w-[200px] mx-auto" />
            <Skeleton className="h-10 w-[200px] mx-auto" />
            <Skeleton className="h-10 w-[200px] mx-auto" />
            <Skeleton className="h-10 w-[200px] mx-auto" />
            <Skeleton className="h-10 w-[200px] mx-auto" />
          </div>
        </div>
      </div>

      <FooterSkeleton />
    </>
  );
};

export default Homeloader;
