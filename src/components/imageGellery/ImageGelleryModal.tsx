"use client";

import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Review } from "@/types/review";
import { TourReviewList } from "@/types/tourTypes";
import { X } from "lucide-react";
import Image from "next/image";
import RatingStar from "../rating-star";
import { useState } from "react";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import ImageGalleryModalSingle from "./ImageGalleryModalSingle";

interface GalleryModalProps {
  open: boolean;
  onClose: () => void;
  hotelName: string;
  star_rate: number;
  review_score: number;
  reviewCount: number;
  images: {
    hotelUploads: { large: string; thumb: string }[];
    userUploads: { large: string; thumb: string }[];
  };
  reviews: Review[];
}

export function ImageGalleryModal({
  open,
  onClose,
  hotelName,
  star_rate,
  review_score,
  images,
  reviews,
  reviewCount,
}: GalleryModalProps) {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-[90vw] rounded-lg h-[95vh] overflow-y-auto p-0 flex xl:flex-row flex-col">
        <DialogTitle className="text-lg font-semibold p-4 hidden"></DialogTitle>

        {/* Left Section with Gallery */}
        <div className="flex-1 flex flex-col">
          <div className="flex-1 overflow-y-auto p-4">
            <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4">
              {images.hotelUploads.map((image, index) => (
                <div key={index} className="break-inside-avoid">
                  <Image
                    width={800}
                    height={600}
                    src={image.large || "/placeholder.svg"}
                    alt={`Image ${index}`}
                    className="w-full rounded-lg cursor-pointer"
                    onClick={() => {
                      setLightboxIndex(index);
                      setLightboxOpen(true);
                    }}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Sidebar */}
        <div className="xl:w-[400px] w-full border-l flex flex-col bg-white">
          <div className="p-6 border-b">
            <h2 className="text-xl font-semibold mb-2">{hotelName}</h2>
            <div className="flex items-center gap-2">
              <div className="flex">
                <RatingStar reviewScore={star_rate ?? 0} />
              </div>
              <span className="bg-blue-600 text-white px-2 py-0.5 rounded text-sm">
                {review_score}
              </span>
              <span className="text-sm text-gray-600">
                {reviewCount} Reviews
              </span>
            </div>
          </div>

          {/* Scrollable Reviews Section */}
          <div className="flex-1 overflow-y-auto p-6">
            <h3 className="font-semibold mb-6">Guests who stayed here loved</h3>
            <div className="space-y-6">
              {reviews.map((review, index) => (
                <div key={index} className="space-y-3 border-b pb-3">
                  <div className="">
                    <span className="text-base font-bold text-black">
                      {review?.author
                        ? `${review.author.first_name ?? ""} ${
                            review.author.last_name ?? ""
                          }`.trim()
                        : review?.user_name ?? "Anonymous"}
                    </span>
                    <p className="text-sm text-gray-600">{review.title}</p>
                  </div>
                  <p className="text-sm text-gray-600">{review.content}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </DialogContent>

      {/* Lightbox for Fullscreen Image Gallery */}

      <ImageGalleryModalSingle
        open={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        hotelName={hotelName}
        star_rate={star_rate}
        review_score={review_score}
        reviewCount={reviewCount}
        images={images}
        reviews={reviews}
      />
    </Dialog>
  );
}
