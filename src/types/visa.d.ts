export interface ExtraPrice {
    name: string;
    name_ja: null;
    name_egy: null;
    price: string;
    type: string;
    per_person: string;
}

export interface VisaRow {
    id: number;
    title: string;
    working_day: number;
    slug: string;
    a2a_visa: number;
    visa_service: string;
    visa_type: string;
    seller_id: number;
    from_country_id: number;
    country_id: number;
    overview: string;
    documents: string;
    how_to_apply: string;
    terms_conditions: string | null;
    faqs: string; // Stringified array, parse to FAQ[] when needed
    image_id: number;
    banner_image_id: number;
    is_featured: number;
    gallery: string; // Comma-separated string of image IDs
    video: null;
    review_score: string;
    status: string;
    default_state: number;
    price: string;
    create_user: number;
    update_user: number;
    deleted_at: null;
    created_at: string;
    updated_at: string;
    extra_price: ExtraPrice[];
    reviews: any[]; // Replace 'any' with Review interface if known
    country: VisaCountry;
    sale_price?: number|string
}


export interface VisaCountry {
    id: number;
    name: string;
    content: null;
    slug: string;
    image_id: number | null;
    map_lat: string;
    map_lng: string;
    map_zoom: number;
    status: string;
    _lft: number;
    _rgt: number;
    parent_id: null;
    create_user: number;
    update_user: null;
    deleted_at: null;
    origin_id: null;
    lang: null;
    created_at: string;
    updated_at: string;
    banner_image_id: null;
    trip_ideas: null;
    gallery: null;
    city_id: number;
    state_id: number;
    postal_code: string;
    country_id: number;
}