import { create } from "zustand";
import { fetchGet } from "../../lib/fetcher";

interface IHomeState {
  userData: UserData[];
  getUser: (url: string, params?: string) => void;
}

interface UserData {
  id: number;
  name: string;
  username: string;
  email: string;
  address: Address;
  phone: string;
  website: string;
  company: Company;
}
interface Address {
  street: string;
  suite: string;
  city: string;
  zipcode: string;
  geo: Geo;
}

interface Geo {
  lat: string;
  lng: string;
}

interface Company {
  name: string;
  catchPhrase: string;
  bs: string;
}

export const useHomeStore = create<IHomeState>()((set) => ({
  userData: [],
  getUser: async (url, params) => {
    try {
      const data = await fetchGet(url, params);
      console.log(data, "data zustand");
      set({ userData: data });
    } catch (error: any) {
      console.log(error.message, "error zustand");
    }
  },
}));
