import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
// import { devtools, persist } from "zustand/middleware";

interface IStorage {
  token: string;
  auth: boolean;
  handleToken: (params?: any) => void;
  handleLogout: () => void;
}

export const useStorageStore = create<IStorage>()(
  devtools(
    persist(
      (set) => ({
        token: "",
        auth: false,
        handleToken: async (val: string) => {
          await set({ token: val, auth: true });
          window.location.reload();
        },
        handleLogout: async () => {
          set({ token: "", auth: false });
          window.location.reload();
        },
      }),
      { name: "webapp-storage" }
    )
  )
);
