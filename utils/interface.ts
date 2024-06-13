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
}

export interface SubscriptionItem {
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
