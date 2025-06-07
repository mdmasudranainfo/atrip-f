import ActivityCheckoutFinal from "@/components/activities/checkout/activity-checkout-final";
import ActivityGuestInfo from "@/components/activities/checkout/activity-guest-info";
import CarCheckoutFinal from "@/components/cars/checkout/car-checkout-final";
import ChauffeurCheckoutFinal from "@/components/chauffeur/checkout/chauffeur-checkout-final";
import HotelCheckoutFinalCard from "@/components/hotels/checkout/hotel-checkout-final-card";
import HotelCheckoutFinalContainer from "@/components/hotels/checkout/hotel-checkout-final-container";
import HotelCheckoutMain from "@/components/hotels/checkout/hotel-checkout-main";
import TourGuestInfo from "@/components/tour/checkout/tour-guest-info";
import TransportCheckoutFinal from "@/components/transports/checkout/transport-checkout";
import UmrahCheckoutFinal from "@/components/umrah/checkout/umrah-checkout-final";
import UmrahGuestInfo from "@/components/umrah/checkout/umrah-guest-info";
import VisaCheckoutFinal from "@/components/visa/checkout/visa-checkout-final";
import VisaDocumentForm from "@/components/visa/checkout/visa-document-form";
import VisaGuestInfo from "@/components/visa/checkout/visa-guest-info";
import { siteConfig } from "@/config/site";
import { fetchBookingCheckoutData } from "@/lib/actions/booking-actions";
import { getSelectedLocation } from "@/lib/actions/location-action";
import { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import { auth } from "~/auth";

export const metadata: Metadata = {
  title: `Booking | ${siteConfig.name}`,
  description: `${siteConfig.description}`,
};

export default async function Page({
  params,
  searchParams,
}: {
  params: any;
  searchParams: any;
}) {
  const pageParams = await params;
  const query = await searchParams;
  const booking_id = pageParams?.slug;
  if (!booking_id) {
    notFound();
  }

  const session = await auth();
  const { data: bookingData } = await fetchBookingCheckoutData(booking_id);
  if (!bookingData?.booking?.id) {
    notFound();
  }

  // Visa
  if (bookingData.booking.object_model == "visa") {
    if (bookingData.booking.step == 1) {
      return <VisaDocumentForm bookingData={bookingData} />;
    }

    if (bookingData.booking.step == 2) {
      return <VisaCheckoutFinal bookingData={bookingData} />;
    }

    return <VisaGuestInfo bookingData={bookingData} />;
  }

  // Umrah
  if (bookingData.booking.object_model == "umrah") {
    if (bookingData.booking.step == 1) {
      return <UmrahCheckoutFinal bookingData={bookingData} />;
    }

    return <UmrahGuestInfo bookingData={bookingData} />;
  }

  // Tour
  if (bookingData.booking.object_model == "tour") {
    if (bookingData.booking.step == 1) {
      return <UmrahCheckoutFinal bookingData={bookingData} />;
    }

    return <TourGuestInfo bookingData={bookingData} />;
  }

  // Car
  if (
    bookingData.booking.object_model == "car" ||
    // bookingData.booking.object_model == "transport" ||
    bookingData.booking.object_model == "flight"
  ) {
    return <CarCheckoutFinal bookingData={bookingData} />;
  }

  // TransportCheckoutFinal
  // if (bookingData.booking.object_model == "transport") {
  //   return <TransportCheckoutFinal bookingData={bookingData} />;
  // }

  if (bookingData.booking.object_model == "transport") {
    if (bookingData.booking.step == 1) {
      return <ActivityCheckoutFinal bookingData={bookingData} />;
    }
    return <TransportCheckoutFinal bookingData={bookingData} />;
  }

  // Event
  if (bookingData.booking.object_model == "event") {
    if (bookingData.booking.step == 1) {
      return <ActivityCheckoutFinal bookingData={bookingData} />;
    }

    return <ActivityGuestInfo bookingData={bookingData} />;
  }

  // Hotel
  if (bookingData.booking.object_model == "hotel") {
    if (bookingData.booking.step == 1) {
      if (bookingData.booking?.gateway == "offline_payment") {
        return (
          <HotelCheckoutFinalCard
            bookingData={bookingData}
            hasLoggin={!!session}
          />
        );
      }

      return (
        <HotelCheckoutFinalContainer
          bookingData={bookingData}
          hasLoggin={!!session}
        />
      );
    }

    return (
      <HotelCheckoutMain bookingData={bookingData} hasLoggin={!!session} />
    );
  }

  // Chauffeur
  if (bookingData.booking.object_model == "chauffeur") {
    const locationIds = [];
    if (query.location_id) {
      locationIds.push(Number(query.location_id));
    }

    const selectedLocations = locationIds.length
      ? await getSelectedLocation(locationIds)
      : [];

    return (
      <ChauffeurCheckoutFinal
        bookingData={bookingData}
        selectedLocations={selectedLocations}
      />
    );
  }

  redirect("/");
}
