import React from "react";
import { Skeleton } from "@/components/ui/skeleton";
import HeaderSkeleton from "@/components/skeletons/HotelFrom";
import { PiDivide } from "react-icons/pi";

const Chaufferloader = () => {
  return (
    <>
      <div className="container mx-auto md:px-0 px-2 py-4">
        <HeaderSkeleton />

        <div className="w-full pb-16 pt-8 m-auto relative">
          <div className="max-w-6xl m-auto">
            {/* <h1 className="mb-4 text-2xl sm:text-5xl font-bold text-white md:mx-0 mx-3">Hotels</h1> */}
            <Skeleton className="h-10 w-32 mb-5" />
            <div className="border p-3 rounded-lg">
              <div className="flex flex-wrap items-center gap-8 md:flex-nowrap pb-7 pt-3">
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-4 w-32" />
              </div>
              <div className="flex lg:flex-row flex-col items-center justify-start gap-2">

                {/* Destination field skeleton */}
                <div className="border rounded-md flex-1 py-2 px-2 w-full">
                  <Skeleton className="h-4 w-32 mb-2" />
                  <Skeleton className="h-8 w-full" />
                </div>
                {/* Check-in, Nights, Check-out skeleton */}
                <div className="flex border rounded-md flex-1 md:flex-row flex-col w-full">
                  <div className="px-4 py-2 flex-1">
                    <Skeleton className="h-4 w-24 mb-2" />
                    <Skeleton className="h-8 w-full" />
                  </div>
                  <div className="p-4">
                    <Skeleton className="h-8 w-full" />
                  </div>
                  <div className="px-4 pt-5 flex-1">
                    {/* <Skeleton className="h-4 w-24 mb-2" /> */}
                    <Skeleton className="h-8 w-full" />
                  </div>
                </div>
                {/* Rooms and Guests skeleton */}
                <div className="border rounded-md flex py-2 px-2 gap-8">
                  <div>
                    <Skeleton className="h-4 w-[100px] mb-2" />
                    <Skeleton className="h-8 w-[150px]" />
                  </div>
                  <Skeleton className="h-8 w-[60px]" />
                </div>
                {/* Search button skeleton */}
                <Skeleton className="h-16 w-32" />
              </div>
            </div>
          </div>
        </div>


        <div className="mt-28 px-4 sm:px-0">
          <div className="mb-10">
            <Skeleton className="h-10 w-[520px] m-auto mb-2" />
            <Skeleton className="h-3 w-[470px] m-auto mb-2" />
          </div>
          <div className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="w-full max-w-sm overflow-hidden rounded-lg border">
              <Skeleton className="h-[200px] w-full" />
              <div className="p-6 space-y-6">
                <div className="space-y-2">
                  <Skeleton className="h-7 w-32" />
                  <Skeleton className="h-4 w-48" />
                </div>
                <div className="space-y-4">
                  {[...Array(4)].map((_, i) => (
                    <div key={i} className="border py-4 px-2 rounded-lg flex justify-between items-center">
                      <Skeleton className="h-4 w-40" />
                      <Skeleton className="h-4 w-20" />
                    </div>
                  ))}
                </div>
                <Skeleton className="h-10 w-full" />
              </div>
            </div>

            <div className="w-full max-w-sm overflow-hidden rounded-lg border">
              <Skeleton className="h-[200px] w-full" />
              <div className="p-6 space-y-6">
                <div className="space-y-2">
                  <Skeleton className="h-7 w-32" />
                  <Skeleton className="h-4 w-48" />
                </div>
                <div className="space-y-4">
                  {[...Array(4)].map((_, i) => (
                    <div key={i} className="border py-4 px-2 rounded-lg flex justify-between items-center">
                      <Skeleton className="h-4 w-40" />
                      <Skeleton className="h-4 w-20" />
                    </div>
                  ))}
                </div>
                <Skeleton className="h-10 w-full" />
              </div>
            </div>

            <div className="w-full max-w-sm overflow-hidden rounded-lg border">
              <Skeleton className="h-[200px] w-full" />
              <div className="p-6 space-y-6">
                <div className="space-y-2">
                  <Skeleton className="h-7 w-32" />
                  <Skeleton className="h-4 w-48" />
                </div>
                <div className="space-y-4">
                  {[...Array(4)].map((_, i) => (
                    <div key={i} className="border py-4 px-2 rounded-lg flex justify-between items-center">
                      <Skeleton className="h-4 w-40" />
                      <Skeleton className="h-4 w-20" />
                    </div>
                  ))}
                </div>
                <Skeleton className="h-10 w-full" />
              </div>
            </div>

          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-20">
          <div className="w-full max-w-sm">
            <div className="pt-6 text-center space-y-4">
              <div className="flex justify-center">
                <Skeleton className="h-12 w-12 rounded-full" />
              </div>
              <Skeleton className="h-7 w-32 mx-auto" />
              <Skeleton className="h-3 w-full" />
              <Skeleton className="h-3 w-[86%]" />
            </div>
          </div>

          <div className="w-full max-w-sm">
            <div className="pt-6 text-center space-y-4">
              <div className="flex justify-center">
                <Skeleton className="h-12 w-12 rounded-full" />
              </div>
              <Skeleton className="h-7 w-32 mx-auto" />
              <Skeleton className="h-3 w-full" />
              <Skeleton className="h-3 w-[86%]" />
            </div>
          </div>
          <div className="w-full max-w-sm">
            <div className="pt-6 text-center space-y-4">
              <div className="flex justify-center">
                <Skeleton className="h-12 w-12 rounded-full" />
              </div>
              <Skeleton className="h-7 w-32 mx-auto" />
              <Skeleton className="h-3 w-full" />
              <Skeleton className="h-3 w-[86%]" />
            </div>
          </div>
        </div>

        <div className="space-y-24 mt-20">
          <div className="flex flex-col gap-8 items-center md:flex-row-reverse">
            <div className="grid gap-6 md:grid-cols-2 w-full">
              {/* Image skeleton */}
              <Skeleton className="h-[300px] aspect-[4/3] md:h-full" />

              <div className="flex flex-col justify-center space-y-4 p-6 md:p-8">
                {/* Title skeleton */}
                <Skeleton className="h-8 w-3/4" />

                {/* Text content skeletons */}
                <div className="space-y-3">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-[90%]" />
                  <Skeleton className="h-4 w-4/5" />
                  <Skeleton className="h-4 w-4/5" />
                  <Skeleton className="h-4 w-2/3" />
                </div>
              </div>
            </div>
          </div>


          <div className="flex flex-col gap-8 items-center md:flex-row">
            <div className="grid gap-6 md:grid-cols-2 w-full">
              <div className="flex flex-col justify-center space-y-4 p-6 md:p-8">
                {/* Title skeleton */}
                <Skeleton className="h-8 w-3/4" />

                {/* Text content skeletons */}
                <div className="space-y-3">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-[90%]" />
                  <Skeleton className="h-4 w-4/5" />
                  <Skeleton className="h-4 w-4/5" />
                  <Skeleton className="h-4 w-2/3" />
                </div>
              </div>
              {/* Image skeleton */}
              <Skeleton className="h-[300px] aspect-[4/3] md:h-full" />
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-2 w-full">
            {/* Image skeleton */}
            <Skeleton className="h-[300px] aspect-[4/3] md:h-full" />

            <div className="flex flex-col justify-center space-y-4 p-6 md:p-8">
              {/* Title skeleton */}
              <Skeleton className="h-8 w-3/4" />

              {/* Text content skeletons */}
              <div className="space-y-3">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-[90%]" />
                <Skeleton className="h-4 w-4/5" />
                <Skeleton className="h-4 w-4/5" />
                <Skeleton className="h-4 w-2/3" />
              </div>
            </div>
          </div>


          <div className="flex flex-col gap-8 items-center md:flex-row">
            <div className="grid gap-6 md:grid-cols-2 w-full">

              <div className="flex flex-col justify-center space-y-4 p-6 md:p-8">
                {/* Title skeleton */}
                <Skeleton className="h-8 w-3/4" />

                {/* Text content skeletons */}
                <div className="space-y-3">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-[90%]" />
                  <Skeleton className="h-4 w-4/5" />
                  <Skeleton className="h-4 w-4/5" />
                  <Skeleton className="h-4 w-2/3" />
                </div>
              </div>
              {/* Image skeleton */}
              <Skeleton className="h-[300px] aspect-[4/3] md:h-full" />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-24">
          <div className="lg:col-span-4">
            <Skeleton className="h-10 w-[350px] mb-5" />
          </div>

          <div className="lg:col-span-8">
            <Skeleton className="h-14 w-full mb-5 p-3 border-b-2" />
            <Skeleton className="h-14 w-full mb-5 p-3 border-b-2" />
            <Skeleton className="h-14 w-full mb-5 p-3 border-b-2" />
            <Skeleton className="h-14 w-full mb-5 p-3 border-b-2" />
            <Skeleton className="h-14 w-full mb-5 p-3 border-b-2" />
            <Skeleton className="h-14 w-full mb-5 p-3 border-b-2" />
            <Skeleton className="h-14 w-full mb-5 p-3 border-b-2" />
            <Skeleton className="h-14 w-full mb-5 p-3 border-b-2" />
          </div>
        </div>
      </div>
    </>
  )
};

export default Chaufferloader;
