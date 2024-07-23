import { create } from "zustand";

interface BookmarkStore {
  isBookmarked: boolean;
  setBookmarked: (value: boolean) => void;
}

export const useBookmarkStore = create<BookmarkStore>((set) => ({
  isBookmarked: false,
  setBookmarked: (value) => set({ isBookmarked: value }),
}));
