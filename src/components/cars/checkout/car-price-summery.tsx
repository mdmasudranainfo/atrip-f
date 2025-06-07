"use client";
import * as Dialog from "@radix-ui/react-dialog";
import { X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Loader2, ShoppingCart } from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardFooter,
} from "@/components/ui/card";
import { formatPrice } from "@/lib/utils";
import { useState } from "react";

export default function VisaPriceSummery({
  isLoading,
  bookingData,
  onSubmit,
}: {
  isLoading: boolean;
  bookingData: any;
  onSubmit: () => void;
}) {
  const extraPrice = (
    (bookingData?.booking?.extra_price || []) as any[]
  )?.reduce((acc, item) => acc + item.total, 0);

  const [showModal, setShowModal] = useState(false);

  const SummaryComponent = () => {
    return (
      <div className="lg:px-4 px-0 space-y-4">
        <section className=" flex-1 text-dark">
          <Card className="w-full lg:max-w-lg">
            <CardHeader className="bg-white-softGray rounded-t-lg">
              <div className="flex items-center h-16 gap-2 ps-4 bg-cover bg-center bg-[url(/images/bradcomed-banner.png)] text-white rounded-t-lg">
                <ShoppingCart className="h-5 w-5 text-white" />
                <h2 className="text-xl font-semibold leading-7">
                  Package Summary
                </h2>
              </div>
            </CardHeader>

            <CardContent className="space-y-6 p-4">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold leading-6">
                  Package Details:
                </h3>

                <div className="flex justify-between items-center">
                  <span className="text-base font-medium leading-6 text-dark-deepSlate">
                    Basic rate
                  </span>
                  <span className="text-lg">
                    {formatPrice(Number(bookingData?.booking?.base_price || 0))}
                  </span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-base font-medium leading-6 text-dark-deepSlate">
                    Protection & Extra
                  </span>
                  <span className="text-lg">
                    {formatPrice(Number(extraPrice || 0))}
                  </span>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex justify-between items-center bg-white-softSlate p-4 rounded-lg ">
                  <span className=" text-base font-semibold leading-6 text-dark">
                    Total:
                  </span>
                  <span className=" text-lg font-semibold leading-6 text-dark">
                    {formatPrice(Number(bookingData?.booking?.total || 0))}
                  </span>
                </div>
              </div>
            </CardContent>

            <CardFooter className=" gap-4  p-4 pt-0">
              <Button
                className="w-full font-semibold  h-12 bg-primary text-white hover:bg-primary/90"
                disabled={isLoading}
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
    );
  };
  return (
    <>
      <div className="hidden md:block">
        <SummaryComponent />
      </div>

      {/* Bottom navigation for mobile */}
      <Dialog.Root>
        <div className="flex md:hidden justify-between items-center fixed bottom-0 left-0 w-full bg-white-softSlate px-4 py-2 border-t-2 rounded-t-lg shadow-[0_-2px_10px_rgba(0,0,0,0.1)] z-50">
          <div>
            <span className="text-sm text-dark font-medium">
              {formatPrice(Number(bookingData?.booking?.total || 0))}
            </span>
            <span className="text-sm text-primary ml-1">/ Per Person</span>
          </div>

          <div className="flex gap-2">
            <Dialog.Trigger asChild>
              <Button variant="outline">Summary</Button>
            </Dialog.Trigger>

            <Button
              className="font-semibold bg-primary text-white hover:bg-primary/90"
              disabled={isLoading}
              onClick={onSubmit}
            >
              {isLoading ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                "Book Now"
              )}
            </Button>
          </div>
        </div>

        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 z-50 bg-black/40" />
          <Dialog.Content className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 bg-white rounded-2xl p-6 w-[90vw] max-w-md max-h-[90vh] overflow-y-auto shadow-lg">
            <div className="flex justify-end mb-2">
              <Dialog.Close asChild>
                <Button variant="ghost" size="icon">
                  <X className="w-5 h-5" />
                </Button>
              </Dialog.Close>
            </div>
            <SummaryComponent />
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </>
  );
}
