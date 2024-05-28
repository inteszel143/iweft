export interface User {
  _id: string;
  email: string;
  fullname: string;
}

export interface Service {
  _id: string;
  title: string;
  sub_title: string;
  base_price: number;
  image: string;
  other_images: string[];
  details: string;
  status: string;
  __v: number;
}

export interface OrderItem {
  _id: string;
  name: string;
  item_category_id: string;
  price: number;
  image: string;
  __v: number;
}

export interface OrderDetails {
  service: Service;
  order_items: {
    item: OrderItem;
    quantity: number;
    _id: string;
  }[];
  promo_code: string;
  _id: string;
  createdAt: string;
  updatedAt: string;
}

export interface Order {
  _id: string;
  user: User;
  order_details: OrderDetails;
  date_ordered: string;
  pick_up_date_time: string;
  delivery_date_time: string;
  status: string;
  address: string;
  delivery_instruction: string;
  total_amount: number;
  latitude: number;
  longitude: number;
  createdAt: string;
  updatedAt: string;
  __v: number;
}