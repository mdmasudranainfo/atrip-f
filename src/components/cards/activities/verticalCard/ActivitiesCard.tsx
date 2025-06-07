import { MapPin, CheckCircle, ArrowBigRight, ArrowRight } from "lucide-react";
import { TbCalendarTime } from "react-icons/tb";
import { BsBookmarkStar, BsPhone, BsCalendarX } from "react-icons/bs";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { EventActivityRow } from "@/types/activity";
import { formatPrice, getComparePrice, getSellPrice } from "@/lib/utils";
import RatingBadge from "@/components/rating-badge";
import DiscountPriceBadge from "@/components/booking/discount-price-badge";

export default function ActivitiesCard({
  data,
  total,
  activity,
}: // location_id,
{
  data: any;
  total: number;
  activity: EventActivityRow;
  // location_id: number;
}) {
  // const url = location_id
  //   ? `/activities/${activity.slug}?location_id=${location_id}`
  //   : `/activities/${activity.slug}`;
  const sellPrice = getSellPrice(activity.price, activity.sale_price);
  const comparePrice = getComparePrice(activity.price, activity.sale_price);

  const services = [
    {
      icon: <BsCalendarX className="h-4 w-4 text-primary-dark md:h-5 md:w-5" />,
      label: "Free cancellation",
    },
    {
      icon: (
        <BsBookmarkStar className="h-4 w-4 text-primary-dark md:h-5 md:w-5" />
      ),
      label: "Instant confirmation",
    },
    {
      icon: <BsPhone className="h-4 w-4 text-primary-dark md:h-5 md:w-5" />,
      label: "Mobile ticket",
    },
    {
      icon: (
        <TbCalendarTime className="h-4 w-4 text-primary-dark md:h-5 md:w-5" />
      ),
      label: "Flexible duration",
    },
  ];

  const SaveSession = () => {
    const activitiesData = {
      activitiesData: data,
      activitiesTotal: total,
      scrollPosition: window.scrollY,
      activitiesPage: "activities",
    };

    // Save the current state to sessionStorage
    sessionStorage.setItem("activitiesData", JSON.stringify(activitiesData));
  };

  return (
    <Link onClick={() => SaveSession()} href={`activities/${activity.slug}`}>
      <Card className="card-wrapper overflow-hidden sm:p-4 border-none w-full h-auto">
        <div className="md:single-item flex flex-col sm:flex-row gap-4">
          {/* Image Section */}
          <div className="md:single-item-media relative w-full sm:w-32 h-60 sm:h-60 md:w-40 lg:w-60 rounded-xl overflow-hidden">
            <Image
              src={activity.image_url || "/placeholder.svg"}
              alt={activity.title}
              fill
              className="object-cover"
            />
          </div>

          {/* Content Section */}
          <div className="single-item-content flex flex-1 flex-col gap-2 justify-between">
            <div className="content-wrapper flex flex-col sm:flex-row justify-between">
              <div className="basis-full sm:basis-[80%]">
                <div className="flex items-center gap-1 content-top">
                  <h3 className="text-[15px] leading-[16px] md:text-xl md:leading-[28px] font-semibold text-dark">
                    {activity.title}
                  </h3>
                </div>

                {/* Location */}
                <div className="content-location flex items-center gap-2 text-[13px] md:text-sm text-primary-dark mt-1">
                  <MapPin className="h-3 w-3 md:h-4 md:w-4" />
                  <span>{activity.address}</span>
                </div>

                {/* Subtitle */}
                <div className="py-2 md:block hidden">
                  <p className="text-sm ">{activity?.sub_title}</p>
                </div>

                {activity?.duration ? (
                  <p className="text-sm px-1">
                    {activity?.duration} Hour activity
                  </p>
                ) : (
                  ""
                )}

                {/* Services */}
                <div className="services md:grid hidden grid-cols-2 gap-x-4 gap-y-2 mt-2 text-dark text-[13px] md:text-sm">
                  {services.map((service, index) => (
                    <div
                      key={index}
                      className="service-single flex items-center gap-2"
                    >
                      {service.icon}
                      <span>{service.label}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Rating badge (place under title on small screens) */}
              <div className="mt-2 sm:mt-0 sm:self-start md:block hidden">
                <RatingBadge
                  total={activity.total_review}
                  score={activity.review_score}
                />
              </div>
            </div>

            {/* Bottom Price & CTA */}
            <div className="md:mt-3">
              <DiscountPriceBadge
                sellPrice={sellPrice}
                comparePrice={comparePrice}
                priceAfterText="Per person"
              />

              <div className="text-right mt-2">
                <span>
                  <Button
                    variant={"primary"}
                    className=" w-full sm:w-auto !py-4"
                  >
                    Check Availability
                    <ArrowRight
                      className="mt-[2px] ml-1"
                      size={12}
                      color="#fff"
                    />
                  </Button>
                </span>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </Link>
  );
}
