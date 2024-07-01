import { create } from "zustand";

interface State {
  plan_name: string;
  subscriptionId: string | null;
  collection: number;
  total: number;
  unit_amount: string;
  priceId: string;
  services: string[];
  setPlanName: (plan_name: string) => void;
  setSubscriptionId: (subscriptionId: string) => void;
  setUnitAmount: (unit_amount: string) => void;
  setCollection: (collection: number) => void;
  setTotal: (total: number) => void;
  setPriceId: (priceId: string) => void;
  setServices: (services: string[]) => void;
}

const useStoreSub = create<State>((set) => ({
  plan_name: "",
  subscriptionId: null,
  collection: 0,
  total: 0,
  unit_amount: "",
  priceId: "",
  services: [],
  setPlanName: (plan_name) => set({plan_name}),
  setSubscriptionId: (subscriptionId) => set({ subscriptionId }),
  setUnitAmount: (unit_amount) => set({ unit_amount }),
  setCollection: (collection) => set({ collection }),
  setTotal: (total) => set({ total }),
  setPriceId: (priceId) => set({ priceId }),
  setServices: (services) => set({ services }),
}));

export default useStoreSub;
