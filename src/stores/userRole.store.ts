import { create } from "zustand";
import { Iparams } from "../pages/shared/shared.store";
import { fetcherGET, fetcherPOST, fetcherPUT } from "../lib/fetcher";

interface IUserStore{
    loading: boolean
    listUserRoles: any
    userRole: any
    getUserRole: (params: Iparams) => Promise<any>
    postUserRole: (data:any ) => Promise<any>
    updateUserRole: (data:any, id: string) => Promise<any>
    getUserRoleById: (id: string) => Promise<any>
}


export const useUserRoleStore = create<IUserStore>()((set) => ({
    loading: false,
    listUserRoles: [],
    userRole: {},
    getUserRole: async (params) => {
        set({ loading: true });
        try {
            const data = await fetcherGET(`/roles`, params);
            set({ loading: false, listUserRoles: data.data });
            return Promise.resolve(data);
        } catch (error: any) {
            console.log(error.message, "error zustand");
            set({ loading: false });
            return Promise.reject(error);
        }
    },
    postUserRole: async (data) => {
        set({ loading: true });
        try {
            const response = await fetcherPOST(`/roles`, data);
            set({ loading: false });
            return Promise.resolve(response);
        } catch (error: any) {
            console.log(error.message, "error zustand");
            set({ loading: false });
            return Promise.reject(error);
        }
    },
    updateUserRole: async (data, id) => {
        set({ loading: true });
        try {
            const response = await fetcherPUT(`/roles/${id}`, data);
            set({ loading: false });
            return Promise.resolve(response);
        } catch (error: any) {
            console.log(error.message, "error zustand");
            set({ loading: false });
            return Promise.reject(error);
        }
    },
    getUserRoleById: async (id) => {
        set({ loading: true });
        try {
            const response = await fetcherGET(`/roles/${id}`, {});
            set({ loading: false, userRole: response.data });
            return Promise.resolve(response);
        } catch (error: any) {
            console.log(error.message, "error zustand");
            set({ loading: false });
            return Promise.reject(error);
        }
    },
}))