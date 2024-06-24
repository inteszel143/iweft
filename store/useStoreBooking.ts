import { string } from "yup";
import { create } from "zustand";
// params: { service, service_name, itemData, total, pick_up_date_time, delivery_date_time, address, latitude, longitude }
// Define the state interface
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
  pick_up_date_time: string;
  delivery_date_time: string;
  address: string;
  latitude: string;
  longitude: string;
  setService: (service: string) => void;
  setServiceName: (service_name: string) => void;
  setBasePrice: (base_price: any) => void;
  setItemData: (itemData: ItemData[]) => void;
  setTotal: (total: number) => void;
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
  pick_up_date_time: "",
  delivery_date_time: "",
  address: "",
  latitude: "",
  longitude: "",
  setService: (service: string) => set({ service }),
  setServiceName: (service_name: string) => set({ service_name }),
  setBasePrice: (base_price: number) => set({ base_price }),
  setItemData: (itemData: ItemData[]) => set({ itemData }),
  setTotal: (total: number) => set({ total }),
  setPickUpDateTime: (pick_up_date_time: string) => set({ pick_up_date_time }),
  setDeliveryDateTime: (delivery_date_time: string) =>
    set({ delivery_date_time }),
  setAddress: (address: string) => set({ address }),
  setLatitude: (latitude: string) => set({ latitude }),
  setLongitude: (longitude: string) => set({ longitude }),
}));

export default useStoreBooking;
