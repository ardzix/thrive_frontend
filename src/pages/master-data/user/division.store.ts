import { create } from "zustand";
import { fetcherGET, fetcherPOST, fetcherPUT } from "../../../lib/fetcher";

interface IDivisionStore{
    loading: boolean
    listDivision: any
    getDivison: (params: any) => Promise<any>
    postDivision: (body: any) => Promise<any>
    updateDivision: (body: any, id: any) => Promise<any>
}


export const useDivisionStore = create<IDivisionStore>()((set) => ({
    loading: false,
    listDivision: [],
    getDivison: async (params) => {
        set({ loading: true });
        try {
            const data = await fetcherGET(`/divisions`, params);
            set({ loading: false, listDivision: data.data });
            return Promise.resolve(data);
        } catch (error: any) {
            console.log(error.message, "error zustand");
            set({ loading: false });
            return Promise.reject(error);
        }
    },
    postDivision: async (body) => {
        set({ loading: true });
        try {
            const data = await fetcherPOST(`/divisions`, body);
            set({ loading: false, listDivision: data });
            return Promise.resolve(data);
        } catch (error: any) {
            console.log(error.message, "error zustand");
            set({ loading: false });
            return Promise.reject(error);
        }
    },
    updateDivision: async (body, id) => {
        set({ loading: true });
        try {
            const data = await fetcherPUT(`/divisions/${id}`, body);
            set({ loading: false });
            return Promise.resolve(data);
        } catch (error: any) {
            console.log(error.message, "error zustand");
            set({ loading: false });
            return Promise.reject(error);
        }
    },
}))