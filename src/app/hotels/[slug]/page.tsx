import { TransparentNavbar } from "@/components/header/transparentNav/TransparentNav";
import FinalPrint from "@/components/hotels/hotelDetails/FinalPrint";
import HotelFAQs from "@/components/hotels/hotelDetails/HotelFaq";
import HotelMap from "@/components/hotels/hotelDetails/HotelMap";
import HotelSurroundings from "@/components/hotels/hotelDetails/HotelSurroundings";
import PropertyPolicies from "@/components/hotels/hotelDetails/PropertyPolicies";
import RoomCard from "@/components/hotels/hotelDetails/RoomCard";
import AmenitiesCard from "@/components/hotels/hotelDetails/ServiceAndAmenities";
import { ImageGallery } from "@/components/imageGellery/ImageGellery";
import MapButton from "@/components/map/map-button";
import HotelSearchForm from "@/components/packageSearchForms/HotelSearchForm";
import RatingStar from "@/components/rating-star";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getHotelsBySlug } from "@/lib/actions/hotel-action";
import { getSelectedLocation } from "@/lib/actions/location-action";
import { formatPrice, ratingLabel } from "@/lib/utils";
import {
  BookCheck,
  Heater,
  Hotel,
  Leaf,
  MapPin,
  MapPinned,
  PrinterCheck,
  School,
  ShieldQuestion,
  Siren,
  SlidersHorizontal,
  SquarePlus,
  Star,
} from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { HiOutlineSpeakerphone } from "react-icons/hi";

const tabItems = [
  { label: "Rooms", value: "rooms" },
  { label: "Services & Amenities", value: "services_amenities" },
  { label: "Hotel Surroundings", value: "hotel_surroundings" },
  { label: "Policies", value: "policies" },
  { label: "Map", value: "map" },
  { label: "The Fine Print", value: "fine_print" },
  { label: "Travellers Are Asking", value: "travellers_questions" },
];

