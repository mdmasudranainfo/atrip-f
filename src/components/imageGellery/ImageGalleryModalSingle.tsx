"use client";

import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Review } from "@/types/review";
import { useState, useCallback, useEffect } from "react";
import RatingStar from "../rating-star";
import Image from "next/image";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";

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

const ImageGalleryModalSingle = ({
  open,
  onClose,
  hotelName,
  star_rate,
  review_score,
  images,
  reviews,
  reviewCount,
}: GalleryModalProps) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [Autoplay()]);
  const [thumbRef, thumbApi] = useEmblaCarousel({
    containScroll: "keepSnaps",
    dragFree: true,
  });
  const [selectedIndex, setSelectedIndex] = useState(0);

  const scrollTo = useCallback(
    (index: number) => {
      emblaApi?.scrollTo(index);
    },
    [emblaApi]
  );

  useEffect(() => {
    if (!emblaApi) return;

    const onSelect = () => {
      setSelectedIndex(emblaApi.selectedScrollSnap());
      thumbApi?.scrollTo(emblaApi.selectedScrollSnap());
    };

    emblaApi.on("select", onSelect);
    onSelect();
  }, [emblaApi, thumbApi]);

  const slides = images.hotelUploads;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-[90vw] rounded-lg h-[95vh]  overflow-y-scroll p-0 flex xl:flex-row flex-col">
        <DialogTitle className="text-lg font-semibold p-4 hidden" />

        {/* Left Section */}
        <div className="flex-1 flex flex-col ">
          {/* Main Carousel */}
          <div className="p-4">
            <div className="overflow-hidden rounded-lg" ref={emblaRef}>
              <div className="flex">
                {slides.map((image, index) => (
                  <div className="min-w-full flex-shrink-0 px-2" key={index}>
                    <Image
                      width={800}
                      height={600}
                      src={image.large || "/placeholder.svg"}
                      alt={`Image ${index}`}
                      className="w-full md:h-[500px] h-[200] object-cover rounded-lg"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Thumbnail Carousel */}
          <div className="px-4  border-t">
            <div className="overflow-hidden" ref={thumbRef}>
              <div className="flex">
                {slides.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => scrollTo(index)}
                    className={`flex-shrink-0 border-2 rounded-md overflow-hidden mr-2 ${
                      index === selectedIndex
                        ? "border-blue-500"
                        : "border-transparent"
                    }`}
                  >
                    <Image
                      width={120}
                      height={80}
                      src={image.thumb || image.large}
                      alt={`Thumbnail ${index}`}
                      className="w-[120px] h-[70px] object-cover"
                    />
                  </button>
                ))}
              </div>
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

          {/* Reviews */}
          <div className="flex-1 overflow-y-auto p-6">
            <h3 className="font-semibold mb-6">Guests who stayed here loved</h3>
            <div className="space-y-6">
              {reviews.map((review, index) => (
                <div key={index} className="space-y-3 border-b pb-3">
                  <span className="text-base font-bold text-black">
                    {review?.author
                      ? `${review.author.first_name ?? ""} ${
                          review.author.last_name ?? ""
                        }`.trim()
                      : review?.user_name ?? "Anonymous"}
                  </span>
                  <p className="text-sm text-gray-600">{review.title}</p>
                  <p className="text-sm text-gray-600">{review.content}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ImageGalleryModalSingle;
