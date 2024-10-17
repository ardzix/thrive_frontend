import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
// import { devtools, persist } from "zustand/middleware";

interface IStorage {
  token: string;
  // refresh_token: string;
  name: string;
  email: string;
  auth: boolean;
  otpDate: number | undefined;
  role: IRole | null | undefined;
  handleToken: (params?: any) => void;
  handleRefreshToken: (params?: any) => void;
  handleLogout: () => void;
  handleOtpDate: (state: any) => void;
}

interface IRole {
  id: string;
  role_name: string;
}

export const useStorageStore = create<IStorage>()(
  devtools(
    persist(
      (set) => ({
        auth: false,
        otpDate: Date.now(),
        token: "",
        // refresh_token: "",
        name: "",
        email: "",
        role: null,
        handleToken: async (val) => {
          console.log(val);
          set({
            auth: true,
            token: val.token,
            // // refresh_token: val.refresh_token,
            role: val.role,
            email: val.email,
            name: val.name,
          });
          window.location.reload();
        },
        handleRefreshToken: async (val) => {
          set({
            token: val.token,
            // // refresh_token: val.refresh_token,
          });
          // window.location.reload();
        },
        handleOtpDate: async (state) => set({ otpDate: state }),
        handleLogout: async () => {
          set({
            auth: false,
            token: "",
            // refresh_token: "",
            role: null,
          });
          window.localStorage.clear();
          window.location.reload();
          window.location.href = "/";
        },
      }),
      { name: "thrive-storage" }
    )
  )
);
