import { create } from "zustand";
import { Iparams } from "../pages/shared/shared.store";
import { fetcherGET, fetcherPOST, fetcherPUT } from "../lib/fetcher";

interface IBankStore {
    loading: boolean
    listBank: any
    getBank: (params: Iparams) => Promise<any>
    getBankById: (id: any) => Promise<any>
    postBank: (data:any ) => Promise<any>
    updateBank: (data: any, id: any) => Promise<any>
    bank:any;
}

export const useBankStore = create<IBankStore>()((set) => ({
    loading: false,
    listBank: [],
    bank: {},
    getBank: async (params) => {
        set({ loading: true });
        try {
            const data = await fetcherGET(`/banks`, params);
            set({ loading: false, listBank: data.data });
            return Promise.resolve(data);
        } catch (error: any) {
            console.log(error.message, "error zustand");
            set({ loading: false });
            return Promise.reject(error);
        }
    },
    getBankById: async (id) => {
        set({ loading: true });
        try {
            const data = await fetcherGET(`/banks/${id}`, {});
            set({ loading: false, bank: data.data });
            return Promise.resolve(data);
        } catch (error: any) {
            console.log(error.message, "error zustand");
            set({ loading: false });
            return Promise.reject(error);
        }
    },
    postBank: async (data) => {
        set({ loading: true });
        try {
            const response = await fetcherPOST(`/banks`, data);
            set({ loading: false });
            return Promise.resolve(response);
        } catch (error: any) {
            console.log(error.message, "error zustand");
            set({ loading: false });
            return Promise.reject(error);
        }
    },
    updateBank: async (data, id) => {
        set({ loading: true });
        try {
            const response = await fetcherPUT(`/banks/${id}`, data);
            set({ loading: false });
            return Promise.resolve(response);
        } catch (error: any) {
            console.log(error.message, "error zustand");
            set({ loading: false });
            return Promise.reject(error);
        }
    },
}))