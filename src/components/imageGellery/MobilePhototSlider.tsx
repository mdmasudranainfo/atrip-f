"use client";

import React, {
  useEffect,
  useCallback,
  useState,
  Dispatch,
  SetStateAction,
} from "react";
import useEmblaCarousel from "embla-carousel-react";
import Image from "next/image";
import { EventRow } from "@/types/activity";
import ReactPlayer from "react-player";

interface Props {
  data: EventRow;
  slides: any;
  showGallery: boolean;
  setShowGallery: Dispatch<SetStateAction<boolean>>;
}

const MobilePhototSlider: React.FC<Props> = ({
  data,
  slides,
  showGallery,
  setShowGallery,
}: any) => {
  const hasVideo = Boolean(data?.video);
  const slides2 = hasVideo ? [{ type: "video" }, ...slides] : slides;

  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });
  const [selectedIndex, setSelectedIndex] = useState(0);

  const scrollTo = useCallback(
    (index: number) => {
      emblaApi?.scrollTo(index);
    },
    [emblaApi]
  );

  // Auto slide effect
  useEffect(() => {
    if (!emblaApi) return;
    const interval = setInterval(() => {
      if (!emblaApi) return;
      const nextIndex = (emblaApi.selectedScrollSnap() + 1) % slides.length;
      emblaApi.scrollTo(nextIndex);
    }, 8000); // Change slide every 8 seconds

    return () => clearInterval(interval);
  }, [emblaApi, slides.length]);

  useEffect(() => {
    if (!emblaApi) return;

    const onSelect = () => {
      setSelectedIndex(emblaApi.selectedScrollSnap());
    };

    emblaApi.on("select", onSelect);
    onSelect();
  }, [emblaApi]);

  return (
    <div className="relative rounded-xl overflow-hidden shadow-lg">
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex">
          {slides2.map((slider: any, index: number) => (
            <div
              className="min-w-full h-[400px] aspect-video relative flex-shrink-0"
              key={index}
            >
              {slider?.type === "video" ? (
                <div className="h-full pointer-events-auto">
                  <ReactPlayer
                    url={`${data?.video}?rel=0`}
                    playing={selectedIndex === index}
                    controls
                    width="100%"
                    height="100%"
                    muted
                    className="object-cover"
                  />
                </div>
              ) : (
                <Image
                  src={slider.large}
                  alt={`Slide ${index}`}
                  fill
                  className="object-cover cursor-pointer"
                  onClick={() => setShowGallery(true)}
                />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Gradient overlay at bottom */}
      <div className="absolute inset-x-0 bottom-0 photoGellery text-white p-4 pt-8 z-40">
        {/* Dot navigation */}
        <div className="flex gap-2 mb-1">
          {slides2.map((_: any, index: number) => (
            <button
              key={index}
              onClick={() => scrollTo(index)}
              className={`h-2 w-4 rounded-full transition-all ${
                index === selectedIndex ? "bg-primary" : "bg-white/50"
              }`}
            />
          ))}
        </div>

        <h3 className="text-lg font-bold leading-tight">{data?.title}</h3>
        <p className="text-sm">
          <span>{data.address}</span>
        </p>
      </div>
    </div>
  );
};

export default MobilePhototSlider;
