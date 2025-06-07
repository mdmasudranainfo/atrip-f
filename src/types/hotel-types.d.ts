import { ReviewData } from "@/types/tourTypes"
export interface HotelType {
  id: number;
  title: string;
  slug: string;
  content: string;
  additional: string;
  location_id: number;
  address: string;
  map_lat: string;
  map_lng: string;
  map_zoom: number;
  is_featured: number;
  gallery: GalleryUrl[];
  video: string;
  policy: Policy[];
  star_rate: number;
  price: number;
  min_price: number;
  check_in_time: string;
  check_out_time: string;
  allow_full_day: string | null;
  sale_price?: string | number;
  status: string;
  create_user: number;
  update_user: number;
  deleted_at: string | null;
  created_at: string;
  updated_at: string;
  review_score: string;
  ical_import_url: string | null;
  enable_extra_price: number;
  extra_price: ExtraPrice[];
  enable_service_fee: number;
  service_fee: string | null;
  surrounding: string | null;
  author_id: number;
  min_day_before_booking: string | null;
  min_day_stays: string | null;
  hotel_info: HotelInfo;
  rooms: RoomType[];
  location: Location;
  translation: Translation;
  has_wish_list: string | null;
  properties: Property[];
  image_url: string;
  banner_image_url: string;
  nearest_location: NearestLocation;
  room: {
    id: number
    title: string
    number: number
    beds: number
    size: number
    adults: number
    children: number
    price: number
  }
  review_data: ReviewData;
  amenities: any;
  fine_print: any;
  faqs: any;
  tax_rate: number;
}

export interface Policy {
  title: string;
  content: string;
}

export interface ExtraPrice {
  name: string;
  name_ja: string | null;
  name_egy: string | null;
  price: string;
  type: string;
}

export interface HotelInfo {
  bedroom: string;
  livingroom: string;
  bathroom: string;
  kitchen: string;
  type: string;
  bed: string;
  single: string;
  double: string;
  extra_double: string;
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
  create_user: number;
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
  translation: string | null;
  city: {
    name: string;
  };
  country: {
    name: string;
  };
}

export interface Translation {
  id: number;
  origin_id: number;
  locale: string;
  title: string;
  content: string;
  address: string;
  policy: Policy[];
  create_user: number;
  update_user: number | null;
  deleted_at: string | null;
  created_at: string;
  updated_at: string;
  surrounding: string | null;
}

export interface Property {
  id: number;
  property_id: number;
  hotel_id: number;
  distance_in_km: number;
  created_at: string;
  updated_at: string;
  property: PropertyDetails;
}

export interface PropertyDetails {
  id: number;
  location_id: number;
  name: string;
  created_at: string;
  updated_at: string;
}

export interface NearestLocation {
  name: string;
  distance_in_km: number;
}

export interface Package {
  name: string;
  price: string;
  discount: string;
  discounted_price: string;
  terms: string[];
}

export interface GalleryUrl {
  large: string;
  thumb: string;
}

export interface RoomType {
  terms?: string[];
  compare_price?: number;
  stock: number;
  id: number;
  title: string;
  content: string;
  image_id: number;
  gallery: GalleryUrl[];
  video: string;
  price: string;
  parent_id: number;
  number: number;
  beds: number;
  size: number;
  adults: number;
  children: number;
  status: string;
  create_user: number;
  update_user: number;
  deleted_at: string | null;
  created_at: string;
  updated_at: string;
  ical_import_url: string | null;
  min_day_stays: string | null;
  packages: Package[];
  image: string;
}

// Booked data
export interface BookedData {
  tax_rate: number;
  id: number;
  code: string;
  vendor_id: number;
  customer_id: number;
  payment_id: number | null;
  gateway: string | null;
  object_id: number;
  object_model: string;
  start_date: string;
  end_date: string;
  total: string;
  total_guests: number;
  currency: string | null;
  status: string;
  deposit: string | null;
  deposit_type: string | null;
  commission: number;
  commission_type: string;
  email: string | null;
  first_name: string | null;
  last_name: string | null;
  phone: string | null;
  address: string | null;
  address2: string | null;
  city: string | null;
  state: string | null;
  zip_code: string | null;
  country: string | null;
  customer_notes: string | null;
  vendor_service_fee_amount: string;
  vendor_service_fee: string;
  create_user: number;
  update_user: number | null;
  deleted_at: string | null;
  created_at: string;
  updated_at: string;
  buyer_fees: BuyerFee[];
  total_before_fees: string;
  paid_vendor: string | null;
  object_child_id: number | null;
  number: number | null;
  paid: string | null;
  pay_now: string | null;
  total_before_discount: number;
  wallet_credit_used: number;
  wallet_total_used: number;
  service: Service;
  enable_extra_price: number;
  extra_price?: ExtraPrice[];
  total_tax: number;
  before_tax: number;
}

export interface BuyerFee {
  name: string;
  desc: string;
  name_ja: string;
  desc_ja: string;
  price: string;
  type: string;
}

export interface Service {
  id: number;
  title: string;
  slug: string;
  content: string;
  image_id: number;
  banner_image_id: number;
  location_id: number;
  address: string;
  map_lat: string;
  map_lng: string;
  map_zoom: number;
  is_featured: number;
  gallery: string;
  video: string;
  policy: Policy[];
  star_rate: number;
  price: string;
  check_in_time: string;
  check_out_time: string;
  allow_full_day: string | null;
  sale_price: string | null;
  status: string;
  create_user: number;
  update_user: number;
  deleted_at: string | null;
  created_at: string;
  updated_at: string;
  review_score: string;
  ical_import_url: string | null;
  enable_extra_price: number;
  extra_price: ExtraPrice[];
  enable_service_fee: number;
  service_fee: string | null;
  surrounding: string | null;
  author_id: number;
  min_day_before_booking: string | null;
  min_day_stays: string | null;
  hotel_info: HotelInfo;
}
