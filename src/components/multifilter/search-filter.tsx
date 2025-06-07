"use client";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useState, useEffect, ChangeEvent } from "react";
import { useRouter } from "next/navigation";
import { useDebounce } from "@/hooks/use-debounce";


export default function SearchFilter({label, params, baseUrl}: {label: string, params: any, baseUrl: string}) {

    const key = "service_name"


  const router = useRouter();
  const query = new URLSearchParams(params);

    const [searchQuery, setSearchQuery] = useState(params[key] || "");
    const debouncedQuery = useDebounce(searchQuery, 300)


    useEffect(() => {
        async function fetchData() {
            query.delete(key);

            if(debouncedQuery) {
                query.set(key, debouncedQuery);
            }
            
            router.push(`${baseUrl}?${query.toString()}`);
        }
    
        void fetchData()
      }, [debouncedQuery])

  return (
      <div className="w-full lg:max-w-md space-y-4 p-4 border-b border-white-frosted">
        <h2 className="text-xl font-semibold text-dark">
          {label}
        </h2>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 transform text-gray-400" />
          <Input
            type="text"
            placeholder="Search"
            className="w-full pl-10 text-base"
            value={searchQuery} 
            onChange={(e: ChangeEvent<HTMLInputElement>) => setSearchQuery(e.target?.value || "")}
          />
        </div>
      </div>
  );
}
