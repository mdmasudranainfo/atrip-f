"use client"

import { Button } from "@/components/ui/button";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { Loader2 } from "lucide-react";

export function HotalDetailButton({slug}: {slug: string}) {
    const searchParams = useSearchParams();
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const queryString = searchParams.toString();

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        setIsLoading(true);
        router.push(`/hotels/${slug}?${queryString}`);
    };

    return (
        <Button 
            variant={"vcardBtn"} 
            onClick={handleClick}
            disabled={isLoading}
        >
            {isLoading ? (
                <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Loading...
                </>
            ) : (
                "Check Availability"
            )}
        </Button>
    );
}