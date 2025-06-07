import { Button } from "@/components/ui/button";
import Image from "next/image";
import React from "react";

const YourJourney = () => {
  return (
    <div className="container mx-auto px-4 md:py-24 py-8">
      {/* Hero Section */}
      <div className="grid gap-12 lg:grid-cols-2 lg:gap-12 items-center">
        {/* Content */}
        <div className="space-y-6">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-4xl">
            Start Your Journey with Us
          </h1>
          <div className="space-y-4">
            <p className="text-md text-dark ">
              Arip.ae offers services to customers who want romantic vacations,
              family vacations, or corporate retreats. Arip Life Tourism LLC can
              turn their tourism dreams into reality-based trips.
              <br /> <br />
              Examine Arip Life Tourism LLC offerings by taking a journey on
              Atrip—ae immediately.
            </p>
          </div>
        </div>

        {/* Image Grid */}
        <div className="rounded-lg h-ful overflow-hidden ">
          <Image
            src="/images/start_jurny.jpg"
            alt=""
            className="w-full h-full object-cover "
            width={500}
            height={500}
          />
        </div>
      </div>
    </div>
  );
};

export default YourJourney;
