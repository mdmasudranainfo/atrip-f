"use client";

import {
  Baby,
  Brush,
  Building2,
  Car,
  ChevronDown,
  ChevronUp,
  Hotel,
  Languages,
  ShieldCheck,
  SlidersHorizontal,
  Star,
  Tv,
  UtensilsCrossed,
} from "lucide-react";
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export default function AmenitiesCard({ amenitiesData = "" }: any) {
  const [isExpanded, setIsExpanded] = useState(true);


  let validAmenitiesData = [];
  try {
    validAmenitiesData = JSON.parse(amenitiesData);
  } catch (e) {
    validAmenitiesData = [];
  }

  // Handle case when amenitiesData is empty or invalid
  if (!Array.isArray(validAmenitiesData) || validAmenitiesData.length === 0) {
    return null
  }

  return (
    <Card className="w-full border-none bg-white">
      <div
        className="flex items-center justify-between p-4 cursor-pointer hover:bg-gray-50"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center gap-2">
          <SlidersHorizontal className="w-4 h-4" />
          <h2 className="text-base font-bold">Services & Amenities</h2>
        </div>
        {isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
      </div>

      <CardContent
        className={cn(
          "grid gap-6 transition-all duration-300",
          isExpanded ? "p-4" : "h-0 p-0 overflow-hidden"
        )}
      >
        <div className="space-y-3 grid sm:grid-cols-3">
          {validAmenitiesData.map((section: any, index: number) => (
            <div key={index} className="space-y-3">
              <h3 className="text-sm font-semibold flex items-center gap-2">
                {section.title === "Most popular facilities" && (
                  <Star className="w-4 h-4" />
                )}
                {section.title === "business_service" && (
                  <Building2 className="w-4 h-4" />
                )}
                {section.title === "cleaning_service" && (
                  <Brush className="w-4 h-4" />
                )}
                {section.title === "reception_service" && (
                  <Hotel className="w-4 h-4" />
                )}
                {section.title === "food_drink" && (
                  <UtensilsCrossed className="w-4 h-4" />
                )}
                {section.title === "languages_spoken" && (
                  <Languages className="w-4 h-4" />
                )}
                {section.title === "safety_security" && (
                  <ShieldCheck className="w-4 h-4" />
                )}
                {section.title === "transportation" && (
                  <Car className="w-4 h-4" />
                )}
                {section.title === "accessibility" && (
                  <Baby className="w-4 h-4" />
                )}
                {section.title === "media_technology" && (
                  <Tv className="w-4 h-4" />
                )}
                {section.title
                  .replace(/_/g, " ")
                  .replace(/\b\w/g, (char: string) => char.toUpperCase())
                }
              </h3>
              <div className="gap-2">
                {Array.isArray(section.content) && section.content.length > 0 ? (
                  section.content.map((item: any, itemIndex: number) => (
                    <div
                      key={itemIndex}
                      className="flex items-center gap-2 font-medium text-sm"
                    >
                      <svg
                        className="w-4 h-4 text-black flex-shrink-0"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path d="M20 6L9 17l-5-5" />
                      </svg>
                      <span>{item || "No data available"}</span>
                    </div>
                  ))
                ) : (
                  <div className="text-sm text-gray-500">No data available</div>
                )}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
