import { createBrowserRouter } from "react-router-dom";

import LoginContainer from "../pages/auth/LoginContainer";
import { PrivateRoute, PublicRoute } from "./helper";
import CompanyContainer from "../pages/company/CompanyContainer";
import { Button, Result } from "antd";
import UserContainer from "../pages/user/UserContainer";
import ProjectContainer from "../pages/project/ProjectContainer";
import FinanceContainer from "../pages/finance/ProjectContainer";

const routes = [
  {
    path: "/",
    element: <LoginContainer />,
    isPrivate: false,
  },
  {
    path: "/company",
    element: <CompanyContainer />,
    isPrivate: false,
  },

  {
    path: "/user",
    element: <UserContainer />,
    isPrivate: false,
  },
  {
    path: "/project",
    element: <ProjectContainer />,
    isPrivate: false,
  },
  {
    path: "/finance",
    element: <FinanceContainer />,
    isPrivate: false,
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
