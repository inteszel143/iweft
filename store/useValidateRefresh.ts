import { create } from "zustand";
interface State {
  refreshToken: string | null;
  setRefreshToken: (refreshToken: string | null) => void;
}

const useValidateRefresh = create<State>((set) => ({
  refreshToken: null,
  setRefreshToken: (refreshToken) => set({ refreshToken }),
}));

export default useValidateRefresh;
