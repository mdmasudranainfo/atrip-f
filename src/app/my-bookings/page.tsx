import { TransparentNavbar } from "@/components/header/transparentNav/TransparentNav";
import { BookingInfo } from "@/components/profile/bookingInfo/page";
import { getBookingHistory } from "@/lib/actions/booking-actions";
import React from "react";

const MyBookings = async () => {
  const { data, error } = await getBookingHistory();

  return (
    <div>
      <TransparentNavbar isBgWhite={false} />
      {<BookingInfo bookingData={data} />}
    </div>
  );
};

export default MyBookings;
