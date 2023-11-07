import { ReactNode } from "react";

import { Link } from "react-router-dom";

type CustomLayoutProps = {
  children: ReactNode;
};

export default function CustomLayout({ children }: CustomLayoutProps) {
  return (
    <div>
      <h1>navbar</h1>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/cart">Cart</Link>
        </li>
        <li>
          <Link to="/checkout">Checkout</Link>
        </li>
      </ul>
      {children}
    </div>
  );
}
