interface RateScoreEntry {
    title: string;
    total: number;
    percent: number;
}

interface ReviewData {
    score_total: number;
    score_text: string;
    total_review: number;
    rate_score: {
        [key: string]: RateScoreEntry;
    };
}

interface Location {
    id: number;
    name: string;
    content: string | null;
    slug: string;
    image_id: number;
    map_lat: string;
    map_lng: string;
    map_zoom: number;
    status: string;
    _lft: number;
    _rgt: number;
    parent_id: number | null;
    create_user: number;
    update_user: number | null;
    deleted_at: string | null;
    origin_id: number | null;
    lang: string | null;
    created_at: string;
    updated_at: string;
    banner_image_id: number | null;
    trip_ideas: any | null;
    gallery: any | null;
    city_id: number;
    state_id: number;
    postal_code: string;
    country_id: number;
    translation: any | null;
}

interface ChauffeurRelated {
    id: number;
    title: string;
    slug: string;
    content: string;
    image_id: number;
    banner_image_id: number;
    short_desc: string | null;
    category_id: number;
    location_id: number;
    address: string | null;
    map_lat: string | null;
    map_lng: string | null;
    map_zoom: number;
    is_featured: any | null;
    gallery: any[] | null;
    video: string | null;
    price: number | null;
    sale_price: number | null;
    duration: string | null;
    min_people: number | null;
    max_people: number | null;
    faqs: any | null;
    status: string;
    publish_date: string | null;
    create_user: number;
    update_user: number;
    deleted_at: string | null;
    origin_id: number | null;
    lang: string | null;
    created_at: string;
    updated_at: string;
    default_state: number;
    enable_fixed_date: any | null;
    start_date: string | null;
    end_date: string | null;
    last_booking_date: string | null;
    booking_type: string | null;
    limit_type: string | null;
    capacity_type: string | null;
    capacity: number | null;
    pass_exprire_type: string | null;
    pass_exprire_at: string | null;
    pass_valid_for: number | null;
    include: any | null;
    exclude: any | null;
    itinerary: any | null;
    surrounding: any | null;
    min_day_before_booking: number | null;
    service_including: any | null;
    ical_import_url: string | null;
    author_id: number | null;
    enable_service_fee: any | null;
    service_fee: any | null;
    review_score: number | null;
    location: Location;
    translation: any | null;
    has_wish_list: any | null;
}


interface ReviewList {
    current_page: number;
    data: any[];
    first_page_url: string;
    from: number | null;
    last_page: number;
    last_page_url: string;
    links: Array<{
        url: string | null;
        label: string;
        active: boolean;
    }>;
    next_page_url: string | null;
    path: string;
    per_page: number;
    prev_page_url: string | null;
    to: number | null;
    total: number;
}

interface SEOShare {
    title: string | null;
    desc: string | null;
    image: string | null;
}

interface SEOMeta {
    id: number;
    object_id: number;
    object_model: string;
    seo_index: number;
    seo_title: string | null;
    seo_desc: string | null;
    seo_image: string | null;
    seo_share: {
        facebook: SEOShare;
        twitter: SEOShare;
    };
    create_user: number;
    update_user: number;
    origin_id: number | null;
    lang: string | null;
    created_at: string;
    updated_at: string;
    slug: string;
    full_url: string;
    service_title: string;
    service_desc: string;
    service_image: number;
}

interface Breadcrumb {
    name: string;
    url: string;
}





interface RateScoreEntry {
    title: string;
    total: number;
    percent: number;
}

interface ReviewData {
    score_total: number;
    score_text: string;
    total_review: number;
    rate_score: {
        [key: string]: RateScoreEntry;
    };
}

interface Location {
    id: number;
    name: string;
    content: string | null;
    slug: string;
    image_id: number;
    map_lat: string;
    map_lng: string;
    map_zoom: number;
    status: string;
    _lft: number;
    _rgt: number;
    parent_id: number | null;
    create_user: number;
    update_user: number | null;
    deleted_at: string | null;
    origin_id: number | null;
    lang: string | null;
    created_at: string;
    updated_at: string;
    banner_image_id: number | null;
    trip_ideas: any | null;
    gallery: any | null;
    city_id: number;
    state_id: number;
    postal_code: string;
    country_id: number;
    translation: any | null;
}

