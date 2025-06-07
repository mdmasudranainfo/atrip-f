interface Airport {
    id: number;
    name: string;
    code: string;
    address: string;
    country: string | null;
    location_id: number;
    description: string;
    map_lat: string;
    map_lng: string;
    map_zoom: number;
    create_user: any;
    update_user: any;
    status: string;
    created_at: string;
    updated_at: string;
    author_id: any;
}

interface SeatType {
    id: number;
    code: string;
    name: string;
    create_user: any;
    update_user: any;
    deleted_at: any;
    created_at: string;
    updated_at: string;
    author_id: any;
}

export interface FlightSeat {
    id: number;
    price: string;
    max_passengers: number;
    flight_id: number;
    seat_type: SeatType;
    person: string;
    baggage_check_in: number;
    baggage_cabin: number;
    create_user: any;
    update_user: any;
    created_at: string;
    updated_at: string;
    deleted_at: any;
    author_id: any;
    price_html: string;
    number: number;
}

interface Airline {
    id: number;
    name: string;
    image_id: number;
    create_user: any;
    update_user: any;
    deleted_at: any;
    created_at: string;
    updated_at: string;
    author_id: any;
    image_url: string;
}

export interface FlightData {
    id: number;
    title: string;
    code: string;
    review_score: number | null;
    departure_time: string;
    arrival_time: string;
    duration: string;
    min_price: string;
    airport_to: Airport;
    airport_from: Airport;
    airline_id: number;
    status: string;
    create_user: any;
    update_user: any;
    created_at: string;
    updated_at: string;
    deleted_at: any;
    author_id: any;
    is_featured: number;
    departure_time_html: string;
    departure_date_html: string;
    arrival_time_html: string;
    arrival_date_html: string;
    can_book: boolean;
    flight_seat: FlightSeat[];
    airline: Airline;
    booking_passengers: any[];
}