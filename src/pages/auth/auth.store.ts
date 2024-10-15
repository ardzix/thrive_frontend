import { create } from "zustand";
import { fetcherGET, fetcherPOST } from "../../lib/fetcher";

interface IAuthStore {
  loading: boolean;
  postLogin: (params?: any, signal?: any) => void;
  getMe: (params?: any, signal?: any) => void;
  postSendOtp: (params?: any, signal?: any) => void;
  postVerifyEmail: (params?: any, signal?: any) => void;
  postResetPassword: (params?: any, signal?: any) => void;
  idMe: any;
  regionMe: any;
  unitMe: any;
}

export const useAuthStore = create<IAuthStore>()((set) => ({
  loading: false,
  idMe: null,
  regionMe: null,
  unitMe: null,

  postLogin: async (body) => {
    set({ loading: true });
    try {
      const data = await fetcherPOST(`/auth/login/`, body);
      console.log(data);

      set({
        loading: false,
      });
      return Promise.resolve(data);
    } catch (error: any) {
      console.log(error.message, "error zustand");
      set({ loading: false });
      return Promise.reject(error);
    }
  },
  getMe: async () => {
    set({ loading: true });
    try {
      const data = await fetcherGET(`/auth/me/`, {});
      console.log(data);
      set({
        loading: false,
        idMe: data.id,
        regionMe: data.region,
        unitMe: data.unit,
      });
      return Promise.resolve(data);
    } catch (error: any) {
      console.log(error.message, "error zustand");
      set({ loading: false });
      return Promise.reject(error);
    }
  },
  postSendOtp: async (body) => {
    set({ loading: true });
    try {
      const data = await fetcherPOST(`/auth/forgot-password/`, body);
      console.log(data);
      set({ loading: false });
      return Promise.resolve(data);
    } catch (error: any) {
      console.log(error.message, "error zustand");
      set({ loading: false });
      return Promise.reject(error);
    }
  },
  postVerifyEmail: async (body: any) => {
    set({ loading: true });
    try {
      const data = await fetcherPOST(`/auth/verify-otp/`, body);
      console.log(data);
      set({ loading: false });
      return Promise.resolve(data);
    } catch (error: any) {
      console.log(error.message, "error zustand");
      set({ loading: false });
      return Promise.reject(error);
    }
  },
  postResetPassword: async (body: any) => {
    set({ loading: true });
    try {
      const data = await fetcherPOST(`/auth/reset-password/`, body);
      console.log(data);
      set({ loading: false });
      return Promise.resolve(data);
    } catch (error: any) {
      console.log(error.message, "error zustand");
      set({ loading: false });

      return Promise.reject(error);
    }
  },
}));
