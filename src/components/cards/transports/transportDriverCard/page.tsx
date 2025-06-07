"use client";
import React, { useState } from "react";
import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useSearchParams } from "next/navigation";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import { formatPrice } from "@/lib/utils";
import "yet-another-react-lightbox/styles.css"; // Lightbox Styles
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { CheckCircle } from "lucide-react";
interface Chauffeur {
  id: string | number;
  title: string;
  image_url: string;
  slug: string;
  meta: {
    person_types: any[];
  };
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

const TransportDriverCard = ({ data }: any) => {

  const searchParams = useSearchParams();
  const queryString = searchParams.toString();

  // Lightbox State
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Open Lightbox with Selected Image
  const handleImageClick = (index: any) => {
    setCurrentIndex(index);
    setLightboxOpen(true);
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
    arrows: false, // Enable arrows
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

  return (
    <div className="w-full">
      <Slider {...settings} className="cardrive-arrows">
        {data?.map((chauffeur: Chauffeur, index: number) => (
          <div key={index} className="px-2">
            <Card className="bg-white rounded-[10px] shadow-none border">
              <div className="relative w-full h-36 md:h-[280px] sm:h-48 cursor-pointer"
                onClick={() => handleImageClick(index)}>
                <Image
                  src={chauffeur?.image_url}
                  alt={chauffeur?.title}
                  fill
                  className="object-cover rounded-[10px]"
                  priority
                />
              </div>
              <CardHeader className="md:ps-5 ps-2 md:mt-6 mt-3 md:mb-2.5 mb-2">
                <CardTitle className="font-inter font-semibold md:text-xl text-[14px] leading-[15px] md:leading-7">
                  {chauffeur?.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="md:px-5 px-2 pb-3">
                <div className="md:space-y-2.5 space-y-1.5">
                  {chauffeur?.meta?.person_types?.slice(0, 4).map((option: any, idx: number) => (
                    <div key={idx} className="border md:rounded-lg rounded-md md:py-3 py-1.5 hover:bg-gray-50 transition-colors flex flex-col justify-center">
                      <div className="flex items-center justify-between px-4">
                        <div className="flex items-center gap-1 font-inter font-semibold text-sm leading-6 text-dark">
                          <p className='md:text-[15px] md:leading-6 text-[10px] leading-3'>{option?.name}</p>
                          {option?.note && <p className='md:text-[15px] md:leading-6 leading-3 text-[10px]'>({option?.note})</p>}
                        </div>
                        <p className="font-inter md:text-[15px] md:leading-6 leading-3 text-[10px] font-semibold">
                          {formatPrice(Number(option?.price || 0))}
                        </p>
                      </div>
                    </div>
                  ))}
                  <Link href={`/chauffeur/${chauffeur?.slug}?${queryString}`}>
                    <Button variant={"primary"} className="w-full md:py-6 py-3 font-bold mt-4">
                      <CheckCircle size={12} color="#fff" />
                      Book now
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        ))}
      </Slider>

      {/* Lightbox Component */}
      {lightboxOpen && (
        <Lightbox
          open={lightboxOpen}
          close={() => setLightboxOpen(false)}
          slides={data.map((transport: any) => ({
            src: transport.image_url,
            title: transport.title,
          }))}
          index={currentIndex}
        />
      )}

      {/* Custom Slick Dots Styling */}
      <style jsx global>{`
                .private-chauffeur .slick-dots {
                    bottom: 0px;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    gap: 0px;
                }

                .private-chauffeur .slick-dots li button:before {
                    font-size: 12px;
                    color: #6B7280;
                    transition: all 0.3s ease-in-out;
                    border-radius: 50%;
                }

                .slick-slider.private-chauffeur.slick-initialized{
                    height: 625px !important;
                }

                .private-chauffeur .slick-dots li.slick-active button:before {
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
                    .private-chauffeur .slick-dots {
                        bottom: 0px;
                        position: relative;
                        top: -75px;
                    }

                    .slick-slider.private-chauffeur.slick-initialized{
                        height: 100% !important;
                    }
                }

                /* Media Query for mobile */
                @media (max-width: 575px) {
                    .private-chauffeur .slick-dots {
                        bottom: 0px;
                        position: relative;
                        top: 0px;
                        margin-top: 5px;
                    }

                    .private-chauffeur .slick-dots li button:before {
                        font-size: 10px;
                    }

                    .private-chauffeur .slick-dots li.slick-active button:before {
                        border: 1px solid #4e76f4;
                    }
                }

                /* Media Query for extra small screens */
                @media (max-width: 390px) {
                    .private-chauffeur .slick-list {
                        height: 100% !important;
                    }
                }
            `}</style>
    </div>
  );
};

export default TransportDriverCard;
