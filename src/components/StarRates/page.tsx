import React from "react";
import { Star } from "lucide-react";

interface StarRatesProps {
    rating: number;
    totalStars?: number;
}

const StarRates: React.FC<StarRatesProps> = ({ rating, totalStars = 5 }) => {
    return (
        <div className="flex">
            {Array.from({ length: totalStars }).map((_, index) => {
                const fullStars = Math.floor(rating);
                const decimal = rating - fullStars;
                const isHalfStar = index === fullStars && decimal > 0;

                return (
                    <div key={index} className="relative">
                        <Star
                            className="h-5 w-5 text-gray-300"
                            strokeWidth={1}
                        />
                        {index < fullStars && (
                            <Star
                                className="absolute top-0 left-0 h-5 w-5 text-yellow-400"
                                strokeWidth={0}
                                fill="currentColor"
                            />
                        )}
                        {isHalfStar && (
                            <div
                                className="absolute top-0 left-0 h-5 w-5 overflow-hidden"
                                style={{ width: `${decimal * 100}%` }}
                            >
                                <Star className="h-5 w-5 text-yellow-500" strokeWidth={0} fill="currentColor" />
                            </div>
                        )}
                    </div>
                );
            })}
        </div>
    );
};

export default StarRates;
