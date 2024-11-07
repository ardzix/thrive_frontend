import { create } from "zustand";
import { Iparams } from "../pages/shared/shared.store";
import { fetcherGET, fetcherPOST, fetcherPUT } from "../lib/fetcher";

interface ITaxStore {
    loading: boolean
    listTax: any
    getTax: (params: Iparams) => Promise<any>
    getTaxById: (id: any) => Promise<any>
    postTax: (data:any ) => Promise<any>
    updateTax: (data: any, id: any) => Promise<any>
    tax: any;
}

export const useTaxStore = create<ITaxStore>()((set) => ({
    loading: false,
    listTax: [],
    tax: {},
    getTax: async (params) => {
        set({ loading: true });
        try {
            const data = await fetcherGET(`/taxes`, params);
            set({ loading: false, listTax: data.data });
            return Promise.resolve(data);
        } catch (error: any) {
            console.log(error.message, "error zustand");
            set({ loading: false });
            return Promise.reject(error);
        }
    },
    getTaxById: async (id) => {
        set({ loading: true });
        try {
            const data = await fetcherGET(`/taxes/${id}`, {});
            set({ loading: false, tax: data.data });
            return Promise.resolve(data);
        } catch (error: any) {
            console.log(error.message, "error zustand");
            set({ loading: false });
            return Promise.reject(error);
        }
    },
    postTax: async (data) => {
        set({ loading: true });
        try {
            const response = await fetcherPOST(`/taxes`, data);
            set({ loading: false });
            return Promise.resolve(response);
        } catch (error: any) {
            console.log(error.message, "error zustand");
            set({ loading: false });
            return Promise.reject(error);
        }
    },
    updateTax: async (data, id) => {
        set({ loading: true });
        try {
            const response = await fetcherPUT(`/taxes/${id}`, data);
            set({ loading: false });
            return Promise.resolve(response);
        } catch (error: any) {
            console.log(error.message, "error zustand");
            set({ loading: false });
            return Promise.reject(error);
        }
    },
}))