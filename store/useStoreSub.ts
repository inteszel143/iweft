import { create } from "zustand";

interface State {
  collection: number;
  total: number;
  priceId: string;
  setCollection: (collection: number) => void;
  setTotal: (total: number) => void;
  setPriceId: (priceId: string) => void;
}

const useStoreSub = create<State>((set) => ({
  collection: 0,
  total: 0,
  priceId: "",
  setCollection: (collection) => set({ collection }),
  setTotal: (total) => set({ total }),
  setPriceId: (priceId) => set({ priceId }),
}));

export default useStoreSub;
