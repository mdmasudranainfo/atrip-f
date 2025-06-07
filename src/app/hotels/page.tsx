import DefaultHotelCard from "@/components/cards/hotel/DefaultHotelCard/page";
import HotelCard from "@/components/cards/hotel/hotelResultCard/HotelResultCard";
import { TransparentNavbar } from "@/components/header/transparentNav/TransparentNav";
import HotelFilter from "@/components/hotels/hotelFilter/HotelFilter";
import ItemSorting from "@/components/hotels/hotelFilter/ItemSorting";
import ResultNotFound from "@/components/notFound/page";
import Pagination from "@/components/pagination/Pagination";

import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { ScrollArea } from "@/components/ui/scroll-area";
import { getHotels } from "@/lib/actions/hotel-action";
import { HotelType } from "@/types/hotel-types";
import { Filter, X } from "lucide-react";
import Head from "next/head";
import { Suspense } from "react";
import FilterServiceGroup from "@/components/filter/filter-service-group";
import { getSelectedLocation } from "@/lib/actions/location-action";

const Hotels = async ({ searchParams }: any) => {
  const params = await searchParams;

  const hasLocation = !!params.location_id;

  const result = hasLocation
    ? await getHotels(params)
    : { attributes: [], data: [], page: 0, total_page: 0, total: 0, priceRange: [0, 100], tax_rate: 0 };
  const { attributes, data, page, total_page, total, priceRange, tax_rate } = result || {};

  const currentPage = Number(page) || 1;

  const createQueryString = (newPage: number) => {
    const query = new URLSearchParams(params);
    query.set("page", newPage.toString());
    return `?${query.toString()}`;
  };

  const selectedLocations = hasLocation
    ? await getSelectedLocation([params.location_id])
    : [];

  return (
    <>
      <Head>
        <title>Hotels List</title>
        <meta name="title" content={"Hotels List"} />
        <meta name="description" content={"Browse our list of hotels"} />
      </Head>
      <div>
        <div className="relative h-full :max-h-[600px] bg-about-us w-full from-blue-900 via-blue-950 to-blue-950 pb-14 md:pb-0">
          <div className="bg-[#00000066] h-full w-full absolute top-0 bottom-0"></div>
          <TransparentNavbar isBgWhite={false} />
          <FilterServiceGroup
            label="Hotels"
            defaultValue="hotel"
            selectedLocations={selectedLocations}
          />
        </div>

        {hasLocation ? (
          <div className="container mx-auto mt-8 flex flex-col md:flex-row lg:space-x-8 space-x-0 items-start px-4 sm:px-0">
            <div className="lg:block hidden w-full max-w-xs ">
              {/* <HotelFilter /> */}
              <Suspense fallback={<div>Loading filters...</div>}>
                <HotelFilter attributes={attributes || []} params={params} baseUrl="/hotels" priceRange={priceRange} />
              </Suspense>
            </div>
            <div className="lg:hidden block relative">
              <Drawer>
                <div className="fixed bottom-3 left-1/2 transform -translate-x-1/2 z-10">
                  <DrawerTrigger className=" bg-primary px-4 h-8 text-white rounded-xl font-medium text-sm flex items-center gap-1.5">
                    <Filter size={14} />
                    Filter
                  </DrawerTrigger>
                </div>

                <DrawerContent className="h-[90vh] w-full">
                  <DrawerClose className="flex justify-end pe-5">
                    <X className="w-5 h-5" />
                  </DrawerClose>
                  <ScrollArea className=" w-full rounded-md ">
                    <Suspense fallback={<div>Loading...</div>}>
                      <HotelFilter attributes={attributes || []} params={params} baseUrl="/hotels" priceRange={priceRange} />
                    </Suspense>
                  </ScrollArea>
                </DrawerContent>
              </Drawer>
            </div>

            <div className="w-full sm:flex-1 max-w-6xl">
              <ItemSorting propertyCount={total || 0} label="properties" />

              {data?.length > 0 ? (
                <div>
                  {data.map((hotel: HotelType, index: number) => (
                    <div className="mt-4" key={index}>
                      <HotelCard hotel={hotel} taxRate={tax_rate || 0} />
                    </div>
                  ))}
                  <Pagination
                    currentPage={currentPage}
                    totalPages={total_page}
                    createQueryString={createQueryString}
                    baseUrl="/hotels"
                  />
                </div>
              ) : (
                <ResultNotFound />
              )}
            </div>
          </div>
        ) : (
          <div className="container mx-auto my-10">
            <DefaultHotelCard featured={false}/>
          </div>
        )}
      </div>
    </>
  );
};

export default Hotels;
