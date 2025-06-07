"use client";

import { useEffect, useMemo, useState } from "react";
import { useInView } from "react-intersection-observer";
import { useSearchParams } from "next/navigation";

import ActivitiesCard from "@/components/cards/activities/verticalCard/ActivitiesCard";
import ResultNotFound from "@/components/notFound/page";
import ItemSorting from "@/components/hotels/hotelFilter/ItemSorting";
import { getActivitiesFromSession } from "@/utils/sessionCache";
import { EventActivityRow } from "@/types/activity";

const ITEMS_PER_PAGE = 5;

const fetchActivities = async (params: any = {}) => {
  const searchParams = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== "") {
      searchParams.append(key, value.toString());
    }
  });

  searchParams.set("limit", ITEMS_PER_PAGE.toString());
  searchParams.set("page", params.page?.toString() || "1");

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_ENDPOINT}/event?${searchParams.toString()}`,
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
    data: (data?.rows?.data ?? []) as EventActivityRow[],
    currentPage: data?.rows?.current_page || 1,
    lastPage: data?.rows?.last_page || 0,
    total: data?.rows?.total || 0,
  };
};

export default function InfiniteActivitiesList({
  initialData,
  initialTotal,
  initialParams,
}: {
  initialData: any;
  initialTotal: number;
  initialParams: any;
}) {
  const searchParams = useSearchParams();
  const filterParams = useMemo(() => {
    const params: Record<string, any> = {};
    searchParams.forEach((value, key) => {
      params[key] = value;
    });
    return params;
  }, [searchParams]);

  const [activities, setActivities] = useState<EventActivityRow[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMore, setHasMore] = useState(false);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);

  const { ref, inView } = useInView({
    triggerOnce: false,
    // rootMargin: "200px",
  });

  // Load from sessionStorage first
  useEffect(() => {
    const cached = getActivitiesFromSession({ name: "activitiesData" });

    if (cached && cached.activitiesPage === "activities") {
      setActivities(cached.activitiesData);
      setTotal(cached.activitiesTotal);
      setCurrentPage(Math.ceil(cached.activitiesData.length / ITEMS_PER_PAGE));
      setHasMore(cached.activitiesData.length < cached.activitiesTotal);
      window.scrollTo(0, cached.scrollPosition || 0);
    } else {
      setActivities(initialData);
      setTotal(initialTotal);
      setCurrentPage(1);
      setHasMore(initialData.length < initialTotal);
    }
  }, [initialData, initialTotal]);

  // ...existing code...

  // Refetch when filters change
  useEffect(() => {
    const cached = getActivitiesFromSession({ name: "activitiesData" });

    // Jodi cache theke load hoy, tahole refetch bondho
    if (cached && cached.activitiesPage === "activities") {
      return;
    }

    const fetchFiltered = async () => {
      setLoading(true);
      const response = await fetchActivities({ ...filterParams, page: 1 });
      setActivities(response.data);
      setTotal(response.total);
      setCurrentPage(1);
      setHasMore(response.currentPage < response.lastPage);
      setLoading(false);
    };

    fetchFiltered();
  }, [filterParams]);

  // ...existing code...
  // Load more on scroll
  useEffect(() => {
    const loadMore = async () => {
      if (loading || !hasMore) return;

      setLoading(true);
      const nextPage = currentPage + 1;

      const response = await fetchActivities({
        ...filterParams,
        page: nextPage,
      });

      if (response.data.length > 0) {
        setActivities((prev) => [...prev, ...response.data]);
        setCurrentPage(nextPage);
        if (nextPage >= response.lastPage) {
          setHasMore(false);
        }
      } else {
        setHasMore(false);
      }

      setLoading(false);
    };

    if (inView) {
      loadMore();
    }
  }, [inView, hasMore, currentPage, filterParams, loading]);

  if (!activities || activities.length === 0) {
    return <ResultNotFound />;
  }

  return (
    <div className="mb-4">
      <ItemSorting propertyCount={total} label="activities" />

      {activities.map((activity, idx) => (
        <div
          className="p-4 md:p-0 md:border-none border md:rounded-none rounded-lg md:shadow-none shadow-md my-4"
          key={idx}
        >
          <ActivitiesCard data={activities} total={total} activity={activity} />
        </div>
      ))}

      {hasMore && (
        <div
          key={activities.length}
          ref={ref}
          className="h-10 mt-8 flex justify-center items-center text-gray-500 text-sm"
        >
          {loading ? <p>Loading....</p> : "Scroll to load more"}
        </div>
      )}
    </div>
  );
}
