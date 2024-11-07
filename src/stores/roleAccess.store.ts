import { create } from "zustand";
import { Iparams } from "../pages/shared/shared.store";
import { fetcherGET, fetcherPOST, fetcherPUT } from "../lib/fetcher";

interface IUserStore{
    loading: boolean
    listRoleAccess: any
    listModules: any
    getRoleAccess: (params: Iparams) => Promise<any>
    postRoleAccess: (data:any ) => Promise<any>
    getModules: (params: Iparams) => Promise<any>
    updateRoleAccess: (data: any, id: any) => Promise<any>
}


export const useRoleAccessStore = create<IUserStore>()((set) => ({
    loading: false,
    listRoleAccess: [],
    listModules: [],
    getRoleAccess: async (params) => {
        set({ loading: true });
        try {
            const data = await fetcherGET(`/role-access`, params);
            set({ loading: false, listRoleAccess: data.data });
            return Promise.resolve(data);
        } catch (error: any) {
            console.log(error.message, "error zustand");
            set({ loading: false });
            return Promise.reject(error);
        }
    },
    postRoleAccess: async (data) => {
        set({ loading: true });
        try {
            const response = await fetcherPOST(`/role-access`, data);
            set({ loading: false });
            return Promise.resolve(response);
        } catch (error: any) {
            console.log(error.message, "error zustand");
            set({ loading: false });
            return Promise.reject(error);
        }
    },
    getModules: async (params) => {
        set({ loading: true });
        try {
            const data = await fetcherGET(`/modules`, params);
            set({ loading: false, listModules: data?.data });
            return Promise.resolve(data);
        } catch (error: any) {
            console.log(error.message, "error zustand");
            set({ loading: false });
            return Promise.reject(error);
        }
    },
    updateRoleAccess: async (data, id) => {
        set({ loading: true });
        try {
            const response = await fetcherPUT(`/role-access/${id}`, data);
            set({ loading: false });
            return Promise.resolve(response);
        } catch (error: any) {
            console.log(error.message, "error zustand");
            set({ loading: false });
            return Promise.reject(error);
        }
    },
}))