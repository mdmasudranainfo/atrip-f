"use client";
import { ScrollBar } from "@/components/ui/scroll-area";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import { TabsList, TabsTrigger } from "@radix-ui/react-tabs";
import { useEffect, useRef, useState } from "react";

export default function StickyTabs({ tabItems }: { tabItems: any }) {
  const stickyRef = useRef(null);
  const [isSticky, setIsSticky] = useState(false);
  const [activeTab, setActiveTab] = useState(tabItems[0]?.value);

  console.log(activeTab);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsSticky(!entry.isIntersecting);
      },
      { threshold: 1, rootMargin: "-1px 0px 0px 0px" }
    );

    if (stickyRef.current) {
      observer.observe(stickyRef.current);
    }

    return () => {
      if (stickyRef.current) {
        observer.unobserve(stickyRef.current);
      }
    };
  }, []);

  const handleScroll = (id: string) => {
    const section = document.getElementById(id);
    if (section) {
      const yOffset = -50;
      const y =
        section.getBoundingClientRect().top + window.pageYOffset + yOffset;

      window.scrollTo({ top: y, behavior: "smooth" });
      setActiveTab(id);
    }
  };

  return (
    <>
      {/* Hidden Spacer */}
      <div ref={stickyRef} className="h-1" />

      {/* Sticky Tabs */}
      {isSticky && (
        <div className="sticky top-0 z-50 bg-white">
          <ScrollArea
            className="w-full"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            <div className="h-auto py-2.5 bg-white w-full flex-nowrap flex overflow-x-auto shadow-md border-b border-gray-200 justify-start [&::-webkit-scrollbar]:hidden">
              {tabItems.map((tab: any) => (
                <a
                  key={tab?.value}
                  onClick={() => handleScroll(tab?.value)}
                  className={`group md:px-4 px-2 py-1.5 text-sm font-medium text-gray-600 cursor-pointer
                whitespace-nowrap
                data-[state=active]:text-blue-600 
                data-[state=active]:border-b-2 data-[state=active]:border-blue-600 
                hover:text-blue-600 rounded-none transition-all duration-200
                    ${
                      activeTab === tab?.value
                        ? "text-blue-600 border-b-2 border-blue-600"
                        : "text-gray-600 hover:text-blue-600"
                    }`}
                >
                  <span className="text-sm">{tab?.label}</span>
                </a>
              ))}
            </div>
            <ScrollBar orientation="horizontal" className="visible" />
          </ScrollArea>
        </div>
      )}
    </>
  );
}
