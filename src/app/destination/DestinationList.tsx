'use client';

import { getAllDestinations } from "@/lib/actions/destination-actions";
import Image from "next/image";
import Link from "next/link";
import { useInView } from "react-intersection-observer";
import { useEffect, useState } from "react";
import SpinnerLoader from "@/components/share/spiner/SpinnerLoader";

interface Destination {
    id: string;
    name: string;
    slug: string;
    description: string;
    image?: {
        file_path: string;
    };
}

const DestinationList = () => {
    const [destinations, setDestinations] = useState<Destination[]>([]);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const [loading, setLoading] = useState(false);
    const perPage = 9;

    const { ref, inView } = useInView({
        threshold: 0,
    });

    const fetchDestinations = async (pageNum: number) => {
        try {
            setLoading(true);
            const { data } = await getAllDestinations({
                params: {
                    page: pageNum,
                    per_page: perPage
                }
            });

            if (pageNum === 1) {
                setDestinations(data.data);
            } else {
                setDestinations(prev => [...prev, ...data.data]);
            }

            setHasMore(data.data.length === perPage);
        } catch (error) {
            console.error('Error fetching destinations:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (inView && hasMore && !loading) {
            setPage(prev => prev + 1);
        }
    }, [inView, hasMore, loading]);

    useEffect(() => {
        fetchDestinations(page);
    }, [page]);

    if (destinations.length === 0 && loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="container mx-auto px-4 py-12">
            <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-8">
                {destinations.map((destination) => {
                    let parsedContent;
                    try {
                        parsedContent = destination?.description ? JSON.parse(destination.description) : null;
                    } catch (error) {
                        parsedContent = null;
                    }
                    return (
                        <div
                            key={destination.id}
                            className="bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
                        >
                            <div className="relative w-full h-56">
                                <Image
                                    src={destination.image?.file_path || "/default-destination.jpg"}
                                    alt={destination.name}
                                    fill
                                    className="object-cover"
                                />
                            </div>
                            <div className="p-6">
                                <h2 className="text-xl font-semibold text-gray-800 mb-3 line-clamp-2">
                                    {destination.name}
                                </h2>
                                <p className="text-gray-600 mb-4 line-clamp-3">
                                    {parsedContent?.[0]?.title || "No description available."}
                                </p>
                                <div className="flex items-center justify-end">
                                    <Link

                                        rel="noopener noreferrer" target="_blank"
                                        href={`/destination/${destination.slug}`}
                                        className="inline-flex items-center text-purple-600 font-medium hover:text-purple-700 transition-colors"
                                    >
                                        View Details
                                    </Link>
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>

            {/* Loading indicator */}
            <div ref={ref} className="h-20 flex items-center justify-center">
                {loading && (
                    <div className="text-purple-600"><SpinnerLoader /></div>
                )}
                {!hasMore && destinations.length > 0 && (
                    <div className="text-gray-500">No more destinations to load</div>
                )}
            </div>
        </div>
    );
};

export default DestinationList; 