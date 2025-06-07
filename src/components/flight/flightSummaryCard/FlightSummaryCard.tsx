import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { ChevronUp, Plane } from "lucide-react";
import Image from "next/image";


export default function FlightSummaryCard({ flightBookingData }: { flightBookingData: any }) {
  return (
    <Card className="max-w-md shadow-none border-none">
      <CardHeader className="border-b p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-start gap-4">
            <div className="h-8 w-8">
              <Image
                src={flightBookingData.airlineLogo}
                alt="Airline Logo"
                width={32}
                height={32}
                className="h-full w-full object-contain"
              />
            </div>
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <Plane className="h-4 w-4 text-blue-500" />
                <span className="text-sm text-blue-500">Flight</span>
              </div>
              <h3 className="font-medium">{flightBookingData.route}</h3>
              <p className="text-sm text-muted-foreground">{flightBookingData.tripType}</p>
            </div>
          </div>
          <button className="rounded-full p-1 hover:bg-slate-100">
            <ChevronUp className="h-5 w-5 text-blue-500" />
          </button>
        </div>
      </CardHeader>
      <CardContent className="space-y-6 p-4">
        <h4 className="font-medium text-blue-900">Fare Summary</h4>

        <div className="space-y-4">
          <p className="text-sm text-gray-600">{flightBookingData.fareSummary.travelerType}</p>

          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Base Fare</span>
              <span className="font-medium">BDT {flightBookingData.fareSummary.baseFare}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Tax</span>
              <span className="font-medium">BDT {flightBookingData.fareSummary.tax}</span>
            </div>
          </div>

          <div className="border-t pt-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Sub-Total</span>
              <span className="font-medium">BDT {flightBookingData.fareSummary.subTotal}</span>
            </div>
          </div>

          <div className="flex justify-between text-sm">
            <div className="flex items-center gap-2">
              <span className="text-gray-600">{flightBookingData.fareSummary.hotDeals.label}</span>
              <span className="rounded bg-blue-100 px-2 py-0.5 text-xs text-blue-600">
                {flightBookingData.fareSummary.hotDeals.code}
              </span>
            </div>
            <span className="font-medium text-emerald-500">
              - BDT {flightBookingData.fareSummary.hotDeals.discount}
            </span>
          </div>

          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Convenience Charge</span>
            <span className="font-medium">BDT {flightBookingData.fareSummary.convenienceCharge}</span>
          </div>

          <div className="border-t pt-4">
            <div className="flex justify-between">
              <div>
                <p className="font-medium text-blue-900">You Pay</p>
                <p className="text-xs text-gray-500">(for 1 Traveler)</p>
              </div>
              <span className="text-lg font-bold text-blue-900">
                BDT {flightBookingData.fareSummary.totalPayable}
              </span>
            </div>
            <div className="mt-1 flex justify-end text-sm">
              <div className="flex items-center gap-1">
                <span className="text-emerald-500">You Save</span>
                <span className="font-medium text-emerald-500">
                  BDT {flightBookingData.fareSummary.totalSavings}
                </span>
              </div>

            </div>
            <Button className="py-6 mt-4 w-full font-bold" variant="primary">
              Continue Booking
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
