import { createBrowserRouter } from "react-router-dom";

import LoginContainer from "../pages/auth/LoginContainer";
import { PrivateRoute, PublicRoute } from "./helper";
import { Button, Result } from "antd";
import CompanyContainer from "../pages/master-data/company/CompanyContainer";
import UserContainer from "../pages/master-data/user/UserContainer";
import ProjectContainer from "../pages/master-data/project/ProjectContainer";
import FinanceContainer from "../pages/master-data/finance/FinanceContainer";
import ForgotPasswordContainer from "../pages/auth/ForgotPasswordContainer";
import GeneralLedgerContainer from "../pages/finance/general-ledger/GeneralLedgerContainer";
import BankContainer from "../pages/finance/bank/BankContainer";
import RequestsContainer from "../pages/finance/requests/RequestsContainer";
import ReportContainer from "../pages/finance/report/ReportContainer";
import SetupContainer from "../pages/finance/setup/SetupContainer";
import DashboardFinanceContainer from "../pages/finance/dashboard-finance/DashboardFinanceContainer";

interface Route {
  path: string;
  element: JSX.Element;
  isPrivate?: boolean; // Make isPrivate optional
}

const masterDataRoutes : Route[] =[
  {
    path: "/master-data/company",
    element: <CompanyContainer />,
    isPrivate: true,
  },

  {
    path: "/master-data/user",
    element: <UserContainer />,
    isPrivate: true,
  },
  {
    path: "/master-data/project",
    element: <ProjectContainer />,
    isPrivate: true,
  },
  {
    path: "/master-data/finance",
    element: <FinanceContainer />,
    isPrivate: true,
  },
];

const financeRoutes: Route[] = [
  {
    path: "/finance/dashboard",
    element: <DashboardFinanceContainer/>,
    isPrivate: true,
  },
  {
    path: "/finance/general-ledger",
    element: <GeneralLedgerContainer />,
    isPrivate: true,
  },
  {
    path: "/finance/bank",
    element: <BankContainer />,
    isPrivate: true,
  },
  {
    path: "/finance/requests",
    element: <RequestsContainer />,
    isPrivate: true,
  },
  {
    path: "/finance/report",
    element: <ReportContainer />,
    isPrivate: true,
  },
  {
    path: "/finance/setup",
    element: <SetupContainer />,
    isPrivate: true,
  },
];

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
  ...masterDataRoutes,
  ...financeRoutes,
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
