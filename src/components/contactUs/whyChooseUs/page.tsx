import Image from "next/image";

export default function WhyChooseUs() {
  return (
    <section className="md:pb-12 pb-5 md:pt-12 pt-0 bg-white">
      <div className="container mx-auto px-6 md:px-12 pt-12 pb-20 ">
        <div className="grid grid-cols-1 md:grid-cols-2 md:gap-8 gap-0 items-center">
          {/* Image Section */}

          <div className=" md:h-[500px] h-[300px]">
            <Image
              src="/images/contact.jpg"
              alt="Professional Driver"
              width={800}
              height={800}
              className=" object-cover max-h-full"
            />
          </div>

          {/* Text Section */}
          <div className="space-y-6">
            <h2 className="md:text-4xl text-lg  md:mt-0 mt-10 font-bold text-gray-900">
              Reaching out to Atrip. Ae through telephone will find immediate
              help.
            </h2>
            <p className="text-dark !md:mt-4 md:pt-3 !mt-1 md:text-lg text-sm">
              Reaching out to Atrip. Ae through telephone will find immediate
              help. You can contact Atrip. Ae You should contact Atrip. Ae
              without delay in case of any emergency during your travel or when
              you need to ask questions. Atrip.
            </p>
            <p className="text-dark !md:mt-4 md:pt-2 !mt-1 md:text-lg text-sm">
              Ae is just a call away! Your requests regarding bookings and all
              questions about travel issues you may need help with will be
              received by our team of professionals who operate 24 hours a day.
            </p>
            <p className="text-dark !md:mt-4 md:pt-2 !mt-1 md:text-lg text-sm">
              Our top goal is to create peaceful interactions between our
              customers and the service. Your travel experience will be entirely
              enjoyable because our team will tackle all obstacles.
            </p>
            {/* flex */}
            <div className=" space-x-12 hidden">
              <div>
                <h3 className="md:text-5xl md:leading-[48px] text-[23px] leading-[20px] font-bold text-dark">
                  10K+
                </h3>
                <p className="text-dark">Completed drives</p>
              </div>
              <div>
                <h3 className="md:text-5xl md:leading-[48px] text-[23px] leading-[20px] font-bold text-dark">
                  87%
                </h3>
                <p className="text-dark">Client satisfaction</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
