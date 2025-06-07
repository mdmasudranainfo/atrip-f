import { TransparentNavbar } from "@/components/header/transparentNav/TransparentNav";
import { Button } from "@/components/ui/button";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  ArrowLeft,
  BookCheck,
  Hotel,
  MapPin,
  ShieldQuestion,
  SlidersHorizontal,
  SquarePlus,
} from "lucide-react";
import Link from "next/link";
import CancelationPolicy from "@/components/activities/activitiesDetails/CancelationPolicy";
import ActivitiesHighlights from "@/components/activities/activitiesDetails/Highlights";
import Inclusions from "@/components/activities/activitiesDetails/Inclusions";
import MyTickets from "@/components/activities/activitiesDetails/MyTickets";
import OperatingHours from "@/components/activities/activitiesDetails/OperatingHours";
import ActivitiesMap from "@/components/activities/activitiesDetails/ActivitiesMap";
import NeedToKnow from "@/components/activities/activitiesDetails/NeedToKnow";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ImageGallery } from "@/components/imageGellery/ImageGellery";
import { HiOutlineSpeakerphone } from "react-icons/hi";
import { notFound } from "next/navigation";
import { getActivityBySlug } from "@/lib/actions/activity-action";
import { formatPrice, getComparePrice, getSellPrice } from "@/lib/utils";
import ActivityBooking from "@/components/activities/activity-booking";
import RatingBadgeHorizontal from "@/components/rating-badge-horizontal";
import BookingAttraction from "@/components/layouts/booking-attraction";
import DiscountPriceBadge from "@/components/booking/discount-price-badge";
import * as Dialog from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import StickyTabs from "@/components/activities/activitiesDetails/TabNav";
import TravelersAsking from "@/components/activities/activitiesDetails/TravelersAsking";
import FAQAccordion from "@/components/share/FAQAccordion";
import BookingActivity2 from "@/components/activities/BookingActivity2";

