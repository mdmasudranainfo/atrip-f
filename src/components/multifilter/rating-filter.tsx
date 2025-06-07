import StarRating from "@/components/filterOptions/starRating/page";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useDebounce } from "@/hooks/use-debounce";

const ratingOptions = [
    { value: "1", label: "1" },
    { value: "2", label: "2" },
    { value: "3", label: "3" },
    { value: "4", label: "4" },
    { value: "5", label: "5" },
]


const extractParams = (paramValue?: string[]|string): string => {

    if (!paramValue) return ""; // Return an empty array if undefined/null
  
    if (Array.isArray(paramValue)) {
      return paramValue[0]; // Already an array, return as is
    }
  
    return paramValue; // Convert a single string to an array
  }

export default function RatingFilter({label, name, params, baseUrl}: {label: string, name: string, params: any, baseUrl: string}) {

    const [expandedRating, setExpandedRating] = useState(true);

      const router = useRouter();
      const query = new URLSearchParams(params);
    
        const [searchQuery, setSearchQuery] = useState(extractParams(params[name] || ""));
        const debouncedQuery = useDebounce(searchQuery, 300)
    
    
        useEffect(() => {
            async function fetchData() {
                query.delete(name);
    
                if(debouncedQuery) {
                    query.set(name, debouncedQuery);
                }
                
                router.push(`${baseUrl}?${query.toString()}`);
            }
        
            void fetchData()
          }, [debouncedQuery])


    return (
        <StarRating
        ratingOptions={ratingOptions}
        handleToggle={() => setExpandedRating(!expandedRating)}
        isExpanded={expandedRating}
        selectedRating={searchQuery}
        setSelectedRating={setSearchQuery}
        title={label}
      />
    )

}


