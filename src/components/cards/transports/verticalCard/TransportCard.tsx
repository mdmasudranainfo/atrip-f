"use client";

import { MapPin, CheckCircle, ArrowRight } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { ITransport } from "@/types/transportTypes";
import { formatPrice, getSellPrice, getComparePrice } from "@/lib/utils";
import TransportExtraService from "@/components/cards/transports/transport-extra-service";
import { useMediaQuery } from "@mantine/hooks";
import { useSearchParams } from "next/navigation";
import RatingBadge from "@/components/rating-badge";
import DiscountPriceBadge from "@/components/booking/discount-price-badge";

export default function TransportCard({
  data,
  total,
  transport,
}: {
  data: any;
  total: number;
  transport: ITransport;
}) {
  const sellPrice = getSellPrice(transport.price, transport.sale_price);
  const comparePrice = getComparePrice(transport.price, transport.sale_price);
  const isMobileDevice = useMediaQuery("(max-width: 425px)");
  const searchParams = useSearchParams();
  const queryString = searchParams.toString();
  const url = `/transports/${transport.slug}?${queryString}`;

  const SaveSession = () => {
    const transportData = {
      transportData: data,
      transportTotal: total,
      scrollPosition: window.scrollY,
      transportPage: "transport",
    };

    // Save the current state to sessionStorage
    sessionStorage.setItem("transportData", JSON.stringify(transportData));
  };

  return (
    <Link onClick={() => SaveSession()} href={url}>
      <Card className="card-wrapper overflow-hidden sm:p-4 border-none w-full h-auto">
        {/* single-item */}
        <div className=" flex flex-col sm:flex-row gap-4">
          {/* Image Section */}
          {/* <div className="md:single-item-media relative w-full sm:w-32 h-60 sm:h-60 md:w-40 lg:w-60 rounded-xl overflow-hidden">
            <Image
              src={transport.image_url || "/placeholder.svg"}
              alt={transport.title}
              fill
              className="object-contain"
            />
          </div> */}

          <div className="md:single-item-media relative w-full sm:w-32 h-60 sm:h-60 md:w-40 lg:w-60 rounded-xl overflow-hidden">
            <Image
              src={transport.image_url || "/placeholder.svg"}
              alt={transport.title}
              fill
              className="object-cover"
            />
          </div>

          {/* Content Section */}
          <div className="single-item-content flex flex-1 flex-col gap-2 justify-between">
            <div className="content-wrapper flex flex-col sm:flex-row justify-between">
              <div className="basis-full sm:basis-[80%]">
                <div className="flex items-center gap-1 content-top">
                  <h3 className="text-[15px] leading-[16px] md:text-xl md:leading-[28px] font-semibold text-dark">
                    {transport.title}
                  </h3>
                </div>

                {/* Location */}
                <div className="content-location flex items-center gap-2 text-[13px] md:text-sm text-primary-dark mt-1">
                  <MapPin className="h-3 w-3 md:h-4 md:w-4" />
                  <span>{transport.address}</span>
                </div>

                {/* Subtitle */}
                <div className="py-1 md:block hidden">
                  <p className="text-sm">{transport?.sub_title}</p>
                </div>

                {/* Services */}
                {!!transport.extra_info && (
                  <div className="services md:grid hidden grid-cols-1 gap-x-2 gap-y-2 mt-2 text-dark text-[13px] md:text-sm">
                    <TransportExtraService info={transport.extra_info} />
                  </div>
                )}
              </div>

              {/* Rating badge */}
              <div className="mt-2 sm:mt-0 sm:self-start md:block hidden">
                <div className="content-bottom flex flex-col justify-between mt-3">
                  <div className="flex justify-end items-center gap-2 content-bottom-left">
                    <span className="block text-primary-dark text-sm font-sans">
                      {transport.total_review} reviews
                    </span>
                    <p className="bg-info rounded-sm w-9 h-10 text-white flex justify-center items-center">
                      {transport.review_score}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Price & CTA */}
            <div className="">
              <DiscountPriceBadge
                sellPrice={sellPrice}
                comparePrice={comparePrice}
                priceAfterText="Per hour"
              />
              <div className="text-right mt-2">
                <Button variant={"primary"} className="w-full sm:w-auto !py-4">
                  Check Availability
                  <ArrowRight
                    className="mt-[2px] ml-1"
                    size={12}
                    color="#fff"
                  />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </Link>
  );
}
