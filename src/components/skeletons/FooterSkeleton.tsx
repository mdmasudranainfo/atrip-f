import { Skeleton } from "@/components/ui/skeleton"

export default function FooterSkeleton() {
    return (
        <div className=" bg-background">
            <div className="container mx-auto px-4 py-16 pb-0 md:pb-0 md:py-20">
                <div className="grid gap-8 md:grid-cols-4">
                    {/* Logo and Social Column */}
                    <div className="space-y-6">
                        <div className="space-y-2">
                            <Skeleton className="h-8 w-24" />
                            <Skeleton className="h-4 w-40" />
                        </div>
                        <div className="space-y-4">
                            <Skeleton className="h-5 w-24" />
                            <Skeleton className="h-4 w-36" />
                            <div className="flex gap-4">
                                {[...Array(5)].map((_, i) => (
                                    <Skeleton key={i} className="h-5 w-5 rounded-full" />
                                ))}
                            </div>
                        </div>
                        <div className="space-y-4">
                            <Skeleton className="h-5 w-64" />
                            <div className="space-y-2">
                                <Skeleton className="h-10 w-full" />
                                <Skeleton className="h-10 w-full" />
                            </div>
                        </div>
                    </div>

                    {/* Three Destination Columns */}
                    {[1, 2, 3].map((columnIndex) => (
                        <div key={columnIndex} className="space-y-4">
                            <Skeleton className="h-5 w-32" />
                            <div className="space-y-2">
                                {[...Array(16)].map((_, i) => (
                                    <Skeleton key={i} className="h-4 w-full" />
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
                <div className="mt-12 border-t py-14">
                    <Skeleton className="mx-auto h-4 w-64" />
                </div>
            </div>
        </div>
    )
}

