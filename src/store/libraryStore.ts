import { create } from "zustand";

type ViewedItem = {
  id: string;
  viewedAt: string;
};

type LibraryState = {
  favorites: string[];
  recentlyViewed: ViewedItem[];
  toast: string | null;
  toggleFavorite: (id: string) => void;
  addRecentlyViewed: (id: string) => void;
  clearRecentlyViewed: () => void;
  showToast: (message: string) => void;
  clearToast: () => void;
};

const readJson = <T,>(key: string, fallback: T): T => {
  try {
    const value = window.localStorage.getItem(key);
    return value ? (JSON.parse(value) as T) : fallback;
  } catch {
    return fallback;
  }
};

const writeJson = (key: string, value: unknown) => {
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // localStorage can be unavailable in private mode. Core browsing should still work.
  }
};

const initialFavorites = typeof window === "undefined" ? [] : readJson<string[]>("devmate:favorites", []);
const initialRecentlyViewed =
  typeof window === "undefined" ? [] : readJson<ViewedItem[]>("devmate:recentlyViewed", []);

export const useLibraryStore = create<LibraryState>((set, get) => ({
  favorites: initialFavorites,
  recentlyViewed: initialRecentlyViewed,
  toast: null,
  toggleFavorite: (id) => {
    const hasFavorite = get().favorites.includes(id);
    const favorites = hasFavorite ? get().favorites.filter((item) => item !== id) : [id, ...get().favorites];
    writeJson("devmate:favorites", favorites);
    set({ favorites, toast: hasFavorite ? "已取消收藏" : "已加入收藏" });
  },
  addRecentlyViewed: (id) => {
    const next = [{ id, viewedAt: new Date().toISOString() }, ...get().recentlyViewed.filter((item) => item.id !== id)]
      .slice(0, 20);
    writeJson("devmate:recentlyViewed", next);
    set({ recentlyViewed: next });
  },
  clearRecentlyViewed: () => {
    writeJson("devmate:recentlyViewed", []);
    set({ recentlyViewed: [], toast: "最近浏览已清空" });
  },
  showToast: (message) => set({ toast: message }),
  clearToast: () => set({ toast: null }),
}));
