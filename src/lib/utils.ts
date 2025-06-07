import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { isValid } from "date-fns";
import dayjs from "dayjs";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function ratingLabel(rating: number) {
  const _rating = Math.floor(rating);
  switch (_rating) {
    case 5:
      return "Excellent";
      break;
    case 4:
      return "Very Good";
      break;
    case 3:
      return "Average";
      break;
    case 2:
      return "Poor";
      break;
    case 1:
    case 0:
      return "Terrible";
      break;
    default:
      return "Not rated";
      break;
  }
}

export function formatPrice(
  price: number | string,
  opts: Intl.NumberFormatOptions = {}
) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: opts.currency ?? "AED",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
    ...opts,
  }).format(Number(price));
}

export function formatStaticPrice(
  price: number | string,
  opts: Intl.NumberFormatOptions = {}
) {
  return formatPrice(price, opts);
}

export function preferInt(price: number | string) {
  const _price = Number(price);
  if (Number.isInteger(_price)) {
    return _price;
  } else {
    // Check if the decimal part is zero
    if (_price % 1 === 0) {
      return Math.floor(_price); // Return integer part if decimal is 0
    } else {
      return _price; // Return float if decimal part is not 0
    }
  }
}

export const parseUrlStrDate = (dateStr: string | null) => {
  if (!dateStr) return null;
  const date = dayjs(dateStr)?.toDate();
  return isValid(date) ? date : null;
};

// Function to generate time slots every 30 minutes
export const generateTimeSlots = (start: string, end: string) => {
  const times = [];
  const currentTime = new Date();

  // Convert start and end time to minutes
  const [startHours, startMinutes] = start.split(":").map(Number);
  const [endHours, endMinutes] = end.split(":").map(Number);

  currentTime.setHours(startHours, startMinutes, 0, 0);
  const endTimeObj = new Date();
  endTimeObj.setHours(endHours, endMinutes, 0, 0);

  while (currentTime <= endTimeObj) {
    const formattedTime = currentTime.toTimeString().slice(0, 5); // Format HH:MM
    times.push(formattedTime);
    currentTime.setMinutes(currentTime.getMinutes() + 30); // Increment by 30 minutes
  }

  return times;
};

export const getComparePrice = (
  price: number | string,
  sale_price?: number | string
) => {
  const _sale_price = Number(sale_price || 0);
  const _price = Number(price || 0);
  return _sale_price > 0 && _price > _sale_price ? _price : 0;
};

export const getSellPrice = (
  price: number | string,
  sale_price?: number | string
) => {
  const _sale_price = Number(sale_price || 0);
  const _price = Number(price || 0);
  return _sale_price > 0 ? _sale_price : _price;
};

export const getDiscountPercentage = (
  sellPrice: number,
  comparePrice: number
) => {
  const hasDiscount = comparePrice > 0 && comparePrice > sellPrice;
  return hasDiscount
    ? Math.round(((comparePrice - sellPrice) / comparePrice) * 100)
    : 0;
};

export const taxRateToAmount = (amount: number, taxRate: number) =>
  taxRate > 0 ? (taxRate / 100) * amount : 0;
