import { create } from "zustand";
interface State {
  bookingValue: string | null;
  setValue: (value: string | null) => void;
}
const useBookingBadge = create<State>((set) => ({
  bookingValue: null,
  setValue: (bookingValue: string | null) => set({ bookingValue }),
}));

export default useBookingBadge;
