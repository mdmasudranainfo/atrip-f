import RatingStar from "@/components/rating-star";
import { Card, CardContent } from "@/components/ui/card";
import { ratingLabel } from "@/lib/utils";
import { HotelType } from "@/types/hotel-types";
import Link from "next/link";
import {
  MapPin,
  PocketIcon as Pool,
} from "lucide-react";

export default function HotelInfoCard({ hotelInfo }: { hotelInfo: HotelType }) {
  return (
    <Card className="lg:max-w-xl w-full border-[#DADFE6] shadow-none rounded-lg">


      <div className="p-4 space-y-4">
        <div className="flex gap-1">
          <RatingStar reviewScore={Number(hotelInfo?.review_score || 0)} />
        </div>

        {/* Hotel Name and Location */}
        <div className="space-y-2">
          <h2 className="text-xl font-bold">{hotelInfo?.title}</h2>
          <div className="flex items-center gap-2 text-gray-600">
            <MapPin className="w-4 h-4" />
            <span className="text-sm">{hotelInfo?.address}</span>
          </div>
        </div>

        {/* Rating Score */}
        <div className="flex items-center gap-3">
          <div className="bg-[#003B95] text-white px-3 py-2 rounded-md font-bold text-sm">
            {hotelInfo?.review_score}
          </div>
          <div className="space-x-2 text-sm">
            <span className="font-medium">{ratingLabel(Number(hotelInfo?.review_score || 0))}</span>
          </div>
        </div>

        <div className="mt-5">
          <Link href="/cancellation-policy" className="text-[#3264ff] mt-2 md:text-md text-sm">Cancellation Policy</Link>
        </div>
      </div>
    </Card>
  );
}
