import HolidayCard from "@/components/cards/tour/TourCard/TourCard";
import { TransparentNavbar } from "@/components/header/transparentNav/TransparentNav";
import TourFilter from "@/components/tour/tourFilter/TourFilter";
import TourItemSorting from "@/components/tour/tourFilter/TourItemSorting";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Filter, X } from "lucide-react";
import { getTours } from "@/lib/actions/tour-action";
import { Suspense } from "react";
import ResultNotFound from "@/components/notFound/page";
import Pagination from "@/components/pagination/Pagination";
import { TourData } from "@/types/tourTypes";
import FilterServiceGroup from "@/components/filter/filter-service-group";
import { getSelectedLocation } from "@/lib/actions/location-action";

const Tour = async ({ searchParams }: any) => {
  const params = await searchParams;
  const hasLocation = !!params.location_id;

  const { attributes, data: tourData, page, total_page, total, priceRange } = await getTours(params);

  // pagination
  const currentPage = Number(page) || 1;

  const createQueryString = (newPage: number) => {
    const query = new URLSearchParams(String(searchParams));
    query.set("page", newPage.toString());
    return `?${query.toString()}`;
  };

  const selectedLocations = hasLocation
    ? await getSelectedLocation([params.location_id])
    : [];

  return (
    <div>
      <div className="relative h-full :max-h-[600px] bg-about-us w-full  from-blue-900 via-blue-950 to-blue-950">
        <div className="bg-[#00000066] h-full w-full absolute top-0 bottom-0"></div>
        <TransparentNavbar isBgWhite={false} />
        <FilterServiceGroup
          label="Holiday"
          defaultValue="holiday"
          selectedLocations={selectedLocations}
        />
      </div>
      <div className="container mx-auto mt-8 flex flex-col md:flex-row lg:space-x-8 space-x-0 items-start px-4 sm:px-0 mb-[40px]">
        <div className="lg:block hidden w-full max-w-xs ">
          <TourFilter attributes={attributes || []} params={params} baseUrl="/tour" priceRange={priceRange} />
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
                <Suspense fallback={<div>Loading...</div>}>
                  <TourFilter attributes={attributes || []} params={params} baseUrl="/tour" priceRange={priceRange} />
                </Suspense>
              </ScrollArea>
            </DrawerContent>
          </Drawer>
        </div>

        <div className="w-full flex flex-col">
          <TourItemSorting propertyCount={total} />
          {tourData?.length > 0 ? (
            <div className="w-full sm:flex-1 max-w-6xl">
              {tourData?.map((tour: TourData, index: number) => (
                <div className="mt-4" key={index}>
                  <HolidayCard tour={tour} />
                </div>
              ))}
                <Pagination
                  currentPage={currentPage}
                  totalPages={total_page}
                  createQueryString={createQueryString}
                  baseUrl="/tour"
                />
            </div>
          ) : (
            <ResultNotFound />
          )}
        </div>
      </div>
    </div>
  );
};

export default Tour;
