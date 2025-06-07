import {
  HelpCircle,
  Building2,
  Utensils,
  Plane,
  Bus,
  MapPin,
  Star,
} from "lucide-react";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card } from "@/components/ui/card";
import Image from "next/image";

export default function TourHotel({ hotels, hotelBed, hotelServiceIncluding }: any) {
  
  const serviceIcons: { [key: string]: React.ReactElement } = {
    "room service": <Building2 className="h-5 w-5 text-primary-dark" />,
    "wifi": <Plane className="h-5 w-5 text-primary-dark" />,
    "swimming pool": <Bus className="h-5 w-5 text-primary-dark" />,
  };

  return (
    <Card className="w-full border-none">
      <Accordion type="single" value="header" collapsible>
        <AccordionItem value="header" className="border-0">
          <AccordionTrigger className="px-6 py-4 hover:no-underline">
            <div className="flex items-center gap-2">
              <HelpCircle className="h-5 w-5 text-blue-600" />
              <span className="text-base font-bold">Hotel</span>
            </div>
          </AccordionTrigger>
          <AccordionContent className="px-6 pb-6">
            {hotels?.map((hotel: any, i: number) => (
              <Card key={i} className="overflow-hidden p-4 h-58 mt-2">
                <div className="flex gap-10 h-full">
                  {/* Image Section */}
                  <div className="relative h-full w-full md:h-auto md:w-48">
                    <div className="relative h-full w-full rounded-xl overflow-hidden">
                      <Image
                        src={hotel?.image_url}
                        alt={hotel?.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                  </div>

                  {/* Content Section */}
                  <div className="flex flex-1 flex-col gap-1 space-y-5">
                    <h3 className="text-xl font-semibold text-gray-900">
                      {hotel?.title}
                    </h3>

                    <div className="mt-2 flex items-center gap-2 text-sm text-primary-dark">
                      <div className="flex items-center gap-1">
                        <MapPin className="h-4 w-4" />
                        <span>{hotel?.address}</span>
                      </div>
                    </div>

                    {/* Rating Section */}
                    <div className="mt-2 flex items-center gap-2">
                      <div className="flex text-yellow-400">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-5 w-5 fill-current ${
                              i < Math.round(hotel.review_data.score_total)
                                ? "text-yellow-400"
                                : "text-gray-300"
                            }`}
                            strokeWidth={0}
                          />
                        ))}
                      </div>
                      <span className="font-semibold text-gray-900">
                        {hotel.review_data.score_total}
                      </span>
                      <span className="text-primary-dark">
                        {hotel.review_data.total_review} reviews
                      </span>
                    </div>

                    {/* Services Section */}
                    <div className="mt-4 flex gap-6 font-semibold text-[#1A1A1A] flex-wrap">
                      <div className="flex items-center gap-2">
                        <Utensils className="h-5 w-5 text-primary-dark" />
                        <span className="text-sm">{hotelBed} Bed</span>
                      </div>
                      {hotelServiceIncluding?.map((service: string, index: number) => (
                        <div key={index} className="flex items-center gap-2">
                          {serviceIcons[service]}
                          <span className="text-sm">{service}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </Card>
  );
}
