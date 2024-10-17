import { create } from "zustand";
import { fetcherGET, fetcherPOST } from "../../../lib/fetcher";
import { Iparams } from "../../shared/shared.store";

interface IUserStore{
    loading: boolean
    listUserRoles: any
    getUserRole: (params: Iparams) => Promise<any>
    postUserRole: (data:any ) => Promise<any>
}


export const useUserRoleStore = create<IUserStore>()((set) => ({
    loading: false,
    listUserRoles: [],
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
}))