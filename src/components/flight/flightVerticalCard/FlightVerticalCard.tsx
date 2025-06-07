"use client";

import { ChevronDown, ChevronRight, Loader2, Plane } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { FlightDatas } from "@/types/flightTypes";
import { formatPrice } from "@/lib/utils";
import { useState } from "react";
import { FlightData } from "@/types/flight-book-data";
import FlightBookingDialogue from "../flight-booking-dialogue";
import { flightBookingData } from "@/lib/actions/flight-action";
import dayjs from "dayjs";
import { getErrorMessage } from "@/lib/handle-error";
import { toast } from "sonner";

interface FlightCardProps {
  flight: FlightDatas;
}

export function FlightVerticalCard({ flight }: FlightCardProps) {
  const [book, setBook] = useState<FlightData>();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const formattedTime = dayjs(flight?.arrival_time).format("HH:mm");
  const departureTime = dayjs(flight?.departure_time).format("HH:mm");

  const [open, setOpen] = useState<boolean>(false);

  const onOpenChange = (o: boolean) => {
    if (!o) {
      setBook(undefined);
    }
    setOpen(o);
  };

  const loadBookingData = async (id: number) => {
    setIsLoading(true);
    try {
      const { data, error } = await flightBookingData(id);
      if (error) {
        toast.error(`Error: ${getErrorMessage(error)}`);
      } else if (data) {
        setBook(data);
        setOpen(true);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <Card className="w-full ">
        <div className="px-0 pr-0">
          <CardContent className="p-0 sm:p-0 flex md:flex-row flex-col w-full md:gap-8 gap-0">
            <div className="w-full py-4">
              <div className="flex md:items-center items-start p-4  md:flex-row flex-col justify-between gap-3">
                <div className="flex items-center space-x-3">
                  <div className="relative h-8 w-12">
                    {/* <Image src={"/images/car_1.png"} alt={flight.title} fill className="object-contain" /> */}
                    <Plane className="absolute right-0 top-1/2 h-6 w-6 -translate-y-1/2   transform text-primary" />
                  </div>
                  <span className="text-sm font-semibold text-nowrap">
                    {flight?.title}
                  </span>
                </div>

                <div className="flex md:items-center items-start space-x-8 w-full">
                  <div className="md:text-center text-left w-full">
                    <div className="text-xl font-semibold">{departureTime}</div>
                    <div className="text-sm text-muted-foreground">
                      {flight?.airport_from?.code}
                    </div>
                  </div>
                  <div className="flex flex-col md:items-center items-start w-full">
                    <div className="text-sm text-muted-foreground font-semibold mb-2 flex flex-col">
                      Non-stop
                    </div>
                    <div className="relative w-24">
                      <hr className="border-t-2 border-gray-300" />
                      <ChevronRight className="absolute -right-2 -top-[11px] h-6 w-6 text-muted-foreground" />
                    </div>
                  </div>
                  <div className="md:text-center text-left w-full">
                    <div className="text-xl font-semibold">{formattedTime}</div>
                    <div className="text-sm text-muted-foreground">
                      {flight?.airport_to?.code}
                    </div>
                  </div>
                </div>

                <div className="mt-4 flex items-center ">
                  <div className="text-right">
                    <div className="text-sm text-muted-foreground text-nowrap">
                      {flight?.duration} hours
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className=" bg-gray-100 py-6 px-4">
              <div className="flex items-center mt-2 flex-nowrap gap-2 justify-end">
                <div className="text-sm line-through text-muted-foreground text-nowrap">
                  {formatPrice(Number(flight?.min_price || 0))}
                </div>
                <div className="text-lg font-semibold text-nowrap">
                  {formatPrice(Number(flight?.min_price || 0))}
                </div>
              </div>

              <Button
                type="button"
                disabled={isLoading}
                className="px-8 w-full text-white font-bold mt-2"
                onClick={() => loadBookingData(flight.id)}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" /> Loading
                  </>
                ) : (
                  <>
                    Select
                    <ChevronRight className="ml-1 h-4 w-4" />
                  </>
                )}
              </Button>
            </div>
          </CardContent>

          {false && (
            <div className="flex justify-between my-5 mt-0 pt-3 px-4 border-t">
              <Collapsible>
                <CollapsibleTrigger className="flex items-center text-sm text-muted-foreground hover:text-foreground">
                  {/* <span>{isRefundable ? "Partially Refundable" : "Non-refundable"}</span> */}
                  <ChevronDown className="ml-1 h-4 w-4" />
                </CollapsibleTrigger>
                <CollapsibleContent className="text-sm">
                  {/* Add refund policy details here */}
                  Refund policy details...
                </CollapsibleContent>
              </Collapsible>
              <Collapsible>
                <CollapsibleTrigger className="flex items-center text-sm text-muted-foreground hover:text-foreground">
                  <span>Flight Details</span>
                  <ChevronDown className="ml-1 h-4 w-4" />
                </CollapsibleTrigger>
                <CollapsibleContent className="text-sm">
                  {/* Add flight details here */}
                  More Flight details...
                </CollapsibleContent>
              </Collapsible>
            </div>
          )}
        </div>
      </Card>
      {!!book && (
        <FlightBookingDialogue
          flight={book}
          open={open}
          onOpenChange={onOpenChange}
        />
      )}
    </div>
  );
}
