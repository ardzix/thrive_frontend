import { create } from "zustand";
import { fetcherGET, fetcherPOST } from "../../../lib/fetcher";

interface IUserStore{
    loading: boolean
    listUsers: any
    getUsers: () => Promise<any>
    postUser: (data: any) => Promise<any>
}


export const useUserStore = create<IUserStore>()((set) => ({
    loading: false,
    listUsers: [],
    getUsers: async () => {
        set({ loading: true });
        try {
            const data = await fetcherGET(`/users`, {});
            set({ loading: false, listUsers: data });
            return Promise.resolve(data);
        } catch (error: any) {
            console.log(error.message, "error zustand");
            set({ loading: false });
            return Promise.reject(error);
        }
    },
    postUser: async (data: any) => {
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
    }
}))