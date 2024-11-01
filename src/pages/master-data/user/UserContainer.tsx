import { Tabs } from "antd";
import ListUserData from "./components/ListUserData";
import ListUserRole from "./components/ListUserRole";
import HeaderCustom from "../../shared/components/HeaderCustom";
import CustomLayout from "../../shared/components/CustomLayout";

const items = [
  {
    key: "1",
    label: "User Data",
    children: <ListUserData />,
  },
  {
    key: "2",
    label: "User Role",
    children: <ListUserRole />,
  },
  // {
  //   key: "3",
  //   label: "Divisi",
  //   children: <ListUserDivison />,
  // },
  // {
  //   key: "4",
  //   label: "Departement",
  //   children: <ListUserDepartement />,
  // },
  // {
  //   key: "5",
  //   label: "Role Access",
  //   children: <ListRoleAccess />,
  // },
];

export default function UserContainer() {
  return (
    <CustomLayout>
      <main className="space-y-5">
        <HeaderCustom
          title="User Data Settings"
          breadcrumbItems={[
            {
              title: "Master Data",
            },
            { title: "User" },
          ]}
        />
        <div className="bg-white rounded-lg p-5 space-y-5">
          <Tabs type="card" defaultActiveKey={"1"} items={items} />
        </div>
      </main>
    </CustomLayout>
  );
}
