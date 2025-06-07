import { cn, formatPrice, getDiscountPercentage } from "@/lib/utils";

export default function DiscountPriceBadge({
  sellPrice,
  comparePrice,
  priceAfterText,
  hideLabel,
  labelClass,
}: {
  sellPrice: number;
  comparePrice: number;
  priceAfterText?: string;
  hideLabel?: boolean;
  labelClass?: string;
}) {
  const discountPercentage = getDiscountPercentage(sellPrice, comparePrice);
  const hasDiscount = discountPercentage > 0;

  return (
    <div className="text-right space-y-1">
      {/* Discount Badge */}
      {!hideLabel && hasDiscount && (
        <div className="md:flex hidden items-center justify-end mb-1 ">
          <div className="bg-pink-100 text-pink-500 px-2 py-0.5 rounded-l-md me-1 text-xs">
            Special Discount
          </div>
          <div className="bg-pink-500 text-white px-2 py-0.5 rounded-r-md font-medium text-xs">
            {discountPercentage}% Off
          </div>
        </div>
      )}

      {/* Prices */}
      <div className="flex flex-col items-end">
        {hasDiscount && (
          <>
            {/* <p className="text-xs text-gray-500">Price from</p> */}
            <span
              className={cn(
                "line-through text-pink-500 text-sm md:block hidden",
                labelClass
              )}
            >
              {formatPrice(comparePrice)}
            </span>
          </>
        )}

        <span
          className={cn(
            "text-primary font-bold md:text-xl leading-tight",
            labelClass
          )}
        >
          {formatPrice(sellPrice)}
        </span>
      </div>

      {/* Text like "1 night, 2 adults" */}
      {priceAfterText && (
        <p className="text-sm text-gray-600">{priceAfterText}</p>
      )}
    </div>
  );
}
