import { Tabs } from "antd";
import ListCompanyEntitas from "./components/ListCompanyEntitas";
import CustomLayout from "../../shared/components/CustomLayout";
import HeaderCustom from "../../shared/components/HeaderCustom";

const items = [
  {
    key: "1",
    label: "Entitas",
    children: <ListCompanyEntitas />,
  },
];

export default function CompanyContainer() {
  return (
    <CustomLayout>
      <main className="space-y-5">
        <HeaderCustom
          title="Company Data Settings"
          breadcrumbItems={[
            {
              title: "Master Data",
            },
            { title: "Company" },
          ]}
        />
        <div className="bg-white rounded-lg p-5 space-y-5">
          <Tabs type="card" defaultActiveKey={"1"} items={items} />
        </div>
      </main>
    </CustomLayout>
  );
}