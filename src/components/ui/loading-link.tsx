"use client";

import { Loader2 } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

interface LoadingLinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
  loadingText?: string;
  showLoadingText?: boolean;
}

export function LoadingLink({
  href,
  children,
  className = "",
  loadingText = "Loading...",
  showLoadingText = true,
  ...props
}: LoadingLinkProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  // Reset loading state when pathname changes
  useEffect(() => {
    setIsLoading(false);
  }, [pathname]);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    setIsLoading(true);
    router.push(href);
  };

  return (
    <Link
      href={href}
      className={cn("inline-flex items-center", className)}
      onClick={handleClick}
      {...props}
    >
      {isLoading ? (
        <>
          <Loader2 className="h-4 w-4 animate-spin" />
          {showLoadingText && <span className="ml-2">{loadingText}</span>}
        </>
      ) : (
        children
      )}
    </Link>
  );
} 