const HotelDetails = async ({ params, searchParams }: any) => {
  const pageParams = await params;
  const query = await searchParams;
  const hotelSlug = pageParams?.slug;
  if (!hotelSlug) {
    notFound();
  }
  const { data } = await getHotelsBySlug(hotelSlug);
  if (!data?.id) {
    notFound();
  }

  const hasLocation = !!query.location_id;

  const selectedLocations = hasLocation
    ? await getSelectedLocation([query.location_id])
    : [];

  const _searchParams = new URLSearchParams(query);

  const rating = Number(data?.review_score ?? 0);

  return (
    <div className="hotel-details-wrapper">
      <div className="relative h-full :max-h-[600px] bg-about-us w-full  from-blue-900 via-blue-950 to-blue-950">
        <div className="bg-[#00000066] h-full w-full absolute top-0 bottom-0"></div>
        <TransparentNavbar isBgWhite={false} />
      </div>
      <main className="container m-auto min-h-screen  p-4">
        <div className="bg-white md:p-6 p-4 rounded-lg ">
          {/* Back Link */}
          <Link
            href={`/hotels?${_searchParams.toString()}`}
            className="text-blue-600 hover:text-blue-800 text-sm mb-4 inline-block"
          >
            Revisit the search list
          </Link>

          {/* Header Section */}
          <div className="header-area flex flex-col md:flex-row justify-between items-start md:items-center mb-4">
            <div>
              <h1 className="text-2xl font-semibold text-gray-900 mb-2">
                {data?.title}
              </h1>
              <div className="location flex items-center gap-2 text-sm text-gray-600">
                <MapPin className="h-4 w-4" />
                <span>
                  {data?.address}, {data?.location?.name}
                </span>
                {!!data?.nearest_location && (
                  <span>
                    | {data?.nearest_location.distance_in_km} km from (
                    {data?.nearest_location.name}) |
                  </span>
                )}
                {data?.location?.map_lat && data?.location?.map_lng && (
                  <MapButton
                    lat={data?.location?.map_lat}
                    lng={data?.location?.map_lng}
                    title="Hotel Map"
                  />
                )}
              </div>
            </div>

            <div className="mt-4 md:mt-0 flex flex-col md:items-end items-start">
              <div className="text-sm text-gray-600 mb-1">
                Price starts from
              </div>
              <div className="text-xl font-semibold mb-2">
                <span>{formatPrice(data?.min_price)}</span>
              </div>
            </div>
          </div>

          {/* Rating Section */}
          <div className="rating-section flex items-center gap-2 mb-4">
            <RatingStar reviewScore={data.star_rate ?? 0} />
            <span className="bg-blue-600 text-white px-2 py-0.5 rounded text-sm">
              {rating}
            </span>
            <span className="text-gray-600">
              {ratingLabel(rating)} · {data?.review_count || 0} Review
              {data?.review_count > 1 ? "s" : ""}
              {data.reviewCount > 1 ? "s" : ""}
            </span>
          </div>
          {data?.gallery?.length !== 0 && (
            <ImageGallery
              data={data}
              images={data?.gallery || []}
              title={data?.title || ""}
              star_rate={data?.star_rate || 0}
              review_score={rating}
              reviews={data?.reviews || []}
              review_count={data?.review_count || 0}
              alt={"Hotel Images"}
            />
          )}
        </div>
        {/* <div className="hotel-details-page-filter-area mt-5">
          <HotelSearchForm locations={selectedLocations || []} />
        </div> */}
        {/* Tabs menu */}
        <div className="w-full my-6 rounded-lg">
          <div className="w-full border-b">
            <Tabs
              defaultValue="rooms"
              className="w-full font-bold"
              id="hotel_tabs_section"
            >
              <ScrollArea className="w-full">
                <TabsList className="h-auto py-2 pb-1 bg-white w-full flex justify-between px-4">
                  {tabItems?.map((tab, index: number) => (
                    <TabsTrigger
                      key={index}
                      value={tab.value}
                      className="group px-12 py-3 text-base font-bold text-muted-foreground data-[state=active]:text-white data-[state=active]:shadow-none data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-blue-600 rounded-none flex flex-col items-center gap-3 justify-between "
                    >
                      <span className="py-2 px-2.5 rounded-lg group-data-[state=active]:bg-[#3264FF] group-data-[state=active]:shadow-md">
                        {handleIcons(tab?.value)}
                      </span>

                      <span className="text-dark">{tab?.label}</span>
                    </TabsTrigger>
                  ))}
                </TabsList>
                <ScrollBar orientation="horizontal" className="invisible" />
              </ScrollArea>
              <ScrollArea className="w-full">
                <TabsContent value="rooms" className="border-none">
                  <RoomCard hotelDetails={data} />
                </TabsContent>
                <TabsContent value="services_amenities" className="border-none">
                  <AmenitiesCard amenitiesData={data?.amenities} />
                </TabsContent>
                <TabsContent value="hotel_surroundings" className="border-none">
                  <HotelSurroundings data={data} />
                </TabsContent>

                <TabsContent value="policies" className="border-none">
                  <PropertyPolicies policyDatas={data?.policy} />
                </TabsContent>

                <TabsContent value="map" className="border-none">
                  <HotelMap lat={data?.map_lat} lng={data?.map_lng} />
                </TabsContent>
                <TabsContent value="fine_print" className="border-none">
                  <FinalPrint finePrint={data?.fine_print} />
                </TabsContent>
                <TabsContent
                  value="travellers_questions"
                  className="border-none"
                >
                  <HotelFAQs faqs={data?.faqs || []} />
                </TabsContent>
                <ScrollBar orientation="horizontal" className="invisible" />
              </ScrollArea>
            </Tabs>
          </div>
        </div>
      </main>
    </div>
  );
};
export default HotelDetails;
const tabItsems = [
  { label: "Rooms", value: "rooms" },
  { label: "Services & Amenities", value: "services_amenities" },
  { label: "Hotel Surroundings", value: "hotel_surroundings" },
  { label: "Policies", value: "policies" },
  { label: "Map", value: "map" },
  { label: "The Fine Print", value: "fine_print" },
  { label: "Travellers Are Asking", value: "travellers_questions" },
];
const handleIcons = (value: string) => {
  switch (value) {
    case "rooms":
      return <School className="h-8 w-8 " />;
    case "services_amenities":
      return <Heater className="h-7 w-7" />;
    case "hotel_surroundings":
      return <Leaf className="h-8 w-8" />;
    case "policies":
      return <Siren className="h-8 w-8 " />;
    case "map":
      return <MapPinned className="h-8 w-8 " />;
    case "fine_print":
      return <PrinterCheck className="h-8 w-8 " />;
    case "travellers_questions":
      return <ShieldQuestion className="h-8 w-8 " />;
    default:
      return null;
  }
};
