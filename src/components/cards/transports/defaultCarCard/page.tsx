"use client"
import React from 'react'
import Image from "next/image"
import Slider from "react-slick"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
import useFeaturedCards from '@/lib/hooks/useFeaturedData'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { formatPrice } from '@/lib/utils'

interface PriceOption {
    duration: string
    price: number
    note?: string
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



const DefaultCarCard = () => {
    const priceOptions: PriceOption[] = [
        { duration: "Hourly Price", price: 100, note: "Minimum 3 Hours" },
        { duration: "Half Day", price: 200, note: "4-5 Hours" },
        { duration: "Full Day", price: 300, note: "10 Hours" },
        { duration: "Transfer", price: 150 },
    ]
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
    const { featuredCards, loading, error } = useFeaturedCards("transport");
    const searchParams = useSearchParams();
    const queryString = searchParams.toString();

    return (
        <div className="w-full mx-auto">
            <Slider {...settings} className="private-chauffeurarrows">
                {featuredCards.map((transport) => (
                    <Link
                        href={`/cars/${transport?.slug}?${queryString}`}
                        key={transport?.id} className="px-2"
                    >
                        <Card className="bg-white rounded-[10px] shadow-none border">
                            <div className="relative w-full h-36 md:h-[280px] sm:h-48">
                                <Image
                                    src={transport?.image_url}
                                    alt={transport?.title}
                                    fill
                                    className="object-cover rounded-[10px]"
                                    priority
                                />
                            </div>
                            <CardHeader className="md:ps-5 ps-2 md:mt-6 mt-3 md:mb-2.5 mb-2">
                                <CardTitle className="font-inter font-semibold md:text-xl text-[14px] leading-[15px] md:leading-7">
                                    {transport?.title}
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="md:px-5 px-2 pb-3">
                                <div className="md:space-y-2.5 space-y-1.5">
                                    {transport?.service_including ?
                                        (transport?.service_including.map((service, index) => (
                                            <div key={index} className="border md:rounded-lg rounded-md md:py-3 py-1.5 hover:bg-gray-50 transition-colors flex flex-col justify-center">
                                                <div className="flex items-center justify-between px-4">
                                                    <div className="flex items-center gap-1 font-inter font-semibold text-sm leading-6 text-dark">
                                                        <p className='md:text-[15px] md:leading-6 text-[10px] leading-3'>{service}</p>

                                                    </div>
                                                </div>
                                            </div>
                                        )))
                                        :
                                        priceOptions.map((option, idx) => (
                                            <div key={idx} className="border md:rounded-lg rounded-md md:py-3 py-1.5 hover:bg-gray-50 transition-colors flex flex-col justify-center">
                                                <div className="flex items-center justify-between px-4">
                                                    <div className="flex items-center gap-1 font-inter font-semibold text-sm leading-6 text-dark">
                                                        <p className='md:text-[15px] md:leading-6 text-[10px] leading-3'>{option?.duration}</p>
                                                        {option?.note && <p className='md:text-[15px] md:leading-6 leading-3 text-[10px]'>({option?.note})</p>}
                                                    </div>
                                                    <p className="font-inter md:text-[15px] md:leading-6 leading-3 text-[10px] font-semibold">
                                                        {formatPrice(Number(option?.price || 0))}
                                                    </p>
                                                </div>
                                            </div>
                                        ))
                                    }
                                </div>
                            </CardContent>
                        </Card>
                    </Link>
                ))}
            </Slider>

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
    )
}

export default DefaultCarCard
