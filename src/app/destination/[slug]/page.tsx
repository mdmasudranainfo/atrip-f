import { TransparentNavbar } from "@/components/header/transparentNav/TransparentNav";
import { getDestinationBySlug } from "@/lib/actions/destination-actions";
import { notFound } from "next/navigation";
import React from "react";
import Link from "next/link";
import Image from "next/image";

const DestinationDetails = async ({ params }: any) => {
  const resolvedParams = await params;
  const slug = resolvedParams?.slug;
  const { data } = await getDestinationBySlug(slug);

  if (!data) {
    notFound();
  }

  return (
    <div className="">
      {/* Header Section */}
      <div className="relative h-[400px] w-full bg-about-us from-blue-900 via-blue-950 to-blue-950">
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black bg-opacity-40"></div>

        {/* Navbar */}
        <TransparentNavbar isBgWhite={false} />

        {/* Title & Breadcrumb */}
        <div className="w-full container pb-16 pt-8 mx-auto relative z-10">
          <div className="max-w-6xl mx-auto py-20 text-center">
            <h1 className="mb-4 text-5xl font-bold text-white">{data.name}</h1>
            <div className="flex gap-2 justify-center text-white text-lg">
              <Link href="/">Home</Link> <span className="mx-1">•</span>
              <Link href="#">{data.name}</Link>
            </div>
          </div>
        </div>
      </div>
      {/* Content Section */}
      <div className="py-20 container mx-auto px-4">
        {/* Image */}
        {data.image && (
          <div className="w-full  mx-auto mb-10">
            <Image
              src={data.image.file_path}
              alt={data.image.file_name}
              width={800}
              height={500}
              className="object-cover rounded-[10px] w-full h-[700px]"
              priority
            />
          </div>
        )}

        <h1 className="text-[25px] mb-5 font-semibold text-[#273f5f]">About {data.name}</h1>
        {/* Description */}
        <div
          className="w-full  text-lg text-gray-700"
          dangerouslySetInnerHTML={{ __html: data.description }}
        />
      </div>
    </div>
  );
};

export default DestinationDetails;
