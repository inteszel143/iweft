import { create } from "zustand";
interface State {
    inboxValue: string | null;
    setInboxValue: (value: string | null) => void;
}
const useInboxBadge = create<State>((set) => ({
    inboxValue: null,
    setInboxValue: (inboxValue: string | null) => set({ inboxValue }),
}));

export default useInboxBadge;
