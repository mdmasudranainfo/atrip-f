"use client";
import Image from "next/image";
import { Clock, CreditCard } from "lucide-react";
import { Card, CardHeader } from "@/components/ui/card";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import useFeaturedCards, { VisaDataType } from "@/lib/hooks/useFeaturedData";
import { useEffect, useState } from "react";
import { getFeaturedCards } from "@/lib/actions/landing-actions";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { formatPrice, getSellPrice } from "@/lib/utils";

interface ArrowProps {
  className?: string;
  style?: React.CSSProperties;
  onClick?: () => void;
}
export default function DefaultVisaCard() {
  const [visaFeaturedCards, setVisaFeaturedCards] = useState<VisaDataType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchFeaturedCards = async () => {
      try {
        const result = await getFeaturedCards('visa');
        if (result?.data) {
          setVisaFeaturedCards(result.data);
        } else {
          setError('Failed to load featured cards.');
        }
      } catch (err) {
        setError('An error occurred while fetching featured cards.');
      } finally {
        setLoading(false);
      }
    };

    fetchFeaturedCards();
  }, []);

  const searchParams = useSearchParams();
  const queryString = searchParams.toString();


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
  if (loading) {
    return <div className="text-center py-8">Loading...</div>;
  }

  if (error) {
    return <div className="text-center py-8 text-red-500">{error}</div>;
  }

  return (
    <div className="w-full mx-auto">
      {/* Wrap the cards in the Slider component */}
      <Slider {...settings} className="visa-arrows">
        {visaFeaturedCards.map((card) => {
          const sellPrice = getSellPrice(card.price, card.sale_price)
          return (
          <div key={card?.id} className="px-2">
            <Card className="bg-white rounded-[10px] shadow-none border">
              <div className="relative w-full h-36 md:h-[280px] sm:h-48">
                <Link href="#" className="px-2">
                  <Image
                    src={card?.image_url}
                    alt={card?.title}
                    fill
                    className="object-cover rounded-[10px]"
                    priority
                  />
                </Link>
              </div>
              <div className="md:pt-6 pt-0 md:px-5 px-3 pb-3">
                <div className="mb-0">
                  <span className="font-inter font-semibold md:text-sm text-[12px] leading-3 md:leading-5 text-success-light">
                    Approval guarantee
                  </span>
                </div>
                <CardHeader className=" md:mt-2 mt-2 md:mb-2.5 mb-2 text-dark">
                  {/* <Link href={`/visa/${card?.slug}?${queryString}`} className="px-2"> */}
                  <Link href="visa" className="px-2">
                    <h3 className="hover:underline font-inter font-semibold md:text-xl text-[14px] leading-[15px] md:leading-7">
                      {card?.title}
                    </h3>
                  </Link>
                  {/* Features */}
                  <div className="md:p-0 flex flex-col flex-wrap md:gap-3 gap-1 mt-1 sm:mt-2">
                    <div className="flex items-start gap-2">
                      <Clock className="md:w-5 w-4 md:h-5 h-4" />
                      <p className="font-inter font-medium text-sm leading-6 text-dark">Normal {card?.working_day} working days</p>
                    </div>
                    <div className="flex items-start gap-2">
                      <Clock className="md:w-5 w-4 md:h-5 h-4" />
                      <p className="font-inter font-medium text-sm leading-6 text-dark">Express {card?.express_working_day} working days</p>
                    </div>
                    <div className="flex items-start gap-2">
                      <CreditCard className="md:w-5 w-4 md:h-5 h-4" />
                      <p className="font-inter font-medium text-sm leading-6 text-dark">Online payment option available</p>
                    </div>
                  </div>
                </CardHeader>
                <div className="md:pb-4 pb-3 md:mt-[36px] mt-2">
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
                        <h4 className="font-semibold text-base">
                          {card?.review_data?.score_text}
                        </h4>
                        <p className="text-sm">{card?.review_score} reviews</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        )})}
      </Slider>
    </div>
  );
}
