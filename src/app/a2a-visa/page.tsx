import FilterServiceGroup from "@/components/filter/filter-service-group";
import A2aVisaFilter from "@/components/a2AVisa/A2aVisaFilter";
import VisatemSorting from "@/components/visa/VisaItemSorting";
import A2aVisaCard from "@/components/cards/a2aVisa/verticalA2aVisaCard/A2aVisaCard";
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
import { Filter, X } from "lucide-react";
import { getA2AVisas } from "@/lib/actions/a2avisa-action";
import { getSelectedLocation } from "@/lib/actions/location-action";

const A2aVisa = async ({ searchParams }: any) => {
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


  const result = await getA2AVisas(params) || {attributes: [], data: [], page: 0, total_page: 0, total: 0, priceRange: [0, 100] };
  const { attributes, data, page, total_page, total, priceRange } = result;

  const currentPage = Number(page) || 1;

  const createQueryString = (newPage: number) => {
    const query = new URLSearchParams(params);
    query.set("page", newPage.toString());
    return `?${query.toString()}`;
  };

  interface Visa {
    id: string | number;
    title: string;
    country: { name: string };
    price: number;
    image_url: string;
    overview: string;
    review_data: {
      score_total: number;
      total_review: number;
    };
    slug: string;
  }

  return (
    <div>
      <div className="filter-bar relative h-full :max-h-[600px] bg-about-us w-full from-blue-900 via-blue-950 to-blue-950 pb-14 md:pb-0">
        <div className="bg-[#00000066] h-full w-full absolute top-0 bottom-0"></div>
        <TransparentNavbar isBgWhite={false} />
        <FilterServiceGroup
          label="A2A Visa"
          defaultValue="a2a-visa"
          selectedLocations={selectedLocations}
        />
      </div>
      {/*  */}

      <div className="container mx-auto mt-8 flex flex-col md:flex-row lg:space-x-8 space-x-0 items-start px-4 sm:px-0 mb-[40px]">
        <div className="lg:block hidden w-full max-w-xs ">
          <A2aVisaFilter attributes={attributes|| []} params={params} baseUrl="/a2a-visa" priceRange={priceRange} />
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
                <A2aVisaFilter attributes={attributes|| []} params={params} baseUrl="/a2a-visa" priceRange={priceRange} />
              </ScrollArea>
            </DrawerContent>
          </Drawer>
        </div>
        {/*  */}

        <div className="w-full sm:flex-1 max-w-6xl">
          <VisatemSorting propertyCount={total} label="a2a vias" />
          {data?.length > 0 ? (
            <div>
              {data.map((visa: Visa, index: number) => (
                <div className="mt-4" key={visa.id || index}>
                  <A2aVisaCard visa={visa} />
                </div>
              ))}
              <Pagination
                currentPage={currentPage}
                totalPages={total_page}
                createQueryString={createQueryString}
                baseUrl="/a2a-visa"
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

export default A2aVisa;
