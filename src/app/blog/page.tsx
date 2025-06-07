"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import axios from "axios";

import { TransparentNavbar } from "@/components/header/transparentNav/TransparentNav";
import FilterServiceGroup from "@/components/filter/filter-service-group";

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
          <h1 className="mb-4 text-5xl font-bold text-white text-center">Blog</h1>
          <div className="flex justify-center items-center gap-2">
            <span className="text-white">Home</span>
            <div className="w-1 h-1 bg-white rounded-full"></div>
            <span className="text-white">Blog</span>
          </div>
        </div>
      </div>
      <div className="container">
        <div className="blog mt-20 mb-24">
          {blogs.length > 0 ? (
            blogs.map((blog: any, index: number) => (
              <div
                key={blog.id}
                className={`blog-item flex items-stretch gap-4 border-b border-b-gray-300 pb-10 mb-10 ${index % 2 === 0 ? "even-item" : "odd-item flex-row-reverse"
                  }`}
              >
                <div className="blog-thumbnail relative w-full h-auto">
                  <Image
                    src={blog.image || "/default-image.jpg"}
                    alt={blog.title}
                    fill
                    className="object-cover rounded-xl"
                  />
                </div>
                <div className={`blog-content basis-[160%] ${index % 2 !== 0 ? "text-right" : ""}`}>
                  <span className="blog-cat inline-block text-blue-600 capitalize font-medium">
                    {blog.category || "Uncategorized"}
                  </span>
                  <h2 className="blog-title text-[#1A1A1A] text-4xl font-bold tracking-[-2%] my-3 transition-colors duration-300 ">
                    {blog.title}
                  </h2>
                  <p className="blog-excerpt text-[#1A1A1A] text-base font-normal">
                    {blog.content || "No description available."}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500 mt-24">Loading blogs...</p>
          )}
        </div>
      </div>
    </>
  );
};

export default Blog;