export interface FAQ {
  title: string;
  content: string;
}
export interface IncludeExcludeProps {
  includes: IncludeExclude[];
  excludes: IncludeExclude[];
}
export interface IncludeExclude {
  title: string;
}

export interface BudgetSelectorProps {
  budgets: BudgetRange[];
  range: [number, number];
  setRange?: React.Dispatch<React.SetStateAction<[number, number]>>;
  selectedRange: BudgetRange | null;
  expandedBudget: boolean;
  setExpandedBudget: React.Dispatch<React.SetStateAction<boolean>>;
  handleSliderChange: (value: number[]) => void;
  handleRangeClick: (budgetRange: BudgetRange) => void;
}

export interface Itinerary {
  image_id: string;
  title: string;
  desc: string;
  content: string;
}
export interface BudgetRange {
  min: number;
  max: number | null;
  label: string;
}
export interface FilterConfig {
  key: string;
  title: string;
  options: any[];
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
}


type PersonType = {
  name: string;
  desc: string;
  min: number;
  max: number;
  price: number;
};


type TourMeta = {
  id: number;
  tour_id: number;
  enable_person_types: number;
  person_types: PersonType[];
  enable_extra_price: number | null;
  extra_price: ExtraPrice[];
};



export interface TourData {
  id: number;
  title: string;
  slug: string;
  content: string;
  image_id: number;
  banner_image_id: number;
  short_desc: string;
  category_id: number;
  location_id: number;
  address: string;
  map_lat: string;
  map_lng: string;
  map_zoom: number;
  is_featured: number;
  gallery: string;
  video: string;
  price: string;
  sale_price: string;
  duration: number;
  min_people: number;
  max_people: number;
  faqs: FAQ[];
  status: string;
  publish_date: string | null;
  create_user: number;
  update_user: number | null;
  deleted_at: string | null;
  origin_id: number | null;
  lang: string | null;
  created_at: string;
  updated_at: string;
  default_state: number;
  enable_fixed_date: number;
  start_date: string | null;
  end_date: string | null;
  last_booking_date: string | null;
  include: IncludeExclude[];
  exclude: IncludeExclude[];
  itinerary: Itinerary[];
  review_score: string;
  ical_import_url: string | null;
  enable_service_fee: string | null;
  service_fee: string | null;
  surrounding: string | null;
  author_id: number;
  booking_type: string | null;
  limit_type: string | null;
  capacity_type: string | null;
  capacity: string | null;
  pass_exprire_type: string | null;
  pass_exprire_at: string | null;
  pass_valid_for: string | null;
  location: Location;
  has_wish_list: string | null;
  translation: string | null;
  image_url: string;
  review_data: ReviewData;
  service_including?: string[];
  meta?: TourMeta;
}

export interface ServiceIncluding {
  service_including: string[];
}

export interface ReviewData {
  score_total: string;
  score_text: string;
  total_review: number;
  rate_score: {
    [key: number]: {
      title: string;
      total: number;
      percent: number;
    };
  };
}

export interface ExtraPrice {
  name: string;
  price: number;
  type: "one_time" | "per_day";
  enable: number;
  price_html: string;
  price_type?: string | null;
}

export interface RoomSelection {
  id: number;
  number_selected: number;
}

export interface BookingValues {
  start_date: string;
  end_date: string;
  service_id: number;
  service_type: "tour";
  adults: number;
  children: number;
  extra_price?: ExtraPrice[] | null;
  rooms: RoomSelection[];
}

interface Author {
  status: string;
}

export interface TourReview {
  id: number;
  title: string;
  content: string;
  rate_number: number;
  author_ip: string;
  status: string;
  created_at: string;
  vendor_id: number;
  author_id: number;
  author: Author;
}

interface PaginationLink {
  url: string | null;
  label: string;
  active: boolean;
}

export interface TourReviewList {
  current_page: number;
  data: TourReview[];
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

export interface ToursHotel {
  id: number;
  title: string;
  address: string;
  image_url: string;
  review_data: ReviewData;
}

export interface TourHotelReviewData {
  score_total: string;
  score_text: string;
  total_review: number;
  rate_score: TourHotelRateScore;
}

export interface TourHotelRateScore {
  [key: number]: {
    title: string;
    total: number;
    percent: number;
  };
}
