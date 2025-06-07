"use client";

import { Card } from "@/components/ui/card";
import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

interface StarRatingProps {
  ratingOptions: StarRatingOption[];
  selectedRating: string | null;
  setSelectedRating: (rating: string) => void;
  isExpanded?: boolean;
  handleToggle: () => void;
  title?: string;
}

export interface StarRatingOption {
  value: string;
  label: string;
}

const StarRating: React.FC<StarRatingProps> = ({
  ratingOptions,
  selectedRating,
  setSelectedRating,
  isExpanded = true,
  handleToggle,
  title,
}) => {

  return (
    <div className="pb-2">
      <div
        className="flex items-center justify-between p-4 cursor-pointer"
      // onClick={handleToggle}
      >
        <div className="flex items-center space-x-2">
          <span className="font-semibold text-base text-primary-dark leading-6">
            {title}
          </span>
        </div>
        {/* {isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />} */}
      </div>

      {isExpanded && (
        <div className="px-4 pb-4">
          <div className="flex flex-wrap gap-4">
            {ratingOptions.map((option) => (
              <button
                key={option.value}
                onClick={() => {
                  setSelectedRating(selectedRating == option.value ? "" : option.value);
                }}
                className="group"
              >
                <Card
                  className={cn(
                    "flex items-center gap-2 px-2 py-1.5 transition-colors border-none",
                    "bg-white-lightSlate hover:bg-gray-100",
                    selectedRating === option.value && "bg-gray-100"
                  )}
                >
                  <span className="text-sm font-medium leading-5">
                    {option.label}
                  </span>
                  <Star
                    className={cn(
                      "w-5 h-5",
                      selectedRating === option.value
                        ? "fill-yellow-400 text-yellow-400"
                        : "fill-transparent text-yellow-400 group-hover:fill-yellow-400"
                    )}
                  />
                </Card>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default StarRating;
