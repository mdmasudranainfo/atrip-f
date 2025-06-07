import { TransparentNavbar } from "@/components/header/transparentNav/TransparentNav";
import { ImageGallery } from "@/components/imageGellery/ImageGellery";

import TourOverview from "@/components/tour/tourDetails/Overview";
import { Button } from "@/components/ui/button";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import UmrahBookingSummaryCard from "@/components/umrah/UmrahBookingSummaryCard";
import Itinerary from "@/components/umrah/umrahDetails/Itinerary";
import ImportantNotes from "@/components/umrah/umrahDetails/Notes";
import PackageExcludes from "@/components/umrah/umrahDetails/PackageExclueds";
import PackageIncludes from "@/components/umrah/umrahDetails/PackageIncludes";
import UmrahHotel from "@/components/umrah/umrahDetails/UmrahHotel";
import UmrahVisaDoc from "@/components/umrah/umrahDetails/UmrahVisaDoc";
import { getUmrahBySlug } from "@/lib/actions/umrah-actions";
import { formatPrice, getComparePrice, getSellPrice } from "@/lib/utils";
import {
  Hotel,
  MapPin,
  MessageCircle,
  Package,
  ShieldQuestion,
  SlidersHorizontal,
  Square,
  SquarePlus,
  Star,
  TrendingUp,
} from "lucide-react";
import Link from "next/link";
import { HiOutlineSpeakerphone } from "react-icons/hi";
import StarRates from "@/components/StarRates/page";
import DiscountPriceBadge from "@/components/booking/discount-price-badge";
import { CheckCircle } from "lucide-react";

const handleIcons = (value: string) => {
  switch (value) {
    case "overview":
      return <HiOutlineSpeakerphone className="h-8 w-8 " />;
    case "documents":
      return <Package className="h-7 w-7" />;
    case "notes":
      return <Square className="h-8 w-8" />;
    case "in/ex":
      return <SquarePlus className="h-8 w-8 " />;
    case "itinerary":
      return <SlidersHorizontal className="h-8 w-8" />;
    case "faq":
      return <ShieldQuestion className="h-8 w-8 " />;
    case "hotels":
      return <Hotel className="h-8 w-8 " />;
    default:
      return null;
  }
};

