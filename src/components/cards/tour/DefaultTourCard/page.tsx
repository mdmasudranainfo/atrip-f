"use client";
import Image from "next/image";
import Slider from "react-slick";
import { Hotel as HotelIcon, MapPin, Car, Utensils } from "lucide-react";
import { Card, CardHeader } from "@/components/ui/card";
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

export default function DefaultTourCardSlider() {
    const { featuredCards, loading, error } = useFeaturedCards("tour");
    const searchParams = useSearchParams();
    const queryString = searchParams.toString();

    const features: TravelFeature[] = [
        { icon: <HotelIcon className="md:w-5 w-4 md:h-5 h-4" />, label: "Hotel" },
        { icon: <MapPin className="md:w-5 w-4 md:h-5 h-4" />, label: "Sightseeing" },
        { icon: <Car className="md:w-5 w-4 md:h-5 h-4" />, label: "Transfer" },
        { icon: <Utensils className="md:w-5 w-4 md:h-5 h-4" />, label: "Meals" },
    ];

    const showSlider = featuredCards.length > 0;

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
        arrows: showSlider, // Show arrows only if API returns data
        nextArrow: showSlider ? <CustomNextArrow /> : undefined,
        prevArrow: showSlider ? <CustomPrevArrow /> : undefined,
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
                    arrows: false,
                },
            },
        ],
    };

    if (loading) {
        return <p className="text-center w-full ">Loading tours...</p>;
    }

    if (error || !showSlider) {
        return <p className="text-center w-full ">No featured tours available.</p>;
    }

    return (
        <div className="w-full">
            <Slider {...settings} className="vacation-arrows">
                {featuredCards.map((tour) => {

                    const sellPrice = getSellPrice(tour.price, tour.sale_price)
                    
                    return (
                    <div key={tour?.id} className="px-2">
                        <Card className="w-full overflow-hidden bg-white rounded-[10px] shadow-none border">
                            {/* Image */}
                            <div className="relative w-full h-36 md:h-[280px] sm:h-48">
                                <Link href="#" >
                                    <Image
                                        src={tour?.image_url || "/placeholder.svg"}
                                        alt={tour?.title}
                                        fill
                                        className="object-cover rounded-[10px]"
                                        priority
                                    />
                                </Link>
                            </div>

                            {/* Card Content */}
                            <div className="md:pt-2 pt-1 md:px-5 px-3 text-dark">
                                <div className="md:mb-1 mb-0">
                                    <span className="font-inter font-semibold md:text-sm text-[12px] leading-3 md:leading-5 text-success-light">
                                        Recommended - Family with kids
                                    </span>
                                </div>

                                <CardHeader>
                                    {/* <Link href={`/tour/${tour?.slug}?${queryString}`} > */}
                                    <Link href="tour">
                                        <h3 className="hover:underline slick-item-title font-inter font-semibold md:text-lg text-[14px] md:leading-7 leading-3 text-dark">
                                            {tour?.title}
                                        </h3>
                                    </Link>

                                    {/* Features */}
                                    <div className="flex flex-wrap md:gap-4 gap-2 mt-2">
                                        {tour?.service_including
                                            ? tour?.service_including.map((service, index) => (
                                                <div key={index} className="flex md:gap-2 gap-1 items-center">
                                                    <span className="text-sm text-dark">{service}</span>
                                                </div>
                                            ))
                                            : features.map((feature, index) => (
                                                <div key={index} className="flex md:gap-2 gap-1 items-center">
                                                    {feature.icon}
                                                    <span className="text-sm text-dark">{feature.label}</span>
                                                </div>
                                            ))}
                                    </div>
                                </CardHeader>
                            </div>

                            {/* Footer */}
                            <div className="bottom-area md:px-5 px-3 md:pb-1 pb-3 mt-2">
                                <div className="flex md:flex-row flex-col items-center justify-between h-[70px]">
                                    <div className="text-primary-dark w-full">
                                        <span className="font-medium text-sm">One Night From</span>
                                        <div className="flex items-end gap-1">
                                            <span className="font-bold md:text-xl text-md md:leading-[22px] leading-[16px] text-dark">
                                                {formatPrice(sellPrice)}
                                            </span>
                                            <span className="text-sm">Per person</span>
                                        </div>
                                    </div>

                                    <div className="flex gap-2 items-center justify-between md:justify-end w-full">
                                        <div className="text-dark">
                                            <h4 className="font-semibold text-base">{tour?.review_data?.score_text}</h4>
                                            <p className="text-sm">{tour?.review_data?.total_review} reviews</p>
                                        </div>
                                        <p className="bg-info rounded-sm px-2 py-2 text-white text-sm">
                                            {String(tour?.review_data?.score_total)}
                                        </p>
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
