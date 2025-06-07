"use client"
import Image from 'next/image'
import React from 'react'
import Slider from "react-slick"
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"

const Brands = () => {

    // Slick Slider settings
    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 5, // Show 3 cards on desktop
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000,
        centerMode: false, // Disabled on desktop
        arrows: false,
        responsive: [
            {
                breakpoint: 1024, // Medium screens (Tablets)
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    centerMode: true,
                    centerPadding: "10%", // Adjust as needed for medium screens
                },
            },
            {
                breakpoint: 768, // Mobile screens
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    centerMode: true,
                    centerPadding: "10%", // Show 20% of the next card on the right
                },
            },
        ],
    }

    const brandLogos = [
        "/images/brands/flyDubai.png",
        "/images/brands/gulfAir.png",
        "/images/brands/airWays.png",
        "/images/brands/birtishAirWays.png",
        "/images/brands/emirates.png",
        "/images/brands/airWays.png",
    ]

    return (
        <Slider {...settings} className="private-brand">
            {brandLogos.map((logo, index) => (
                <div key={index} className="px-2">
                    <div className='w-[170px] md:w-[200px] md:p-5 pb-0 md:mb-0 mb-0 rounded-md'>
                        <Image src={logo} width={200} height={100} alt='brand logo' className='w-full' />
                    </div>
                </div>
            ))}
        </Slider>
    )
}

export default Brands
