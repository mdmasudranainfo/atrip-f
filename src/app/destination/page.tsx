import { getAllDestinations } from "@/lib/actions/destination-actions";
import Image from "next/image";
import Link from "next/link";
import { TransparentNavbar } from "@/components/header/transparentNav/TransparentNav";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface PageProps {
  searchParams: {
    page?: string;
  };
}

const DestinationPage = async ({ searchParams }: PageProps) => {
  const currentPage = Number(searchParams.page) || 1;
  const perPage = 9;

  const param = {
    page: currentPage,
    per_page: perPage
  }

  const { data: destinations } = await getAllDestinations({
    params: param
  });

  const totalPages = Math.ceil(destinations.total / perPage);

  // Generate page numbers to show
  const getPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5; // Number of page buttons to show

    if (totalPages <= maxVisiblePages) {
      // If total pages are less than max visible, show all pages
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Always show first page
      pages.push(1);

      // Calculate start and end of visible pages
      let start = Math.max(2, currentPage - 1);
      let end = Math.min(totalPages - 1, currentPage + 1);

      // Adjust if at the start
      if (currentPage <= 2) {
        end = 4;
      }
      // Adjust if at the end
      if (currentPage >= totalPages - 1) {
        start = totalPages - 3;
      }

      // Add ellipsis if needed
      if (start > 2) {
        pages.push(-1); // -1 represents ellipsis
      }

      // Add middle pages
      for (let i = start; i <= end; i++) {
        pages.push(i);
      }

      // Add ellipsis if needed
      if (end < totalPages - 1) {
        pages.push(-2); // -2 represents ellipsis
      }

      // Always show last page
      pages.push(totalPages);
    }

    return pages;
  };

  return (
    <>
      <div className="relative h-full max-h-[600px] bg-about-us w-full from-blue-900 via-blue-950 to-blue-950">
        <div className="bg-[#00000066] h-full w-full absolute top-0 bottom-0"></div>
        <TransparentNavbar isBgWhite={false} />
        <div className="w-full container pb-20 pt-12 m-auto relative z-9">
          <h1 className="mb-4 text-5xl font-bold text-white text-center">
            Popular Destinations
          </h1>
          <div className="flex justify-center items-center gap-2">
            <span className="text-white">Home</span>
            <div className="w-1 h-1 bg-white rounded-full"></div>
            <span className="text-white">Destinations</span>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-8">
          {destinations.data.map((destination: any) => {
            const parsedContent = JSON.parse(destination?.description);
            return (
              <div
                key={destination.id}
                className="bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
              >
                <div className="relative w-full h-56">
                  <Image
                    src={destination.image?.file_path || "/default-destination.jpg"}
                    alt={destination.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-6">
                  <h2 className="text-xl font-semibold text-gray-800 mb-3 line-clamp-2">
                    {destination.name}
                  </h2>
                  <p className="text-gray-600 mb-4 line-clamp-3">
                    {parsedContent[0].title || "No description available."}
                  </p>
                  <div className="flex items-center justify-end">
                    <Link
                      href={`/destination/${destination.slug}`}
                      className="inline-flex items-center text-purple-600 font-medium hover:text-purple-700 transition-colors"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* Smart Pagination */}
        {destinations.total > 0 && (
          <div className="flex justify-center items-center gap-2 mt-12">
            {/* Previous Button */}
            <Link
              href={`/destination?page=${currentPage - 1}`}
              className={`px-4 py-2 rounded-lg border border-gray-200 hover:bg-gray-50 flex items-center gap-1 ${
                currentPage === 1 ? 'opacity-50 cursor-not-allowed pointer-events-none' : ''
              }`}
            >
              <ChevronLeft size={16} />
              Previous
            </Link>

            {/* Page Numbers */}
            {getPageNumbers().map((pageNum, index) => {
              if (pageNum === -1 || pageNum === -2) {
                return (
                  <span key={`ellipsis-${index}`} className="px-2">
                    ...
                  </span>
                );
              }
              return (
                <Link
                  key={pageNum}
                  href={`/destination?page=${pageNum}`}
                  className={`px-4 py-2 rounded-lg ${
                    currentPage === pageNum
                      ? 'bg-purple-600 text-white'
                      : 'border border-gray-200 hover:bg-gray-50'
                  }`}
                >
                  {pageNum}
                </Link>
              );
            })}

            {/* Next Button */}
            <Link
              href={`/destination?page=${currentPage + 1}`}
              className={`px-4 py-2 rounded-lg border border-gray-200 hover:bg-gray-50 flex items-center gap-1 ${
                currentPage === totalPages ? 'opacity-50 cursor-not-allowed pointer-events-none' : ''
              }`}
            >
              Next
              <ChevronRight size={16} />
            </Link>
          </div>
        )}
      </div>
    </>
  );
};

export default DestinationPage;