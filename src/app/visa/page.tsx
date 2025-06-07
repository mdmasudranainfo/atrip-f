import VisaCard from "@/components/cards/visa/verticalVisaCard/VisaCard";
import { TransparentNavbar } from "@/components/header/transparentNav/TransparentNav";
import VisaFilter from "@/components/visa/VisaFilter";
import VisatemSorting from "@/components/visa/VisaItemSorting";
import ResultNotFound from "@/components/notFound/page";
import Pagination from "@/components/pagination/Pagination";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Filter, X } from "lucide-react";
import { getVisas } from "@/lib/actions/visa-action";
import FilterServiceGroup from "@/components/filter/filter-service-group";
import { getSelectedLocation } from "@/lib/actions/location-action";

const Visa = async ({ searchParams }: any) => {
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

  const result = await getVisas(params) || { data: [], page: 0, total_page: 0, total: 0, attributes: [], priceRange: [0, 100] };
  const {attributes, data, page, total_page, total, priceRange } = result;

  const currentPage = Number(page) || 1;

  const createQueryString = (newPage: number) => {
    const query = new URLSearchParams(params);
    query.set("page", newPage.toString());
    return `?${query.toString()}`;
  };

  interface Visa {
    id: string | number;
    title: string;
    working_day: string;
    price: number;
    image_url: string;
    overview: string;
    review_data: {
      score_total: number;
      total_review: number;
      score_text: string;
    };
    slug: string;
  }

  return (
    <div>
      <div className="relative h-full :max-h-[600px] bg-about-us w-full from-blue-900 via-blue-950 to-blue-950 pb-14 md:pb-0">
        <div className="bg-[#00000066] h-full w-full absolute top-0 bottom-0"></div>
        <TransparentNavbar isBgWhite={false} />
        <FilterServiceGroup
          label="Visa"
          defaultValue="visa"
          selectedLocations={selectedLocations}
        />
      </div>

      <div className="container mx-auto mt-8 flex flex-col md:flex-row lg:space-x-8 space-x-0 items-start px-4 sm:px-0 mb-[40px]">
        <div className="lg:block hidden w-full max-w-xs ">
          <VisaFilter attributes={attributes|| []} params={params} baseUrl="/visa" priceRange={priceRange} />
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
                <VisaFilter attributes={attributes|| []} params={params} baseUrl="/visa" priceRange={priceRange} />
              </ScrollArea>
            </DrawerContent>
          </Drawer>
        </div>
        {/*  */}

        <div className="w-full sm:flex-1 max-w-6xl">
          <VisatemSorting propertyCount={total} label="vias" />
          {data?.length > 0 ? (
            <div>
              {data.map((visa: Visa, index: number) => (
                <div className="mt-4" key={visa.id || index}>
                  <VisaCard visa={visa} />
                </div>
              ))}
              <Pagination
                currentPage={currentPage}
                totalPages={total_page}
                createQueryString={createQueryString}
                baseUrl="/visa"
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

export default Visa;
