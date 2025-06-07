import { TransparentNavbar } from "@/components/header/transparentNav/TransparentNav";
import VisaFilter from "@/components/visa/VisaFilter";
import VisatemSorting from "@/components/visa/VisaItemSorting";
import A2aVisaCard from "../cards/a2aVisa/verticalA2aVisaCard/A2aVisaCard";
import A2aVisaSearchData from "./a2a-visaSearchData/A2aVisaSearchData";

const A2AVisa = async ({ searchParams }: { searchParams: any }) => {

  const params = await searchParams;

  
  return (
    <div>
      <div className="max-h-[600px] w-full bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-900 via-blue-950 to-blue-950">
        <TransparentNavbar isBgWhite={false} />
        <div className="w-full container pb-16 pt-8 m-auto">
          <div className="max-w-6xl m-auto">
            <h1 className="mb-4 text-2xl sm:text-5xl font-bold text-white md:mx-0 mx-3">
              A2A Visa
            </h1>
            <A2aVisaSearchData selectedLocations={[]} />
          </div>
        </div>
      </div>
      <div className="container mx-auto mt-8 flex space-x-8 items-start">
        <VisaFilter attributes={[]} params={params} baseUrl={"/a2a-visa"} />
        <div className="flex-1">
          {/* ✅ Fixed: Added the missing "label" prop */}
          <VisatemSorting label="Sort by" propertyCount={250} />

          {[...Array(5)].map((_, index) => (
            <div className="mt-4" key={index}>
              {/* <A2aVisaCard {...cardItem} /> */}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default A2AVisa;
