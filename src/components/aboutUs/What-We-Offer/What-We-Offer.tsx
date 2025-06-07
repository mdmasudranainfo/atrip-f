import { Button } from "@/components/ui/button";
import Image from "next/image";
import React from "react";

const WhatWeOffer = () => {
  return (
    <div className="container mx-auto px-4 md:py-24 py-8">
      {/* Hero Section */}
      <div className="grid gap-12 lg:grid-cols-2 lg:gap-12 items-center">
        {/* Image Grid */}
        <div className="rounded-lg h-[500px]  overflow-hidden ">
          <Image
            src="/images/offer.jpg"
            alt=""
            className="w-full h-full object-cover "
            width={500}
            height={700}
          />
        </div>
        {/* Content */}
        <div className="space-y-6">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-4xl">
            What We Offer
          </h1>
          <div className="space-y-4">
            <p className="text-md text-dark ">
              The company provides original sightseeing packages to visit Burj
              Khalifa and Palm Jumeirah alongside cultural activities and desert
              safari trips and high-end luxury tours.
              <br /> <br /> Our company organizes beach vacations and adventure
              tours and cultural tours as part of its service portfolio for
              clients. <br /> <br />
              Arip Life Tourism LLC provides complete travel solutions which
              include booking airline tickets in addition to hotel reservations
              and transport and visa services and tour planning and activity
              arrangements to let customers experience carefree travel. <br />
              Travelers receive a comprehensive vacation experience because our
              service package provides every requirement such as flights,
              accommodation, visa assistance, transportation, tours and
              essential activities. <br /> <br /> Being a trusted airline
              together with tourist venture partner provides us with the
              opportunity to provide premium travel plans to our customers.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WhatWeOffer;
