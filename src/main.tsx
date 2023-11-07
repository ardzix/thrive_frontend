import React from "react";
import ReactDOM from "react-dom/client";
import "./styles/main.scss";
import { RouterProvider } from "react-router-dom";
import routes from "./lib/routes";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={routes} />
  </React.StrictMode>
);
