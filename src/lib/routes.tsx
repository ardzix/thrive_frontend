import { createBrowserRouter } from "react-router-dom";

import HomeContainer from "../pages/home/HomeContainer";
import CartContainer from "../pages/cart/CartContainer";
import CheckoutContainer from "../pages/checkout/CheckoutContainer";

export default createBrowserRouter([
  {
    path: "/",
    element: <HomeContainer />,
  },

  {
    path: "/cart",
    element: <CartContainer />,
  },
  {
    path: "/checkout",
    element: <CheckoutContainer />,
  },
]);
