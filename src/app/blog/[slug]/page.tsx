import { TransparentNavbar } from "@/components/header/transparentNav/TransparentNav";
import BlogFilterDrawer from "@/components/blog/BlogFilterDrawer";
import React from "react";
import Image from "next/image";

const BlogDetails = async (context: { params: Promise<{ slug: string }> }) => {
  const params = await context.params;
  const slug = params.slug;

  let newsData = null;
  let error = null;

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_ENDPOINT}/news/${slug}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        // cache: "no-store", // Uncomment if you want to always fetch fresh data
      }
    );

    if (!res.ok) {
      throw new Error(`HTTP error! Status: ${res.status}`);
    }

    const data = await res.json();
    newsData = data?.data || data; // Adjust depending on your API response structure
  } catch (err) {
    if (err instanceof Error) {
      error = err.message;
    } else {
      error = "Failed to fetch news data.";
    }
  }

  if (error) {
    return <div className="text-red-500 text-center mt-10">Error: {error}</div>;
  }

  if (!newsData) {
    return <div className="text-center mt-10">Loading...</div>;
  }

  const parsedContent = JSON.parse(newsData.content);

  return (
    <div>
      <div className="relative h-full :max-h-[600px] bg-about-us w-full  from-blue-900 via-blue-950 to-blue-950">
        <div className="bg-[#00000066] h-full w-full absolute top-0 bottom-0"></div>
        <TransparentNavbar isBgWhite={false} />
      </div>
      <div
        className="relative w-full md:h-[500px] h-[300px] flex items-center justify-center bg-center bg-cover"
        style={{
          backgroundImage: `url(${newsData.image_url})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        {/* Content */}
        <div className="relative z-10 flex flex-col items-center justify-center text-center w-full">
          <h1 className="text-2xl md:text-5xl font-bold text-white mb-2">
            {newsData.title}
          </h1>
        </div>
      </div>
      <div className="container mx-auto py-10 flex flex-col md:flex-row gap-6">

        
        {/* Sidebar */}
        <aside className="w-full md:w-[300px] sticky top-10 h-fit hidden md:block">
          <ul className="space-y-3 bg-white shadow rounded-lg p-4 border border-gray-100">
            {parsedContent?.map((item: any, index: number) => (
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
          {parsedContent?.map((item: any, index: number) => {
            return (
              <div
                key={index}
                id={`${index + 1}`}
                className={` bg-white shadow-lg rounded-xl overflow-hidden p-6 border border-gray-100 w-full `}
              >
                <h2 className="text-2xl font-semibold mb-4 text-center text-gray-800">
                  {item.title}
                </h2>

                <div className="flex justify-center mb-4">
                  <Image
                    src={item.image}
                    alt={item.title}
                    width={800}
                    height={500}
                    layout="responsive"
                    className="rounded-lg"
                  />
                </div>

                <article className="prose max-w-none prose-img:rounded-lg prose-headings:text-gray-900 prose-p:text-gray-700">
                  <div dangerouslySetInnerHTML={{ __html: item.content }} />
                </article>
              </div>
            );
          })}
        </section>
      </div>

      <BlogFilterDrawer contents={parsedContent} />
    </div>
  );
};

export default BlogDetails;
