import { create } from "zustand";
import { fetcherGET, fetcherPOST, fetcherPUT } from "../lib/fetcher";

interface IProjectStore {
    loading: boolean
    listProject: any
    project: any
    getProject: (params: any) => Promise<any>
    postProject: (body: any) => Promise<any>
    updateProject: (body: any, id: any) => Promise<any>
    getProjectById: (id: any) => Promise<any>
}

export const useProjectStore  = create<IProjectStore>()((set) => ({
    loading: false,
    listProject: [],
    project:{},
    getProject: async (params) => {
        set({ loading: true })
        try {
            const data = await fetcherGET(`/projects`, params)
            set({ loading: false, listProject: data?.data })
            return Promise.resolve(data)
        } catch (error: any) {
            console.log(error.message, "error zustand")
            set({ loading: false })
            return Promise.reject(error)
        }
    },
    postProject: async (body) => {
        set({ loading: true })
        try {
            const data = await fetcherPOST(`/projects`, body)
            set({ loading: false})
            return Promise.resolve(data)
        } catch (error: any) {
            console.log(error.message, "error zustand")
            set({ loading: false })
            return Promise.reject(error)
        }
    },
    updateProject: async (body, id) => {
        set({ loading: true })
        try {
            const data = await fetcherPUT(`/projects/${id}`, body)
            set({ loading: false})
            return Promise.resolve(data)
        } catch (error: any) {
            console.log(error.message, "error zustand")
            set({ loading: false })
            return Promise.reject(error)
        }
    },
    getProjectById: async (id) => {
        set({ loading: true })
        try {
            const data = await fetcherGET(`/projects/${id}`, {})
            set({ loading: false, project: data?.data })
            return Promise.resolve(data)
        } catch (error: any) {
            console.log(error.message, "error zustand")
            set({ loading: false })
            return Promise.reject(error)
        }
    }
}))