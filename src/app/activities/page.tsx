import ActivitiesFilter from "@/components/activities/ActivitiesFilter";

import { TransparentNavbar } from "@/components/header/transparentNav/TransparentNav";

import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Filter, X } from "lucide-react";
import { siteConfig } from "@/config/site";
import { Metadata } from "next";
import { getActivities } from "@/lib/actions/activity-action";
import FilterServiceGroup from "@/components/filter/filter-service-group";
import Pagination from "@/components/pagination/Pagination";
import ResultNotFound from "@/components/notFound/page";
import ItemSorting from "@/components/hotels/hotelFilter/ItemSorting";
import { getSelectedLocation } from "@/lib/actions/location-action";
import InfiniteActivitiesList from "@/components/activities/InfiniteActivitiesList";

export const metadata: Metadata = {
  title: `Activities | ${siteConfig.name}`,
  description: `${siteConfig.description}`,
};

const Activities = async ({ searchParams }: any) => {
  const params = await searchParams;

  const hasLocation = !!params.location_id;

  const result = await getActivities(params);

  const { attributes, data, page, total_page, total, priceRange } =
    result || {};

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
    <div>
      <div className="relative h-full :max-h-[600px] bg-about-us w-full from-blue-900 via-blue-950 to-blue-950 pb-14 md:pb-0">
        <div className="bg-[#00000066] h-full w-full absolute top-0 bottom-0"></div>
        <TransparentNavbar isBgWhite={false} />
        <FilterServiceGroup
          label="Attraction"
          defaultValue="activities"
          selectedLocations={selectedLocations}
        />
      </div>

      <div className="container   mx-auto mt-8 flex flex-col md:flex-row lg:space-x-8 space-x-0 items-start px-4 sm:px-0 mb-[40px]">
        <div className="lg:block hidden w-full max-w-xs sticky top-0">
          <ActivitiesFilter
            attributes={attributes || []}
            params={params}
            baseUrl="/activities"
            priceRange={priceRange}
          />
        </div>

        {/*  */}
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
              <ScrollArea className="w-full rounded-md ">
                <ActivitiesFilter
                  attributes={attributes || []}
                  params={params}
                  baseUrl="/activities"
                  priceRange={priceRange}
                />
              </ScrollArea>
            </DrawerContent>
          </Drawer>
        </div>
        {/*  */}

        {/* Activities List */}
        <div className="w-full sm:flex-1 max-w-6xl">
          {/* <ItemSorting propertyCount={total || 0} label="activities" />
          {data && data?.length > 0 ? (
            <div>
              {data?.map((activity, index) => (
                <div className="mt-4 " key={activity.id}>
                  <ActivitiesCard
                    activity={activity}
                    location_id={params.location_id}
                  />
                </div>
              ))}
              <Pagination
                currentPage={currentPage}
                totalPages={total_page}
                createQueryString={createQueryString}
                baseUrl="/activities"
              />
            </div>
          ) : (
            <ResultNotFound />
          )} */}
          <InfiniteActivitiesList
            initialData={data}
            initialTotal={total}
            initialParams={params}
          />
        </div>
      </div>
    </div>
  );
};

export default Activities;
