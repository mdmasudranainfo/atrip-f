import { Button } from "@/components/ui/button"
import { XCircle } from "lucide-react"

export default function ResultNotFound() {
    return (
        <div className="min-h-screen w-full flex items-center justify-center p-4 bg-background relative overflow-hidden mt-4">
            {/* Decorative background elements */}
            <div className="absolute top-0 left-0 w-32 h-32 bg-blue-100 rounded-full blur-3xl opacity-30" />
            <div className="absolute bottom-0 right-0 w-48 h-48 bg-blue-100 rounded-full blur-3xl opacity-30" />

            <div className=" w-full bg-white rounded-2xl  p-8 text-center relative">
                {/* Icon */}
                <div className="mb-6 relative">
                    <div className="w-20 h-20 mx-auto bg-red-50 rounded-full flex items-center justify-center">
                        <XCircle className="w-10 h-10 text-red-500" />
                    </div>
                    {/* Decorative dots */}
                    <div className="absolute top-0 right-0 w-2 h-2 bg-blue-200 rounded-full" />
                    <div className="absolute bottom-4 left-4 w-1.5 h-1.5 bg-gray-200 rounded-full" />
                </div>

                {/* Text content */}
                <h2 className="text-xl font-semibold text-gray-900 mb-2">Result Not Found</h2>
                <p className="text-gray-500 text-sm mb-6">Whoops ... this information is not available for a moment</p>

                {/* Button */}
                {/* <Button variant="destructive" className="bg-red-500 hover:bg-red-600" onClick={() => window.history.back()}>
                    Go Back
                </Button> */}
            </div>
        </div>
    )
}

