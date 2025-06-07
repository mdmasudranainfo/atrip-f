"use client";

import Image from "next/image";
import { Hotel, MapPin, Car } from "lucide-react";
import { Card, CardHeader } from "@/components/ui/card";
import Slider from "react-slick"; // Import Slider component
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import useFeaturedCards from "@/lib/hooks/useFeaturedData";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { formatPrice, getSellPrice } from "@/lib/utils";

interface TravelFeature {
  icon: React.ReactNode;
  label: string;
}

interface ReviewScore {
  title: string;
  total: number;
  percent: number;
}

interface ReviewData {
  score_total: string;
  score_text: string;
  total_review: number;
  rate_score: {
    [key: number]: ReviewScore; // Mapping for score (1-5)
  };
}

interface TourCard {
  id: number;
  title: string;
  slug: string;
  address: string;
  map_lat: string;
  map_lng: string;
  map_zoom: number;
  price: string;
  duration: number;
  service_including: string | null;
  image_url: string;
  review_data: ReviewData;
}

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

export default function DefaultUmrahCard() {
  const features: TravelFeature[] = [
    { icon: <Hotel className="md:w-5 w-4 md:h-5 h-4" />, label: "Hotel" },
    { icon: <MapPin className="md:w-5 w-4 md:h-5 h-4" />, label: "Meals" },
    { icon: <Car className="md:w-5 w-4 md:h-5 h-4" />, label: "Flights" },
    { icon: <Car className="md:w-5 w-4 md:h-5 h-4" />, label: "Transfer" },
  ];

  const { featuredCards, loading, error } = useFeaturedCards("umrah");

  const searchParams = useSearchParams();
  const queryString = searchParams.toString();

  // Slick Slider settings
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
          arrows: false, // Enable arrows
        },
      },
    ],
  };

  // Conditionally render based on loading and error states
  if (loading) return <div className="text-center py-8">Loading...</div>;
  if (error) return <div className="text-center py-8 text-red-500">{error}</div>;

  return (
    <div className="w-full">
      {/* Conditionally render the Slider only if data is available */}
      {featuredCards.length > 0 ? (
        <Slider {...settings} className="umrahh-arrows">
          {featuredCards.map((umrah, index) => {
            const sellPrice = getSellPrice(umrah.price, umrah.sale_price)
            return (
            <div key={index} className="px-2">
              <Card
                key={index}
                className="overflow-hidden bg-white rounded-[10px] shadow-none border"
              >
                <div className="relative w-full h-36 md:h-[280px] sm:h-48">
                  <Link href="#" className="px-2">
                    <Image
                      src={umrah?.image_url && umrah?.image_url.startsWith("http") ? umrah.image_url : "/placeholder.svg"}
                      alt={umrah?.title || "Umrah Image"}
                      fill
                      className="object-cover rounded-[10px]"
                      priority
                    />
                  </Link>
                </div>
                <div className="md:pt-6 pt-0 md:px-5 px-3 text-dark">
                  <div className="mb-1">
                    <span className="font-inter font-semibold md:text-sm text-[12px] leading-3 md:leading-5 text-success-light">
                      Recommended
                    </span>
                  </div>
                  <CardHeader>
                    {/* <Link href={`/umrah/${umrah?.slug}?${queryString}`} className="px-2"> */}
                    <Link href="umrah" className="px-2">
                      <h3 className="hover:underline slick-item-title font-inter font-semibold md:text-lg text-[14px] md:leading-7 leading-3 text-dark">
                        {umrah?.title}
                      </h3>
                    </Link>
                    <div className="flex flex-wrap md:gap-4 gap-1 mt-2">
                      {umrah?.service_including
                        ? umrah?.service_including.map((service, index) => (
                          <div key={index} className="flex md:gap-2 gap-1 items-center">
                            <span className="text-sm text-dark">{service}</span>
                          </div>
                        ))
                        : features.map((feature, index) => (
                          <div key={index} className="flex md:gap-2 gap-1 items-center">
                            {feature?.icon}
                            <span className="text-sm text-dark">{feature?.label}</span>
                          </div>
                        ))}
                    </div>
                  </CardHeader>
                </div>
                {/* Footer */}
                <div className="bottom-area md:px-5 px-3 md:pb-4 pb-3 mt-2">
                  <div className="flex md:flex-row flex-col items-center justify-between h-[70px]">
                    <div className="text-primary-dark w-full">
                      <span className="font-medium text-sm">From</span>
                      <div className="flex items-end gap-1">
                        <span className="font-bold md:text-xl text-md md:leading-[22px] leading-[16px] text-dark">
                          {formatPrice(sellPrice)}
                        </span>
                        <span className="text-sm">Per person</span>
                      </div>
                    </div>

                    <div className="flex gap-2 items-center justify-between md:justify-end w-full">
                      <div className="text-dark">
                        <h4 className="font-semibold text-base">{umrah?.review_data?.score_text}</h4>
                        <p className="text-sm">{umrah?.review_data?.total_review} reviews</p>
                      </div>
                      <p className="bg-info rounded-sm px-2 py-2 text-white text-sm">
                        {String(umrah?.review_data?.score_total)}
                      </p>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          )})}
        </Slider>
      ) : (
        <div className="text-center py-8">No featured umrah cards available.</div>
      )}
    </div>
  );
}
