import Image from "next/image";

export default function FeatureImage() {
  return (
    <section className="md:pt-12 pt-0 bg-white">
      <div className="container mx-auto px-6 md:px-12 pt-12 pb-20 ">
        <div className="grid grid-cols-1 md:grid-cols-2 md:gap-8 gap-0 items-center">
          {/* Image Section */}

          <div className=" ">
            <Image
              src="/images/works.jpg"
              alt="Professional Driver"
              width={800}
              height={800}
              className=" object-cover max-h-full"
            />
          </div>

          {/* Text Section */}
          <div className="space-y-6">
            <h2 className="md:text-4xl text-lg  md:mt-0 mt-10 font-bold text-gray-900">
              Atrip. Ae Works
            </h2>
            <p className="text-dark !md:mt-4 md:pt-3 !mt-1 md:text-lg text-sm">
              Atrip.Ae completely overhauls how people should plan their travel
              destinations. <br /> <br /> It does not perform sales transactions
              or buy products but serves as a linking platform that directs
              customers toward superior service vendors while providing cost
              analysis and multiple option viewpoints before decision-making
              occurs. <br />
              The essential information describing Atrip.
              <br /> Ae&apos;s operational process and reasons for choosing us
              as your travel platform appear below.
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
