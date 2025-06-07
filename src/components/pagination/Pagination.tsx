import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

const Pagination = ({
  currentPage,
  totalPages,
  createQueryString,
  baseUrl,
}: {
  currentPage: number;
  totalPages: number;
  createQueryString: (page: number) => string;
  baseUrl: string;
}) => {
  const getPageNumbers = () => {
    const pages = [];
    const showPages = 5;

    let start = Math.max(1, currentPage - Math.floor(showPages / 2));
    const end = Math.min(totalPages, start + showPages - 1);

    if (end - start + 1 < showPages) {
      start = Math.max(1, end - showPages + 1);
    }

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    return pages;
  };

  return (
    <div className="flex items-center justify-center space-x-2 mt-3 mb-3">
      <Link
        href={
          currentPage > 1
            ? `${baseUrl}${createQueryString(currentPage - 1)}`
            : "#"
        }
        className={cn(
          "inline-flex items-center justify-center rounded-md border h-8 w-8",
          currentPage <= 1
            ? "pointer-events-none opacity-50"
            : "hover:bg-accent"
        )}
      >
        <ChevronLeft className="h-4 w-4" />
      </Link>

      {getPageNumbers().map((pageNum) => (
        <Link
          key={pageNum}
          href={`${baseUrl}${createQueryString(pageNum)}`}
          className={cn(
            "inline-flex items-center justify-center rounded-md h-8 w-8 ",
            currentPage === pageNum
              ? "bg-primary text-white hover:bg-primary/90"
              : "border hover:bg-accent"
          )}
        >
          {pageNum}
        </Link>
      ))}

      <Link
        href={
          currentPage < totalPages
            ? `${baseUrl}${createQueryString(currentPage + 1)}`
            : "#"
        }
        className={cn(
          "inline-flex items-center justify-center rounded-md border h-8 w-8 ",
          currentPage >= totalPages
            ? "pointer-events-none opacity-50"
            : "hover:bg-accent"
        )}
      >
        <ChevronRight className="h-4 w-4" />
      </Link>
    </div>
  );
};

export default Pagination;
