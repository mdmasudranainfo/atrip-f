import { TransparentNavbar } from "@/components/header/transparentNav/TransparentNav";
import { Button } from "@/components/ui/button";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  BookCheck,
  CalendarIcon,
  Hotel,
  MapPin,
  ShieldQuestion,
  SlidersHorizontal,
  SquarePlus,
  Star,
} from "lucide-react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Check } from "lucide-react";
import { ImageGallery } from "@/components/imageGellery/ImageGellery";
import { HiOutlineSpeakerphone } from "react-icons/hi";
import { formatPrice } from "@/lib/utils";
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
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">
            {newsData.title}
          </h1>
        </div>
      </div>
      <div className="container mx-auto py-10 flex  gap-5">
        <div className="w-[300px] mt-5 sticky top-0 h-fit hidden md:block">
          <ul>
            {parsedContent?.map((item: any, index: number) => {
              return (
                <li key={index}>
                  <a
                    href={`#${index + 1}`}
                    className="text-sm text-blue-500 cursor-pointer my-2"
                  >
                    {" "}
                    {index + 1}. {item.title}
                  </a>
                </li>
              );
            })}
          </ul>
        </div>

        <div className="">
          {parsedContent?.map((item: any, index: number) => {
            return (
              <div key={index} id={`${index + 1}`}>
                <h2 className="text-2xl font-bold py-2 text-center">
                  {item.title}
                </h2>
                <div className="flex justify-center ">
                  <Image
                    src={item.image}
                    alt={item.title}
                    width={500}
                    height={500}
                    layout="responsive"
                    className="rounded-lg  overflow-hidden"
                  />
                </div>

                <article className=" ">
                  <div
                    className="w-full text-gray-700 py-2"
                    dangerouslySetInnerHTML={{ __html: item.content }}
                  />
                </article>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default BlogDetails;
