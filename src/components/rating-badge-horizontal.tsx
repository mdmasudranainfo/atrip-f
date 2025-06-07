import RatingStar from "./rating-star";

export default async function RatingBadgeHorizontal({total, score}: {total: number, score: number}) {
    if(!total) return <div className="flex items-center gap-2 mb-4"><span className="text-gray-600 text-base">No Reviews</span></div>
    return (
        <div className="flex items-center gap-2 mb-4">
            <RatingStar reviewScore={score} />
            <span className="text-gray-600 py-0.5 rounded text-base">{score}</span>
            <span className="text-gray-600 text-base">{total} Reviews</span>
        </div>
    )
}