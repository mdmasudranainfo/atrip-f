"use client";

import { useState } from "react";
import { Check, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { applyCoupon, removeCoupon } from "@/lib/actions/coupon-action";
import { formatPrice } from "@/lib/utils";
import { useRouter } from "next/navigation";

interface InitCoupon {
  id: number;
  code: string;
  name: string;
  amount: number;
  discount_type: "fixed" | "percentage";
}
export function CouponForm({
  bookingCode,
  initCoupon,
}: {
  bookingCode: string;
  initCoupon: null | InitCoupon;
}) {
  const router = useRouter();

  const [couponCode, setCouponCode] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState<{
    code: string;
    amount: number;
    discount_type: string;
  } | null>(
    initCoupon
      ? {
          code: initCoupon.code,
          amount: initCoupon.amount,
          discount_type: initCoupon.discount_type,
        }
      : null
  );
  const [isLoading, setIsLoading] = useState(false);
  const [isRemoveLoading, setIsRemoveLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleApplyCoupon = async () => {
    if (!couponCode.trim()) {
      toast.error("Please enter a coupon code");
      return;
    }

    setIsLoading(true);
    setError(null); // Clear previous errors

    try {
      const { data, error } = await applyCoupon(bookingCode, couponCode);

      if (data && data.status == 1) {
        setAppliedCoupon({
          code: couponCode,
          amount: Number(data.amount),
          discount_type: data.discount_type,
        });
        toast.success(data.message || "Coupon applied successfully");
        setCouponCode("");
        router.refresh();
      } else {
        setError(error || "Invalid coupon code");
        toast.error(error || "Invalid coupon code");
      }
    } catch (error) {
      setError("Failed to apply coupon");
      toast.error("Failed to apply coupon");
    } finally {
      setIsLoading(false);
    }
  };

  const handleRemoveCoupon = async () => {
    if (!appliedCoupon?.code) {
      return;
    }

    try {
      setIsRemoveLoading(true);
      const { data, error } = await removeCoupon(
        bookingCode,
        appliedCoupon.code
      );
      if (data && data.status == 1) {
        setAppliedCoupon(null);
        toast.success(data.message || "Coupon has been removed");
        setError(null);
        router.refresh();
      } else {
        setError(error || "Failed to remove coupon");
        toast.error(error || "Failed to remove coupon");
      }
    } catch (error) {
      setError("Failed to remove coupon");
      toast.error("Failed to remove coupon");
    } finally {
      setIsRemoveLoading(false);
    }
  };

  return (
    <Card className="space-y-4 p-4 border-[#DADFE6] shadow-none rounded-lg">
      <CardHeader>
        <CardTitle className="text-[#1a1a1a] text-lg font-semibold">
          Apply Coupon
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4 p-0">
        <div className="grid w-full items-center gap-4">
          <div className="flex flex-col space-y-1.5">
            <Label htmlFor="coupon-code">Coupon Code</Label>
            <div className="flex space-x-2">
              <Input
                id="coupon-code"
                placeholder="Enter coupon code"
                value={couponCode}
                onChange={(e) => {
                  setCouponCode(e.target.value);
                  if (error) setError(null); // Clear error when user types
                }}
                disabled={!!appliedCoupon || isLoading}
                className={
                  error
                    ? "border-red-500 focus-visible:ring-red-500 h-9 shadow-none"
                    : "h-9 shadow-none border-[#DADFE6]"
                }
              />
              <Button
                onClick={handleApplyCoupon}
                type="button"
                disabled={!!appliedCoupon || isLoading || !couponCode.trim()}
                className="shrink-0 text-white"
              >
                Apply
              </Button>
            </div>
            {error && <p className="text-sm text-red-500 mt-1">{error}</p>}
          </div>

          {appliedCoupon && (
            <div className="rounded-md border border-green-200 bg-green-50 p-3 dark:border-green-900 dark:bg-green-950">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Check className="h-4 w-4 text-green-600 dark:text-green-400" />
                  <span className="font-medium text-green-800 dark:text-green-300">
                    {appliedCoupon.code}
                  </span>
                  <span className="text-sm text-green-700 dark:text-green-400">
                    (
                    {appliedCoupon.discount_type == "fixed"
                      ? formatPrice(appliedCoupon.amount)
                      : appliedCoupon.amount}{" "}
                    {appliedCoupon.discount_type == "fixed" ? "" : "%"} off)
                  </span>
                </div>
                <Button
                  variant="ghost"
                  disabled={isRemoveLoading}
                  type="button"
                  size="icon"
                  onClick={handleRemoveCoupon}
                  className="h-6 w-6 text-green-700 hover:text-red-600 dark:text-green-400 dark:hover:text-red-400"
                >
                  <X className="h-4 w-4" />
                  <span className="sr-only">Remove coupon</span>
                </Button>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
