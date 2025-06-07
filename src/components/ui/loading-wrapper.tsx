"use client";

import { useLoading } from "@/lib/context/loading-context";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";

interface LoadingWrapperProps {
  id: string;
  children: React.ReactNode;
  loadingComponent?: React.ReactNode;
  onClick?: () => Promise<void> | void;
  className?: string;
}

export function LoadingWrapper({
  id,
  children,
  loadingComponent,
  onClick,
  className = "",
}: LoadingWrapperProps) {
  const { isLoading, startLoading, stopLoading } = useLoading();
  const [localLoading, setLocalLoading] = useState(false);
  
  // For server-side rendering compatibility
  useEffect(() => {
    if (isLoading(id)) {
      setLocalLoading(true);
    } else {
      setLocalLoading(false);
    }
  }, [id, isLoading]);

  const handleClick = async () => {
    if (!onClick) return;
    
    startLoading(id);
    setLocalLoading(true);
    
    try {
      await onClick();
    } finally {
      stopLoading(id);
      setLocalLoading(false);
    }
  };

  const defaultLoadingComponent = (
    <div className="flex items-center justify-center">
      <Loader2 className="h-4 w-4 animate-spin mr-2" />
      <span>Loading...</span>
    </div>
  );

  return (
    <div 
      className={`relative ${className}`} 
      onClick={onClick ? handleClick : undefined}
    >
      {localLoading ? (loadingComponent || defaultLoadingComponent) : children}
    </div>
  );
} 