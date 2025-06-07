import FlightFilter from "@/components/flight/FlightFilter";
import { FlightVerticalCard } from "@/components/flight/flightVerticalCard/FlightVerticalCard";
import { TransparentNavbar } from "@/components/header/transparentNav/TransparentNav";
import Pagination from "@/components/pagination/Pagination";

import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { ScrollArea } from "@/components/ui/scroll-area";
import { getAllFlight } from "@/lib/actions/flight-action";
import { FlightDatas } from "@/types/flightTypes";
import { Filter, X } from "lucide-react";
import ItemSorting from "@/components/hotels/hotelFilter/ItemSorting";
import FilterServiceGroup from "@/components/filter/filter-service-group";
import { getSelectedLocation } from "@/lib/actions/location-action";

const Flight = async ({ searchParams }: { searchParams: any }) => {
  const params = await searchParams;

  const locationIds = [];
  if (params.from_where) {
    locationIds.push(Number(params.from_where));
  }

  if (params.to_where) {
    locationIds.push(Number(params.to_where));
  }

  const selectedLocations = locationIds.length
    ? await getSelectedLocation(locationIds)
    : [];

  const { data, total, total_page, priceRange } = await getAllFlight(params);

  const {
    rows: flightData,
    seatType,
    seo_meta,
    list_location,
    flight_min_max_price,
    attributes,
  } = data;

  const currentPage = Number(flightData?.current_page) || 1;

  const createQueryString = (newPage: number) => {
    const query = new URLSearchParams(String(searchParams));
    query.set("page", newPage.toString());
    return `?${query.toString()}`;
  };

  return (
    <>
      <div className="relative h-full :max-h-[600px] bg-about-us w-full from-blue-900 via-blue-950 to-blue-950 pb-14 md:pb-0">
        <div className="bg-[#00000066] h-full w-full absolute top-0 bottom-0"></div>
        <TransparentNavbar isBgWhite={false} />
        <FilterServiceGroup
          label="Flight"
          defaultValue="flight"
          selectedLocations={selectedLocations}
        />
      </div>

      <div className="container mx-auto mt-8 flex flex-col md:flex-row lg:space-x-8 space-x-0 items-start px-4 sm:px-0">
        <div className="lg:block hidden w-full max-w-xs ">
          <FlightFilter
            attributes={attributes || []}
            params={params}
            baseUrl={"/flight"}
            priceRange={priceRange}
          />
        </div>

        <div className="lg:hidden block relative">
          <Drawer>
            <div className="fixed bottom-3 left-1/2 transform -translate-x-1/2 z-10">
              <DrawerTrigger className=" bg-primary px-4 h-8 text-white rounded-xl font-medium text-sm flex items-center gap-1.5">
                <Filter size={14} />
                Filter
              </DrawerTrigger>
            </div>

            <DrawerContent className=" h-[90vh]">
              <DrawerClose className="flex justify-end pe-5">
                <X className="w-5 h-5" />
              </DrawerClose>
              <ScrollArea className=" w-full rounded-md ">
                <FlightFilter
                  attributes={attributes || []}
                  params={params}
                  baseUrl={"/flight"}
                  priceRange={priceRange}
                />
              </ScrollArea>
            </DrawerContent>
          </Drawer>
        </div>

        <div className="w-full sm:flex-1 max-w-6xl">
          <div className="lg:block hidden w-full ps-4  ">
            <ItemSorting propertyCount={total || 0} label="flights" />
          </div>
          {flightData?.data?.map((flight: FlightDatas) => (
            <div className="p-4" key={flight?.id}>
              <FlightVerticalCard flight={flight} />
            </div>
          ))}

          <Pagination
            currentPage={currentPage}
            totalPages={total_page}
            createQueryString={createQueryString}
            baseUrl="/flight"
          />
        </div>
      </div>
    </>
  );
};

export default Flight;
