"use client";
import { useState, useEffect } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Card } from "@/components/ui/card";
import Link from "next/link";
import Image from "next/image";
import { getCampaign } from "@/lib/actions/campaign";
import { CampaignTypes } from "@/types/campaign";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";

export default function OfferSlide() {
  const [images, setImages] = useState<CampaignTypes[]>([]);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await getCampaign();
      if (data?.length) {
        setImages(data);
      }
    };

    fetchData();
  }, []);

  const settings = {
    dots: true,
    arrows: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: false,
    autoplaySpeed: 5000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className="w-full container mx-auto rounded-2xl mt-12">
      <Slider {...settings} className="offer-slider -mx-4 rounded-2xl">
        {images?.length &&
          images.map((item: CampaignTypes, index: number) => (
            <div key={index} className="px-2 md:h-full h-full">
              <Link
                href={item.link || "#"}
                className="h-full inline-block w-full"
              >
                <Card className="md:h-full h-full w-full border-2 border-red-600 overflow-hidden !bg-transparent !shadow-none !border-none relative">
                  <Image
                    src={item.image || ""}
                    alt="Travel illustration"
                    width={500}
                    height={500}
                    className="w-full h-full cursor-pointer object-cover travel-illustration-img"
                    onClick={(e) => {
                      e.preventDefault(); // Prevent Link from triggering
                      setLightboxIndex(index);
                      setLightboxOpen(true);
                    }}
                  />
                </Card>
              </Link>
            </div>
          ))}
      </Slider>

      {/* Lightbox */}
      <Lightbox
        open={lightboxOpen}
        close={() => setLightboxOpen(false)}
        index={lightboxIndex}
        slides={images.map((item) => ({ src: item.image }))}
      />

      <style jsx global>{`
        .offer-slider .slick-dots {
          bottom: 20px;
        }
        .offer-slider .slick-dots li Button:before {
          font-size: 12px;
          color: #6b7280;
        }
        .offer-slider .slick-dots li.slick-active Button:before {
          color: #3b82f6;
          border: 1px solid #3264ff;
          border-radius: 50%;
          display: flex;
          justify-content: center;
          margin: 0;
          padding: 0;
        }

        @media (max-width: 768px) {
          .offer-slider .slick-dots {
            bottom: 0px;
            position: relative;
            top: -15px;
          }
        }

        @media (max-width: 575px) {
          .offer-slider .slick-dots {
            bottom: 0px;
            position: relative;
            top: -120px;
          }

          .offer-slider .slick-dots li Button:before {
            font-size: 10px;
          }

          .offer-slider .slick-dots li.slick-active Button:before {
            border: 1px solid #4e76f4;
          }
        }

        @media (max-width: 390px) {
          .offer-slider .slick-list {
            height: 370px !important;
          }
        }
      `}</style>
    </div>
  );
}
