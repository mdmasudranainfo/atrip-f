import Link from "next/link";
import DefaultBanner from "../banner/defaultBanner/page";
import Brands from "../cards/brands/page";
import DefaultCarCard from "../cards/cars/defaultCarCard/page";
import RentalCarCard from "../cards/cars/rentalCarCard/page";
import DefaultHotelCard from "../cards/hotel/DefaultHotelCard/page";
import RecommendedCard from "../cards/recommendedCard/page";
import DefaultTourCardSlider from "../cards/tour/DefaultTourCard/page";
import DefaultUmrahCard from "../cards/umrah/defaultUmrahCard/page";
import DefaultVisaCard from "../cards/visa/defaultVisaCard/page";
import { TransparentNavbar } from "../header/transparentNav/TransparentNav";
import OfferSlide from "./sliders/offerSlide/page";
import { Button } from "../ui/button";
import RecommendedTransportCard from "../cards/recommendedCard/RecommendedTransportCard";

const LandingPage = () => {
  return (
    <section>
      <header className="bg-white">
        <div className="container mx-auto">
          <TransparentNavbar isBgWhite={true} />{" "}
        </div>
      </header>

      <section>
        <DefaultBanner />
      </section>

      <main>
        {/* carosol */}
        {/* <section className="md:mt-[50px] mt-0 mb-[70px]">
          <div className="container mx-auto px-6 sm:px-0 overflow-hidden">
            <OfferSlide />
          </div>
        </section> */}

        {/* Attractions section */}
        <section className="pt-11 container mx-auto mt-0 sm:mt-[62px] overflow-hidden pb-5">
          <h1 className="md:landingHeaderTxt md:mb-6 md:text-[40px] text-[22px] leading-[23px] text-center mb-3 font-semibold mx-2">
            Recommended Attractions{" "}
          </h1>
          <div className="flex justify-end md:mb-6 mb-2">
            <Link href={"/activities"}>
              <Button variant={"primary"}>See More</Button>
            </Link>
          </div>

          <div className="recommended-slick-area mx-auto">
            <RecommendedCard />
          </div>
        </section>

        <section className="pt-11 container mx-auto mt-0 sm:mt-[62px] overflow-hidden pb-5">
          <h1 className="md:landingHeaderTxt md:mb-6 md:text-[40px] text-[22px] leading-[23px] text-center mb-3 font-semibold mx-2">
            Recommended Transports{" "}
          </h1>
          <div className="flex justify-end md:mb-6 mb-2">
            <Link href={"/transports"}>
              <Button variant={"primary"}>See More</Button>
            </Link>
          </div>

          <div className="recommended-slick-area mx-auto">
            <RecommendedTransportCard />
          </div>
        </section>

        {/* Chauffeur section */}
        {/* <div className=" mt-5 sm:mt-24 w-full bg-white-cloudy overflow-hidden">
          <section className="container mx-auto pt-7 sm:pt-[100px] pb-8 sm:pb-20 overflow-hidden">
            <h1 className="md:landingHeaderTxt md:mb-12 md:text-[40px] text-[22px] leading-[23px] text-center mb-3 font-semibold mx-2">
              Your Private Chauffeur for all your journeys
            </h1>
            <div className="private-chauffeur-slick-area mx-auto overflow-hidden">
              <DefaultCarCard path={"chauffeur-with-car"} />
            </div>
          </section>
        </div> */}

        {/* Vacation/Tour card section */}
        {/* <div className="w-full pt-5 sm:pt-24  overflow-hidden">
          <section className=" container mx-auto pb-8 sm:pb-[110px] px-2 sm:px-0 overflow-hidden">
            <h1 className="md:landingHeaderTxt md:mb-12 md:text-[40px] md:leading-[40px] text-[22px] leading-[25px] text-center mb-3 font-semibold">
              Top Destination for your Vacation
            </h1>
            <div className="top-destination-slick-area container mx-auto px-0 sm:px-3 ">
              <DefaultTourCardSlider />
            </div>
          </section>
        </div> */}

        {/* Hotel section */}
        {/* <div className="w-full bg-white-cloudy overflow-hidden">
          <section className="container mx-auto pt-10 sm:pt-[100px] pb-10 sm:pb-[110px] px-2 sm:px-0 overflow-hidden">
            <h1 className="md:landingHeaderTxt md:mb-12 md:text-[40px] text-[25px] leading-[25px] text-center mb-3 font-semibold">
              Best Hotels for Your Next Trip
            </h1>
            <div className="next-trip-slick-area mx-auto px-0 sm:px-3 ">
              <DefaultHotelCard featured={true} />
            </div>
          </section>
        </div> */}

        {/* Fleets for rent  */}
        {/* <div className="w-full bg-white-lightSlate overflow-hidden">
          <section className="container mx-auto pt-10 sm:pt-[100px] pb-10 sm:pb-[20px] px-2 sm:px-0">
            <h1 className="md:landingHeaderTxt md:mb-12 md:text-[40px] text-[25px] leading-[25px] text-center mb-3 font-semibold">
              Fleets for Rentals
            </h1>
            <div className="rental-fleets-slick-area mx-auto px-0 sm:px-3 ">
              <RentalCarCard cardItemNumber={3} />
            </div>
          </section>
        </div> */}

        {/* Chauffeur with car section */}
        {/* <div className=" mt-5 sm:mt-20 w-full bg-white-cloudy overflow-hidden">
          <section className="container mx-auto pt-7 sm:pt-[100px] pb-8 sm:pb-20 overflow-hidden">
            <h1 className="md:landingHeaderTxt md:mb-12 md:text-[40px] text-[22px] leading-[23px] text-center mb-3 font-semibold mx-2">
              Your Private Chauffeur for all your journeys
            </h1>
            <div className="private-chauffeur-slick-area mx-auto px-2 sm:px-3 overflow-hidden">
              <DefaultCarCard path={"chauffeur"} />
            </div>
          </section>
        </div> */}

        {/* Visa card section  */}
        {/* <div className="w-full bg-white-lightSlate overflow-hidden">
          <section className="container mx-auto pt-10 sm:pt-[100px] pb-10 sm:pb-[110px] px-2 sm:px-0 overflow-hidden">
            <h1 className="md:landingHeaderTxt md:mb-12 md:text-[40px] text-[25px] leading-[25px] text-center mb-3 font-semibold">
              Visa Services
            </h1>
            <div className="mx-auto px-0 sm:px-3 ">
              <DefaultVisaCard />
            </div>
          </section>
        </div> */}

        {/* umrah section */}
        {/* <div className="w-full bg-white-cloudy overflow-hidden">
          <section className="container mx-auto pt-10 sm:pt-[100px] pb-10 sm:pb-[90px] px-2 sm:px-0">
            <h1 className="md:landingHeaderTxt md:mb-12 md:text-[40px] text-[25px] leading-[25px] text-center mb-3 font-semibold">
              Umrah Packages
            </h1>
            <div className="umrah-slick-area mx-auto px-0 sm:px-3 ">
              <DefaultUmrahCard />
            </div>
          </section>
        </div> */}

        {/* Visa card section  */}
        {/* <div className="w-full bg-white-lightSlate">
          <section className="container mx-auto pb-10 sm:pb-[80px] pt-10 sm:pt-[100px] px-3 sm:px-0">
            <h1 className="font-medium md:text-[28px] text-[20px] leading-7 md:mb-10 mb-3 text-center">
              Helping to grow the next generation of{" "}
              <span className="font-semibold">100+</span> flights
            </h1>
            <div className="mx-auto px-0 sm:px-3 ">
              <Brands />
            </div>
          </section>
        </div> */}
      </main>
    </section>
  );
};

export default LandingPage;
