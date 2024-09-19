import { create } from "zustand";

import dayjs from "dayjs";
// import { fetcherPOST } from "../../lib/fetcher";

interface ISharedState {
  collapsed: any;
  loading: boolean;
  openKeys: any;
  dateRangeFilter: any;

  setCollapsed: (payload: any) => void;

  setOpenKeys: (payload: any) => void;
  handleDateRange: (payload: any) => void;
  // postUploadFile: (payload: any) => void;
}

export const useSharedStore = create<ISharedState>()((set) => ({
  collapsed: "",
  openKeys: [],
  loading: false,
  dateRangeFilter: [dayjs().add(-7, "d"), dayjs()],
  handleDateRange: (payload) => set({ dateRangeFilter: payload }),
  setCollapsed: (payload) => set({ collapsed: payload }),

  setOpenKeys: (payload) => set({ openKeys: payload }),

  // getStoreInfo: async (body) => {
  //   set({ loading: true });
  //   try {
  //     const data = await fetchPost(`/store/info`, body, "open");
  //     console.log(data, "data zustand");
  //     set({
  //       loading: false,
  //       storeInfo: data?.main_store_info,
  //       outletList: data?.outlets_info,
  //     });
  //   } catch (error: any) {
  //     console.log(error.message, "error zustand");

  //     set({ loading: false, storeInfo: null });
  //   }
  // },

  // postUploadFile: async (body) => {
  //   set({ loading: true });
  //   try {
  //     const url = `/common/file/`;
  //     const data = await fetcherPOST(url, body);
  //     console.log(data, "data zustand upload file");
  //     set({ loading: false });
  //     return Promise.resolve(data);
  //   } catch (error: any) {
  //     console.log(error.message, "error zustand");
  //     set({ loading: false });
  //     return Promise.reject(error);
  //   }
  // },
}));
