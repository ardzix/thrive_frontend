import { create } from "zustand";

interface ISharedState {
  collapsed: any;
  formValues: any;
  setCollapsed: (payload: any) => void;
}

export const useSharedStore = create<ISharedState>()((set) => ({
  collapsed: "",
  formValues: [],
  setCollapsed: (payload) => set({ collapsed: payload }),
  // getDetailProduct: async (id) => {
  //   set({ loading: true });

  //   try {
  //     const url = `/method/alfa_b2b.api.productDetails/${id}`;
  //     const data = await fetchGet(url);
  //     console.log(data, "data zustand");
  //     set({ loading: false, detailProduct: data.data });
  //   } catch (error: any) {
  //     console.log(error.message, "error zustand");

  //     set({ loading: false, detailProduct: null });
  //   }
  // },
  // getProductList: async (params) => {
  //   set({ loading: true });

  //   try {
  //     const url = `/method/alfa_b2b.api.product`;
  //     const data = await fetchGet(url, params);
  //     console.log(data, "data zustand");
  //     set({ loading: false, productList: data.data });
  //   } catch (error: any) {
  //     console.log(error.message, "error zustand");

  //     set({ loading: false, productList: [] });
  //   }
  // },
}));
