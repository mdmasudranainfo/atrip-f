export interface Commission {
  amount: string;
  type: string;
}

export interface BuyerFee {
  name: string;
  desc: string;
  name_ja: string;
  desc_ja: string;
  price: string;
  type: string;
}

export interface ExtraPrice {
  name: string;
  name_ja: string | null;
  name_egy: string | null;
  price: string;
  type: string;
  total: string;
}

export interface BookingMeta {
  duration: string | null;
  base_price: number;
  sale_price: string | null;
  guests: number;
  adults: number;
  children: string;
  extra_price: ExtraPrice[];
  locale: string;
  how_to_pay: string;
}

export interface Service {
  title: string;
}

export interface BookingInfoData {
  id: number;
  code: string;
  vendor_id: number;
  customer_id: number;
  payment_id: string | null;
  gateway: string;
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
  commission_type: Commission;
  email: string;
  first_name: string;
  last_name: string;
  phone: string;
  address: string | null;
  address2: string | null;
  city: string;
  state: string | null;
  zip_code: string | null;
  country: string;
  customer_notes: string | null;
  vendor_service_fee_amount: string;
  vendor_service_fee: string;
  create_user: number;
  update_user: number;
  deleted_at: string | null;
  created_at: string;
  updated_at: string;
  buyer_fees: BuyerFee[];
  total_before_fees: string;
  paid_vendor: string | null;
  object_child_id: string | null;
  number: string | null;
  paid: string | null;
  pay_now: string;
  total_before_discount: number;
  wallet_credit_used: number;
  wallet_total_used: number;
  additional_preferences: string[] | null;
  service: Service;
  booking_meta: BookingMeta;
  service_icon: string;
  review: boolean;
}

export interface BookingInfoDataType {
  data: BookingInfoData[];
  total: number;
  max_pages: number;
  status: number;
}



export interface FilterAttributeTerm {
  id: number
  name: string
  slug: string
  count: number
}

export interface FilterAttribute {
  id: number
  name: string
  slug: string
  terms: FilterAttributeTerm[]
}
