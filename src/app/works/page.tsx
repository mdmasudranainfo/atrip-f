import ScheduleServiceFrom from "@/components/contactUs/scheduleServiceFrom/page";
import WhyChooseUs from "@/components/contactUs/whyChooseUs/page";
import { TransparentNavbar } from "@/components/header/transparentNav/TransparentNav";
import TravelInfoAccordion from "@/components/works/AccordionContent";
import FeatureImage from "@/components/works/FeatureImage";
import { getTicketCat } from "@/lib/actions/auth";
const HowWork = async () => {
  const result = (await getTicketCat()) || { data: [] };
  const { data } = result;

  return (
    <>
      <div className="relative h-full :max-h-[600px] bg-about-us w-full  from-blue-900 via-blue-950 to-blue-950">
        <div className="bg-[#00000066] h-full w-full absolute top-0 bottom-0"></div>
        <TransparentNavbar isBgWhite={false} />
        <div className="w-full container md:pb-16 md:pt-8 m-auto relative z-9">
          <div className="max-w-6xl m-auto">
            <h1 className="mb-4 text-5xl py-20 font-bold text-white text-center">
              How We Works
            </h1>
          </div>
        </div>
      </div>
      <section className="">
        <FeatureImage />
      </section>

      <section>
        <TravelInfoAccordion />
      </section>
    </>
  );
};

export default HowWork;
