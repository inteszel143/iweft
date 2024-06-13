import { create } from "zustand";

interface State {
  token: string;
  setRefreshToken: (refreshToken: string) => void;
}

const useStoreRefresh = create<State>((set) => ({
  token: "", // Initialize token as an empty string
  setRefreshToken: (refreshToken) =>
    set(() => ({
      token: refreshToken, // Directly set the token state
    })),
}));

export default useStoreRefresh;
