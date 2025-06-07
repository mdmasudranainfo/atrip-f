import Image from "next/image";

export default function PartnersSection() {
  const partners = [
    {
      id: 1,
      src: "/images/logo_1.svg",
      alt: "Partner logo 1",
    },
    {
      id: 2,
      src: "/images/logo_3.svg",
      alt: "Partner logo 2",
    },
    {
      id: 3,
      src: "/images/logo_5.svg",
      alt: "Partner logo 3",
    },
    {
      id: 4,
      src: "/images/Logo_4.svg",
      alt: "Partner logo 4",
    },
    {
      id: 5,
      src: "/images/Logo_2.svg",
      alt: "Partner logo 5",
    },
    {
      id: 6,
      src: "/images/logo_6.svg",
      alt: "Partner logo 6",
    },
  ];

  return (
    <section className="pb-12 px-4 md:pb-16 lg:pb-20">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-3xl md:text-5xl font-bold mb-3">Our Partners</h2>
        <p className="text-dark mb-10 max-w-xl mx-auto">
          We are a 100% remote team spread all across the world. Join us!
        </p>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 border-t border-l border-[#9A9A9A]">
          {partners.map((partner, index) => (
            <div
              key={partner.id}
              className="flex items-center justify-center p-6 border-r border-b border-[#9A9A9A]"
            >
              <div className="relative h-8 w-32">
                <Image
                  src={partner.src || "/placeholder.svg"}
                  alt={partner.alt}
                  fill
                  className="object-contain opacity-70 hover:opacity-100 transition-opacity"
                  sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 16vw"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
