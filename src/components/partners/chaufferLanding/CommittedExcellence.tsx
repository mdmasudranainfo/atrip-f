import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Award } from "lucide-react";

export default function ChaufferLanding() {
  return (
    <div className=" bg-white">
      <div className="relative">
        {/* Hero Section */}
        <div className="container mx-auto px-4 py-12 lg:py-20">
          <div className="grid gap-8 lg:grid-cols-2 justify-center lg:gap-16 items-center">
            {/* Left Column - Image */}
            <div className="relative">
              <div className="relative chauffeur-img aspect-[3/3] overflow-hidden rounded-lg">
                <Image
                  src="/images/partnership.jpg"
                  alt="Luxury chauffeur service"
                  fill
                  className="object-cover"
                  // width={90}
                  priority
                />
                {/* Award Badge */}
                <Card className="absolute left-6 bottom-9 bg-white/95 backdrop-blur-sm border-0 w-32 ">
                  <CardContent className="flex flex-col award-img items-center justify-center p-4 space-y-1 ">
                    {/* <Award className="h-8 w-8 text-primary" /> */}
                    <Image
                      src="/images/Award.png"
                      alt="Award"
                      width={60}
                      height={60}
                      className="object-cover"
                      priority
                    />

                    <p className="text-xs font-semibold text-[#051B39] text-center leading-tight pt-2 inline-block">
                      Award winning Company
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Right Column - Content */}
            <div className="space-y-6">
              <h1 className="text-4xl lg:text-4xl text-dark font-bold !leading-[110%]">
                Partnership With Atrip. Ae
              </h1>
              <div className="space-y-7  text-dark">
                <p>
                  Unlimited business expansion opportunities become accessible
                  through partner agreements with Atrip—Ae, the worldwide leader
                  in business-to-traveler platform matching services. Through
                  the Atrip platform, your business will achieve outstanding
                  performance. Your business needs Ae platform membership
                  because it strengthens your brand while increasing your
                  reservations and global market recognition—the partnership
                  with Atrip. Ae enables your operations.
                </p>
                <p>
                  Thousands of international travelers can reach your business
                  through Atrip—Ae while increasing your business traffic flow
                  to boost revenue potential. Your business stands to achieve
                  higher heights because of our prestigious platform
                  integration.
                </p>
              </div>
              {/* <Button
                size="xl"
                className="mt-11 inline-block text-white font-bold"
              >
                Learn More About
              </Button> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
