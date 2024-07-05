import { MMKV } from "react-native-mmkv";

const storage = new MMKV();

// Language keys
export const setItem = (key: string, value: string): void => {
  storage.set(key, value);
};

export const getItem = (key: string): string | null => {
  return storage.getString(key) || null;
};

export const removeItem = (key: string): void => {
  storage.delete(key);
};
