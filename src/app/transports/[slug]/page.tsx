import { TransparentNavbar } from "@/components/header/transparentNav/TransparentNav";
import { ImageGallery } from "@/components/imageGellery/ImageGellery";

import { getTransportsBySlug } from "@/lib/actions/transport-actions";
import { getComparePrice, getSellPrice } from "@/lib/utils";
import { ArrowLeft, MapPin } from "lucide-react";
import Link from "next/link";

import { notFound } from "next/navigation";

import TransportTabSection from "@/components/transports/transport-tab-section";
import { getSelectedLocation } from "@/lib/actions/location-action";
import StickyTabs from "@/components/activities/activitiesDetails/TabNav";

const TransportDetails = async (context: {
  params: Promise<{ slug: string }>;
  searchParams: any;
}) => {
  const params = await context.params;
  const query = await context.searchParams;
  const slug = params.slug;

  if (!slug) {
    notFound();
  }

  const { data: transport, reviews } = await getTransportsBySlug(slug);
  if (!transport?.id) {
    notFound();
  }

  const locationIds = [];
  if (query.location_id) {
    locationIds.push(Number(query.location_id));
  }

  const selectedLocations = locationIds.length
    ? await getSelectedLocation(locationIds)
    : [];

  const sellPrice = getSellPrice(transport.price, transport.sale_price);
  const comparePrice = getComparePrice(transport.price, transport.sale_price);

  const elId = "transport-checkout";

  const GelleryImage = [...transport.gallery].reverse();

  const tabItems = [
    { value: "overview", label: "Car Highlights" },
    { value: "essentials", label: "Service Provided" }, //essentials
    { value: "choice", label: "Great choice for" },
    { value: "include", label: "Inclusions" },
    { value: "Best_option_for", label: "Best option for" },
    { value: "term", label: "Terms and conditions" }, // Best option for ->
    { value: "t&c", label: "Travelers Asking" },
  ];

  return (
    <div>
      <div className="relative h-full :max-h-[600px] bg-about-us w-full  from-blue-900 via-blue-950 to-blue-950">
        <div className="bg-[#00000066] h-full w-full absolute top-0 bottom-0"></div>
        <TransparentNavbar isBgWhite={false} />
      </div>
      <main className="container m-auto min-h-screen  py-8  ">
        <div className="bg-white md:py-6 md:p-6 rounded-xl  ">
          {/* Back Link */}
          <Link
            href="/transports"
            className="text-blue-600 hover:text-blue-800 text-sm mb-4 md:inline-block hidden px-2 md:px-0 "
          >
            <ArrowLeft className="h-4 w-4 inline-block mr-1 mb-[2px]" />
            Back
          </Link>
          {/* Header Section */}
          <div className="md:flex hidden px-2 md:px-0  flex-col md:flex-row justify-between items-start md:items-center mb-4 ">
            <div>
              <h1 className="text-2xl font-semibold text-gray-900 mb-2">
                {transport?.title}
              </h1>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <MapPin className="h-4 w-4" />
                <span>{transport.address}</span>
              </div>
              {/* {!!transport.extra_info && <TransportExtraService info={transport.extra_info} />} */}
            </div>
          </div>

          <ImageGallery
            data={transport}
            images={GelleryImage}
            title={"Transports"}
            star_rate={5}
            review_score={transport?.review_score}
            alt="Activities Images"
            reviews={reviews || []}
            review_count={0}
          />
        </div>

        {/* Tabs menu */}
        <div
          className="flex gap-8 w-full my-6 lg:flex-row flex-col-reverse"
          id={elId}
        >
          <div className="">
            <StickyTabs tabItems={tabItems} />
            <TransportTabSection
              selectedLocations={selectedLocations}
              car={transport}
            />
          </div>
        </div>
      </main>
    </div>
  );
};
export default TransportDetails;
