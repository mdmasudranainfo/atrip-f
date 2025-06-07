import React from "react";
import { Skeleton } from "@/components/ui/skeleton";
import HeaderSkeleton from "@/components/skeletons/HotelFrom";

const VisaDetailsloader = () => {
    return (
        <>
            <div className="container mx-auto md:px-0 px-2 py-4">
                <HeaderSkeleton />

                <main className=" min-h-screen p-4 !shadow-none">
                    <div className="bg-white md:p-6 p-4  !shadow-none rounded-lg">
                        {/* Back Link */}
                        <Skeleton className="h-3 w-[170px] mb-[30px] inline-block" />

                        {/* Header Section */}
                        <div className="flex flex-col md:flex-row justify-between items-start md:items-center m">
                            <div className="flex md:flex-row flex-col justify-between w-full gap-7 md:gap-0">
                                <div className="flex flex-col gap-1">
                                    <Skeleton className="h-7 w-[250px] inline-block mb-1" />
                                    <Skeleton className="h-2 w-[120px] inline-block mb-1" />
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
                            {/* <Skeleton className="h-8 w-10" /> */}
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

                    <div className="w-full my-6 rounded-lg grid grid-cols-1  xl:grid-cols-[70%,1fr] gap-5">
                        {/* Tabs menu */}
                        <div className="w-full my-6  bg-white p-5 rounded-lg">
                            <div className="flex flex-wrap gap-5">
                                <Skeleton className="h-6 w-[90px]" />
                                <Skeleton className="h-6 w-[130px]" />
                                <Skeleton className="h-6 w-[130px]" />
                                <Skeleton className="h-6 w-[100px]" />
                                <Skeleton className="h-6 w-[60px]" />
                                <Skeleton className="h-6 w-[100px]" />
                                <Skeleton className="h-6 w-[80px]" />
                            </div>
                            <div className="mt-10">
                                <Skeleton className="h-5 w-[150px] mb-3 inline-block" />
                                <Skeleton className="h-[300px] w-full" />
                            </div>
                        </div>

                        <div className="w-full my-6  bg-white p-5 rounded-lg">
                            <Skeleton className="h-5 w-[150px]" />
                            <Skeleton className="h-6 w-[200px] mt-2 inline-block" />

                            <div className="mb-3 mt-5">
                                <Skeleton className="h-12 w-full   inline-block" />
                            </div>
                            <div className="mb-3">
                                <Skeleton className="h-12 w-full   inline-block" />
                            </div>
                            <div className="mb-3">
                                <Skeleton className="h-12 w-full   inline-block" />
                            </div>

                            <div className=" mt-8">
                                <Skeleton className="h-5 w-full  mb-2 inline-block" />
                                <Skeleton className="h-3 w-[200px]  mb-3" />
                                <Skeleton className="h-3 w-[250px]  mb-3" />
                                <Skeleton className="h-3 w-[120px]  mb-3" />
                                <Skeleton className="h-3 w-[100px]  mb-3" />
                                <Skeleton className="h-3 w-[100px]  mb-3" />
                                <Skeleton className="h-2 w-[200px]  mb-3" />
                            </div>
                        </div>

                    </div>
                </main>

            </div>

        </>
    )
};

export default VisaDetailsloader;
