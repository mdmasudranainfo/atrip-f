import UmrahCard from "@/components/cards/umrah/verticalCard.tsx/UmrahCard";
import { TransparentNavbar } from "@/components/header/transparentNav/TransparentNav";
import UmrahFilter from "@/components/umrah/UmrahFilter";
import UmrahItemSorting from "@/components/umrah/UmrahItemSorting";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Filter, X } from "lucide-react";
import { getUmrah } from "@/lib/actions/umrah-actions";
import Pagination from "@/components/pagination/Pagination";
import { TourData } from "@/types/tourTypes";
import ResultNotFound from "@/components/notFound/page";
import FilterServiceGroup from "@/components/filter/filter-service-group";

const Umrah = async ({ searchParams }: any) => {
  const params = await searchParams;
  const { attributes, data: tourData, page, total_page, total, priceRange } = await getUmrah(params);

  // pagination
  const currentPage = Number(page) || 1;

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
          label="Umrah"
          defaultValue="umrah"
          selectedLocations={[]}
        />
      </div>
      {/*  */}
      <div className="container mx-auto mt-8 flex flex-col md:flex-row lg:space-x-8 space-x-0 items-start px-4 sm:px-0 mb-[40px]">
        <div className="lg:block hidden w-full max-w-xs ">
          <UmrahFilter attributes={attributes || []} params={params} baseUrl="/umrah" priceRange={priceRange} />
        </div>

        {/* filter for mobile */}
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
                <UmrahFilter attributes={attributes || []} params={params} baseUrl="/umrah" priceRange={priceRange} />
              </ScrollArea>
            </DrawerContent>
          </Drawer>
        </div>

        <div className="w-full sm:flex-1 max-w-6xl mb-5">
          <UmrahItemSorting propertyCount={total} />
          {tourData?.length > 0 ? (
            <div className="w-full sm:flex-1 max-w-6xl">
              {tourData?.map((tour: TourData, index: number) => (
                <div className="mt-4" key={index}>
                  <UmrahCard tour={tour} />
                </div>
              ))}
              <Pagination
                currentPage={currentPage}
                totalPages={total_page}
                createQueryString={createQueryString}
                baseUrl="/umrah"
              />
            </div>
          ) : (
            <ResultNotFound />
          )}
        </div>
      </div>
    </>
  );
};

export default Umrah;
