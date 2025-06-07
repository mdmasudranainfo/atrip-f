

interface HotelBookingExtraPrice {
    name: string  // Service VIP, Breakfasts
    price: number
    type: "one_time" | "per_day"
    number: number
    enable: 0 | 1
    price_html: string
    price_type: string | null
}

interface HotelBookingRoomSelection {
    id: number // Room ID
    number_selected: number // QTY
}

export interface HotelBookingPayload {
    service_id: number
    service_type: 'hotel'
    start_date: string
    end_date: string
    adults: number
    children: number
    rooms: HotelBookingRoomSelection[]
    extra_price?: HotelBookingExtraPrice[]
}
