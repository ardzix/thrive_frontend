import { Tabs } from "antd";
import HeaderCustom from "../../shared/components/HeaderCustom";
import CustomLayout from "../../shared/components/CustomLayout";
import ListRoleAccess from "./components/ListRoleAccess";

const items = [
  {
    key: "1",
    label: "Role Access",
    children: <ListRoleAccess />,
  },
];

export default function RoleAccessContainer() {
  return (
    <CustomLayout>
      <main className="space-y-5">
        <HeaderCustom
          title="Role Access Settings"
          breadcrumbItems={[
            {
              title: "Master Data",
            },
            { title: "Role Access" },
          ]}
        />
        <div className="bg-white rounded-lg p-5 space-y-5">
          <Tabs type="card" defaultActiveKey={"1"} items={items} />
        </div>
      </main>
    </CustomLayout>
  );
}
