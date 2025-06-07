"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Loader2, ShoppingCart, X } from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardFooter,
} from "@/components/ui/card";
import { formatPrice } from "@/lib/utils";
import { BookingTicketType } from "@/types/activity";
import MobileBookingModal from "./MobileBookingModal";

export default function ActivityPriceSummery({
  bottomNavigation,
  text = "Per Person",
  timeSlot,
  date,
  title,
  isLoading,
  packages,
  selectedPackage,
  totalPrice,
  isValid,
  onSubmit,
}: {
  bottomNavigation?: boolean;
  text: string;
  timeSlot: string;
  date: string;
  title: string;
  isLoading: boolean;
  packages: BookingTicketType[];
  selectedPackage: any[];
  totalPrice: number;
  isValid: boolean;
  onSubmit: () => void;
}) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      {/* Mobile Fixed Action Button */}

      {bottomNavigation ? (
        <div className="flex md:hidden justify-between items-center fixed bottom-0 left-0 w-full bg-white px-4 py-4 border-t-2 rounded-t-lg shadow-[0_-2px_10px_rgba(0,0,0,0.1)] z-50">
          <div className="flex justify-between items-center">
            <div>
              <span className="text-xl text-dark font-medium">
                {formatPrice(totalPrice)}
              </span>
            </div>
          </div>

          {/* <Button variant={"outline"} onClick={() => setShowModal(true)}>
          Summary
        </Button> */}

          <Button
            size={"xl"}
            className="font-semibold bg-primary text-white hover:bg-primary/90 px-14"
            disabled={!isValid || isLoading}
            // onClick={() => setShowModal(true)}
            onClick={onSubmit}
          >
            {isLoading ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              "Next page"
            )}
          </Button>
        </div>
      ) : (
        ""
      )}

      {/* Modal for Mobile */}
      <MobileBookingModal
        timeSlot={timeSlot}
        date={date}
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onSubmit={onSubmit}
        isLoading={isLoading}
        isValid={isValid}
        title={title}
        packages={packages}
        selectedPackage={selectedPackage}
        totalPrice={totalPrice}
      />

      {/* Large Device Card */}
      <div className="px-0 space-y-4 hidden lg:block">
        <section className="flex-1 text-dark sticky top-0">
          <Card className="w-full lg:max-w-lg">
            <CardHeader className="relative p-4 rounded-t-lg overflow-hidden bg-cover bg-center bg-[url(/images/bradcomed-banner.png)]">
              <div className="absolute inset-0 bg-black/40"></div>
              <div className="relative z-10 flex gap-2">
                <ShoppingCart className="h-5 w-5 text-white" />
                <h2 className="text-xl font-semibold text-white">
                  {packages.length ? "Package" : "Price"} Summary
                </h2>
              </div>
              <div className="relative z-10 flex gap-2">
                <h2 className="text-md font-semibold text-white">{title}</h2>
              </div>
            </CardHeader>

            <CardContent className="space-y-6 p-4">
              <div className="space-y-4">
                <h3 className="text-md font-semibold">
                  {packages.length ? "Package" : "Price"} Details:
                </h3>
                {selectedPackage.map((item, i) => (
                  <div className="flex justify-between items-center" key={i}>
                    <span className="text-sm font-medium text-dark-deepSlate">
                      {item.number} {item.name}
                    </span>
                    <span className="text-sm">
                      {formatPrice(item.number * item.price)}
                    </span>
                  </div>
                ))}
              </div>

              <div className="space-y-4">
                <div className="flex justify-between items-center border-t pt-4">
                  <span className="text-base font-medium text-dark-deepSlate">
                    Sub Total:
                  </span>
                  <span className="text-base font-semibold text-dark">
                    {formatPrice(totalPrice)}
                  </span>
                </div>

                <div className="flex justify-between items-center bg-white-softSlate p-4 rounded-lg">
                  <span className="text-base font-semibold text-dark">
                    Total:
                  </span>
                  <span className="text-lg font-semibold text-dark">
                    {formatPrice(totalPrice)}
                  </span>
                </div>
              </div>
            </CardContent>

            <CardFooter className="gap-4 p-4 pt-0">
              <Button
                className="w-full font-semibold h-12 bg-primary text-white hover:bg-primary/90"
                disabled={!isValid || isLoading}
                onClick={onSubmit}
              >
                {isLoading ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  "Book Now"
                )}
              </Button>
            </CardFooter>
          </Card>
        </section>
      </div>
    </>
  );
}
