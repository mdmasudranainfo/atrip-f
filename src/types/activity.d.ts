import { Review } from "@/types/review";
export interface EventActivityRow {
  id: number;
  title: string;
  sub_title?: string;
  slug: string;
  address: string;
  map_lat: string;
  map_lng: string;
  map_zoom: number;
  duration: number;
  start_time: string;
  price: number;
  image_url: string;
  review_score: number;
  total_review: number;
  sale_price?: number | string;
}

interface EventResponse {
  row: EventRow;
  booking_data: EventBookingData;
  review_list: ReviewList;
}

export interface EventRow {
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
  gallery: GalleryImage[];
  video: string;
  faqs: any;
  cancellation_policy: string;
  asking: string;
  ticket_types: TicketType[];
  duration: number;
  start_time: string;
  price: number;
  sale_price: number;
  is_instant: number;
  enable_extra_price: number;
  extra_price: ExtraPriceItem[];
  review_score: string;
  ical_import_url: string | null;
  status: string;
  default_state: number;
  create_user: number;
  update_user: number | null;
  deleted_at: Date | null;
  created_at: string;
  updated_at: string;
  enable_service_fee: number | null;
  service_fee: string | null;
  surrounding: string | null;
  end_time: string;
  time_slot?: any;
  duration_unit: string;
  author_id: number;
  image: string;
  banner_image: string;
  include: any;
  operating_hours: any;
  operating_hours_title: string;
  need_to_know: any;
  my_ticket: any;
  review_data: ReviewData;
}

interface GalleryImage {
  large: string;
  thumb: string;
}

interface FAQItem {
  title: string;
  content: string;
}

interface TicketType {
  code: string;
  name: string;
  name_ja: string;
  name_egy: string | null;
  price: string;
  number: string;
}

interface ExtraPriceItem {
  name: string;
  price: string;
  type: string;
}

interface ReviewData {
  score_total: string;
  score_text: string;
  total_review: number;
  rate_score: {
    [key: string]: RateScore;
  };
}

interface RateScore {
  title: string;
  total: number;
  percent: number;
}

export interface EventBookingData {
  id: number;
  ticket_types: BookingTicketType[];
  extra_price: BookingExtraPrice[];
  minDate: string;
  max_number: number;
  duration: number;
  buyer_fees: BuyerFee[];
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
  booking_type: string;
  is_fixed_date: boolean;
}

export interface BookingTicketType {
  code: string;
  name: string;
  name_ja: string;
  name_egy: string | null;
  price: string;
  number: number;
  min: number;
  max: number;
  des?: string;
  display_price: string;
}

interface BookingExtraPrice {
  name: string;
  price: string;
  type: string;
  number: number;
  enable: number;
  price_html: string;
  price_type: string;
}

interface BuyerFee {
  name: string;
  desc: string;
  name_ja: string;
  desc_ja: string;
  price: string;
  type: string;
  type_name: string;
  type_desc: string;
  price_type: string;
}

export interface ReviewList {
  current_page: number;
  data: Review[];
  first_page_url: string;
  from: number;
  last_page: number;
  last_page_url: string;
  links: PaginationLink[];
  next_page_url: string | null;
  path: string;
  per_page: number;
  prev_page_url: string | null;
  to: number;
  total: number;
}

interface PaginationLink {
  url: string | null;
  label: string;
  active: boolean;
}
