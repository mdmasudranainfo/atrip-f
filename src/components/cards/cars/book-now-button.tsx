"use client";

import { useSearchParams } from "next/navigation";
import {
    CheckCircle
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";


export default function BookNowButton({ url }: { url: string }) {
    const searchParams = useSearchParams();
    const query = new URLSearchParams();
    searchParams.forEach((val, key) => {
        query.set(key, val);
    })

    return (
        <div className="text-right mt-2 content-bottom-right">
            <Link href={`${url}?${query}`}>
                <Button variant={"vcardBtn"} >
                    <CheckCircle size={12} color="#fff" />
                    Book Now
                </Button>
            </Link>
        </div>
    )
}
