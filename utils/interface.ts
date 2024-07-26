export interface ServiceItem {
  _id: string;
  title: string;
  sub_title: string;
  base_price: number;
  image: string;
  other_images: string[];
  details: string;
  status: string;
  created_by: {
    _id: string;
    email: string;
  };
  updated_by: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
  review: {
    average_rating: number;
    review_count: number;
  };
}

export interface LaundryBundle {
  _id: string;
  title: string;
  sub_title: string;
  base_price: string;
  image: string;
  other_images: string;
  details: string;
  status: string;
  includes: [
    {
      _id: string;
      name: string;
      item_category_id: string;
      price: number;
      image: string;
      created_by: string;
      updated_by: string;
      createdAt: string;
      updatedAt: string;
      __v: number;
    }
  ];
  created_by: {
    _id: string;
    email: string;
  };
  updated_by: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
  service: {
    _id: string;
    title: string;
    base_price: number;
  };
}

export interface SubscriptionItem {
  product_id: string;
  price_id: string;
  collection_count: number;
  name: string;
  description: string;
  unit_amount: number;
  image: string;
  other_images: string[];
  details: string;
  status: string;
  created_by: string;
  updated_by: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface ServiceItem {
  _id: string;
  title: string;
  sub_title: string;
  base_price: number;
  image: string;
  other_images: string[];
  details: string;
  status: string;
  created_by: {
    _id: string;
    email: string;
  };
  updated_by: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}
interface User {
  _id: string;
  email: string;
}

export interface SpecialOffer {
  _id: string;
  title: string;
  sub_title: string;
  promo_code: string;
  description: string;
  image: string | null;
  discount_type: string;
  discount_value: number;
  terms_and_conditions: string;
  valid_from: string;
  valid_until: string;
  usage_limit: number | null;
  order_limit: number | null;
  status: string;
  created_by: User;
  updated_by: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

interface Bookmark {
  _id: string;
  title: string;
  sub_title: string;
  base_price: number;
  image: string;
  other_images: string[];
  details: string;
  status: string;
  created_by: string;
  updated_by: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface BookmarkData {
  _id: string;
  user: string;
  bookmarks: Bookmark[];
  createdAt: string;
  updatedAt: string;
  __v: number;
}
