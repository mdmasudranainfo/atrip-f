import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import { Card } from "@/components/ui/card";
import { Itinerary } from "@/types/tourTypes";
import { LandPlot, X } from "lucide-react";

interface ItineraryPageProps {
    itineraryData: Itinerary[];
}

export default function ItineraryPage({ itineraryData }: ItineraryPageProps) {
    return (
        <Card className="w-full border-none shadow-none">
            {/* Package Includes */}
            {itineraryData.map((soloItinerary) => (
                <Accordion key={soloItinerary.title} type="single" collapsible defaultValue="includes">
                    <AccordionItem value="includes" className="border-0">
                        <div >
                            <AccordionTrigger className="px-6 py-4 hover:no-underline">
                                <div className="flex items-center gap-2">
                                    <LandPlot color="blue" className="h-5 w-5" />
                                    <span className="text-base font-bold ">{soloItinerary.title}</span>
                                </div>
                            </AccordionTrigger>
                            <AccordionContent className="px-6 pb-6   to-white rounded-xl  border shadow-none ">
                                <div className="flex flex-col gap-5 border-l-4 border-blue-500 bg-white shadow-none pt-1">
                                    {/* Description */}
                                    <p className="text-lg font-semibold text-gray-800 leading-relaxed ps-2">
                                        {soloItinerary.desc}
                                    </p>

                                    {/* Content Section */}
                                    <div className="flex items-center gap-6 p-4 ">
                                        <span className="text-sm text-gray-700 font-medium tracking-wide">
                                            {soloItinerary.content}
                                        </span>
                                    </div>
                                </div>
                            </AccordionContent>

                        </div>
                    </AccordionItem>
                </Accordion>
            ))}

            {/* Package Excludes */}

        </Card>
    );
}