const ActivitiesDetails = async (context: {
  params: Promise<{ slug: string }>;
}) => {
  const params = await context.params;
  const slug = params.slug;

  if (!slug) {
    notFound();
  }

  const { data, reviews, booking_data } = await getActivityBySlug(slug);

  if (!data?.id) {
    notFound();
  }

  const sellPrice = getSellPrice(data.price, data.sale_price);

  const comparePrice = getComparePrice(data.price, data.sale_price);

  const elId = "activity-checkout";

  const tabItems = [
    { value: "highlights", label: "Highlights" },
    { value: "inclusions", label: "Inclusions" },
    { value: "operating_hours", label: "Operating hours" },
    { value: "need_to_know", label: "Need to know" },
    { value: "cancellation_policy", label: "Cancellation policy" },
    { value: "location", label: "Location" },
    { value: "my_tickets", label: "My Tickets" },
    { value: "travelers_asking", label: "Travelers asking" },
  ];

  return (
    <div className="">
      <div className="relative h-full :max-h-[600px] bg-about-us w-full  from-blue-900 via-blue-950 to-blue-950">
        <div className="bg-[#00000066] h-full w-full absolute top-0 bottom-0"></div>
        <TransparentNavbar isBgWhite={false} />
      </div>
      {/*  */}
      <main className="container m-auto min-h-screen  py-8   ">
        <div className="bg-white md:pb-6 rounded-xl  ">
          <Link
            href="/activities"
            className="text-blue-600 hover:text-blue-800 text-sm mb-4  md:inline-block hidden md:px-6 px-2 pt-2 "
          >
            <ArrowLeft className="h-4 w-4 inline-block mr-1 mb-[2px]" />
            Back
          </Link>
          {/* <ImageGallery
            images={data.gallery}
            title={"Activities"}
            star_rate={0}
            review_score={Number(data.review_data?.score_total || 0)}
            alt="Activities Images"
            reviews={reviews || []}
            review_count={Number(data.review_data?.total_review || 0)}
          /> */}

          {/*  */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center md:mb-3 md:px-6 px-2 ">
            <div className="md:block hidden">
              <h1 className="text-2xl font-semibold text-gray-900 mb-2">
                {data.title}
              </h1>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <MapPin className="h-4 w-4" />
                <span>{data.address}</span>
              </div>
            </div>

            {/* <div className="mt-4 md:mt-0 flex items-center gap-5 flex-wrap sm:flex-nowrap">
              <div>
                <DiscountPriceBadge
                  sellPrice={sellPrice}
                  comparePrice={comparePrice}
                  hideLabel
                  labelClass="text-md"
                />
                <div className="text-sm text-gray-600">Price starts from</div>
              </div>
              <Link href={`#${elId}`}>
                <Button className="bg-blue-600 hover:bg-blue-700 text-white px-6 font-bold">
                  Select Attraction
                </Button>
              </Link>
            </div> */}
          </div>

          {/* Rating Section */}
          {/* <RatingBadgeHorizontal
            total={Number(data.review_data?.total_review || 0)}
            score={Number(data.review_data?.score_total || 0)}
          /> */}

          {/* header & rating end */}
          <ImageGallery
            data={data}
            images={data.gallery}
            title={"Activities"}
            star_rate={0}
            review_score={Number(data.review_data?.score_total || 0)}
            alt="Activities Images"
            reviews={reviews || []}
            review_count={Number(data.review_data?.total_review || 0)}
          />
        </div>

        {/* Tabs menu */}
        <div className="">
          <StickyTabs tabItems={tabItems} />
          <div
            className="flex gap-8 w-full my-6 lg:flex-row flex-col-reverse"
            // id={elId}
          >
            {/* left section start */}
            <div className="lg:w-[70%] w-full rounded-lg ">
              <div className="w-full ">
                <ScrollArea>
                  <div className="-mt-2">
                    <section id="highlights" className="scroll-mt-16">
                      <ActivitiesHighlights data={data} />
                    </section>

                    <section id="inclusions" className="scroll-mt-16">
                      <Inclusions content={data?.include} />
                    </section>

                    <section id="operating_hours" className="scroll-mt-16">
                      <OperatingHours
                        data={data.operating_hours_title}
                        operatingHours={data?.operating_hours}
                      />
                    </section>

                    <section id="need_to_know" className="scroll-mt-16">
                      <NeedToKnow NeedToKnowData={data?.need_to_know} />
                    </section>

                    <section id="cancellation_policy" className="scroll-mt-16">
                      <CancelationPolicy
                        cancelationPolicyData={data?.cancellation_policy}
                      />
                    </section>

                    <section id="location" className="scroll-mt-16">
                      <ActivitiesMap
                        address={data?.address}
                        lat={data?.map_lat}
                        lng={data?.map_lng}
                      />
                    </section>

                    <section id="my_tickets" className="scroll-mt-16">
                      <MyTickets myTicket={data?.my_ticket} />
                    </section>

                    <section id="travelers_asking" className="scroll-mt-16">
                      <FAQAccordion faqs={data?.faqs} />
                    </section>
                  </div>
                  <ScrollBar orientation="horizontal" className="invisible" />
                </ScrollArea>
              </div>
            </div>
            {/* left section ends */}

            {/* Right section start */}

            <div className="flex-1 lg:max-w-md w-full  mx-auto md:block hidden m-0 p-0">
              <div className=" sticky top-14   ">
                <Card className=" px-5 py-6 bg-white rounded-lg shadow-md">
                  <CardHeader className="space-y-2">
                    {/* <CardTitle className="text-lg leading-6 font-semibold text-dark">
                  {data.title}
                </CardTitle> */}
                    <p className="text-lg leading-6 font-medium text-dark">
                      {formatPrice(sellPrice)}/{" "}
                      <span className="text-sm text-primary"> Per Person</span>
                    </p>
                  </CardHeader>
                  <CardContent className="p-0 sm:p-0 mt-4">
                    <ActivityBooking event={data} />
                  </CardContent>
                </Card>
                <BookingAttraction />
              </div>
            </div>
            {/* Right section ends */}
          </div>
        </div>

        <BookingActivity2 event={data} />

        <div className="hidden">
          <Dialog.Root>
            <Dialog.Trigger asChild>
              {/* mobile checkout button */}
              <div className="px-6 py-4 rounded-t-xl fixed bottom-0 z-50 border-t-2  md:hidden flex justify-between items-center bg-white w-full">
                <p className="text-lg leading-6 font-medium text-dark">
                  {formatPrice(sellPrice)}{" "}
                </p>
                <Button size={"xl"} className="text-white px-14">
                  Check Availability
                </Button>
              </div>
            </Dialog.Trigger>

            <Dialog.Portal>
              <Dialog.Overlay className="fixed inset-0 bg-black/40 z-50" />
              <Dialog.Content className="fixed inset-x-0 bottom-0 z-50 bg-white rounded-t-2xl p-4 max-h-[90vh] overflow-y-auto">
                <div className="flex justify-end">
                  <Dialog.Close asChild>
                    <button className="text-gray-500 hover:text-gray-700">
                      <X className="h-5 w-5" />
                    </button>
                  </Dialog.Close>
                </div>

                {/* mobile modal checkout card */}
                <div className="flex-1 lg:max-w-md w-full mx-auto">
                  <Card className="px-5 py-6 bg-white rounded-lg shadow-md">
                    <CardContent className="p-0 sm:p-0 mt-4">
                      <ActivityBooking event={data} />
                    </CardContent>
                  </Card>
                </div>
              </Dialog.Content>
            </Dialog.Portal>
          </Dialog.Root>
        </div>
      </main>
    </div>
  );
};

export default ActivitiesDetails;
