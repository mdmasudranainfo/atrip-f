import FilterServiceGroup from "@/components/filter/filter-service-group";

export default async function DefaultBanner() {
  return (
    <div
      className={`relative pt-7 lg:py-[100px] bg-about-us w-full pb-16 md:pb-0`}
    >
      <div className="bg-[#00000066] h-full w-full absolute top-0 bottom-0"></div>
      {/*  contents-- */}
      <div className="hero-area relative mx-auto">
        <div className="hero-area-content md:text-center">
          <h1 className="text-[30px] text-white md:text-[60px] font-semibold leading-[30px] md:leading-[58px] md:mt-0 font-sans tracking-tight">
            Welcome to <span className="font-bold">atrip.ae!</span>
          </h1>
          <p className=" md:mt-4 text-white mt-0 font-medium md:text-xl text-md leading-7 font-sans tracking-wider">
            {/* Find cars, flights, hotels, visa & holidays */}
            Find transports and attractions
          </p>
        </div>

        <FilterServiceGroup defaultValue="activities" selectedLocations={[]} />
      </div>
    </div>
  );
}
