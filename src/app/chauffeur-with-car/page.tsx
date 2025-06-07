import FAQAccordion from "@/components/chauffeur/ChauffeurFaqAccordion";
import { TransparentNavbar } from "@/components/header/transparentNav/TransparentNav";
import { ChauffeurFeatures, ChauffeurServices } from "@/utils/Constant";
import Image from "next/image";
import { getChauffeur } from "@/lib/actions/chauffeurwithcar-action";
import { getSelectedLocation } from "@/lib/actions/location-action";
import FilterServiceGroup from "@/components/filter/filter-service-group";
import CarDriverCard from "@/components/cards/cars/carDriverCard/page";
import { Suspense } from "react";
import ChauffeurFilter from "@/components/chauffeur/chauffeur-filter";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Filter, X } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import ItemSorting from "@/components/hotels/hotelFilter/ItemSorting";
import { ICar } from "@/types/carTypes";
import CarCard from "@/components/cards/cars/verticalCard/CarCard";
import Pagination from "@/components/pagination/Pagination";
import ResultNotFound from "@/components/notFound/page";

const Chauffeur = async ({ searchParams }: any) => {
  const params = await searchParams;
  const hasLocation = !!params.location_id;

  const result = (await getChauffeur(params)) || {
    data: [],
    page: 0,
    total_page: 0,
    total: 0,
    attributes: [],
    priceRange: [1, 100],
  };
  const { data, page, total_page, total, attributes, priceRange } =
    result || {};

  const selectedLocations = hasLocation
    ? await getSelectedLocation([params.location_id])
    : [];

  const currentPage = Number(page) || 1;
  const createQueryString = (newPage: number) => {
    const query = new URLSearchParams(params);
    query.set("page", newPage.toString());
    return `?${query.toString()}`;
  };

  return (
    <div>
      <div className="relative h-full :max-h-[600px] bg-about-us w-full  from-blue-900 via-blue-950 to-blue-950">
        <div className="bg-[#00000066] h-full w-full absolute top-0 bottom-0"></div>
        <TransparentNavbar isBgWhite={false} />
        <FilterServiceGroup
          label="Hire Personal Car with Driver"
          defaultValue="chauffeur-with-car"
          selectedLocations={selectedLocations}
        />
      </div>

      {hasLocation && (
        <div className="container mx-auto mt-8 flex flex-col md:flex-row lg:space-x-8 space-x-0 items-start px-4 sm:px-0">
          <div className="lg:block hidden w-full max-w-xs ">
            {/* <HotelFilter /> */}
            <Suspense fallback={<div>Loading filters...</div>}>
              <ChauffeurFilter
                attributes={attributes || []}
                params={params}
                baseUrl="/chauffeur"
                priceRange={priceRange}
              />
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
                    <ChauffeurFilter
                      attributes={attributes || []}
                      params={params}
                      baseUrl="/chauffeur-with-car"
                      priceRange={priceRange}
                    />
                  </Suspense>
                </ScrollArea>
              </DrawerContent>
            </Drawer>
          </div>

          <div className="w-full sm:flex-1 max-w-6xl">
            <ItemSorting propertyCount={total || 0} label="properties" />

            {data?.length > 0 ? (
              <div>
                {data.map((car: ICar, index: number) => (
                  <div className="mt-4" key={index}>
                    <CarCard car={car} basePath="chauffeur-with-car" />
                  </div>
                ))}
                <Pagination
                  currentPage={currentPage}
                  totalPages={total_page}
                  createQueryString={createQueryString}
                  baseUrl="/chauffeur-with-car"
                />
              </div>
            ) : (
              <ResultNotFound />
            )}
          </div>
        </div>
      )}

      {!hasLocation && (
        <div className="container mx-auto flex space-x-8 items-start">
          <section className="w-full bg-white-lightSlate px-0 xl:px-5 2xl:px-0">
            <div className="md:pb-16 pb-6 mt-6 md:mt-24 mx-auto px-0">
              <h1 className="text-2xl font-bold tracking-tight sm:text-3xl lg:text-5xl text-center md:mb-3 mb-1s">
                Plans that fit your scale
              </h1>
              <p className="text-center text-[#1A1A1A] md:mb-12 mb-2 md:text-lg text-[13px] md:leading-5 leading-[12px]">
                There is no more comfortable, reliable and stylish way to travel{" "}
              </p>
              <div>
                {data?.length > 0 && (
                  <div className="mt-4">
                    <CarDriverCard data={data} basePath="chauffeur-with-car" />
                  </div>
                )}
              </div>
            </div>
          </section>
        </div>
      )}
      {/* Features */}
      {!hasLocation && (
        <div className=" bg-white m-auto">
          <div className="container mx-auto px-4 md:py-16 py-8">
            <div className="flex flex-col md:flex-row justify-between gap-8 ">
              {ChauffeurFeatures.map((feature) => (
                <div
                  key={feature.title}
                  className="flex flex-col items-center text-center"
                >
                  <div className="mb-6">
                    <feature.icon
                      className="w-12 h-12 text-[#0051FF]"
                      strokeWidth={1.5}
                    />
                  </div>
                  <h3 className="text-xl font-semibold mb-4">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed max-w-sm">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
          {/* Service */}
          <div className="container mx-auto px-4 py-4">
            <div className="md:space-y-24 space-y-10">
              {ChauffeurServices.map((service, index) => (
                <div
                  key={service.title}
                  className={`flex flex-col md:gap-8 gap-4 items-center ${
                    service.imagePosition === "left"
                      ? "md:flex-row"
                      : "md:flex-row-reverse"
                  }`}
                >
                  <div className="flex-1 md:space-y-4 space-y-1">
                    <h2 className="md:text-4xl text-[22px] md:leading-[40px] leading-[24px] font-bold tracking-tight">
                      {service.title}
                    </h2>
                    <p className="text-gray-600 md:text-[18px] md:leading-7 text-[15px] leading-[17px]">
                      {service.description}
                    </p>
                  </div>
                  <div className="flex-1">
                    <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
                      <Image
                        src={
                          "https://images.pexels.com/photos/9519974/pexels-photo-9519974.jpeg?auto=compress&cs=tinysrgb&w=600"
                        }
                        width={600}
                        height={400}
                        alt={service.title}
                        className="object-cover w-full h-full"
                        priority
                        unoptimized
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
      {/* FAQAccordion */}
      {!hasLocation && (
        <div>
          <FAQAccordion />
        </div>
      )}
    </div>
  );
};

export default Chauffeur;
//
