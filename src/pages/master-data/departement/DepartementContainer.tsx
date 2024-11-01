import { Tabs } from "antd";
import HeaderCustom from "../../shared/components/HeaderCustom";
import CustomLayout from "../../shared/components/CustomLayout";
import ListDepartement from "./components/ListDepartement";

const items = [
  {
    key: "1",
    label: "Departemen",
    children: <ListDepartement />,
  },
];

export default function DepartementContainer() {
  return (
    <CustomLayout>
      <main className="space-y-5">
        <HeaderCustom
          title="Departement Settings"
          breadcrumbItems={[
            {
              title: "Master Data",
            },
            { title: "Departemen" },
          ]}
        />
        <div className="bg-white rounded-lg p-5 space-y-5">
          <Tabs type="card" defaultActiveKey={"1"} items={items} />
        </div>
      </main>
    </CustomLayout>
  );
}
