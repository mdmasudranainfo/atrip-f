"use client";
import Image from "next/image";
import Slider from "react-slick";
import { TbCalendarTime } from "react-icons/tb";
import { CiMobile2 } from "react-icons/ci";
import { BsBookmarkStar, BsCalendarX, BsPhone } from "react-icons/bs";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import useFeaturedCards from "@/lib/hooks/useFeaturedData";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { formatPrice, getSellPrice } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface Feature {
  icon: React.ReactNode;
  label: string;
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

const RecommendedTransportCard = () => {
  const { featuredCards, loading, error } = useFeaturedCards("transport");

  const searchParams = useSearchParams();
  const queryString = searchParams.toString();

  if (loading) return <p className="text-center">Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;
  if (featuredCards.length === 0)
    return <p className="text-center">No recommended cards available.</p>;

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: false,
    autoplaySpeed: 3000,
    centerMode: false,
    arrows: true, // Arrows only enabled when data is present
    nextArrow: <CustomNextArrow />,
    prevArrow: <CustomPrevArrow />,
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
          arrows: false, // Hide arrows on mobile screens
        },
      },
    ],
  };

  const cardFeatures = [
    {
      icon: <BsCalendarX className="h-4 w-4 text-primary-dark md:h-5 md:w-5" />,
      label: "Free cancellation",
      value: null,
    },
    {
      icon: (
        <BsBookmarkStar className="h-4 w-4 text-primary-dark md:h-5 md:w-5" />
      ),
      label: "Instant confirmation",
      value: null,
    },
    {
      icon: <BsPhone className="h-4 w-4 text-primary-dark md:h-5 md:w-5" />,
      label: "Mobile ticket",
      value: null,
    },
    {
      icon: (
        <TbCalendarTime className="h-4 w-4 text-primary-dark md:h-5 md:w-5" />
      ),
      label: "Flexible duration",
      value: null,
    },
  ];

  return (
    <div className="w-full">
      <Slider {...settings} className="recommended-slider-left">
        {featuredCards.map((card) => {
          const sellPrice = getSellPrice(card.price, card.sale_price);

          return (
            <Link
              href={`transports/${card?.slug}`}
              key={card?.id}
              className="px-2 h-full"
            >
              <div className="w-full overflow-hidden bg-white rounded-[10px] shadow-none border h-full">
                {/* Image */}
                <div className="relative w-full h-36 md:h-[250px] sm:h-48">
                  <Image
                    src={card?.image_url}
                    alt={card?.title}
                    fill
                    className="object-cover rounded-[10px]"
                    priority
                  />
                </div>

                {/* Title and Price */}
                <div className="md:px-5 px-3 flex flex-col md:mt-6 mt-1 md:mb-2.5 mb-1">
                  {/* <span className="font-inter font-semibold md:text-sm text-[13px] md:leading-5 leading-3 text-success-light">
                    Entry Ticket
                  </span> */}
                  <span className="hover:underline  font-inter font-semibold md:text-lg text-md mt-2 md:leading-7 leading-4">
                    {card?.title}
                  </span>
                </div>

                {/* Features */}
                {/* <div className="md:p-0 md:px-5 px-3 flex flex-wrap md:gap-3 gap-1">
                  {card?.service_including
                    ? card?.service_including.map((service, index) => (
                        <div key={index} className="flex gap-2">
                          <span className="text-sm text-dark">{service}</span>
                        </div>
                      ))
                    : cardFeatures.map((feature, index) => (
                        <div
                          key={`car${index}`}
                          className="flex items-start gap-2"
                        >
                          {feature?.icon}
                          <p className="font-inter font-medium text-sm leading-6 text-dark">
                            {feature?.value
                              ? `${feature?.value} ${feature?.text}`
                              : feature?.text}
                          </p>
                        </div>
                      ))}
                </div> */}

                <p className="hidden md:block font-inter font-normal text-sm leading-6 text-dark md:px-5 px-3 mt-2  ">
                  {card?.sub_title?.length > 100
                    ? `${card.sub_title.slice(0, 100)}...`
                    : card?.sub_title}
                </p>

                <div className="grid md:grid-cols-2 md:p-0 md:px-5 px-3 flex-wrap md:gap-3 gap-1 mt-2 ">
                  {cardFeatures.map((feature, index) => (
                    <div key={`car${index}`} className="flex items-start gap-2">
                      {feature?.icon}
                      <p className="font-inter font-medium text-[12px] leading-6 text-dark">
                        {feature?.value
                          ? `${feature?.value} ${feature?.label}`
                          : feature?.label}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Footer */}
                <div className="md:px-5 px-3 md:pb-4 pb-3  mt-2">
                  <div className="flex md:flex-row flex-col items-center justify-between h-[70px]">
                    <div className="text-primary-dark w-full">
                      {/* <span className="font-medium text-sm">
                        One Night From
                      </span> */}
                      <div className="flex items-end gap-1">
                        <span className="font-bold  text-md md:leading-[22px] leading-[16px] text-dark">
                          {formatPrice(sellPrice)}
                        </span>
                        <span className="text-sm">/Per Hour</span>
                      </div>
                    </div>

                    {/* <div className="flex gap-2 items-center justify-between md:justify-end w-full">
                      <div className="text-dark">
                        <h4 className="font-semibold text-base">
                          {card?.review_data?.score_text}
                        </h4>
                        <p className="text-sm">
                          {card?.review_data?.total_review} reviews
                        </p>
                      </div>
                      <p className="bg-info rounded-sm px-2 py-2 text-white text-sm">
                        {String(card?.review_data?.score_total)}
                      </p>
                    </div> */}
                    <div className="w-full md:mt-0 mt-4">
                      <Button className="w-full md:w-auto" variant={"primary"}>
                        Check Availability
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          );
        })}
      </Slider>
    </div>
  );
};

export default RecommendedTransportCard;
