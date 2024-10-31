import { create } from "zustand";
import { fetcherGET, fetcherPOST, fetcherPUT } from "../../../lib/fetcher";

interface IEntityStore {
    loading: boolean;
    listEntity: any;
    entity: any;
    getEntity: (params: any) => Promise<any>;
    postEntity: (body: any) => Promise<any>;
    updateEntity: (body: any, entityId: any) => Promise<any>;
    getEntityById: (id: any) => Promise<any>;

}


export const useEntityStore = create<IEntityStore>()((set) => ({
    loading: false,
    listEntity: [],
    entity:[],
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
    },
    updateEntity: async (body:any, entityId:any) => {
        set({ loading: true })
        try {
            const data = await fetcherPUT(`/entities/${entityId}`, body)
            set({ loading: false })
            return Promise.resolve(data)
        } catch (error: any) {
            console.log(error.message, "error zustand")
            set({ loading: false })
            return Promise.reject(error)
        }
    },
    getEntityById: async (id) => {
        set({ loading: true })
        try {
            const data = await fetcherGET(`/entities/${id}`, {})
            set({ loading: false, entity: data?.data })
            return Promise.resolve(data)
        } catch (error: any) {
            console.log(error.message, "error zustand")
            set({ loading: false })
            return Promise.reject(error)
        }
    },
}))