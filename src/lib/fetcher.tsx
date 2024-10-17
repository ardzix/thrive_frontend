// baseURL: import.meta.env.VITE_URL_API,

import axios from "axios";
import { Modal } from "antd";
import { useStorageStore } from "../pages/shared/storage.store";
const { token,
  //  refresh_token,
    // handleRefreshToken,
     handleLogout 
    } =
  useStorageStore.getState();

//add base url
const request = axios.create({
  baseURL: import.meta.env.VITE_URL_API,
});

//ADD TOKEN
if (token) {
  request.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  // console.log(JSON?.parse(myCookie)?.token);
}

//IF TOKEN EXPIRED / 401
// request.interceptors.response.use(
//   (response) => {
//     return response;
//   },
//   async (error) => {
//     console.log(error?.response?.status);

//     if (error?.response?.status === 401) {
//       const isExpired = error?.response?.status === 401;
//       const originalRequest = error.config;

//       if (isExpired && !originalRequest._retry) {
//         // let refreshToken = myCookie && JSON?.parse(myCookie)?.refresh_token;

//         try {
//           const response = await axios.post(
//             `${import.meta.env.VITE_URL_API}/auth/refresh/`,
//             {
//               refresh_token: refresh_token,
//             }
//           );
//           //set token
//           handleRefreshToken(response.data);
//           //set header with new token
//           originalRequest.headers.Authorization = `Bearer ${response.data.token}`;
//           //retrun to original request
//           return axios(originalRequest);
//         } catch (error: any) {
//           console.log("error refresh token");
//           // console.log("refresh token error", error);
//           Modal.error({
//             title: "Error",
//             onOk: () => {
//               handleLogout();
//             },
//             okText: "Log In",
//             content: `${
//               error?.response !== undefined
//                 ? Object?.values(
//                     error?.response?.data ?? [
//                       "Refresh token was expired. Please make a new log in request",
//                     ]
//                   )
//                 : "Error request"
//             }`,
//             okType: "danger",
//           });
//         }
//       } else {
//         Modal.error({
//           title: "Error",
//           onOk: () => {
//             handleLogout();
//           },
//           content: `${
//             error?.response !== undefined
//               ? Object?.values(error?.response?.data)
//               : "Error request"
//           }`,
//           okType: "danger",
//         });
//       }
//     }
//     return Promise.reject(error);
//   }
// );

request.interceptors.response.use(
  (response) => {
    return response; // Jika response sukses, lanjutkan seperti biasa
  },
  (error) => {
    const statusCode = error?.response?.status;

    // Jika status code adalah 400 atau 401, redirect ke halaman login
    if (statusCode === 401) {
      Modal.error({
        title: "Session Expired",
        content: "Your session has expired. Please log in again.",
        okText: "Log In",
        onOk: () => {
          handleLogout(); // Mengarahkan ke halaman login
        },
        okType: "danger",
      });
    }

    return Promise.reject(error); // Mengembalikan error untuk ditangani lebih lanjut
  }
);


export const fetcherPOST = async (url: string, data: any) => {
  try {
    const response = await request.post(url, data);
    // console.log(response.data);
    return Promise.resolve(response.data);
  } catch (error) {
    // console.log(error.response, "form fetcher");
    return Promise.reject(error);
  }
};

export const fetcherDelete = async (url: string, data: any) => {
  try {
    const response = await request.delete(url, data);
    // console.log(response.data);
    return Promise.resolve(response.data);
  } catch (error) {
    // console.log(error.response, "form fetcher");
    return Promise.reject(error);
  }
};

export const fetcherGET = async (url: string, params: any) => {
  console.log(params);
  try {
    const response = await request.get(url, {
      params: params || null,
    });
    // console.log(response);
    return Promise.resolve(response.data);
  } catch (error) {
    // console.log(error.response, "form fetcher");
    return Promise.reject(error);
  }
};

export const fetcherPUT = async (url: string, data: any) => {
  try {
    const response = await request.put(url, data);
    // console.log(response);
    return Promise.resolve(response.data);
  } catch (error) {
    // console.log(error.response, "form fetcher");
    return Promise.reject(error);
  }
};
export const fetcherPATCH = async (url: string, data: any) => {
  try {
    const response = await request.patch(url, data);
    // console.log(response);
    return Promise.resolve(response.data);
  } catch (error) {
    // console.log(error.response, "form fetcher");
    return Promise.reject(error);
  }
};
