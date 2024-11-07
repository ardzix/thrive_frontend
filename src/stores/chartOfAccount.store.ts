import { create } from "zustand";
import { fetcherGET, fetcherPOST, fetcherPUT } from "../lib/fetcher";

interface IChartOfAccountStore {
    loading: boolean
    listChartOfAccount: any
    chartOfAccount: any
    getChartOfAccount: (params: any) => Promise<any>
    postChartOfAccount: (body: any) => Promise<any>
    updateChartOfAccount: (body: any, id: any) => Promise<any>
    getChartOfAccountById: (id: any) => Promise<any>
}

export const useChartOfAccountStore  = create<IChartOfAccountStore>()((set) => ({
    loading: false,
    listChartOfAccount: [],
    chartOfAccount:{},
    getChartOfAccount: async (params) => {
        set({ loading: true })
        try {
            const data = await fetcherGET(`/finance/acc`, params)
            set({ loading: false, listChartOfAccount: data?.data })
            return Promise.resolve(data)
        } catch (error: any) {
            console.log(error.message, "error zustand")
            set({ loading: false })
            return Promise.reject(error)
        }
    },
    postChartOfAccount: async (body) => {
        set({ loading: true })
        try {
            const data = await fetcherPOST(`/finance/acc`, body)
            set({ loading: false})
            return Promise.resolve(data)
        } catch (error: any) {
            console.log(error.message, "error zustand")
            set({ loading: false })
            return Promise.reject(error)
        }
    },
    updateChartOfAccount: async (body, id) => {
        set({ loading: true })
        try {
            const data = await fetcherPUT(`/finance/acc/${id}`, body)
            set({ loading: false})
            return Promise.resolve(data)
        } catch (error: any) {
            console.log(error.message, "error zustand")
            set({ loading: false })
            return Promise.reject(error)
        }
    },
    getChartOfAccountById: async (id) => {
        set({ loading: true })
        try {
            const data = await fetcherGET(`/finance/acc/${id}`, {})
            set({ loading: false, chartOfAccount: data?.data })
            return Promise.resolve(data)
        } catch (error: any) {
            console.log(error.message, "error zustand")
            set({ loading: false })
            return Promise.reject(error)
        }
    }
}))