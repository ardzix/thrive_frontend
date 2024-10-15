import { createBrowserRouter } from "react-router-dom";

import LoginContainer from "../pages/auth/LoginContainer";
import { PrivateRoute, PublicRoute } from "./helper";
import { Button, Result } from "antd";
import CompanyContainer from "../pages/master-data/company/CompanyContainer";
import UserContainer from "../pages/master-data/user/UserContainer";
import ProjectContainer from "../pages/master-data/project/ProjectContainer";
import FinanceContainer from "../pages/master-data/finance/FinanceContainer";
import ForgotPasswordContainer from "../pages/auth/ForgotPasswordContainer";

const routes = [
  {
    path: "/",
    element: <LoginContainer />,
    isPrivate: false,
  },
  {
    path: "/forgot-password",
    element: <ForgotPasswordContainer />,
    isPrivate: false,
  },
  {
    path: "/company",
    element: <CompanyContainer />,
    isPrivate: true,
  },

  {
    path: "/user",
    element: <UserContainer />,
    isPrivate: true,
  },
  {
    path: "/project",
    element: <ProjectContainer />,
    isPrivate: true,
  },
  {
    path: "/finance",
    element: <FinanceContainer />,
    isPrivate: true,
  },
  {
    path: "*",
    element: (
      <div className="w-full h-screen flex items-center justify-center">
        <Result
          status="404"
          title="404"
          subTitle="Sorry, the page you visited does not exist."
          extra={
            <Button type="primary" onClick={() => window.history.back()}>
              Back
            </Button>
          }
        />
      </div>
    ),
  },
];

export const acceptablePathList = routes.map((res: any) => res.path);

const remap = routes.map((res) => ({
  ...res,
  element: res.isPrivate ? <PrivateRoute>{res.element}</PrivateRoute> : <PublicRoute>{res.element}</PublicRoute>,
}));

export default createBrowserRouter(remap);
