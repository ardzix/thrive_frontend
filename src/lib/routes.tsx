import { createBrowserRouter } from "react-router-dom";

import HomeContainer from "../pages/home/HomeContainer";
import CartContainer from "../pages/cart/CartContainer";
import CheckoutContainer from "../pages/checkout/CheckoutContainer";
import LoginContainer from "../pages/auth/LoginContainer";
import { PrivateRoute, PublicRoute } from "./helper";

const routes = [
  {
    path: "/",
    element: <LoginContainer />,
    isPrivate: false,
  },
  {
    path: "/dashboard",
    element: <HomeContainer />,
    isPrivate: true,
  },

  {
    path: "/cart",
    element: <CartContainer />,
    isPrivate: true,
  },
  {
    path: "/checkout",
    element: <CheckoutContainer />,
    isPrivate: true,
  },
];

const remap = routes.map((res) => ({
  ...res,
  element: res.isPrivate ? (
    <PrivateRoute>{res.element}</PrivateRoute>
  ) : (
    <PublicRoute>{res.element}</PublicRoute>
  ),
}));

export default createBrowserRouter(remap);
