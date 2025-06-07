"use client";
import Image from "next/image";
import { Card, CardHeader } from "@/components/ui/card";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import StarRates from "@/components/StarRates/page";
import useFeaturedCards from "@/lib/hooks/useFeaturedData";
import { truncateText } from "@/utils/assistant/assistant";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import './style.css';
import { formatPrice, getComparePrice, getSellPrice } from "@/lib/utils";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import DiscountPriceBadge from "@/components/booking/discount-price-badge";

interface ArrowProps {
  className?: string;
  style?: React.CSSProperties;
  onClick?: () => void;
}

const CustomPrevArrow: React.FC<ArrowProps> = ({ onClick }) => {
  return (
    <div
      className="absolute h-8 w-8 bg-white flex justify-center items-center rounded-full shadow top-[52%] left-0 transform -translate-y-1/2 z-10 cursor-pointer"
      onClick={onClick}
    >
      <FaChevronLeft size={22} className="text-primary-dark" />
    </div>
  );
};

const CustomNextArrow: React.FC<ArrowProps> = ({ onClick }) => {
  return (
    <div
      className="absolute h-8 w-8 bg-white flex justify-center items-center rounded-full shadow top-[52%] right-0 transform -translate-y-1/2 z-10 cursor-pointer"
      onClick={onClick}
    >
      <FaChevronRight size={22} className="text-primary-dark" />
    </div>
  );
};

// Slick slider settings
const settings = {
  dots: false,
  infinite: true,
  speed: 500,
  slidesToShow: 3,
  slidesToScroll: 1,
  autoplay: false,
  autoplaySpeed: 3000,
  centerMode: false,
  arrows: true, // Enable arrows
  nextArrow: <CustomNextArrow />, // Use your custom right arrow
  prevArrow: <CustomPrevArrow />, // Use your custom left arrow
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1,
        centerMode: true,
        centerPadding: "10%",
      },
    },
    {
      breakpoint: 768,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
        centerMode: true,
        centerPadding: "10%",
        arrows: false, // Disable arrows on smaller screens
      },
    },
  ],
};

export default function DefaultHotelCard({featured}:any) {
  const { featuredCards, loading, error } = useFeaturedCards("hotel");
  const searchParams = useSearchParams();
  const queryString = searchParams.toString();

  if (loading) {
    return <p className="text-center w-full ">Loading hotels...</p>;
  }

  if (error || !featuredCards.length) {
    return <p className="text-center w-full ">No featured hotels available.</p>;
  }

  return (
    <div className="mx-auto">
      <Slider {...settings} className="best-hotelsarrows">
        {featuredCards.map((hotel) => {

          const sellPrice = getSellPrice(hotel.price, hotel.sale_price)
          const comparePrice = getComparePrice(hotel.price, hotel.sale_price)
          
          return (
          <div
            key={hotel?.id}
            className="px-2"
          >
            <Card className="overflow-hidden bg-white rounded-[10px] border shadow-none">
              <div className="relative w-full h-36 md:h-[280px] sm:h-48">
                <Link
                  href="#"
                >
                  <Image
                    src={hotel?.image_url}
                    alt={hotel?.title}
                    fill
                    className="object-cover rounded-[10px]"
                    priority
                  />
                </Link>
              </div>

              <CardHeader className="md:px-5 px-3">
                <div className="md:mt-6 mt-1">
                  <span className="font-inter text-sm md:font-medium text-[13px] md:leading-5 leading-3 text-primary-dark">
                    Best Price Guarantee
                  </span>
                </div>

                <div>
                  <div className="flex items-center justify-between gap-2 md:mt-1 mt-0">
                    <Link
                      href={featured === true ? "/hotels" : `/hotels/${hotel?.slug}?${queryString}`}>
                      <h3 className="hover:underline font-inter md:text-lg text-[14px] font-semibold md:leading-7 leading-[14px] text-dark slick-item-title">
                        {hotel?.title && truncateText(hotel?.title, 32)}
                      </h3>
                    </Link>

                    <div className="flex"></div>
                    <div className="flex text-yellow-400">
                      {hotel?.review_data?.score_total && (
                        <StarRates
                          rating={Number(hotel?.review_data?.score_total)}
                        />
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-2 text-sm text-blue-600 mt-2">
                    {hotel?.service_including ? (
                      hotel?.service_including.map((service, index) => (
                        <div key={index} className="flex md:gap-2 gap-1 items-center">
                          <span className="text-sm text-dark">{service}</span>
                        </div>
                      ))
                    ) : (
                      <div>
                        <span className="font-inter font-medium">
                          {hotel?.address}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </CardHeader>

              <div className="bottom-area md:px-5 px-3 md:pb-4 pb-3 mt-2">
                <div className="flex md:flex-row flex-col items-center justify-between h-[70px]">
                  <div className="text-primary-dark w-full">
                    <span className="font-medium text-sm">One Night From</span>
                    <div className="flex items-end gap-1">
                      <span className="font-bold md:text-xl text-md md:leading-[22px] leading-[16px] text-dark">
                        <DiscountPriceBadge sellPrice={sellPrice} comparePrice={comparePrice} hideLabel />
                      </span>
                      <span className="text-sm">Per person</span>
                    </div>
                  </div>

                  <div className="flex gap-2 items-center justify-between md:justify-end w-full">
                    <div className="text-dark">
                      <h4 className="font-semibold text-base">
                        {String(hotel?.review_data?.score_total)}
                      </h4>
                      <p className="text-sm">
                        {hotel?.review_data?.total_review} reviews
                      </p>
                    </div>
                    <p className="bg-info rounded-sm px-2 py-2 text-white text-sm">
                      {hotel?.review_data?.score_text}
                    </p>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        )})
        }
      </Slider >
    </div >
  );
}
