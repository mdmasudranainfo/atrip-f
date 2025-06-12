"use client";

import { useEffect, useState } from "react";

import Image from "next/image";

import { TransparentNavbar } from "@/components/header/transparentNav/TransparentNav";
import { CloudCog } from "lucide-react";
import Link from "next/link";

const Blog = () => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const url = `${process.env.NEXT_PUBLIC_API_ENDPOINT}/api/blog/lists?limit=100`;
        const response = await fetch(url, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        setBlogs(data?.data);
      } catch (err) {
        console.error("Error fetching blog data:", err);
      }
    };

    fetchBlogs();
  }, []);

  return (
    <>
      <div className="relative h-full :max-h-[600px] bg-about-us w-full  from-blue-900 via-blue-950 to-blue-950">
        <div className="bg-[#00000066] h-full w-full absolute top-0 bottom-0"></div>
        <TransparentNavbar isBgWhite={false} />
        <div className="w-full container pb-20 pt-12 m-auto relative z-9">
          <h1 className="mb-4 text-5xl font-bold text-white text-center">
            Blog
          </h1>
          <div className="flex justify-center items-center gap-2">
            <span className="text-white">Home</span>
            <div className="w-1 h-1 bg-white rounded-full"></div>
            <span className="text-white">Blog</span>
          </div>
        </div>
      </div>
      <div className="container">

        <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 my-10 gap-4">
          {blogs.length > 0 ? (
            blogs.map((blog: any, index: number) => {
              const parsedContent = JSON.parse(blog.content);

              

              
              return <div key={blog.id} className="blog-card bg-white rounded-xl shadow-md overflow-hidden flex flex-col transition-transform hover:-translate-y-1 hover:shadow-lg">
                <div className="relative w-full h-56">
                  <Image
                    src={blog.image || "/default-image.jpg"}
                    alt={blog.title}
                    fill
                    className="object-cover w-full h-full"
                  />
                </div>
                <div className="flex flex-col flex-1 p-5">
                  <h2 className="text-lg font-semibold text-[#1A1A1A] mb-2 line-clamp-2">{blog.title}</h2>
                  <p className="text-gray-600 text-sm flex-1 line-clamp-2 mb-4">{parsedContent[0].title || "No description available."}</p>

                  <Link href={`/blog/${blog.id}`} className="text-purple-600 font-medium hover:underline mt-auto">Read more</Link>
                  {/* <a href={`/blog/${blog.slug || blog.id}`} className="text-purple-600 font-medium hover:underline mt-auto">Read more</a> */}
                </div>
              </div>
            })
          ) : (
            <p className="text-center text-gray-500 mt-24">Loading blogs...</p>
          )}
        </div>




      </div>
    </>
  );
};

export default Blog;
