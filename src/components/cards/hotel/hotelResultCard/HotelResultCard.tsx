import { Card } from "@/components/ui/card";
import Image from "next/image";
import { formatPrice, getSellPrice, ratingLabel, taxRateToAmount } from "@/lib/utils";
import { HotelType } from "@/types/hotel-types";
import MapButton from "@/components/map/map-button";
import RatingStar from "@/components/rating-star";
import { HotalDetailButton } from "../hotel-detail-btn";
import { HiOutlineMap, HiOutlineSwitchHorizontal, HiOutlineLocationMarker } from "react-icons/hi";
import TaxVatLabel from "@/components/booking/tax-vat-label";

export default async function HotelCard({ hotel, taxRate = 0 }: { hotel: HotelType, taxRate: number }) {

  const beds = [];
  if (hotel?.hotel_info?.double) {
    beds.push(`${hotel.hotel_info.double} double`)
  }

  if (hotel?.hotel_info?.double) {
    beds.push(`${hotel?.hotel_info?.single} single`)
  }


  const sellPrice = getSellPrice(hotel.price, hotel.sale_price)
  const taxAmount = taxRateToAmount(sellPrice, taxRate)

  return (
    <Card className="overflow-hidden p-4 border-none w-full h-auto md:h-72">
      <div className="item-content flex justify-between gap-6 md:gap-5">
        {/* Image Section */}
        <div className="item-media relative w-28 h-auto sm:w-full sm:h-64 rounded-xl overflow-hidden basis-[30%]">
          <Image
            src={hotel?.image_url || "/placeholder.svg"}
            alt={hotel?.title}
            fill
            className="object-cover rounded-xl"
          />
        </div>

        {/* Content Section */}
        <div className="item-content basis-[100%] flex flex-col justify-between">

          <div className="content-top">
            <div className="title-review-area flex justify-between items-center">
              {/* Hotel Name & Rating */}
              <div className="title-area flex flex-col md:flex-row items-start md:items-center md:gap-2 gap-0 mb-2">
                <h3 className="main-title md:text-xl text-[15px] leading-[16px] md:leading-[28px] font-semibold text-dark">
                  {hotel?.title}
                </h3>
                <div className="rating-area flex flex-col sm:flex-row items-start sm:items-center gap-2 md:mt-0 mt-1">
                  <div className="flex text-yellow-400">
                    <RatingStar reviewScore={Number(hotel?.star_rate || 0)} />
                  </div>
                </div>
              </div>

              {/* Review area */}
              <div className="review-area flex items-center gap-2 mt-3 sm:mt-0">
                <div className="rounded text-sm text-center">
                  <p className="font-medium text-base text-dark">{ratingLabel(Number(hotel?.review_score || 0))}</p>
                  <span className="text-dark font-normal text-sm inline-block min-w-[72px]">
                    {hotel?.review_data?.total_review} review{Number(hotel?.review_data?.total_review || 0) > 1 ? "s" : ""}
                  </span>
                </div>
                <div className="p-2 text-sm bg-info text-white font-semibold rounded flex items-center">
                  <span className="font-semibold">{hotel?.review_score}</span>
                </div>
              </div>
            </div>

            {/* Location & Distance */}
            <div className="hotel-details-location-wrapper flex flex-wrap md:flex-row flex-col items-start md:items-center md:gap-5 gap-0 text-black text-base">

              {/* Location */}
              <div className="location-wrapper flex justify-center items-center gap-2 leading-none">
                <HiOutlineLocationMarker size={16} />
                <span>
                  {hotel?.location?.city?.name} /{" "}
                  {hotel?.location?.country?.name}
                </span>
              </div>

              {/* Map */}
              {hotel?.location?.map_lat && hotel?.location?.map_lng && (
                <div className="map-wrapper flex justify-center items-center gap-2 leading-none">
                  <HiOutlineMap size={16} />
                  <MapButton
                    lat={hotel?.location?.map_lat}
                    lng={hotel?.location?.map_lng}
                    title="Hotel Map"
                    className="p-0 text-black text-base leading-none h-4"
                  />
                </div>
              )}

              {/* Distance */}
              {(!!hotel.nearest_location?.name) && (
                <div className="distance-wrapper flex justify-center items-center gap-2 leading-none">
                  <HiOutlineSwitchHorizontal size={16} />
                  {hotel.nearest_location.distance_in_km} km from {hotel.nearest_location?.name}
                </div>
              )}
            </div>
          </div>

          {/* Beds, price */}
          <div className="content-bottom mt-1 sm:mt-0 flex flex-col sm:flex-row sm:justify-between sm:items-end text-sm md:gap-4 gap-0">

            {/* Beds */}
            <div className="beds-count">
              <h4 className="font-bold">{hotel?.hotel_info?.type}</h4>
              <p className="text-gray-600">
                {beds.length > 0 ? `Beds: ${beds.join(', ')}` : ''}
              </p>
            </div>

            {/* Price & CTA */}
            <div className="price-cta-area text-right">
              <p className="text-xs text-gray-600">1 night, 1 adult</p> {/*  TODO:: Make Dynamic */}
              <div className="flex items-center justify-end gap-2 my-2">
                <span className="item-price md:text-lg md:left-7 leading-4 text-md font-bold order-2">
                  {formatPrice(sellPrice)}      {/*  TODO:: show Room price, not hotel */}
                </span>
              </div>

              <TaxVatLabel taxAmount={taxAmount} />
              <HotalDetailButton slug={hotel?.slug} />
            </div>

          </div>

        </div>
      </div>
    </Card>
  );
}
