"use client";
import MultiFilter from "@/components/multifilter/Multifilter";
import { useRouter } from "next/navigation";
import { FilterAttribute } from "@/types/booking";

export default function MultiFilterOption({attributes, params, baseUrl}: {attributes: FilterAttribute[], params: any, baseUrl: string}) {
  const router = useRouter();
  const query = new URLSearchParams(params);

  const handleFilterChange = (key: string, values: string[]) => {
    query.delete(key);

    values.forEach((value) => {
      query.append(key, value);
    });

    router.push(`${baseUrl}?${query.toString()}`);
  };

  return (
      <div className="divide-y divide-white-frosted">
        {attributes?.map((attribute) => (
          <MultiFilter
            key={attribute.id}
            attribute={attribute}
            params={params}
            onChange={handleFilterChange}
          />
        ))}
      </div>
  )
}
