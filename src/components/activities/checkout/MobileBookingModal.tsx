import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { formatPrice } from "@/lib/utils";
import { BookingTicketType } from "@/types/activity";
import dayjs from "dayjs";
import { Loader2, ShoppingCart, X } from "lucide-react";

function MobileBookingModal({
  timeSlot,
  date,
  isOpen,
  onClose,
  onSubmit,
  isLoading,
  isValid,
  title,
  packages,
  selectedPackage,
  totalPrice,
}: {
  timeSlot: string;
  date: string;
  isOpen: boolean;
  onClose: () => void;
  onSubmit: () => void;
  isLoading: boolean;
  isValid: boolean;
  title: string;
  packages: BookingTicketType[];
  selectedPackage: any[];
  totalPrice: number;
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 lg:hidden overflow-y-auto">
      <div className="bg-white rounded-lg p-4 w-full max-w-md mx-auto my-8 shadow-lg">
        <div className="flex justify-end items-center mb-4">
          {/* <h3 className="text-lg font-semibold">Booking Summary</h3> */}
          <button onClick={onClose}>
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Summary Card in Modal */}
        <Card className="w-full">
          <CardHeader className="relative p-4 rounded-t-lg overflow-hidden bg-cover bg-center bg-[url(/images/bradcomed-banner.png)]">
            <div className="absolute inset-0 bg-black/40" />
            <div className="relative z-10 flex gap-2">
              <ShoppingCart className="h-5 w-5 text-white" />
              <h2 className="text-md font-semibold text-white">
                {packages.length ? "Package" : "Price"} Summary
              </h2>
            </div>
            <div className="relative ">
              <h2 className="text-sm font-semibold text-white">{title}</h2>
              <p className="text-white">
                {dayjs(date).format("D MMMM YYYY")} <span>({timeSlot})</span>
              </p>
            </div>
          </CardHeader>

          <CardContent className="space-y-6 p-4">
            <div className="space-y-4">
              <h3 className="text-md font-semibold leading-6">
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
        </Card>

        <Button
          className="mt-6 w-full font-semibold bg-primary text-white hover:bg-primary/90"
          disabled={!isValid || isLoading}
          onClick={() => {
            onSubmit();
            onClose();
          }}
        >
          {isLoading ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            "Confirm Booking"
          )}
        </Button>
      </div>
    </div>
  );
}

export default MobileBookingModal;
