"use client"
import { TransparentNavbar } from "@/components/header/transparentNav/TransparentNav";
import HotelBookingForm from "@/components/hotels/checkout/HotelBookingForm";
import BookingDetails from "@/components/hotels/checkout/rightSidebar/BookingDetails";
import HotelInfoCard from "@/components/hotels/checkout/rightSidebar/HotelInfoCard";
import PriceSummary from "@/components/hotels/checkout/rightSidebar/PriceSummary";
import Timeline from "@/components/hotels/checkout/timeLine";
import Link from "next/link";



export default function  HotelCheckoutMain({ bookingData, hasLoggin }: { bookingData: any, hasLoggin: boolean }) {
  return (
    <div className="bg-white">
      <TransparentNavbar isBgWhite={true} />
      <main className="container mx-auto px-4">
        <div className="my-2 sm:my-10">
          <Timeline currentStep={(bookingData?.booking?.step || 0) + 1} />
        </div>
        <div className="grid  lg:grid-cols-[70%,1fr] gap-4 md:p-5 px-0 py-6  grid-cols-1">
          <div className="space-y-4">
            {!hasLoggin && (
              <div className="border rounded-xl p-4 h-20 flex items-center justify-between">
                <p>
                  <Link
                    href={"/sign-in"}
                    className="text-blue-600 hover:underline"
                  >
                    Sign in
                  </Link>{" "}
                  to book with your saved details or{" "}
                  <Link
                    href={"sign-up"}
                    className="text-blue-600 hover:underline"
                  >
                    register
                  </Link>{" "}
                  to manage your bookings on the go!
                </p>
              </div>
            )}
            <div>
              <HotelBookingForm bookingData={bookingData} />
            </div>
          </div>

          {/* summary */}
          <div className="lg:px-4 px-0 space-y-4">
            <HotelInfoCard hotelInfo={bookingData?.service} />
            <BookingDetails bookedData={bookingData?.booking} />
            <PriceSummary bookedData={bookingData?.booking} onSubmit={() => {}} />
          </div>
        </div>
      </main>
    </div>
  )
}
