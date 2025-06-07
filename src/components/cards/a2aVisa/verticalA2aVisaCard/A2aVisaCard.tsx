import { Building2, Bus, CheckCircle, MapPin, Plane, Star, Utensils } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { formatPrice, getComparePrice, getSellPrice } from "@/lib/utils";
import DiscountPriceBadge from "@/components/booking/discount-price-badge";

interface Visa {
  id: string | number;
  title: string;
  country: { name: string };
  price: number;
  image_url: string;
  overview: string;
  review_data: {
    score_total: number;
    total_review: number;
  };
  slug: string;
  sale_price?: string | number
}

interface VisaCardProps {
  visa: Visa;
}

export default function A2aVisaCard({ visa }: VisaCardProps) {

  const sellPrice = getSellPrice(visa.price, visa.sale_price)
  const comparePrice = getComparePrice(visa.price, visa.sale_price)

  return (
    <Card className="card-wrapper overflow-hidden sm:p-4 border-none w-full h-auto">
      <div className="single-item flex gap-4">
        {/* Image Section */}
        <div className="single-item-media relative h-auto sm:h-64 w-32 sm:w-32 md:w-40 lg:w-60 rounded-xl overflow-hidden">
          <Image
            src={visa.image_url || "/"}
            alt={visa.title}
            fill
            priority
            className="object-cover"
          />
        </div>

        {/* Content Section */}
        <div className="single-item-content flex flex-1 flex-col gap-0 justify-between">
          <div className="content-wrapper flex justify-between items-stretch">
            <div className="basis-[80%]">
              <div className="flex items-center gap-1 content-top">
                <h3 className="md:text-xl text-[15px] leading-[16px] md:leading-[28px] font-semibold text-dark">{visa.title}</h3>
                {/* Rating Section */}
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${i < Math.round(visa.review_data?.score_total || 0) ? "fill-current" : "stroke-current"}`}
                      strokeWidth={i < Math.round(visa.review_data?.score_total || 0) ? 0 : 1}
                    />
                  ))}
                </div>
              </div>
              {/* Location */}
              <div className="content-location flex items-center gap-2 md:text-sm text-[13px] text-primary-dark mt-2">
                <MapPin className="md:h-4 md:w-4 w-3 h-3" />
                <span>{visa.country?.name ?? ""}</span>
              </div>
              {/* Services Section */}
              {/* <div className="services flex gap-5 mt-3 text-dark text-sm flex-wrap">
                <div className="service-single flex items-center gap-2">
                  <Building2 className="md:h-5 md:w-5 h-4 w-4 text-primary-dark" />
                  <span className="md:text-md text-[13px]">Free cancellation</span>
                </div>
                <div className="service-single flex items-center gap-2">
                  <Utensils className="md:h-5 md:w-5 h-4 w-4 text-primary-dark" />
                  <span className="md:text-md text-[13px]">Instant confirmation</span>
                </div>
                <div className="service-single flex items-center gap-2">
                  <Plane className="md:h-5 md:w-5 h-4 w-4 text-primary-dark" />
                  <span className="md:text-md text-[13px]">Mobile ticket</span>
                </div>
                <div className="service-single flex items-center gap-2">
                  <Bus className="md:h-5 md:w-5 h-4 w-4 text-primary-dark" />
                  <span className="md:text-md text-[13px]">Flexible duration</span>
                </div>
              </div> */}

            </div>
            <div className="content-bottom flex flex-col justify-between">
              <div className="flex justify-end items-center gap-2 content-bottom-left">
                <span className="block text-primary-dark text-sm font-sans">{visa.review_data.total_review} reviews</span>
                <p className="bg-info rounded-sm w-9 h-10 text-white flex justify-center items-center">{visa.review_data.score_total}</p>
              </div>
            </div>
          </div>
          <div className="flex gap-5 items-end">
            <div className="short-desc text-sm mt-5 font-sans"
              dangerouslySetInnerHTML={{
                __html: visa.overview.split(" ").slice(0, 100).join(" ") + "...",
              }}>
            </div>
            <div>
              {/* Price and Book Section */}
              <div className="item-price-wrapper mt-2 sm:mt-5 flex justify-end items-start sm:items-end gap-4">
                {/* Price Section */}
                <div className="flex flex-col">
                  <div className="item-price text-sm font-bold">
                    <DiscountPriceBadge sellPrice={sellPrice} comparePrice={comparePrice} priceAfterText="/person" />
                  </div>
                </div>
              </div>
              {/* Book Now Button */}
              <div className="text-right mt-2 content-bottom-right">
                <Link href={`/a2a-visa/${visa.slug}`}>
                  <Button variant={"vcardBtn"} >
                    <CheckCircle size={12} color="#fff" />
                    Book Now
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}
