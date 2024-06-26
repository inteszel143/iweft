import { create } from "zustand";

interface State {
  subscriptionId: string | null;
  collection: number;
  total: number;
  priceId: string;
  services: string[];
  setSubscriptionId: (subscriptionId: string) => void;
  setCollection: (collection: number) => void;
  setTotal: (total: number) => void;
  setPriceId: (priceId: string) => void;
  setServices: (services: string[]) => void;
}

const useStoreSub = create<State>((set) => ({
  subscriptionId: null,
  collection: 0,
  total: 0,
  priceId: "",
  services: [],
  setSubscriptionId: (subscriptionId) => set({ subscriptionId }),
  setCollection: (collection) => set({ collection }),
  setTotal: (total) => set({ total }),
  setPriceId: (priceId) => set({ priceId }),
  setServices: (services) => set({ services }),
}));

export default useStoreSub;
