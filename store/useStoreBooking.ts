import { create } from "zustand";
interface ItemData {
  item: string;
  quantity: number;
  item_total_amount: number;
}

interface State {
  service: string;
  service_name: string;
  base_price: number;
  itemData: ItemData[];
  total: number;
  total_data: string;
  pick_up_date_time: string;
  delivery_date_time: string;
  address: string;
  latitude: string;
  longitude: string;
  discount: string;
  total_amount: string;
  discounted_amount: string | null;
  promo_code: string | null;
  driver_instruction: string[];
  setDriverInstruction: (instructions: string[]) => void;
  setPromoCode: (promo_code: string) => void;
  setDiscountedAmount: (discounted_amount: string) => void;
  setTotalAmount: (total_amount: string) => void;
  setDiscount: (discount: string) => void;
  setService: (service: string) => void;
  setServiceName: (service_name: string) => void;
  setBasePrice: (base_price: any) => void;
  setItemData: (itemData: ItemData[]) => void;
  setTotal: (total: number) => void;
  setTotalData: (total_data: string) => void;
  setPickUpDateTime: (pick_up_date_time: string) => void;
  setDeliveryDateTime: (delivery_date_time: string) => void;
  setAddress: (address: string) => void;
  setLatitude: (latitude: string) => void;
  setLongitude: (longitude: string) => void;
}

// Create the Zustand store
const useStoreBooking = create<State>((set) => ({
  service: "",
  service_name: "",
  itemData: [],
  base_price: 0,
  total: 0,
  total_data: "",
  pick_up_date_time: "",
  delivery_date_time: "",
  address: "",
  latitude: "",
  longitude: "",
  discount: "",
  total_amount: "",
  discounted_amount: null,
  promo_code: null,
  driver_instruction: [],
  setDriverInstruction: (instructions: string[]) =>
    set({ driver_instruction: instructions }),
  setPromoCode: (promo_code: string) => set({ promo_code }),
  setDiscountedAmount: (discounted_amount: string) =>
    set({ discounted_amount }),
  setTotalAmount: (total_amount: string) => set({ total_amount }),
  setDiscount: (discount: string) => set({ discount }),
  setService: (service: string) => set({ service }),
  setServiceName: (service_name: string) => set({ service_name }),
  setBasePrice: (base_price: number) => set({ base_price }),
  setItemData: (itemData: ItemData[]) => set({ itemData }),
  setTotal: (total: number) => set({ total }),
  setTotalData: (total_data: string) => set({ total_data }),
  setPickUpDateTime: (pick_up_date_time: string) => set({ pick_up_date_time }),
  setDeliveryDateTime: (delivery_date_time: string) =>
    set({ delivery_date_time }),
  setAddress: (address: string) => set({ address }),
  setLatitude: (latitude: string) => set({ latitude }),
  setLongitude: (longitude: string) => set({ longitude }),
}));

export default useStoreBooking;
