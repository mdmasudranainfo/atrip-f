// import { Building2, Utensils, Plane, Bus, MapPin, Star } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { ServiceIncluding, TourData } from "@/types/tourTypes";
import StarRates from "@/components/StarRates/page";

import { Building2, Utensils, Plane, Bus, MapPin, Star, CheckCircle, Clock } from "lucide-react";
import { TbCalendarTime } from "react-icons/tb";
import { BsBookmarkStar, BsPhone, BsCalendarX } from "react-icons/bs";
import { JSX } from "react";
import { formatPrice, getComparePrice, getSellPrice } from "@/lib/utils";
import DiscountPriceBadge from "@/components/booking/discount-price-badge";

const getServiceIcon = (service: string) => {
  const iconClass = "h-5 w-5 text-primary-dark";

  const iconMap: Record<string, JSX.Element> = {
    hotels: <Building2 className={iconClass} />,
    meals: <Utensils className={iconClass} />,
    flight: <Plane className={iconClass} />,
    transportation: <Bus className={iconClass} />,
  };

  return iconMap[service.toLowerCase()] || null;
};

export default function UmrahCard({ tour }: { tour: TourData }) {

  const sellPrice = getSellPrice(tour.price, tour.sale_price)
  const comparePrice = getComparePrice(tour.price, tour.sale_price)


  return (
    <Card className="card-wrapper overflow-hidden sm:p-4 border-none w-full h-auto">
      <div className="single-item flex gap-4">
        {/* Image Section */}
        <div className="single-item-media relative w-32 h-auto sm:h-64 sm:w-32 md:w-40 lg:w-60 rounded-xl overflow-hidden">
          <Image
            src={tour?.image_url || "/placeholder.svg"}
            alt={"name"}
            fill
            className="object-cover"
          />
        </div>

        <div className="single-item-content flex flex-1 flex-col gap-0 justify-between">
          <div className="content-wrapper flex justify-between items-stretch">
            <div className="basis-[80%]">
              <div className="flex items-center gap-1 content-top">
                <h3 className="md:text-xl text-[15px] leading-[16px] md:leading-[28px] font-semibold text-dark">{tour?.title}</h3>
              </div>
              {/* Days of booking */}
              <div className="mt-1 flex items-center gap-2">
                <Clock size={15} className="text-primary-dark" />
                <span className="capitalize inline-block text-sm">
                  {tour?.duration}{" "}
                  {Number(tour?.duration) === 1 ? "day" : "days"}
                </span>
              </div>

              {/* Location */}
              <div className="content-location flex items-center gap-2 md:text-sm text-[13px] text-primary-dark mt-2">
                <MapPin className="md:h-4 md:w-4 w-3 h-3" />
                <span>{tour?.address}</span>
              </div>
              {/* Services Section */}
              <div className="services flex gap-5 mt-3 text-dark text-sm flex-wrap">
                <div className="service-single flex items-center gap-2">
                  <BsCalendarX className="md:h-5 md:w-5 h-4 w-4 text-primary-dark" />
                  <span className="md:text-md text-[13px]">Free cancellation</span>
                </div>
                <div className="service-single flex items-center gap-2">
                  <BsBookmarkStar className="md:h-5 md:w-5 h-4 w-4 text-primary-dark" />
                  <span className="md:text-md text-[13px]">Instant confirmation</span>
                </div>
                <div className="service-single flex items-center gap-2">
                  <BsPhone className="md:h-5 md:w-5 h-4 w-4 text-primary-dark" />
                  <span className="md:text-md text-[13px]">Mobile ticket</span>
                </div>
                <div className="service-single flex items-center gap-2">
                  <TbCalendarTime className="md:h-5 md:w-5 h-4 w-4 text-primary-dark" />
                  <span className="md:text-md text-[13px]">Flexible duration</span>
                </div>
              </div>
            </div>
            <div className="content-bottom flex flex-col justify-between">
              <div className="flex justify-end items-center gap-2 content-bottom-left">
                <div>
                  <p className="font-medium text-sm sm:text-base text-dark text-right">
                    {tour?.review_data?.score_text}
                  </p>
                  <span className="block text-primary-dark text-sm font-sans">{tour?.review_data?.score_total} reviews</span>
                </div>
                <p className="bg-info rounded-sm w-9 h-10 text-white flex justify-center items-center">{Number(tour?.review_data?.score_total)}</p>
              </div>

            </div>
          </div>
          <div className="flex flex-col items-end mt-2">
            <DiscountPriceBadge sellPrice={sellPrice} comparePrice={comparePrice} priceAfterText="/person" />
            {/* Price and Book Section */}
            <p className="text-xs text-primary-dark text-right"> *Prices includes VAT & Tax </p>
            {/* Book Now Button */}
            <div className="text-center mt-2 content-bottom-right">
              <Link href={`/umrah/${tour.slug}`}>
                <Button variant={"vcardBtn"} >
                  <CheckCircle size={12} color="#fff" />
                  Book Now
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}
