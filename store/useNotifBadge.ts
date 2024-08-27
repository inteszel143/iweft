import { create } from "zustand";

interface State {
  notifValue: boolean;
  setNotifValue: (value: boolean) => void;
}
const useNotifBadge = create<State>((set) => ({
  notifValue: false,
  setNotifValue: (notifValue: boolean) => set({ notifValue }),
}));

export default useNotifBadge;
