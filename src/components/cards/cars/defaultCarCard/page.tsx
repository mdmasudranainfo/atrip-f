"use client";
import React from "react";
import Image from "next/image";
import Slider from "react-slick";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { CheckCircle } from "lucide-react";
import { formatPrice } from "@/lib/utils";
import { getFeaturedCards } from "@/lib/actions/landing-actions";

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

const CustomPrevArrow: React.FC<ArrowProps> = ({ onClick }) => (
    <div
        className="absolute h-8 w-8 bg-white flex justify-center items-center rounded-full shadow top-[52%] left-0 transform -translate-y-1/2 z-10 cursor-pointer"
        onClick={onClick}
    >
        <FaChevronLeft size={22} className="text-primary-dark" />
    </div>
);

const CustomNextArrow: React.FC<ArrowProps> = ({ onClick }) => (
    <div
        className="absolute h-8 w-8 bg-white flex justify-center items-center rounded-full shadow top-[52%] right-0 transform -translate-y-1/2 z-10 cursor-pointer"
        onClick={onClick}
    >
        <FaChevronRight size={22} className="text-primary-dark" />
    </div>
);

const DefaultCarCard = ({ path }: any) => {
    const [chauffeurFeaturedCards, setChauffeurFeaturedCards] = useState<Chauffeur[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchFeaturedCards = async () => {
            try {
                const result = await getFeaturedCards(path);
                if (result?.data) {
                    setChauffeurFeaturedCards(result.data);
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
    }, []);;


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
        return <div className="text-center py-8">Loading Chauffeur...</div>;
    }

    return (
        <div className="w-full mx-auto">
            {chauffeurFeaturedCards?.length > 0 && (
                <Slider {...settings} className="cardrive-arrows">
                    {chauffeurFeaturedCards.map((chauffeur: Chauffeur, index: number) => (
                        <div key={index} className="px-2">
                            <Card className="bg-white rounded-[10px] shadow-none border">
                                <div className="relative w-full h-36 md:h-[280px] sm:h-48 cursor-pointer">
                                    <Link href={`#`}>
                                        <Image
                                            src={chauffeur?.image_url}
                                            alt={chauffeur?.title}
                                            fill
                                            className="object-cover rounded-[10px]"
                                            priority
                                        />
                                    </Link>
                                </div>
                                <CardHeader className="md:ps-5 ps-2 md:mt-6 mt-3 md:mb-2.5 mb-2">
                                    <Link href={path}>
                                        <CardTitle className="hover:underline cursor-pointer font-inter font-semibold md:text-xl text-[14px] leading-[15px] md:leading-7">
                                            {chauffeur?.title}
                                        </CardTitle>
                                    </Link>
                                </CardHeader>
                                <CardContent className="md:px-5 px-2 pb-5">
                                    <div className="md:space-y-2.5 space-y-1.5">
                                        {chauffeur?.meta?.person_types?.slice(0, 4).map((option: any, idx: number) => (
                                            <div
                                                key={idx}
                                                className="border md:rounded-lg rounded-md md:py-3 py-1.5 hover:bg-gray-50 transition-colors flex flex-col justify-center"
                                            >
                                                <div className="flex items-center justify-between px-4">
                                                    <div className="flex items-center gap-1 font-inter font-semibold text-sm leading-6 text-dark">
                                                        <p className="md:text-[15px] md:leading-6 text-[10px] leading-3">
                                                            {option?.name}
                                                        </p>
                                                        {option?.note && (
                                                            <p className="md:text-[15px] md:leading-6 leading-3 text-[10px]">
                                                                ({option?.note})
                                                            </p>
                                                        )}
                                                    </div>
                                                    <p className="font-inter md:text-[15px] md:leading-6 leading-3 text-[10px] font-semibold">
                                                        {formatPrice(Number(option?.price || 0))}
                                                    </p>
                                                </div>
                                            </div>
                                        ))}
                                        <Link href={`/${path}/${chauffeur?.slug}`}>
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
            )}
        </div>
    );
};

export default DefaultCarCard;
