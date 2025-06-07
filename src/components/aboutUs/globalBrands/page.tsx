import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Check } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";

const GlobalBands = () => {
  return (
    <>
      <div className="container mx-auto px-6 py-24 md:px-12 lg:px-0">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-12 items-center">
          <div className="relative aspect-[3/3] w-full overflow-hidden rounded-lg">
            <Image
              src="/images/misston.jpg"
              alt=""
              className="h-full w-full object-cover"
              width={800}
              height={900}
            />
          </div>
          <div className="space-y-3">
            <div className="space-y-4">
              <h1 className="text-4xl font-bold  !leading-[110%] lg:text-5xl">
                Our Mission And Vision
              </h1>
              <p className="text-sm  text-dark ">
                As Arip Life Tourism LLC, we provide assistance to travelers
                beyond place discovery so they can create memories that will
                forever stay in their hearts. Arip Life Tourism LLC strives to
                serve as a dependable travel companion that enables seamless
                access to travel destinations across Dubai and the UAE and
                worldwide destinations during your time of relaxation and
                comfort.
                <br />
                Our company commences the Dubai tour by delivering services to
                clients.
                <br />
                Visitors may explore international landmarks and luxury services
                in addition to cultural heritage sites within the United Arab
                Emirates as well as its most prominent city Dubai. Tourists
                experience stunning panoramas because the region features both
                Burj Khalifa&#39;s world-record status among numerous historical
                landmarks and the magnificent Sheikh Zayed Mosque alongside
                enchanting desert dunes and attractive coastal landscapes. Our
                organization helps customers uncover the extraordinary wonders
                of this fantastic destination.
              </p>
            </div>

            <Tabs defaultValue="mission" className="w-full">
              <TabsList className="w-full justify-start border-b rounded-none h-12 bg-transparent p-0 space-x-8">
                <TabsTrigger
                  value="mission"
                  className="!bg-transparent data-[state=active]:text-primary data-[state=active]:border-primary data-[state=active]:shadow-none rounded-none border-b-[3px] border-transparent px-0 py-2 font-semibold text-lg text-dark"
                >
                  Our Mission
                </TabsTrigger>
                <TabsTrigger
                  value="vision"
                  className="!bg-transparent data-[state=active]:text-primary data-[state=active]:border-primary data-[state=active]:shadow-none rounded-none border-b-[3px] border-transparent px-0 py-2 font-semibold text-lg text-dark"
                >
                  Our Vision
                </TabsTrigger>
              </TabsList>
              <TabsContent value="mission" className="mt-6">
                <p className=" text-dark ">
                  As a company, we mainly aim to use innovative technology with
                  personalization services that create everlasting memories
                  beyond just traveling for pleasure.
                </p>
              </TabsContent>
              <TabsContent value="vision" className="mt-6">
                <p className=" text-dark ">
                  Our Vision Atrip aims to become the top travel service
                  provider that links people to extraordinary travel places
                  through innovative journey experiences.
                </p>
              </TabsContent>
            </Tabs>

            <ul className="space-y-4 hidden">
              <li className="flex items-center gap-3">
                <div className="bg-primary p-1 rounded-full">
                  <Check className="h-4 w-4 font-bold text-white" />
                </div>
                <span className="font-semibold text-dark">
                  Link your bank or financial account
                </span>
              </li>
              <li className="flex items-center gap-3">
                <div className="bg-primary p-1 rounded-full">
                  <Check className="h-4 w-4 font-bold text-white" />
                </div>
                <span className="font-semibold text-dark">
                  Easy way to view your total balance
                </span>
              </li>
            </ul>

            <Button className="bg-primary px-4 text-white font-semibold py-3 rounded-lg hover:bg-[#4361EE]">
              Lets Get Started
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default GlobalBands;
