import { create } from "zustand";

interface State {
  address: string;
  street: string;
  citys: string;
  latitude: number;
  longitude: number;
  setAddress: (address: string) => void;
  setStreets: (street: string) => void;
  setCitys: (citys: string) => void;
  setLatitude: (latitude: number) => void;
  setLongitude: (longitude: number) => void;
}

const useStoreAddress = create<State>((set) => ({
  address: "",
  street: "",
  citys: "",
  latitude: 0,
  longitude: 0,
  setAddress: (address) => set({ address }),
  setStreets: (street) => set({ street }),
  setCitys: (citys) => set({ citys }),
  setLatitude: (latitude) => set({ latitude }),
  setLongitude: (longitude) => set({ longitude }),
}));

export default useStoreAddress;
