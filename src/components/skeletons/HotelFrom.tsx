"use client";
import React from "react";
import { Skeleton } from "../ui/skeleton";

const HeaderSkeleton = () => {
    return (
        <>
            <div className=" md:px-0 px-2 py-4 flex items-center justify-between">
                {/* Logo skeleton */}
                <Skeleton className="h-10 w-20" />
                {/* Navigation links skeleton */}
                <div className="hidden lg:flex items-center space-x-8">
                    <Skeleton className="h-5 w-16" />
                    <Skeleton className="h-5 w-16" />
                    <Skeleton className="h-5 w-16" />
                    <Skeleton className="h-5 w-16" />
                    <Skeleton className="h-5 w-16" />
                    <Skeleton className="h-5 w-16" />
                    <Skeleton className="h-5 w-16" />
                    <Skeleton className="h-5 w-16" />
                </div>
                {/* Right buttons skeleton */}
                <div className="hidden lg:flex items-center space-x-4">
                    <Skeleton className="h-10 w-28" />
                    <Skeleton className="h-10 w-28" />
                </div>
                {/* Mobile Menu Icon Skeleton */}
                <div className="lg:hidden">
                    <Skeleton className="h-10 w-10" />
                </div>
            </div>
        </>
    );
};

export default HeaderSkeleton;
