export interface FlightResponse {
  rows: PaginatedData<FlightDatas>;
  list_location: Location[];
  seatType: SeatType[];
  flight_min_max_price: string[];
  markers: any[];
  blank: number;
  seo_meta: SeoMeta;
  layout: string;
  attributes: Attribute[];
}

export interface PaginatedData<T> {
  current_page: number;
  data: FlightDatas[];
  first_page_url: string;
  from: number;
  last_page: number;
  last_page_url: string;
  links: Link[];
  next_page_url: string | null;
  path: string;
  per_page: number;
  prev_page_url: string | null;
  to: number;
  total: number;
}

export interface Link {
  url: string | null;
  label: string;
  active: boolean;
}

export interface FlightDatas {
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
  create_user: number | null;
  update_user: number | null;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
  author_id: number | null;
  can_book: boolean;
  flight_seat: FlightSeat[];
  airline: Airline;
  booking_passengers: any[];
}

export interface Airport {
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
  create_user: number | null;
  update_user: number | null;
  status: string;
  created_at: string;
  updated_at: string;
  author_id: number | null;
}

export interface FlightSeat {
  id: number;
  price: string;
  max_passengers: number;
  flight_id: number;
  seat_type: string;
  person: string;
  baggage_check_in: number;
  baggage_cabin: number;
  create_user: number | null;
  update_user: number | null;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
  author_id: number | null;
}

export interface Airline {
  id: number;
  name: string;
  image_id: number;
  create_user: number | null;
  update_user: number | null;
  deleted_at: string | null;
  created_at: string;
  updated_at: string;
  author_id: number | null;
}

export interface Location {
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
  create_user: number | null;
  update_user: number | null;
  deleted_at: string | null;
  origin_id: number | null;
  lang: string | null;
  created_at: string;
  updated_at: string;
  banner_image_id: number | null;
  trip_ideas: string | null;
  gallery: string | null;
  city_id: number;
  state_id: number;
  postal_code: string;
  country_id: number;
  translation: any | null;
  children: Location[];
}

export interface SeatType {
  id: number;
  code: string;
  name: string;
  create_user: number | null;
  update_user: number | null;
  deleted_at: string | null;
  created_at: string;
  updated_at: string;
  author_id: number | null;
}

export interface SeoMeta {
  seo_title: string;
  seo_image: string;
  seo_desc: string;
  seo_share: string;
  full_url: string;
}

export interface Attribute {
  id: number;
  name: string;
  slug: string;
  service: string;
  hide_in_filter_search: boolean | null;
  position: number | null;
  create_user: number | null;
  update_user: number | null;
  deleted_at: string | null;
  created_at: string;
  updated_at: string;
  display_type: string | null;
  hide_in_single: boolean | null;
  terms: Term[];
  translation: any | null;
}

export interface Term {
  id: number;
  name: string;
  content: string | null;
  attr_id: number;
  slug: string;
  create_user: number | null;
  update_user: number | null;
  image_id: number | null;
  icon: string | null;
  origin_id: number | null;
  lang: string | null;
  deleted_at: string | null;
  created_at: string;
  updated_at: string;
  flight_count: number;
  translation: any | null;
}
