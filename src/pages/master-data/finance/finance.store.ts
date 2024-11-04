import { create } from "zustand";
import { fetcherGET, fetcherPOST, fetcherPUT } from "../../../lib/fetcher";

interface IFinanceStore {
    loading: boolean
    listClassMaster: any
    listChartOfAccount: any
    listCurrency: any
    getClassMaster: (params: any) => Promise<any>
    postClassMaster: (body: any) => Promise<any>
    getChartOfAccount: (params: any) => Promise<any>
    postChartOfAccount: (body: any) => Promise<any>
    getCurrency: (params: any) => Promise<any>
    postCurrency: (body: any) => Promise<any>
    updateClassMaster: (body: any, id: any) => Promise<any>
    updateChartOfAccount: (body: any, id: any) => Promise<any>
    updateCurrency: (body: any, id: any) => Promise<any>
}

export const useFinanceStore = create<IFinanceStore>()((set) => ({
    loading: false,
    listClassMaster: [],
    listChartOfAccount: [],
    listCurrency: [],
    getClassMaster: async (params) => {
        set({ loading: true })
        try {
            const data = await fetcherGET(`/finance/classes`, params)
            set({ loading: false, listClassMaster: data?.data })
            return Promise.resolve(data)
        } catch (error: any) {
            console.log(error.message, "error zustand")
            set({ loading: false })
            return Promise.reject(error)
        }
    },
    postClassMaster: async (body) => {
        set({ loading: true })
        try {
            const data = await fetcherPOST(`/finance/classes`, body)
            set({ loading: false})
            return Promise.resolve(data)
        } catch (error: any) {
            console.log(error.message, "error zustand")
            set({ loading: false })
            return Promise.reject(error)
        }
    },
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
    getCurrency: async (params) => {
        set({ loading: true })
        try {
            const data = await fetcherGET(`/finance/currencies`, params)
            set({ loading: false, listCurrency: data?.data })
            return Promise.resolve(data)
        } catch (error: any) {
            console.log(error.message, "error zustand")
            set({ loading: false })
            return Promise.reject(error)
        }
    },
    postCurrency: async (body) => {
        set({ loading: true })
        try {
            const data = await fetcherPOST(`/finance/currencies`, body)
            set({ loading: false})
            return Promise.resolve(data)
        } catch (error: any) {
            console.log(error.message, "error zustand")
            set({ loading: false })
            return Promise.reject(error)
        }
    },
    updateClassMaster: async (body, id) => {
        set({ loading: true })
        try {
            const data = await fetcherPUT(`/finance/classes/${id}`, body)
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
    updateCurrency: async (body, id) => {
        set({ loading: true })
        try {
            const data = await fetcherPUT(`/finance/currencies/${id}`, body)
            set({ loading: false})
            return Promise.resolve(data)
        } catch (error: any) {
            console.log(error.message, "error zustand")
            set({ loading: false })
            return Promise.reject(error)
        }
    }
}))