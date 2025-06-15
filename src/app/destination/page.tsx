import { TransparentNavbar } from "@/components/header/transparentNav/TransparentNav";
import DestinationList from "./DestinationList";

const DestinationPage = () => {
  return (
    <>
      <div className="relative h-full max-h-[600px] bg-about-us w-full from-blue-900 via-blue-950 to-blue-950">
        <div className="bg-[#00000066] h-full w-full absolute top-0 bottom-0"></div>
        <TransparentNavbar isBgWhite={false} />
        <div className="w-full container pb-20 pt-12 m-auto relative z-9">
          <h1 className="mb-4 text-5xl font-bold text-white text-center">
            Popular Destinations
          </h1>
          <div className="flex justify-center items-center gap-2">
            <span className="text-white">Home</span>
            <div className="w-1 h-1 bg-white rounded-full"></div>
            <span className="text-white">Destinations</span>
          </div>
        </div>
      </div>

      <DestinationList />
    </>
  );
};

export default DestinationPage;