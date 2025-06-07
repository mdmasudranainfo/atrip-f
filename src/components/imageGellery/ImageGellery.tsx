"use client";

import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import Image from "next/image";
import { ImageGalleryModal } from "./ImageGelleryModal";
import { useState } from "react";

import { TourReviewList } from "@/types/tourTypes";
import { Review } from "@/types/review";
import MobilePhototSlider from "./MobilePhototSlider";
import { EventRow } from "@/types/activity";

interface ImageGalleryProps {
  data: any;
  images: any;
  title: string;
  star_rate: number;
  review_score: number;
  alt: string;
  reviews: Review[];
  review_count: number;
  reviewList?: TourReviewList;
}

export function ImageGallery({
  data,
  images,
  title,
  review_score,
  star_rate,
  alt,
  reviews,
  review_count,
  reviewList,
}: ImageGalleryProps) {
  const [showGallery, setShowGallery] = useState(false);
  const [OpenLightbox, setOpenLightbox] = useState(false);

  return (
    <>
      <div className="md:hidden block">
        <MobilePhototSlider
          data={data}
          slides={images}
          showGallery={showGallery}
          setShowGallery={setShowGallery}
        />
      </div>
      <div className="container mx-auto">
        {/* Image Gallery */}

        {/* grid */}
        <div className="md:grid hidden  grid-cols-1 md:grid-cols-2 gap-2">
          <div className="md:col-span-1 aspect-[4/3] overflow-hidden rounded-lg">
            {images?.length !== 0 && (
              <Image
                src={images[0]?.large}
                alt={alt}
                className="w-full h-full object-cover cursor-pointer"
                width={800}
                height={600}
                onClick={() => setShowGallery(true)}
              />
            )}
          </div>
          <div className="grid grid-cols-2 gap-2">
            {images?.length !== 0 &&
              images?.slice(1, 5).map((image: any, index: number) => (
                <div
                  key={index}
                  className="relative aspect-[4/3] overflow-hidden rounded-lg"
                >
                  <Image
                    src={image?.large || "/placeholder.svg"}
                    alt={alt}
                    className="w-full h-full object-cover cursor-pointer"
                    width={800}
                    height={600}
                    onClick={() => setShowGallery(true)}
                  />
                  {index === 3 && (
                    <div
                      onClick={() => setShowGallery(true)}
                      className="absolute inset-0 bg-black/50 flex items-center justify-center cursor-pointer"
                    >
                      <div className="text-white text-center">
                        <div className="flex items-center justify-center mb-1">
                          <div className="w-6 h-6 border-2 border-white rounded-lg flex items-center justify-center">
                            <div className="w-3 h-3 bg-white rounded-sm" />
                          </div>
                        </div>
                        <span className="text-sm">
                          See All
                          {images?.length > 5 ? ` ${images?.length}` : ""}{" "}
                          Photos
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              ))}
          </div>
        </div>
        <ImageGalleryModal
          open={showGallery}
          onClose={() => setShowGallery(false)}
          hotelName={title}
          star_rate={star_rate}
          review_score={review_score}
          reviewCount={review_count}
          images={{
            hotelUploads: images,
            userUploads: images,
          }}
          reviews={reviews}
        />
      </div>
    </>
  );
}
