"use client";

import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { HotelType, Package, RoomType } from "@/types/hotel-types";
import { ImagesIcon } from "lucide-react";
import Image from "next/image";
import RoomPackage from "./room-package";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import FinalPrint from "@/components/hotels/hotelDetails/FinalPrint";
import HotelFAQs from "@/components/hotels/hotelDetails/HotelFaq";
import HotelMap from "@/components/hotels/hotelDetails/HotelMap";
import HotelSurroundings from "@/components/hotels/hotelDetails/HotelSurroundings";
import PropertyPolicies from "@/components/hotels/hotelDetails/PropertyPolicies";
import AmenitiesCard from "@/components/hotels/hotelDetails/ServiceAndAmenities";
import PropertyInformation from "@/components/hotels/hotelDetails/PropertyInformation";

export default function RoomCard({ hotelDetails }: { hotelDetails: HotelType }) {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [lightboxImages, setLightboxImages] = useState<{ src: string }[]>([]);

  const openLightbox = (index: number, images: any[]) => {
    setLightboxImages(images.map((img) => ({ src: img.large }))); // Format images for lightbox
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  return (
    <>
      {hotelDetails?.rooms?.map((room: RoomType, index) => {
        const images = room.gallery || [];

        return (
          <div className="p-4 pt-0 bg-white" key={index}>
            <div className="hidden sm:grid justify-items-center items-start grid-cols-1 sm:grid-cols-4 py-3 px-4 font-bold text-md">
              <h2>{room?.title}</h2>
              <h2>Your Choice</h2>
              <h2 className="text-center">Sleeps</h2>
              <h2 className="text-right">Todays Price</h2>
            </div>
            <Card className="shadow-none border-none">
              <div className="grid grid-cols-1 sm:grid-cols-[350px,1fr] gap-4">

                <div>
                {/* Left Side - Image and Details */}
                <div className="relative rounded-lg pswp-gallery h-52">
                  {/* Overlay and gallery icon */}
                  <div className="overlay absolute bottom-0 right-0 w-[40px] h-[30px] bg-black opacity-50"></div>
                  <div
                    className="gallery-view-icon absolute w-[30px] h-[30px] bottom-0 right-1 flex justify-center items-center z-20 gap-1 cursor-pointer"
                    onClick={() => openLightbox(0, images)}
                  >
                    <ImagesIcon color="#ffffff" size={16} />
                    <span className="text-white font-sans text-sm font-normal">{images.length}</span>
                  </div>

                  {/* Display Images - Clickable */}
                  {images.map((img, imgIndex) => (
                    <div key={imgIndex} className="gallery-item-single">
                      <a
                        href={img.large}
                        data-pswp-height={400}
                        target="_blank"
                        rel="noreferrer"
                        className="block"
                        onClick={(e) => {
                          e.preventDefault(); // Prevent default anchor behavior
                          openLightbox(imgIndex, images);
                        }}
                      >
                        <Image
                          width={400}
                          height={400}
                          src={img.thumb}
                          alt="Hotel Room"
                          className="object-cover w-full h-full rounded-xl"
                        />
                      </a>
                    </div>
                  ))}
                </div>


                <ul className="list-disc list-inside text-gray-700 text-xs my-2">
                  {room.terms?.map((r, i) => <li key={i}>{r}</li>)}
                </ul>
                </div>

                {/* Right Side - Room Options */}
                <div className="rounded-lg space-y-3">
                  {room?.packages ? (
                    room?.packages?.map((roomPackage: Package, index) => (
                      <RoomPackage
                        key={index}
                        roomPackage={roomPackage}
                        hotelDetails={hotelDetails}
                        room={room}
                      />
                    ))
                  ) : (
                    <RoomPackage key={index} hotelDetails={hotelDetails} room={room} />
                  )}
                </div>
              </div>
            </Card>
          </div>
        );
      })}

      {/* Lightbox Component */}
      <Lightbox
        open={lightboxOpen}
        close={() => setLightboxOpen(false)}
        slides={lightboxImages}
        index={lightboxIndex}
      />
      <div className="pt-5">
        <AmenitiesCard amenitiesData={hotelDetails?.amenities}/>
      </div>
      <div className="pt-5">
        <HotelSurroundings data={hotelDetails} />
      </div>

      <div className="pt-5">
        <PropertyPolicies policyDatas={hotelDetails?.policy} />
      </div>

      <div className="pt-5">
        <PropertyInformation propertyInformation={hotelDetails?.additional} />
      </div>

      <div className="pt-5">
        <HotelMap lat={hotelDetails?.map_lat} lng={hotelDetails?.map_lng} />
      </div>
      <div className="pt-5">
        <FinalPrint finePrint={hotelDetails?.fine_print}/>
      </div>
      <div className="pt-5">
        <HotelFAQs faqs={hotelDetails?.faqs || []} />
      </div>
    </>
  );
}
