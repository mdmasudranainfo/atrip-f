import { Button } from "@/components/ui/button";
import Image from "next/image";
import React from "react";

const Who = () => {
  return (
    <div className="container mx-auto px-4 md:py-24 py-8">
      {/* Hero Section */}
      <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
        {/* Content */}
        <div className="space-y-6">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-5xl">
            Who We Are
          </h1>
          <div className="space-y-4">
            <p className="text-lg text-dark ">
              Atrip. Ae (Arip Life Tourism LLC) is a fully approved and esteemed
              travel agency under Trade License Number 1302010. <br /> Our
              travel company develops personalized travel programs from Dubai,
              which serve all customer segments, from individual travelers to
              companies. <br /> Our organization exists to inspire travelers to
              explore new destinations, and we aim to provide enjoyable and
              trouble-free experiences to all our clients.
            </p>
          </div>
        </div>
        {/* Image Grid */}

        <div className="rounded-lg overflow-hidden ">
          <Image
            src="/images/whoare.jpg"
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

export default Who;
