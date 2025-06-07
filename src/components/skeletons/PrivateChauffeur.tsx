import React from "react";
import { Skeleton } from "@/components/ui/skeleton";
function PrivateChauffeurCard() {
    return (
        <div className="w-full  overflow-hidden rounded-lg border">
            <Skeleton className="h-[200px] w-full" />
            <div className="p-6 space-y-6">
                <div className="space-y-2">
                    <Skeleton className="h-7 w-32" />
                    <Skeleton className="h-4 w-48" />
                </div>
                <div className="space-y-4">
                    {[...Array(4)].map((_, i) => (
                        <div key={i} className="flex justify-between items-center">
                            <Skeleton className="h-4 w-40" />
                            <Skeleton className="h-4 w-20" />
                        </div>
                    ))}
                </div>
                <Skeleton className="h-10 w-full" />
            </div>
        </div>
    )
}

export default PrivateChauffeurCard