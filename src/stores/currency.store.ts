import { create } from "zustand";
import { Iparams } from "../pages/shared/shared.store";
import { fetcherGET, fetcherPOST, fetcherPUT } from "../lib/fetcher";

interface ICurrencyStore {
    loading: boolean
    listCurrency: any
    listModules: any
    getCurrency: (params: Iparams) => Promise<any>
    postCurrency: (data:any ) => Promise<any>
    updateCurrency: (data: any, id: any) => Promise<any>
}


export const useCurrencyStore = create<ICurrencyStore>()((set) => ({
    loading: false,
    listCurrency: [],
    listModules: [],
    getCurrency: async (params) => {
        set({ loading: true });
        try {
            const data = await fetcherGET(`/currencies`, params);
            set({ loading: false, listCurrency: data.data });
            return Promise.resolve(data);
        } catch (error: any) {
            console.log(error.message, "error zustand");
            set({ loading: false });
            return Promise.reject(error);
        }
    },
    postCurrency: async (data) => {
        set({ loading: true });
        try {
            const response = await fetcherPOST(`/currencies`, data);
            set({ loading: false });
            return Promise.resolve(response);
        } catch (error: any) {
            console.log(error.message, "error zustand");
            set({ loading: false });
            return Promise.reject(error);
        }
    },
    updateCurrency: async (data, id) => {
        set({ loading: true });
        try {
            const response = await fetcherPUT(`/currencies/${id}`, data);
            set({ loading: false });
            return Promise.resolve(response);
        } catch (error: any) {
            console.log(error.message, "error zustand");
            set({ loading: false });
            return Promise.reject(error);
        }
    },
}))