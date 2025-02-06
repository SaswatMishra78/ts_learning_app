import {create} from "zustand";

interface UserStore {
  user : User | null;
  setUser: (user: any) => void;
  logout: () => void;
}

interface User {
  name: string;
  password: string;
}

const useUserStore = create<UserStore>((set) => ({
    user: null,
    setUser: (user) => set({user}),
    logout: () => set({user: null}),
}));

export default useUserStore;
