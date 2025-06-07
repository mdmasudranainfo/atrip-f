"use client";

import TransportCard from "@/components/cards/transports/verticalCard/TransportCard";
import { ITransport } from "@/types/transportTypes";
import { useEffect, useState, useMemo } from "react";
import { useInView } from "react-intersection-observer";
import ResultNotFound from "@/components/notFound/page";
import ItemSorting from "@/components/hotels/hotelFilter/ItemSorting";
import { useSearchParams } from "next/navigation";
import { Skeleton } from "../ui/skeleton";
import {
  getTransportFromSession,
  removeSessionData,
} from "@/utils/sessionCache";

const ITEMS_PER_PAGE = 5;

const fetchTransports = async (params: any = {}) => {
  const searchParams = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== "") {
      searchParams.append(key, value.toString());
    }
  });

  searchParams.set("limit", ITEMS_PER_PAGE.toString());
  searchParams.set("page", params.page?.toString() || "1");

  const response = await fetch(
    `${
      process.env.NEXT_PUBLIC_API_ENDPOINT
    }/transport?${searchParams.toString()}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    }
  );

  const data = await response.json();

  return {
    data: data?.rows?.data ?? [],
    currentPage: data?.rows?.current_page || 1,
    lastPage: data?.rows?.last_page || 0,
    total: data?.rows?.total || 0,
  };
};

export default function InfiniteTransportList({
  initialData,
  initialTotal,
  initialParams,
}: {
  initialData: ITransport[];
  initialTotal: number;
  initialParams: any;
}) {
  const [transports, setTransports] = useState<ITransport[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMore, setHasMore] = useState(false);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);

  const { ref, inView } = useInView({
    triggerOnce: false,
    rootMargin: "200px",
  });

  const searchParams = useSearchParams();

  const filterParams = useMemo(() => {
    const params: Record<string, any> = {};
    searchParams.forEach((value, key) => {
      params[key] = value;
    });
    return params;
  }, [searchParams]);

  // ✅ Load from sessionStorage if exists
  useEffect(() => {
    const cached = getTransportFromSession({ name: "transportData" });

    if (cached && cached.transportPage === "transport") {
      setTransports(cached.transportData);
      setTotal(cached.transportTotal);
      setCurrentPage(Math.ceil(cached.transportData.length / ITEMS_PER_PAGE));
      setHasMore(cached.transportData.length < cached.transportTotal);
      window.scrollTo(0, cached.scrollPosition || 0);
    } else {
      setTransports(initialData);
      setTotal(initialTotal);
      setCurrentPage(1);
      setHasMore(initialData.length < initialTotal);
    }
  }, [initialData, initialTotal]);

  // ✅ Refetch on filter change unless cached
  useEffect(() => {
    const cached = getTransportFromSession({ name: "transportData" });
    if (cached && cached.transportPage === "transport") return;

    const fetchFiltered = async () => {
      setLoading(true);
      const response = await fetchTransports({ ...filterParams, page: 1 });

      setTransports(response.data);
      setTotal(response.total);
      setCurrentPage(1);
      setHasMore(response.currentPage < response.lastPage);
      setLoading(false);
    };

    fetchFiltered();
  }, [filterParams]);

  // ✅ Load more on scroll
  useEffect(() => {
    const loadMore = async () => {
      if (loading || !hasMore) return;

      setLoading(true);
      const nextPage = currentPage + 1;
      const response = await fetchTransports({
        ...filterParams,
        page: nextPage,
      });

      if (response.data.length > 0) {
        const newList = [...transports, ...response.data];
        setTransports(newList);
        setCurrentPage(nextPage);
        if (nextPage >= response.lastPage) {
          setHasMore(false);
        }

        // ✅ Save to sessionStorage
        sessionStorage.setItem(
          "transportData",
          JSON.stringify({
            transportData: newList,
            transportTotal: response.total,
            transportPage: "transport",
            scrollPosition: window.scrollY,
          })
        );
      } else {
        setHasMore(false);
      }

      setLoading(false);
    };

    if (inView) {
      loadMore();
    }
  }, [inView, hasMore, currentPage, filterParams, loading]);

  if (!transports || transports.length === 0) {
    return <ResultNotFound />;
  }

  return (
    <div>
      <ItemSorting propertyCount={total || 0} label="transports" />

      {transports.map((transport, idx) => (
        <div
          className="mt-4 md:border-none border rounded-md md:rounded-none  md:p-0 p-4"
          key={idx}
        >
          <TransportCard
            data={transports}
            total={total}
            transport={transport}
          />
        </div>
      ))}

      {hasMore && (
        <div
          key={transports.length}
          ref={ref}
          className="h-10 mt-8 flex justify-center items-center text-gray-600 text-sm"
        >
          {loading ? <Skeleton /> : "Scroll to load more"}
        </div>
      )}
    </div>
  );
}