const UmrahDetails = async (context: {
  params: Promise<{ slug: string }>;
  searchParams: any;
}) => {
  const params = await context.params;
  const query = await context.searchParams;

  const _searchParams = new URLSearchParams(query);

  const elId = "umrah-tab-checkout";

  const {
    alldata,
    data: tourDetailsData,
    reviewList,
    tabsData,
  } = await getUmrahBySlug(params?.slug);

  const { content, faqs, include, exclude, itinerary, note } = tabsData;
  const tabItems = [
    { value: "overview", label: "Overview", icon: MessageCircle },
    { value: "documents", label: "Documents", icon: Package },
    { value: "notes", label: "Important Notes", icon: Square },
    { value: "itinerary", label: "Itinerary", icon: TrendingUp },
    { value: "in/ex", label: "Included/Excluded", icon: TrendingUp },
    { value: "hotels", label: "Hotel", icon: TrendingUp },
  ];

  const sellPrice = getSellPrice(
    tourDetailsData.price,
    tourDetailsData.sale_price
  );
  const comparePrice = getComparePrice(
    tourDetailsData.price,
    tourDetailsData.sale_price
  );

  return (
    <div>
      <div className="relative h-full :max-h-[600px] bg-about-us w-full  from-blue-900 via-blue-950 to-blue-950">
        <div className="bg-[#00000066] h-full w-full absolute top-0 bottom-0"></div>
        <TransparentNavbar isBgWhite={false} />
      </div>
      <main className="sm:container w-[96%] m-auto py-8">
        <div className="bg-white p-6 rounded-xl  ">
          {/* Back Link */}
          <Link
            href={`/umrah?${_searchParams.toString()}`}
            className="text-blue-600 hover:text-blue-800 text-sm mb-4 inline-block"
          >
            Revisit the search list
          </Link>

          {/* Header Section */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4">
            <div>
              <h1 className="text-2xl font-semibold text-gray-900 mb-2">
                {tourDetailsData?.title}
              </h1>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <span>
                  {tourDetailsData?.duration}{" "}
                  {Number(tourDetailsData?.duration) === 1 ? "day" : "days"}
                </span>
                <MapPin className="h-4 w-4" />
                <span>{tourDetailsData?.address}</span>
              </div>
            </div>

            <div className="mt-4 md:mt-0 flex flex-col md:items-end items-start">
              <div className="text-sm text-gray-600 mb-1">
                Price starts from
              </div>
              <div className="text-xl font-semibold mb-2">
                <DiscountPriceBadge
                  sellPrice={sellPrice}
                  comparePrice={comparePrice}
                  hideLabel
                  labelClass="text-md"
                />
              </div>
              <Link href={`#${elId}`}>
                <Button className="bg-blue-600 hover:bg-blue-700 text-white px-6">
                  <CheckCircle size={12} color="#fff" />
                  Book now
                </Button>
              </Link>
            </div>
          </div>

          {/* Rating Section */}
          <div className="flex items-center gap-2 mb-4">
            <StarRates
              rating={Number(tourDetailsData?.review_data?.score_total)}
            />
            <span className="bg-blue-600 text-white px-2 py-0.5 rounded text-sm">
              {/* {tourDetailsData?.review_score} */}
              {tourDetailsData?.review_data?.score_total}
            </span>
            <span className="text-gray-600">
              {tourDetailsData?.review_data?.score_text} ·{" "}
              {reviewList?.data.length} Reviews
            </span>
          </div>
          <ImageGallery
            data={tourDetailsData}
            images={tourDetailsData?.gallery}
            title={tourDetailsData?.title}
            star_rate={5}
            review_score={4.5}
            alt="Activities Images"
            reviews={reviewList?.data || []}
            review_count={0}
          />
        </div>
        {/* Tabs menu */}
        <div
          className="flex gap-8 w-full my-6 lg:flex-row flex-col-reverse"
          id={elId}
        >
          <div className="lg:w-[70%] w-full rounded-lg">
            <div className="w-full">
              <Tabs defaultValue="documents" className="w-full bg-[#f6f7fa] ">
                <ScrollArea className="w-full ">
                  <TabsList className="h-auto py-2 pb-1  w-full flex justify-between gap-0 border-b bg-white px-4">
                    {tabItems.map((tab) => (
                      <TabsTrigger
                        key={tab.value}
                        value={tab?.value}
                        className="group px-4 py-3 text-base font-bold text-muted-foreground  data-[state=active]:text-white data-[state=active]:shadow-none data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-blue-600 rounded-none flex items-center gap-3 flex-col"
                      >
                        {/* Icon Wrapper - Gets red background when active */}
                        <span className="py-2 px-2.5 rounded-lg group-data-[state=active]:bg-[#3264FF] group-data-[state=active]:shadow-md">
                          {handleIcons(tab?.value)}
                        </span>

                        {/* Tab Label */}
                        <span className="text-dark">{tab?.label}</span>
                      </TabsTrigger>
                    ))}
                  </TabsList>
                  <ScrollBar orientation="horizontal" className="invisible" />
                </ScrollArea>
                <ScrollArea className="w-full ">
                  <TabsContent
                    value="overview"
                    className="border-none space-y-2"
                  >
                    <TourOverview overview={content} />
                  </TabsContent>
                  <TabsContent
                    value="documents"
                    className="border-none space-y-2"
                  >
                    <UmrahVisaDoc umrahtabsData={tabsData} />
                  </TabsContent>
                  <TabsContent value="notes" className="border-none space-y-2">
                    <ImportantNotes notes={note} />
                  </TabsContent>
                  <TabsContent value="in/ex" className="border-none space-y-2">
                    <PackageIncludes includes={include} />
                    <PackageExcludes excludes={exclude} />
                  </TabsContent>
                  <TabsContent
                    value="itinerary"
                    className="border-none space-y-2"
                  >
                    <Itinerary itineraryData={itinerary} />
                  </TabsContent>
                  <TabsContent value="hotels" className="border-none space-y-2">
                    <UmrahHotel
                      hotels={tabsData.hotel}
                      hotelBed={tabsData?.hotel_bed}
                      hotelServiceIncluding={tabsData?.hotel_service_including}
                    />
                  </TabsContent>
                  <ScrollBar orientation="horizontal" className="invisible" />
                </ScrollArea>
              </Tabs>
            </div>
          </div>
          <div className="flex-1 lg:max-w-md w-full mx-auto">
            <UmrahBookingSummaryCard tourDetailsData={tourDetailsData} />
          </div>
        </div>
      </main>
    </div>
  );
};
export default UmrahDetails;