interface ChauffeurRelated {
    id: number;
    title: string;
    slug: string;
    content: string;
    image_id: number;
    banner_image_id: number;
    short_desc: string | null;
    category_id: number;
    location_id: number;
    address: string | null;
    map_lat: string | null;
    map_lng: string | null;
    map_zoom: number;
    is_featured: any | null;
    gallery: any[] | null;
    video: string | null;
    price: number | null;
    sale_price: number | null;
    duration: string | null;
    min_people: number | null;
    max_people: number | null;
    faqs: any | null;
    status: string;
    publish_date: string | null;
    create_user: number;
    update_user: number;
    deleted_at: string | null;
    origin_id: number | null;
    lang: string | null;
    created_at: string;
    updated_at: string;
    default_state: number;
    enable_fixed_date: any | null;
    start_date: string | null;
    end_date: string | null;
    last_booking_date: string | null;
    booking_type: string | null;
    limit_type: string | null;
    capacity_type: string | null;
    capacity: number | null;
    pass_exprire_type: string | null;
    pass_exprire_at: string | null;
    pass_valid_for: number | null;
    include: any | null;
    exclude: any | null;
    itinerary: any | null;
    surrounding: any | null;
    min_day_before_booking: number | null;
    service_including: any | null;
    ical_import_url: string | null;
    author_id: number | null;
    enable_service_fee: any | null;
    service_fee: any | null;
    review_score: number | null;
    location: Location;
    translation: any | null;
    has_wish_list: any | null;
}

export interface ChauffeurPackageType {
    name: string;
    desc: string | null;
    min: number;
    max: number;
    price: string;
    number: number;
    display_price: string;
}

export interface ChauffeurBookingData {
    id: number;
    package_types: ChauffeurPackageType[];
    max: number;
    open_hours: any[];
    extra_price: any[];
    minDate: string;
    duration: string | null;
    buyer_fees: any[];
    start_date: string;
    start_date_html: string;
    end_date: string;
    end_date_html: string;
    deposit: boolean;
    deposit_type: string;
    deposit_amount: string;
    deposit_fomular: string;
    is_form_enquiry_and_book: boolean;
    enquiry_type: string;
    is_fixed_date: boolean;
    features: string[];
}

interface ReviewList {
    current_page: number;
    data: any[];
    first_page_url: string;
    from: number | null;
    last_page: number;
    last_page_url: string;
    links: Array<{
        url: string | null;
        label: string;
        active: boolean;
    }>;
    next_page_url: string | null;
    path: string;
    per_page: number;
    prev_page_url: string | null;
    to: number | null;
    total: number;
}

interface SEOShare {
    title: string | null;
    desc: string | null;
    image: string | null;
}

interface SEOMeta {
    id: number;
    object_id: number;
    object_model: string;
    seo_index: number;
    seo_title: string | null;
    seo_desc: string | null;
    seo_image: string | null;
    seo_share: {
        facebook: SEOShare;
        twitter: SEOShare;
    };
    create_user: number;
    update_user: number;
    origin_id: number | null;
    lang: string | null;
    created_at: string;
    updated_at: string;
    slug: string;
    full_url: string;
    service_title: string;
    service_desc: string;
    service_image: number;
}

interface Breadcrumb {
    name: string;
    url: string;
}

export interface ChauffeurRow {
    id: number;
    title: string;
    slug: string;
    content: string;
    image_id: number;
    banner_image_id: number;
    short_desc: string | null;
    category_id: number;
    location_id: number;
    address: string | null;
    map_lat: string | null;
    map_lng: string | null;
    map_zoom: number;
    is_featured: any | null;
    gallery: any[];
    video: string | null;
    price: number | null;
    sale_price: number | null;
    duration: string | null;
    min_people: number | null;
    max_people: number | null;
    faqs: any | null;
    status: string;
    publish_date: string | null;
    create_user: number;
    update_user: number;
    deleted_at: string | null;
    origin_id: number | null;
    lang: string | null;
    created_at: string;
    updated_at: string;
    default_state: number;
    enable_fixed_date: any | null;
    start_date: string | null;
    end_date: string | null;
    last_booking_date: string | null;
    booking_type: string | null;
    limit_type: string | null;
    capacity_type: string | null;
    capacity: number | null;
    pass_exprire_type: string | null;
    pass_exprire_at: string | null;
    pass_valid_for: number | null;
    include: any | null;
    exclude: any | null;
    itinerary: any;
    surrounding: any | null;
    min_day_before_booking: number | null;
    service_including: any | null;
    ical_import_url: string | null;
    author_id: number | null;
    enable_service_fee: any | null;
    service_fee: any | null;
    review_score: number | null;
    review_data: ReviewData;
    image_url: string;
    banner_image_url: string;
}