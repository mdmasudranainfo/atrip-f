export interface ICarLocation {
  id: number;
  name: string;
  content: string;
  slug: string;
  image_id: number;
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
  banner_image_id: number;
  trip_ideas: string;
  gallery: null;
  city_id: number;
  state_id: number;
  postal_code: string;
  country_id: number;
  translation: null;
}

export interface ICarFaq {
  title: string;
  content: string;
}

export interface ICarExtraPrice {
  name: string;
  price: string;
  type: string;
  description?: string;
}

export interface TransportExtraInfo {
  passenger: number;
  gear: string;
  fuel: string;
  baggage: number;
  door: number;
  ac: number;
  chauffeur: number;
  parking: number;
  tool: number;
}

export interface ITransport {
  id: number;
  title: string;
  sub_title: string;
  slug: string;
  content: string;
  image_id: number;
  banner_image_id: number;
  location_id: number;
  image_url: string;
  address: string;
  map_lat: string;
  map_lng: string;
  map_zoom: number;
  is_featured: number;
  gallery: string;
  video: string;
  faqs: ICarFaq[];
  number: number;
  price: number;
  sale_price: number;
  is_instant: number;
  enable_extra_price: number;
  extra_price: ICarExtraPrice[];
  discount_by_days: null;
  status: string;
  default_state: number;
  create_user: number;
  update_user: null;
  deleted_at: null;
  created_at: string;
  updated_at: string;
  review_score: number;
  total_review: number;
  enable_service_fee: null;
  service_fee: null;
  author_id: number;
  location: ICarLocation;
  has_wish_list: null;
  translation: null;

  extra_info: TransportExtraInfo;
}
