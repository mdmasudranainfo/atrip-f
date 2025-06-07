"use client"

import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { BookedData } from "@/types/hotel-types";
import Link from "next/link";

export default function BookingDetails({
  bookedData,
  showChangeSelection = true,
}: {
  showChangeSelection?: boolean;
  bookedData: BookedData;
}) {
  const isHotel = bookedData?.object_model === "hotel";
  const isCar = bookedData?.object_model === "car";
  return (
    <Card className="p-4 space-y-4 border-[#DADFE6] shadow-none rounded-lg">
      <CardHeader>
        <CardTitle className="text-[#1a1a1a] text-lg font-semibold">Booking Details</CardTitle>
      </CardHeader>
      <div className="space-y-4 p-0">
        {/* Check-in/Check-out Grid */}
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <div className="text-[13px] font-normal">
              {isHotel ? "Check-in" : isCar ? "Pick-up" : "Start Date"}
            </div>
            <div className="font-semibold">
              {new Date(bookedData?.start_date).toLocaleDateString()}
            </div>
            <div className="text-sm font-medium">
              <div className="text-sm font-medium">
                {bookedData?.service?.check_in_time}
              </div>
            </div>
          </div>
          <div className="space-y-1.5 border-l pl-4">
            <div className="text-[13px] font-normal">
              {isHotel ? "Check-out" : isCar ? "Drop-off" : "End Date"}
            </div>
            <div className="font-semibold text-md">
              {new Date(bookedData?.end_date).toLocaleDateString()}
            </div>
            <div className="text-sm font-medium">
              {bookedData?.service?.check_out_time}
            </div>
          </div>
        </div>

        {/* Length of Stay */}
        <div className="space-y-1.5">
          <div className="text-sm font-medium">Total length of stay:</div>
          <div className="font-semibold">
            {Math.ceil(
              (new Date(bookedData?.end_date).getTime() -
                new Date(bookedData?.start_date).getTime()) /
              (1000 * 60 * 60 * 24)
            )}{" "}
            {isHotel ? "night" : "days"}
          </div>
        </div>

        {/* Room Selection */}
        <div className="space-y-1.5">
          <div className="text-sm font-medium">You have selected</div>
          <div className="font-semibold">{bookedData?.total_guests} Guest</div>
          {showChangeSelection && (
            <Link
              href="/hotels"
              className="text-blue-600 text-sm pt-2 hover:underline"
            >
              Change your selection
            </Link>
          )}
        </div>
      </div>
    </Card>
  );
}
