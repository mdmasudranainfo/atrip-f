"use client";

import {
  ChevronDown,
  ChevronUp,
  MapPin,
  UtensilsCrossed,
  Train,
  Mountain,
  Plane,
} from "lucide-react";
import { JSX, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface LocationItem {
  name: string;
  distance: string;
}

interface LocationSection {
  title: string;
  icon: JSX.Element;
  items: LocationItem[];
}

const surroundingsData: LocationSection[] = [
  {
    title: "What's nearby",
    icon: <MapPin className="w-4 h-4" />,
    items: [
      { name: "Zamzam Well", distance: "1.86 Km" },
      { name: "Makkah Museum", distance: "2.87 km" },
      { name: "Public Park and Playground", distance: "1.77 km" },
      { name: "Assalamu Alaika Ayyuha Annabi", distance: "1.56 km" },
      { name: "Al Ma'ali Garden Park", distance: "14 km" },
      { name: "Mecca Gate", distance: "12 km" },
    ],
  },
  {
    title: "Restaurants & cafes",
    icon: <UtensilsCrossed className="w-4 h-4" />,
    items: [
      { name: "Cafe/bar - Mamma Bunz Cafe", distance: "500 m" },
      { name: "Restaurant - Al Baik", distance: "300 m" },
      { name: "Cafe/bar - Ashoor Cafe - 4th Floor", distance: "400 m" },
    ],
  },
  {
    title: "Public transport",
    icon: <Train className="w-4 h-4" />,
    items: [
      {
        name: "TrainMakkah Haramain High Speed Railway Station",
        distance: "1.86 Km",
      },
      { name: "TrainStation Jamarat", distance: "6 Km" },
    ],
  },
  {
    title: "Natural beauty",
    icon: <Mountain className="w-4 h-4" />,
    items: [{ name: "Mountain - Al Noor Mount", distance: "14 km" }],
  },
  {
    title: "Closest airports",
    icon: <Plane className="w-4 h-4" />,
    items: [
      { name: "King Abdulaziz International Airport", distance: "26 Km" },
    ],
  },
];

export default function HotelSurroundings({ data }: { data: any }) {
  const [isExpanded, setIsExpanded] = useState(true);

  return (
    <Card className="w-full border-none bg-white">
      <div
        className="flex items-center justify-between p-4 cursor-pointer hover:bg-gray-50"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center gap-2">
          <MapPin className="w-5 h-5" />
          <h2 className="text-base font-bold">Hotel surroundings</h2>
        </div>
        {isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
      </div>

      <CardContent
        className={cn(
          "grid gap-6 transition-all duration-300",
          isExpanded ? "p-4" : "h-0 p-0 overflow-hidden"
        )}
      >
        <div className="grid sm:grid-cols-3 gap-20">
          {surroundingsData.map((section, index) => (
            <div key={index} className="space-y-3">
              <h3 className="text-sm font-bold flex items-center gap-2">
                {section.icon}
                {section.title}
              </h3>
              <div className="space-y-2">
                {section.items.map((item, itemIndex) => (
                  <div
                    key={itemIndex}
                    className="flex items-center justify-between gap-2 text-sm"
                  >
                    <span className="font-medium">{item.name}</span>
                    <span className="text-[#1A1A1A] font-light">
                      {item.distance}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
