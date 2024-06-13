import { create } from "zustand";

interface User {
  name: string;
  age: number;
}

interface State {
  count: number;
  user: User;
  increase: () => void;
  decrease: () => void;
  setName: (name: string) => void;
  setAge: (age: number) => void;
}

const useStore = create<State>((set) => ({
  count: 0,
  user: {
    name: "John Doe",
    age: 30,
  },
  increase: () => set((state) => ({ count: state.count + 1 })),
  decrease: () => set((state) => ({ count: state.count - 1 })),
  setName: (name) => set((state) => ({ user: { ...state.user, name } })),
  setAge: (age) => set((state) => ({ user: { ...state.user, age } })),
}));

export default useStore;
