import React from "react";
import { Skeleton } from "@/components/ui/skeleton";
import HeaderSkeleton from "@/components/skeletons/HotelFrom";

const Aboutloader = () => {
  return (
    <>
      <div className="container mx-auto md:px-0 px-2 py-4">
        <HeaderSkeleton />
      </div>

      <div className="w-full bg-white  py-[200px] m-auto  relative z-9">
        <Skeleton className="h-7 w-[200px] m-auto" />
      </div>

      <div className="container mx-auto px-4 py-24">
        {/* Hero Section */}
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-20 items-center">
          {/* Image Grid */}
          <div className="grid gap-4 grid-cols-2">
            <Skeleton className="aspect-[3/5] relative rounded-lg overflow-hidden" />
            <Skeleton className="aspect-[3/5] relative rounded-lg overflow-hidden" />
          </div>

          {/* Content */}
          <div className="space-y-6">
            <Skeleton className="h-10 w-full" />
            <div className="space-y-4">
              <Skeleton className="h-3 w-full" />
              <Skeleton className="h-3 w-[90%]" />
              <Skeleton className="h-3 w-full" />
              <Skeleton className="h-3 w-[88%]" />
            </div>
            <Skeleton className="h-14 w-[200px]" />
          </div>
        </div>

        {/* Stats Section */}
        <div className="grid gap-8 sm:grid-cols-2 justify-center items-center lg:grid-cols-3 mt-28">
          <div className="space-y-2 flex gap-5 items-start justify-center">
            <Skeleton className="h-14 w-[200px]" />
            <div className="flex flex-col ">
              <Skeleton className="h-4 w-[170px] mb-2" />
              <Skeleton className="h-4 w-[140px]" />
            </div>
          </div>
          <div className="space-y-2 flex gap-5 items-start justify-center">
            <Skeleton className="h-14 w-[200px]" />
            <div className="flex flex-col ">
              <Skeleton className="h-4 w-[170px] mb-2" />
              <Skeleton className="h-4 w-[140px]" />
            </div>
          </div>
          <div className="space-y-2 flex gap-5 items-start justify-center">
            <Skeleton className="h-14 w-[200px]" />
            <div className="flex flex-col ">
              <Skeleton className="h-4 w-[170px] mb-2" />
              <Skeleton className="h-4 w-[140px]" />
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-24 md:px-12 lg:px-0">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-20 items-center">

          <Skeleton className="relative aspect-[3/3] w-full overflow-hidden rounded-lg" />

          <div className="space-y-8">
            <div className="space-y-4">
              <Skeleton className="relative h-12 w-full overflow-hidden rounded-lg" />

              <Skeleton className="relative h-3 w-full overflow-hidden rounded-lg" />
              <Skeleton className="relative h-3 w-[70%] overflow-hidden rounded-lg" />
            </div>

            <div defaultValue="mission" className="w-full">
              <div className="w-full flex justify-start border-b rounded-none h-14 bg-transparent p-0 space-x-8">
                <Skeleton className="relative h-12 w-[35%] rounded-lg" />
                <Skeleton className="relative h-12 w-[35%] rounded-lg" />
              </div>
              <div className="mt-6">
                <Skeleton className="relative h-4 w-full rounded-lg mb-3" />
                <Skeleton className="relative h-4 w-full rounded-lg mb-3" />
                <Skeleton className="relative h-4 w-[80%] rounded-lg" />
              </div>

            </div>

            <ul className="space-y-4">
              <div className="flex items-center gap-3">
                <Skeleton className="relative h-5 w-5 rounded-full" />
                <Skeleton className="relative h-4 w-[80%] " />
              </div>
              <div className="flex items-center gap-3">
                <Skeleton className="relative h-5 w-5 rounded-full" />
                <Skeleton className="relative h-4 w-[85%] " />
              </div>
            </ul>
            <Skeleton className="h-14  w-[200px]" />
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        <Skeleton className="h-10 w-[500px] m-auto mb-14" />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[...Array(4)].map((_, i) => (
            <div
              key={i}
              className="overflow-hidden !shadow-none border rounded-md"
            >
              <Skeleton className="aspect-[5/3] relative " />

              <div className="p-4">
                <div className="flex items-center text-sm text-muted-foreground mb-2">
                  <Skeleton className="w-[200px] h-4 mr-1" />
                </div>

                <Skeleton className="w-[180px] h-8 mb-2" />
                <div className="flex justify-between items-center gap-3">
                  <div className="flex gap-1 w-full">
                    <Skeleton className="w-3 h-3" />
                    <Skeleton className="w-full h-3" />
                  </div>
                  <div className="flex gap-1 w-full">
                    <Skeleton className="w-3 h-3" />
                    <Skeleton className="w-full h-3" />
                  </div>
                </div>
              </div>

              <div className="p-4 flex items-center">
                <div className="flex items-center gap-1">
                  <Skeleton className="w-[100px] h-7" />
                  <Skeleton className="w-[100px] h-10" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="container mx-auto px-4 py-16 pb-0">
        <Skeleton className="h-10 w-[500px] m-auto mb-5" />
        <Skeleton className="h-3 w-[700px] m-auto mb-2" />
        <Skeleton className="h-3 w-[500px] m-auto" />

        <div className="mt-14">
          <Skeleton className="h-10 w-full max-w-5xl m-auto mb-14" />
          <Skeleton className="h-10 w-full max-w-5xl m-auto mb-14" />
          <Skeleton className="h-10 w-full max-w-5xl m-auto mb-14" />
          <Skeleton className="h-10 w-full max-w-5xl m-auto mb-14" />
          <Skeleton className="h-10 w-full max-w-5xl m-auto mb-14" />
          <Skeleton className="h-10 w-full max-w-5xl m-auto mb-14" />
        </div>
      </div>

    </>
  )
};

export default Aboutloader;
