import React from "react";
import { TransparentNavbar } from "@/components/header/transparentNav/TransparentNav";
import Link from "next/link";

function CancellationPolicy() {
    return (
        <div>
            <div className="relative h-full :max-h-[600px] bg-about-us w-full  from-blue-900 via-blue-950 to-blue-950">
                <div className="bg-[#00000066] h-full w-full absolute top-0 bottom-0"></div>
                <TransparentNavbar isBgWhite={false} />
                <div className="w-full container pb-16 pt-8 m-auto relative  z-9">
                    <div className="max-w-6xl m-auto py-20">
                        <h1 className="mb-4 text-5xl  font-bold text-white text-center">
                            Cancellation Policy
                        </h1>
                        <div className="flex gap-10 justify-center text-white  text-lg">
                            <Link href="#" className="">
                                Home
                            </Link>
                            .
                            <Link href="#" className="">
                                Cancellation Policy
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default CancellationPolicy