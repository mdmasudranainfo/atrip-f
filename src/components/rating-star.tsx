import { Star } from "lucide-react";

export default function RatingStar({reviewScore}: {reviewScore: number}) {
    const rating = Math.floor(Number(reviewScore || 0));
    const ratingStar = Array.from({ length: 5 }, () => true);

    return (
        <>
        <div className="flex text-yellow-400">
        {ratingStar?.map((_, index) => (
            <Star
              key={index}
              className={`h-4 w-4 ${
                index < rating
                  ? "text-yellow-400 fill-current"
                  : "text-gray-300"
              }`}
            />
          ))}
          </div>
        </>
    )
}