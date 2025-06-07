"use client";

import * as React from "react";
import { Check, MapPin } from "lucide-react";
import { cn } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";
import { useDebounce } from "@/hooks/use-debounce";
import Image from "next/image";
import { getLocationsWithType, Location } from "@/lib/actions/location-action";

interface SearchProps {
  defaultValue?: string;
  type: string;
  locationId?: number;
  desabledId?: number;
  placeholder: string;
  initialLocations: Location[];
  error?: string;
  onChangeValue?: (locationId: string) => void;
  inputSize?: number;
}

export default function SearchLocationWithType2({
  defaultValue,
  type,
  locationId,
  desabledId,
  error,
  placeholder,
  initialLocations,
  onChangeValue,
  inputSize = 4,
}: SearchProps) {
  const [locations, setLocations] = React.useState<Location[]>(
    initialLocations || []
  );
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState<Location | undefined>(() =>
    locationId
      ? initialLocations.find((item) => item.id == locationId)
      : undefined
  );
  const [width, setWidth] = React.useState(0);
  const [loading, setLoading] = React.useState(false);
  const [inputValue, setInputValue] = React.useState(
    defaultValue || value?.title || ""
  );
  const [query, setQuery] = React.useState("");
  const [selectedIndex, setSelectedIndex] = React.useState(-1);

  const debouncedQuery = useDebounce(query, 300);
  const inputRef = React.useRef<HTMLInputElement>(null);
  const dropdownRef = React.useRef<HTMLDivElement>(null);

  // defualt value set

  React.useEffect(() => {
    if (defaultValue && initialLocations?.length > 0) {
      const match = initialLocations.find(
        (item) => item.title.toLowerCase() === defaultValue.toLowerCase()
      );
      if (match) {
        setValue(match);
        setInputValue(match.title);
        onChangeValue?.(match.title); // set the actual ID
      }
    }
  }, [defaultValue, initialLocations]);

  //

  // Detect outside click
  React.useEffect(() => {
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

  // Set input width
  React.useEffect(() => {
    const updateWidth = () => {
      if (inputRef.current) setWidth(inputRef.current.offsetWidth);
    };
    updateWidth();
    window.addEventListener("resize", updateWidth);
    return () => window.removeEventListener("resize", updateWidth);
  }, [open]);

  // Fetch locations
  React.useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        console.log("Searching with query:", debouncedQuery);
        const { data: fetchLocations } = await getLocationsWithType(type, {
          service_name: debouncedQuery,
          page: 1,
          per_page: 10,
        });
        console.log("Fetched locations:", fetchLocations);
        setLocations(fetchLocations);
        setSelectedIndex(-1);
      } catch (error) {
        console.error("Location fetch error:", error);
      } finally {
        setLoading(false);
      }
    }

    if (type) void fetchData();
  }, [debouncedQuery, type]);

  const validLocations = desabledId
    ? locations.filter((item) => item.id !== desabledId)
    : locations;

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!open) return;

    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        setSelectedIndex((prev) =>
          Math.min(prev + 1, validLocations.length - 1)
        );
        break;
      case "ArrowUp":
        e.preventDefault();
        setSelectedIndex((prev) => Math.max(prev - 1, 0));
        break;
      case "Enter":
        e.preventDefault();
        if (selectedIndex >= 0 && selectedIndex < validLocations.length) {
          const selectedLocation = validLocations[selectedIndex];
          setValue(selectedLocation);
          setInputValue(selectedLocation.title);
          onChangeValue?.(selectedLocation.title);
          setOpen(false);
        }
        break;
      case "Escape":
        setOpen(false);
        break;
    }
  };

  return (
    <div className="relative flex-1 w-full" ref={dropdownRef}>
      <div className="relative">
        <input
          ref={inputRef}
          type="text"
          className={cn(
            "w-full px-3 pl-9 border outline-none rounded-md font-bold text-dark text-[15px] placeholder:text-gray-600",
            inputSize ? `py-${inputSize}` : "py-4"
          )}
          placeholder={placeholder}
          value={inputValue}
          onChange={(e) => {
            setInputValue(e.target.value);
            setQuery(e.target.value);
            setValue(undefined);
            onChangeValue?.(e.target.value); // Clear selected value
            setOpen(true);
          }}
          onFocus={() => setOpen(true)}
          onKeyDown={handleKeyDown}
        />
        <div className="absolute left-3 top-1/2 -translate-y-1/2">
          <MapPin className="h-5 w-5 text-gray-500" />
        </div>
      </div>

      {!!error && (
        <div className="absolute left-1/2 -translate-x-1/2 bottom-[-45px] mb-2 w-full max-w-sm bg-red-600 text-white py-1 px-2 shadow-lg">
          <div className="absolute top-[-7px] left-1/2 -translate-x-1/2 w-3 h-3 bg-red-600 rotate-45"></div>
          <span className="block text-sm">{error}</span>
        </div>
      )}

      {open && (
        <div
          className="absolute z-50 w-full mt-1 bg-white border rounded-md shadow-lg"
          style={{ width: width > 0 ? `${width}px` : "auto" }}
        >
          <div className="max-h-[300px] overflow-y-auto">
            {loading ? (
              <div className="space-y-1 overflow-hidden px-1 py-2">
                <Skeleton className="h-4 w-10 rounded" />
                <Skeleton className="h-8 rounded-sm" />
                <Skeleton className="h-8 rounded-sm" />
              </div>
            ) : validLocations.length === 0 ? (
              <div className="px-2 py-3 text-sm text-gray-500">Not found!</div>
            ) : (
              validLocations.map((location, index) => (
                <div
                  key={location.id}
                  className={cn(
                    "flex items-center justify-between px-3 py-2 cursor-pointer",
                    index === selectedIndex
                      ? "bg-gray-100"
                      : "hover:bg-gray-100",
                    index !== 0 && "border-t "
                  )}
                  onClick={() => {
                    setValue(location);
                    setInputValue(location.title);
                    onChangeValue?.(location.title);
                    setOpen(false);
                  }}
                >
                  <div className="flex items-center gap-3">
                    {location.image && (
                      <div className="w-12 h-12 relative rounded-md overflow-hidden">
                        <Image
                          src={location.image}
                          alt={location.title}
                          fill
                          className="object-cover"
                        />
                      </div>
                    )}
                    <p className="flex flex-col">
                      <span className="font-bold">{location.title}</span>
                      <span className="text-sm">{location.parent_name}</span>
                    </p>
                  </div>
                  <Check
                    className={cn(
                      "ml-auto",
                      location.id === value?.id ? "opacity-100" : "opacity-0"
                    )}
                  />
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
}
