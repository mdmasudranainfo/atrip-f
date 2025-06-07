import CarCard from "@/components/cards/cars/verticalCard/CarCard";
import CarsFilter from "@/components/cars/CarsFilter";
import { TransparentNavbar } from "@/components/header/transparentNav/TransparentNav";
import ResultNotFound from "@/components/notFound/page";
import Pagination from "@/components/pagination/Pagination";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { ScrollArea } from "@/components/ui/scroll-area";
import { getAllCars } from "@/lib/actions/car-actions";
import { ICar } from "@/types/carTypes";
import { Filter, X } from "lucide-react";
import FilterServiceGroup from "@/components/filter/filter-service-group";
import ItemSorting from "@/components/hotels/hotelFilter/ItemSorting";
import { getSelectedLocation } from "@/lib/actions/location-action";

const Cars = async ({ searchParams }: any) => {

  const params = await searchParams;
  const { attributes, data, page, total_page, total, priceRange } = await getAllCars(params);

  const currentPage = Number(page) || 1;

  const hasLocation = !!params.location_id;

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
          label="Cars"
          defaultValue="cars"
          selectedLocations={selectedLocations}
        />
      </div>
      {/*  */}
      <div className="container mx-auto mt-8 flex flex-col md:flex-row lg:space-x-8 space-x-0 items-start px-4 sm:px-0 mb-[40px]">
        <div className="lg:block hidden w-full max-w-xs ">
          <CarsFilter attributes={attributes} params={params} baseUrl="/cars" priceRange={priceRange} />
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
                <CarsFilter attributes={attributes} params={params} baseUrl="/cars" priceRange={priceRange} />
              </ScrollArea>
            </DrawerContent>
          </Drawer>
        </div>

        <div className="w-full sm:flex-1 max-w-6xl">
          <ItemSorting propertyCount={total || 0} label="cars" />
          {data?.length > 0 ? (
            <div>
              {data.map((car: ICar, index: number) => (
                <div className="mt-4" key={index}>
                  <CarCard car={car} />
                </div>
              ))}
              <Pagination
                currentPage={currentPage}
                totalPages={total_page}
                createQueryString={createQueryString}
                baseUrl="/cars"
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

export default Cars;
