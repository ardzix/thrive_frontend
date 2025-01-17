import { Navigate } from "react-router-dom";
import { useStorageStore } from "../pages/shared/storage.store";

const token = useStorageStore.getState().token;
const auth = useStorageStore.getState().auth;

export const PublicRoute = ({ children }: any) => {
  if (auth && token) return <Navigate to="/master-data/company" />;
  return children;
};

export const PrivateRoute = ({ children }: any) => {
  // const auth = localStorage.getItem('authPesantren')
  //   const token = localStorage.getItem("tokenPesantren");
  // const bot_id = localStorage.getItem('bot_id')
  // const store_id = localStorage.getItem('store_id')

  if (!token && !auth) return <Navigate to="/" />;
  return children;
};

export const rupiahFormat = (value: any) =>
  value &&
  new Intl.NumberFormat("id-ID", {
    style: "currency", // add Rp
    currency: "IDR",
    // maximumSignificantDigits: 30
    minimumFractionDigits: 0, //remove ,00
  }).format(value);

export const numberFormat = (value: any) =>
  value &&
  new Intl.NumberFormat("id-ID", {
    // style: '', // add Rp
    currency: "IDR",
    // maximumSignificantDigits: 30
    minimumFractionDigits: 0, // remove 2 digit after comma
  }).format(value);

  export const currencyFormat = (
    value: number | null | undefined,
    locale: string = "id-ID",
    currency: string = "IDR",
    minimumFractionDigits: number = 0,
    prefix: string = "Rp "
  ) => {
    if (value == null) return "";
  
    return (
      prefix +
      new Intl.NumberFormat(locale, {
        style: "currency",
        currency,
        minimumFractionDigits,
        maximumFractionDigits: minimumFractionDigits, // Menjaga konsistensi desimal
      })
        .format(value)
        .replace(/\D00$/, "") // Menghapus dua nol desimal jika tidak diperlukan
    );
  };
  