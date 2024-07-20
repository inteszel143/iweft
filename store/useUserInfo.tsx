import { create } from "zustand";

interface State {
    userId: string;
    setUserId: (userId: string) => void;
}
const useUserInfo = create<State>((set) => ({
    userId: "",
    setUserId: (userId) => set({ userId }),
}));

export default useUserInfo;