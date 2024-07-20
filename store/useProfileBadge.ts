import { create } from "zustand";
interface State {
  value: string | null;
  setValue: (value: string | null) => void;
}
const useProfileBadge = create<State>((set) => ({
  value: null,
  setValue: (value: string | null) => set({ value }),
}));

export default useProfileBadge;
