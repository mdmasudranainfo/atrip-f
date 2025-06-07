"use client";

import React, { useEffect, useRef, useState } from "react";
import { Check, Search } from "lucide-react";
import { cn } from "@/lib/utils";
import { useDebounce } from "@/hooks/use-debounce";
import Image from "next/image";
import Link from "next/link";

interface EventResult {
  id: number;
  title: string;
  slug: string;
  address: string;
  price: number;
  sale_price: number;
  review_score: number;
  image_url: string;
  duration: number;
  start_time: string;
}

interface ApiResponse {
  rows: {
    current_page: number;
    data: EventResult[];
    first_page_url: string;
    from: number;
  };
}

interface SearchEventsProps {
  placeholder?: string;
  onSelect?: (result: EventResult) => void;
}

const SearchEvents = ({
  placeholder = "Where are you going",
  onSelect,
}: SearchEventsProps) => {
  const [searchInput, setSearchInput] = useState("");
  const [results, setResults] = useState<EventResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [width, setWidth] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const debouncedQuery = useDebounce(searchInput, 300);

  // Handle click outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        inputRef.current &&
        !inputRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Update width when popover opens or window resizes
  useEffect(() => {
    const updateWidth = () => {
      if (inputRef.current) {
        setWidth(inputRef.current.offsetWidth);
      }
    };

    updateWidth();
    window.addEventListener("resize", updateWidth);

    return () => {
      window.removeEventListener("resize", updateWidth);
    };
  }, [open]);

  // Fetch search results
  useEffect(() => {
    const fetchResults = async () => {
      if (!debouncedQuery) {
        setResults([]);
        return;
      }

      setLoading(true);
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_ENDPOINT}/event?name=${debouncedQuery}`
        );
        const data: ApiResponse = await response.json();
        setResults(data.rows.data || []);
      } catch (error) {
        console.error("Error fetching results:", error);
        setResults([]);
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, [debouncedQuery]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!open) return;

    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        setSelectedIndex((prev) =>
          prev < results.length - 1 ? prev + 1 : prev
        );
        break;
      case "ArrowUp":
        e.preventDefault();
        setSelectedIndex((prev) => (prev > 0 ? prev - 1 : prev));
        break;
      case "Enter":
        e.preventDefault();
        if (selectedIndex >= 0 && selectedIndex < results.length) {
          const selectedResult = results[selectedIndex];
          onSelect?.(selectedResult);
          setSearchInput(selectedResult.title);
          setOpen(false);
        }
        break;
      case "Escape":
        e.preventDefault();
        setOpen(false);
        break;
    }
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(price);
  };

  return (
    <div className="relative flex-1 w-full" ref={dropdownRef}>
      <div className="relative">
        <input
          ref={inputRef}
          type="text"
          className="w-full px-3 pl-9 py-4 border outline-none rounded-md font-bold text-dark text-[15px] placeholder:text-gray-600"
          placeholder={placeholder}
          value={searchInput}
          onChange={(e) => {
            setSearchInput(e.target.value);
            setOpen(true);
          }}
          onFocus={() => setOpen(true)}
          onKeyDown={handleKeyDown}
        />
        <div className="absolute left-3 top-1/2 -translate-y-1/2 flex items-center gap-2">
          <Search className="h-5 w-5 text-gray-500" />
        </div>
      </div>

      {open && (
        <div
          className="absolute z-50 w-full mt-1 bg-white border rounded-md shadow-lg"
          style={{ width: width > 0 ? `${width}px` : "auto" }}
        >
          <div className="max-h-[400px] overflow-y-auto">
            {loading ? (
              <div className="px-2 py-3 text-sm text-gray-500">Loading...</div>
            ) : results.length === 0 ? (
              <div className="px-2 py-3 text-sm text-gray-500">
                No results found
              </div>
            ) : (
              results.map((result, index) => (
                <Link
                  href={`/activities/${result.slug}`}
                  key={result.id}
                  className={cn(
                    "flex items-center gap-3 px-3 py-2 cursor-pointer",
                    index === selectedIndex
                      ? "bg-gray-100"
                      : "hover:bg-gray-100"
                  )}
                  onClick={() => {
                    onSelect?.(result);
                    setSearchInput(result.title);
                    setOpen(false);
                  }}
                >
                  <div className="flex-shrink-0 w-12 h-12 relative rounded-md overflow-hidden">
                    <Image
                      src={result.image_url}
                      alt={result.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-medium truncate">{result.title}</div>
                    {/* <div className="text-sm text-gray-500 flex items-center gap-2">
                      <span>{result.address}</span>
                      {result.review_score && (
                        <span className="flex items-center text-yellow-500">
                          ★ {result.review_score}
                        </span>
                      )}
                    </div> */}
                    {/* <div className="text-sm font-medium text-primary-600">
                      {result.sale_price ? (
                        <>
                          <span className="text-gray-400 line-through mr-2">
                            {formatPrice(result.price)}
                          </span>
                          <span className="text-primary-600">
                            {formatPrice(result.sale_price)}
                          </span>
                        </>
                      ) : (
                        formatPrice(result.price)
                      )}
                      <span className="text-gray-400 ml-2">
                        • {result.duration}h {result.start_time}
                      </span>
                    </div> */}
                  </div>
                  <Check
                    className={cn(
                      "flex-shrink-0 h-4 w-4",
                      searchInput === result.title ? "opacity-100" : "opacity-0"
                    )}
                  />
                </Link>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchEvents;
