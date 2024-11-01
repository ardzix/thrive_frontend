import { Tabs } from "antd";
import ListUserDivison from "./components/ListUserDivision";
import HeaderCustom from "../../shared/components/HeaderCustom";
import CustomLayout from "../../shared/components/CustomLayout";

const items = [
  {
    key: "1",
    label: "Division",
    children: <ListUserDivison />,
  },
];

export default function DivisionContainer() {
  return (
    <CustomLayout>
      <main className="space-y-5">
        <HeaderCustom
          title="Division Settings"
          breadcrumbItems={[
            {
              title: "Master Data",
            },
            { title: "Division" },
          ]}
        />
        <div className="bg-white rounded-lg p-5 space-y-5">
          <Tabs type="card" defaultActiveKey={"1"} items={items} />
        </div>
      </main>
    </CustomLayout>
  );
}
