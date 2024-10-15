import { create } from "zustand";
import { fetcherGET, fetcherPOST } from "../../../lib/fetcher";

interface IEntityStore {
    loading: boolean;
    listEntity: any;
    getEntity: (params: any) => Promise<any>;
    postEntity: (body: any) => Promise<any>;
}


export const useEntityStore = create<IEntityStore>()((set) => ({
    loading: false,
    listEntity: [],

    getEntity: async (params) => {
        set({ loading: true })
        try {
            const data = await fetcherGET(`/entities`, params)
            set({ loading: false, listEntity: data?.data })
            return Promise.resolve(data)
        } catch (error: any) {
            console.log(error.message, "error zustand")
            set({ loading: false })
            return Promise.reject(error)
        }
    },
    postEntity: async (body) => {
        set({ loading: true })
        try {
            const data = await fetcherPOST(`/entities`, body)
            set({ loading: false })
            return Promise.resolve(data)
        } catch (error: any) {
            console.log(error.message, "error zustand")
            set({ loading: false })
            return Promise.reject(error)
        }
    }
}))