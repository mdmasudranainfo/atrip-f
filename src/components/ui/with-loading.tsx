"use client";

import React, { useState, useEffect } from 'react';
import { Loader2 } from 'lucide-react';
import { Skeleton } from './skeleton';

interface WithLoadingProps {
  children: React.ReactNode;
  isLoading?: boolean;
  loadingComponent?: React.ReactNode;
  skeletonHeight?: string;
  skeletonWidth?: string;
  skeletonClassName?: string;
}

export function WithLoading({
  children,
  isLoading = false,
  loadingComponent,
  skeletonHeight = "h-10",
  skeletonWidth = "w-full",
  skeletonClassName = "",
}: WithLoadingProps) {
  const [loading, setLoading] = useState(isLoading);

  useEffect(() => {
    setLoading(isLoading);
  }, [isLoading]);

  if (loading) {
    if (loadingComponent) {
      return <>{loadingComponent}</>;
    }

    return (
      <div className="flex items-center justify-center">
        <Skeleton className={`${skeletonHeight} ${skeletonWidth} ${skeletonClassName}`} />
      </div>
    );
  }

  return <>{children}</>;
}

export function LoadingSpinner({ className = "", size = "h-4 w-4" }: { className?: string, size?: string }) {
  return <Loader2 className={`animate-spin ${size} ${className}`} />;
}

export function ButtonLoading({ children, isLoading }: { children: React.ReactNode, isLoading: boolean }) {
  if (isLoading) {
    return (
      <>
        <LoadingSpinner />
        <span>Loading...</span>
      </>
    );
  }
  
  return <>{children}</>;
} 