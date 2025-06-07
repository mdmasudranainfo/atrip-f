export const bookingPayload = {
  service_id: 6,
  service_type: "hotel",
  start_date: "2025-04-13",
  end_date: "2025-04-15",
  extra_price: [
    {
      name: "Service VIP",
      price: 200,
      type: "one_time",
      number: 0,
      enable: 0,
      price_html: "$200",
      price_type: "",
    },
    {
      name: "Breakfasts",
      price: 100,
      type: "one_time",
      number: 0,
      enable: 0,
      price_html: "$100",
      price_type: "",
    },
  ],
  adults: 1,
  children: 0,
  rooms: [
    {
      id: 21,
      number_selected: 1,
    },
    {
      id: 22,
      number_selected: 0,
    },
    {
      id: 23,
      number_selected: 0,
    },
    {
      id: 24,
      number_selected: 0,
    },
  ],
};
export const confirmationdData = {
  first_name: "Customer1",
  last_name: "Customer",
  email: "customer1@mail.com",
  phone: "112 666 888",
  address_line_1: "",
  address_line_2: "",
  city: "New York",
  state: "",
  zip_code: "",
  country: "US",
  customer_notes: "",
  payment_gateway: "offline_payment",
  term_conditions: "on",
  coupon_code: "",
  credit: 0,
};
