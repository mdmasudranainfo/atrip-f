"use client"

import { AlertCircle, Home } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import Link from "next/link";

export default function Error() {

    return (
        <div className="min-h-screen w-full flex items-center justify-center p-4">
            <Card className="max-w-xl w-full p-10 shadow-none border-none bg-transparent">
                <div className="flex flex-col items-center text-center space-y-6">
                    {/* Icon */}
                    <div className="rounded-full bg-red-100 p-3">
                        <AlertCircle className="w-8 h-8 text-red-600" />
                    </div>

                    {/* Title */}
                    <div className="space-y-2">
                        <h1 className="text-2xl font-semibold text-dark">Something went wrong!</h1>
                        <p className="text-white-midGray text-sm">
                            We apologize for the inconvenience. An unexpected error has occurred. Our team has been notified and is
                            working to fix the issue.
                        </p>
                    </div>

                    {/* Action buttons */}
                    <div className="flex flex-col sm:flex-row justify-center gap-3 w-full">
                        <Link href={'/'}>
                            <Button variant='primary' className="" size="lg">
                                <Home className="w-4 h-4 mr-2" />
                                Go home
                            </Button>
                        </Link>
                    </div>
                </div>
            </Card>
        </div>
    )
}

