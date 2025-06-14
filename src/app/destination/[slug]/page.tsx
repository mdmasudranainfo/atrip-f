import { TransparentNavbar } from "@/components/header/transparentNav/TransparentNav";
import { getDestinationBySlug } from "@/lib/actions/destination-actions";
import { notFound } from "next/navigation";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import BlogFilterDrawer from "@/components/blog/BlogFilterDrawer";
import { CloudCog } from "lucide-react";

const DestinationDetails = async ({ params }: any) => {
  const resolvedParams = await params;
  const slug = resolvedParams?.slug;
  const { data } = await getDestinationBySlug(slug);

  if (!data) {
    notFound();
  }

  // return (
  //   <div>
  //     <h1>Destination Details</h1>
  //   </div>
  // );

  // Parse content sections if they exist
  const contentSections = JSON.parse(data?.description);
  console.log(contentSections);

  return (
    <div>
      {/* Header Section */}
      <div className="relative h-full :max-h-[600px] bg-about-us w-full from-blue-900 via-blue-950 to-blue-950">
        <div className="bg-[#00000066] h-full w-full absolute top-0 bottom-0"></div>
        <TransparentNavbar isBgWhite={false} />
      </div>

      {/* Hero Image Section */}
      <div
        className="relative w-full md:h-[500px] h-[300px] flex items-center justify-center bg-center bg-cover"
        style={{
          backgroundImage: `url(${data.image?.file_path})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        {/* Content */}
        <div className="relative z-10 flex flex-col items-center justify-center text-center w-full">
          <h1 className="text-2xl md:text-5xl font-bold text-white mb-2">
            {data.name}
          </h1>
          <div className="flex gap-2 justify-center text-white text-lg">
            <Link href="/">Home</Link> <span className="mx-1">•</span>
            <Link href="#">{data.name}</Link>
          </div>
        </div>
      </div>

      {/* Main Content Section */}
      <div className="container mx-auto py-10 flex flex-col md:flex-row gap-6">
        {/* Sidebar */}
       {/* Sidebar */}
       <aside className="w-full md:w-[300px] sticky top-2 max-h-screen hidden md:block overflow-y-scroll">
          <ul className="space-y-3 bg-white shadow rounded-lg p-4 border border-gray-100">
            {contentSections?.map((item: any, index: number) => (
              <li key={index}>
                <a
                  href={`#${index + 1}`}
                  className="block text-sm text-blue-600 hover:text-blue-800 transition-colors"
                >
                  {index + 1}. {item.title}
                </a>
              </li>
            ))}
          </ul>
        </aside>

        {/* Main Content */}
        <section className="flex-1 space-y-10">
          {contentSections?.map((item: any, index: number) => (
            <div
              key={index}
              id={`${index + 1}`}
              className="bg-white shadow-lg rounded-xl overflow-hidden p-6 border border-gray-100 w-full"
            >
              <h2 className="text-2xl font-semibold mb-4 text-center text-gray-800">
                {item.title}
              </h2>

              {data.image && (
                <div className="flex justify-center mb-4">
                  <Image
                    src={data.image.file_path}
                    alt={data.image.file_name}
                    width={800}
                    height={500}
                    layout="responsive"
                    className="rounded-lg"
                  />
                </div>
              )}

              <article className="prose max-w-none prose-img:rounded-lg prose-headings:text-gray-900 prose-p:text-gray-700">
                <div dangerouslySetInnerHTML={{ __html: item.content }} />
              </article>
            </div>
          ))}
        </section>
      </div>

      {/* Mobile Filter Drawer */}
      <BlogFilterDrawer contents={contentSections} />
    </div>
  );
};

export default DestinationDetails;
