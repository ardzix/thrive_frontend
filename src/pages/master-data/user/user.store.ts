import { create } from "zustand";
import { fetcherGET, fetcherPOST, fetcherPUT } from "../../../lib/fetcher";
import { Iparams } from "../../shared/shared.store";



interface IUserStore{
    loading: boolean;
    listUsers: any;
    user: any;
    getUsers: (params: Iparams) => Promise<any>;
    postUser: (data:any) => Promise<any>;
    updateUser: (data:any, id:any) => Promise<any>;
    getUserById: (id:any) => Promise<any>;
}


export const useUserStore = create<IUserStore>()((set) => ({
    loading: false,
    listUsers: [],
    user: null,
    getUsers: async (params) => {
        set({ loading: true });
        try {
            const data = await fetcherGET(`/users`, params);
            set({ loading: false, listUsers: data.data });
            return Promise.resolve(data);
        } catch (error: any) {
            console.log(error.message, "error zustand");
            set({ loading: false });
            return Promise.reject(error);
        }
    },
    postUser: async (data) => {
        set({ loading: true });
        try {
            const response = await fetcherPOST(`/users`, data);
            set({ loading: false });
            return Promise.resolve(response);
        } catch (error: any) {
            console.log(error.message, "error zustand");
            set({ loading: false });
            return Promise.reject(error);
        }
    },
    updateUser: async (data, id) => {
        set({ loading: true });
        try {
            const response = await fetcherPUT(`/users/${id}`, data);
            set({ loading: false });
            return Promise.resolve(response);
        } catch (error: any) {
            console.log(error.message, "error zustand");
            set({ loading: false });
            return Promise.reject(error);
        }
    },
    getUserById: async (id) => {
        set({ loading: true });
        try {
            const response = await fetcherGET(`/users/${id}`, {});
            set({ loading: false, user: response.data });
            return Promise.resolve(response);
        } catch (error: any) {
            console.log(error.message, "error zustand");
            set({ loading: false });
            return Promise.reject(error);
        }
    },
}))