
"use client"

import { Card, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BookedData } from "@/types/hotel-types";
import { formatPrice, preferInt } from "@/lib/utils";
import { Loader2 } from "lucide-react";

export default function PriceSummary({
  bookedData,
  showBookingButton = false,
  isLoading = false,
  onSubmit,
}: {
  bookedData: BookedData;
  showBookingButton?: boolean;
  isLoading?: boolean;
  onSubmit?: () => void;
}) {

  const taxRate = preferInt(bookedData?.tax_rate || 0)

  return (
    <Card className="space-y-4 p-4 border-[#DADFE6] shadow-none rounded-lg">
      <CardHeader>
        <CardTitle className="text-[#1a1a1a] text-lg font-semibold">Price Summary</CardTitle>
      </CardHeader>
      <div className="space-y-4 p-0">
        {/* Price Details */}
        <div className="space-y-3">

          <div
            className="flex justify-between items-center border-b py-2"
          >
            <span className="text-gray-900">Total: </span>
            <span className="text-[#1A1A1A] text-base font-semibold">
              {formatPrice(Number(bookedData.before_tax || 0))}
            </span>
          </div>


          {!!taxRate ? <><div
            className="flex justify-between items-center border-b py-2"
          >
            <span className="text-gray-900">VAT ({taxRate}%): </span>
            <span className="text-[#1A1A1A] text-base font-semibold">
              {formatPrice(Number(bookedData.total_tax || 0))}
            </span>

          </div>
          </> : <span className="text-sm">*Prices includes VAT & Tax</span>}


          {/* {priceDetails.map((item, index) => (
            <div
              key={index}
              className="flex justify-between items-center border-b py-2"
            >
              <span className="text-gray-900">{item.label}</span>
              <span className="text-gray-900">
                {formatPrice(Number(item.amount || 0))}
              </span>
            </div>
          ))} */}
        </div>

        {/* Total */}
        <div className="mt-4 bg-[#F1F2F4]  px-6 py-4 rounded-lg">
          <div className="flex justify-between items-center">
            <span className="text-[#1A1A1A] text-base font-semibold">Total:</span>
            <span className="text-[#1A1A1A] text-lg font-semibold">{formatPrice(Number(bookedData.total || 0))}</span>

            {/*  * (1 + taxDevider) */}
          </div>
        </div>
      </div>

      {showBookingButton && <CardFooter className=" gap-4  p-4 pt-0">
          <Button className="w-full font-semibold  h-12 bg-primary text-white hover:bg-primary/90" 
          disabled={isLoading}
          onClick={() => onSubmit ? onSubmit() : {}}
          >
          {isLoading ? (
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
              "Confirm Booking"
          )}
          </Button>
      </CardFooter>}
    </Card>
  );
}
