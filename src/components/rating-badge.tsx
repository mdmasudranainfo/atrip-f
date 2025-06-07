export default function RatingBadge({
  total,
  score,
}: {
  total: number;
  score: number;
}) {
  return (
    <div className="flex justify-end items-center gap-2 content-bottom-left">
      <span className="block text-primary-dark text-sm font-sans">
        {total} reviews
      </span>
      <p className="bg-info rounded-sm w-9 h-10 text-white flex justify-center items-center">
        {score}
      </p>
    </div>
  );
}
