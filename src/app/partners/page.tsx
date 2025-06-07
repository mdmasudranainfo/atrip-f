import { TransparentNavbar } from "@/components/header/transparentNav/TransparentNav";
import ChaufferLanding from "@/components/partners/chaufferLanding/CommittedExcellence";
import PartnerContactForm from "@/components/partners/committedContactFrom/page";
import OurPartners from "@/components/partners/ourPartners/page";
import PartnerWIth from "@/components/partners/PartnerWIth/PartnerWIth";
import { getTicketCat } from "@/lib/actions/auth";

const Partners = async () => {
  const result = (await getTicketCat()) || { data: [] };
  const { data } = result;
  return (
    <>
      <div className="relative h-full :max-h-[600px] bg-about-us w-full  from-blue-900 via-blue-950 to-blue-950">
        <div className="bg-[#00000066] h-full w-full absolute top-0 bottom-0"></div>
        <TransparentNavbar isBgWhite={false} />
        <div className="w-full container pb-16 pt-8 m-auto relative z-9">
          <div className="max-w-6xl m-auto">
            <h1 className="mb-4 text-5xl py-20 font-bold text-white text-center">
              Partners
            </h1>
          </div>
        </div>
      </div>
      <section className="">
        <ChaufferLanding />
      </section>

      <section className=" bg-white">
        <PartnerContactForm ticketCat={data} />
      </section>

      <section className="bg-white">
        <PartnerWIth />
      </section>

      {/* <section className="!min-h-auto">
        <OurPartners />
      </section> */}
    </>
  );
};

export default Partners;
