import { Clock, CheckCircle, Star } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { formatPrice, getSellPrice } from "@/lib/utils";

interface Visa {
  id: string | number;
  title: string;
  working_day: string;
  price: number;
  image_url: string;
  overview: string;
  review_data: {
    score_total: number;
    total_review: number;
    score_text: string;
  };
  slug: string;
  sale_price?: string | number;
}

interface VisaCardProps {
  visa: Visa;
}

export default function VisaCard({ visa }: VisaCardProps) {

  const sellPrice = getSellPrice(visa.price, visa.sale_price)

  return (
    <Card className="card-wrapper overflow-hidden sm:p-4 border-none w-full h-auto">
      <div className="single-item visa-item flex gap-4">
        {/* Image Section */}
        <div className="single-item-media relative w-32 sm:h-60 sm:w-32 md:w-40 lg:w-60 h-auto rounded-xl overflow-hidden">
          <Image
            src={visa.image_url || "/"}
            alt={visa.title}
            fill
            priority
            className="object-cover"
          />
        </div>

        <div className="single-item-content flex flex-1 flex-col gap-0 justify-between">
          <div className="content-wrapper flex justify-between items-stretch">
            <div className="content-top">
              <div className="flex items-center gap-1 ">
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

              {/* Days */}
              <div className="content-location flex items-center gap-2 md:text-sm text-[13px] text-primary-dark mt-2">
                <Clock className="md:h-4 md:w-4 w-3 h-3" />
                <span>{visa?.working_day ?? ""} Working Days</span>
              </div>
            </div>

            <div className="content-bottom flex flex-col justify-between   ">
              <div className="flex justify-end items-center gap-2 content-bottom-left">
                <div>
                  <h5 className="font-bold text-primary-dark text-sm font-sans">{visa.review_data.score_text}</h5>
                  <span className="block text-primary-dark text-sm font-sans">{visa.review_data.total_review} reviews</span>
                </div>
                <p className="bg-info rounded-sm w-9 h-10 text-white flex justify-center items-center">{visa.review_data.score_total}</p>
              </div>

            </div>
          </div>
          <div className="flex gap-3">
            {/* Short Description (Moved to Bottom) */}
            <div
              className="short-desc text-sm mt-5 font-sans"
              dangerouslySetInnerHTML={{
                __html: visa.overview.split(" ").slice(0, 50).join(" ") + "...",
              }}>
            </div>
            <div className="w-full">
              {/* Price and Book Section */}
              <div className="item-price-wrapper mt-2 sm:mt-5 flex justify-end items-start sm:items-end gap-4">
                {/* Price Section */}
                <div className="flex flex-col">
                  <div className="item-price text-sm font-bold">
                    {formatPrice(sellPrice)}
                    <span className="font-normal inline-block ml-2">Per person</span>
                  </div>
                </div>
              </div>
              {/* Book Now Button */}
              <div className="text-right mt-2 content-bottom-right">
                <Link href={`/visa/${visa.slug}`}>
                  <Button variant={"vcardBtn"}>
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
