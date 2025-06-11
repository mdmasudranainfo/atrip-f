"use client";

import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Review } from "@/types/review";
import { useState, useCallback, useEffect } from "react";
import RatingStar from "../rating-star";
import Image from "next/image";
import useEmblaCarousel from "embla-carousel-react";
import ReactPlayer from "react-player/youtube";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface GalleryModalProps {
  video?: string;
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
  lightboxIndex: number;
}

const ImageGalleryModalSingle = ({
  video,
  open,
  onClose,
  hotelName,
  star_rate,
  review_score,
  images,
  reviews,
  reviewCount,
  lightboxIndex,
}: GalleryModalProps) => {
  const hasVideo = Boolean(video);
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });
  const [thumbRef, thumbApi] = useEmblaCarousel({
    containScroll: "keepSnaps",
    dragFree: true,
  });

  const [selectedIndex, setSelectedIndex] = useState(
    hasVideo ? lightboxIndex : Math.max(lightboxIndex - 1, 0)
  );

  const scrollTo = useCallback(
    (index: number) => {
      emblaApi?.scrollTo(index);
    },
    [emblaApi]
  );

  const scrollPrev = () => emblaApi?.scrollPrev();
  const scrollNext = () => emblaApi?.scrollNext();

  useEffect(() => {
    if (!emblaApi) return;

    const onSelect = () => {
      setSelectedIndex(emblaApi.selectedScrollSnap());
      thumbApi?.scrollTo(emblaApi.selectedScrollSnap());
    };

    emblaApi.on("select", onSelect);

    if (open && typeof lightboxIndex === "number") {
      const startIndex = hasVideo
        ? lightboxIndex
        : Math.max(lightboxIndex - 1, 0);
      emblaApi.scrollTo(startIndex);
      setSelectedIndex(startIndex);
      thumbApi?.scrollTo(startIndex);
    }

    onSelect();
  }, [emblaApi, thumbApi, open, lightboxIndex, hasVideo]);

  const slides = hasVideo
    ? [{ type: "video" }, ...images.hotelUploads]
    : images.hotelUploads;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-[90vw] rounded-lg h-[95vh] overflow-y-scroll p-0 flex xl:flex-row flex-col">
        <DialogTitle className="text-lg font-semibold p-4 hidden" />

        {/* Left Section */}
        <div className="flex-1 flex flex-col relative">
          {/* Arrows */}
          <button
            onClick={scrollPrev}
            className="absolute z-10 top-1/2 left-2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow hover:bg-gray-100"
          >
            <ChevronLeft size={24} />
          </button>
          <button
            onClick={scrollNext}
            className="absolute z-10 top-1/2 right-2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow hover:bg-gray-100"
          >
            <ChevronRight size={24} />
          </button>

          {/* Main Carousel */}
          <div className="p-4">
            <div className="overflow-hidden rounded-lg" ref={emblaRef}>
              <div className="flex">
                {slides.map((item: any, index) => (
                  <div className="min-w-full flex-shrink-0 px-2" key={index}>
                    {item.type === "video" ? (
                      <div className="w-full h-[200px] md:h-[500px] rounded-lg overflow-hidden">
                        <ReactPlayer
                          url={`${video}?rel=0`}
                          playing={selectedIndex === 0}
                          controls
                          width="100%"
                          height="100%"
                        />
                      </div>
                    ) : (
                      <Image
                        width={800}
                        height={600}
                        src={item.large || "/placeholder.svg"}
                        alt={`Image ${index}`}
                        className="w-full h-[200px] md:h-[500px] object-cover rounded-lg"
                      />
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Thumbnail Carousel */}
          <div className="px-4 border-t">
            <div className="overflow-hidden" ref={thumbRef}>
              <div className="flex mt-4">
                {/* Optional Video Thumbnail */}
                {hasVideo && (
                  <button
                    onClick={() => scrollTo(0)}
                    className={`flex-shrink-0 border-2 rounded-md overflow-hidden mr-2 ${
                      selectedIndex === 0
                        ? "border-blue-500"
                        : "border-transparent"
                    }`}
                  >
                    <Image
                      width={120}
                      height={80}
                      src={`https://img.youtube.com/vi/${extractYouTubeID(
                        video!
                      )}/0.jpg`}
                      alt="Video thumbnail"
                      className="w-[120px] h-[70px] object-cover"
                    />
                  </button>
                )}

                {/* Image Thumbnails */}
                {images.hotelUploads.map((image, index) => {
                  const slideIndex = hasVideo ? index + 1 : index;
                  return (
                    <button
                      key={index}
                      onClick={() => scrollTo(slideIndex)}
                      className={`flex-shrink-0 border-2 rounded-md overflow-hidden mr-2 ${
                        selectedIndex === slideIndex
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
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Right Sidebar */}
        <div className="xl:w-[400px] w-full border-l flex flex-col bg-white">
          <div className="p-6 border-b">
            <h2 className="text-xl font-semibold mb-2">{hotelName}</h2>
            <div className="flex items-center gap-2">
              <RatingStar reviewScore={star_rate ?? 0} />
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

// Helper to extract YouTube video ID from URL
function extractYouTubeID(url: string) {
  const regExp = /(?:youtube\.com.*[?&]v=|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
  const match = url.match(regExp);
  return match ? match[1] : "";
}

export default ImageGalleryModalSingle;
