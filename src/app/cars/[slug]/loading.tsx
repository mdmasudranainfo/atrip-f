import React from "react";
import { Skeleton } from "@/components/ui/skeleton";
import ItemSorting from "@/components/hotels/hotelFilter/ItemSorting";
import SkeletonHotelFrom from "@/components/skeletons/HotelFrom";
import HeaderSkeleton from "@/components/skeletons/HotelFrom";

const CardDetailsloader = () => {
    return (
        <>
            <div className="container mx-auto md:px-0 px-2 py-4">
                <HeaderSkeleton />

                <main className="container m-auto min-h-screen p-4 !shadow-none">
                    <div className="bg-white md:p-6 p-4  !shadow-none rounded-lg">
                        {/* Back Link */}
                        <Skeleton className="h-3 w-[170px] mb-[30px] inline-block" />

                        {/* Header Section */}
                        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4">
                            <div className="flex md:flex-row flex-col justify-between w-full gap-7 md:gap-0">
                                <div>
                                    <Skeleton className="h-7 w-[250px] inline-block mb-1" />
                                    <div className="flex gap-4 flex-wrap">
                                        <div className="flex gap-1">
                                            <Skeleton className="h-5 w-5" />
                                            <Skeleton className="h-5 w-[90px]" />
                                        </div>
                                        <div className="flex gap-1">
                                            <Skeleton className="h-5 w-5" />
                                            <Skeleton className="h-5 w-[60px]" />
                                        </div>
                                        <div className="flex gap-1">
                                            <Skeleton className="h-5 w-5" />
                                            <Skeleton className="h-5 w-[100px]" />
                                        </div>
                                        <div className="flex gap-1">
                                            <Skeleton className="h-5 w-5" />
                                            <Skeleton className="h-5 w-[140px]" />
                                        </div>
                                    </div>
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
                            <Skeleton className="h-5 w-[200px]" />
                            <Skeleton className="h-6 w-[100px] mt-2 inline-block" />

                            <div className="flex justify-between my-3">
                                <Skeleton className="h-2 w-[150px]" />
                                <Skeleton className="h-2 w-[130px]" />
                            </div>
                            <Skeleton className="h-3 w-[80px]  mb-7 inline-block" />

                            <div className="mb-3">
                                <Skeleton className="h-2 w-[90px]  mb-1 inline-block" />
                                <Skeleton className="h-10 w-full   inline-block" />
                            </div>
                            <div className="mb-3">
                                <Skeleton className="h-2 w-[110px]  mb-1 inline-block" />
                                <Skeleton className="h-10 w-full   inline-block" />
                            </div>
                            <div className="mb-3">
                                <Skeleton className="h-2 w-[90px]  mb-1 inline-block" />
                                <Skeleton className="h-10 w-full   inline-block" />
                            </div>
                            <div className="mb-3">
                                <Skeleton className="h-2 w-[120px]  mb-1 inline-block" />
                                <Skeleton className="h-10 w-full   inline-block" />
                            </div>

                            <div className="my-5 ">
                                <div className="flex justify-between mb-1">
                                    <Skeleton className="h-3 w-[120px]  mb-1 inline-block" />
                                    <Skeleton className="h-3 w-[80px]  mb-1 inline-block" />
                                </div>
                                <div className="flex justify-between bg-gray-100 p-3 rounded-lg items-center">
                                    <div className="flex flex-col gap-1">
                                        <Skeleton className="h-4 w-[40px]   inline-block" />
                                        <Skeleton className="h-4 w-[80px]  inline-block" />
                                    </div>
                                    <Skeleton className="h-6 w-[120px]   inline-block" />
                                </div>
                            </div>

                            <div className="flex justify-between mb-1">
                                <Skeleton className="h-3 w-[90px]  mb-1 inline-block" />
                                <Skeleton className="h-3 w-[150px]  mb-1 inline-block" />
                            </div>
                            <div className=" mt-8">
                                <Skeleton className="h-3 w-full  mb-2 inline-block" />
                                <Skeleton className="h-3 w-full  mb-2 inline-block" />
                                <Skeleton className="h-3 w-full  mb-2 inline-block" />
                                <Skeleton className="h-2 w-[200px]  mb-2 inline-block" />
                                <Skeleton className="h-14 w-full  inline-block" />
                            </div>
                        </div>

                    </div>
                </main>
            </div>

        </>
    )
};

export default CardDetailsloader;
