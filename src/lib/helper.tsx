import { Navigate } from "react-router-dom";
import { useStorageStore } from "../pages/shared/storage.store";

const token = useStorageStore.getState().token;
const auth = useStorageStore.getState().auth;
export const PublicRoute = ({ children }: any) => {
  console.log(token);

  // const auth = localStorage.getItem('auth')
  //   const token = localStorage.getItem("tokenPesantren");
  // const bot_id = localStorage.getItem('bot_id')
  // const store_id = localStorage.getItem('store_id')

  if (token && auth) return <Navigate to="/dashboard" />;
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
