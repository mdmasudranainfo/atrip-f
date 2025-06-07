"use client";
import Image from "next/image";
import Slider from "react-slick";
import { Users, Briefcase, DoorOpen, Wind, Fuel, Cog } from "lucide-react";
import { Card, CardHeader } from "@/components/ui/card";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import useFeaturedCards from "@/lib/hooks/useFeaturedData";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { formatPrice } from "@/lib/utils";

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

export default function RentalCarCard({ cardItemNumber }: { cardItemNumber: number }) {
  const { featuredCards, loading, error } = useFeaturedCards("car");
  const searchParams = useSearchParams();
  const queryString = searchParams.toString();

  const specifications = [
    { icon: <Users className="md:w-5 w-4 md:h-5 h-4" />, text: "5 Seats" },
    { icon: <Briefcase className="md:w-5 w-4 md:h-5 h-4" />, text: "Luggage x 4" },
    { icon: <DoorOpen className="md:w-5 w-4 md:h-5 h-4" />, text: "4 Doors" },
    { icon: <Wind className="md:w-5 w-4 md:h-5 h-4" />, text: "AC" },
    { icon: <Fuel className="md:w-5 w-4 md:h-5 h-4" />, text: "Gasoline" },
    { icon: <Cog className="md:w-5 w-4 md:h-5 h-4" />, text: "Automatic" },
  ];

  // Slick slider settings
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: cardItemNumber,
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

  if (loading) return <p className="text-center">Loading...</p>;
  if (error) return <p className="text-center">Error loading cars.</p>;

  return (
    <div className="w-full">
      {featuredCards && featuredCards.length > 0 ? (
        <Slider {...settings} className="rantal-arrows">
          {featuredCards.map((car) => (
            <div key={car?.id} className="px-2">
              <Card className="w-full overflow-hidden bg-white rounded-[10px] shadow-none border">
                {/* Image */}
                <div className="relative w-full h-36 md:h-[280px] sm:h-48">
                  <Link href="cars" >
                    <Image
                      src={car?.image_url || "/fallback-image.jpg"}
                      alt={car?.title || "Car"}
                      fill
                      className={`${cardItemNumber === 4 ? '' : 'object-cover'} rounded-[10px]`}
                      priority
                    />
                  </Link>
                </div>

                {/* Card Content */}
                <div className="md:pt-6 pt-1 md:px-5 px-3 text-dark">
                  <div className="md:mb-1 mb-0">
                    <span className="font-inter font-semibold md:text-sm text-[12px] leading-3 md:leading-5 text-success-light">
                      Best Price Guarantee
                    </span>
                  </div>
                  <CardHeader>
                    {/* <Link href={`/cars/${car?.slug}?${queryString}`} > */}
                    <Link href="cars" >
                      <h3 className="hover:underline slick-item-title font-inter font-semibold md:text-lg text-[14px] md:leading-7 leading-3 text-dark">
                        {car?.title || "Unknown Car"}
                      </h3>
                    </Link>
                    {/* Specifications */}
                    <div className="specs flex flex-wrap md:gap-4 gap-2 mt-2">
                      {
                        car?.service_including ?
                          (car?.service_including.map((service, index) => (
                            <div key={index} className="flex md:gap-2 gap-1 items-center">
                              <span className="text-sm text-dark">{service}</span>
                            </div>
                          )))
                          :
                          specifications?.map((feature, index) => (
                            <div key={index} className="flex md:gap-2 gap-1 items-center">
                              {feature?.icon}
                              <span className="text-sm text-dark">{feature?.text}</span>
                            </div>
                          ))
                      }
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
                          {formatPrice(Number(car?.price || 0))}
                        </span>
                        <span className="text-sm">per day</span>
                      </div>
                    </div>

                    <div className="flex gap-2 items-center justify-between md:justify-end w-full">
                      <div className="text-dark">
                        <h4 className="font-semibold text-base">{car?.review_data?.score_text}</h4>
                        <p className="text-sm">{car?.review_data?.total_review} reviews</p>
                      </div>
                      <p className="bg-info rounded-sm px-2 py-2 text-white text-sm">
                        {String(car?.review_data?.score_total)}
                      </p>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          ))}
        </Slider>
      ) : (
        <p className="text-center">No featured cars available.</p>
      )
      }

      {/* Custom Slick Dots Styling */}
      <style jsx global>{`
          .RentalCarCard .slick-dots {
              bottom: 0px;
              display: flex;
              justify-content: center;
              align-items: center;
              gap: 0px;
          }

          .RentalCarCard .slick-dots li button:before {
              font-size: 12px;
              color: #6B7280;
              transition: all 0.3s ease-in-out;
              border-radius: 50%;
          }

          .slick-slider.RentalCarCard.slick-initialized{
              height: 465px !important;
          }

          .RentalCarCard .slick-dots li.slick-active button:before {
               color: #3b82f6;
              border: 1px solid #3264ff;
              border-radius: 50%;
              display: flex;
              justify-content: center;
              margin: 0;
              padding: 0;
          }
          .slick-dots li button{
              border-radius: 50%;
          }

          /* Media Query for tablets */
          @media (max-width: 768px) {
              .RentalCarCard .slick-dots {
                  bottom: 0px;
                  position: relative;
                  top: -75px;
              }

              .slick-slider.RentalCarCard.slick-initialized{
                  height: 100% !important;
              }
          }

          /* Media Query for mobile */
          @media (max-width: 575px) {
              .RentalCarCard .slick-dots {
                  bottom: 0px;
                  position: relative;
                  top: 0px;
                  margin-top: 5px;
              }

              .RentalCarCard .slick-dots li button:before {
                  font-size: 10px;
              }

              .RentalCarCard .slick-dots li.slick-active button:before {
                  border: 1px solid #4e76f4;
              }
          }

          /* Media Query for extra small screens */
          @media (max-width: 390px) {
              .RentalCarCard .slick-list {
                  height: 100% !important;
              }
          }
      `}</style>
    </div >
  );
}
