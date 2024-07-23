import { create } from "zustand";

interface BookmarkStore {
  isBookmarked: boolean;
  setBookmarked: (value: boolean) => void;
}

export const useBookBundleStore = create<BookmarkStore>((set) => ({
  isBookmarked: false,
  setBookmarked: (value) => set({ isBookmarked: value }),
}));
