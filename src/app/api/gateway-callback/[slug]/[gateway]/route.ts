import { bookingGatewayCallbackConfirm } from "@/lib/actions/booking-actions";
import { redirect } from "next/navigation";
import { NextRequest, NextResponse } from "next/server";


export async function GET(request: NextRequest,
    { params }: { params: Promise<{ slug: string, gateway: string }> }
) {
    const _params = await params
    const searchParams = request.nextUrl.searchParams
    const session_id = searchParams.get('session_id') as string

    const {data, error} = await bookingGatewayCallbackConfirm(_params.gateway, _params.slug, session_id)

    if(!error) {
        redirect(`/booking/${_params.slug}/success`)
    } else {
        redirect(`/booking/${_params.slug}`)
    }
}