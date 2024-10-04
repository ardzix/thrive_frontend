import { Tabs } from "antd";
import ListProject from "./components/ListProject";
import CustomLayout from "../../shared/components/CustomLayout";
import HeaderCustom from "../../shared/components/HeaderCustom";

const items = [
  {
    key: "1",
    label: "Project Data",
    children: <ListProject />,
  },
];

export default function ProjectContainer() {
  return (
    <CustomLayout>
      <main className="space-y-5">
        <HeaderCustom
          title="Project Data Settings"
          breadcrumbItems={[
            {
              title: "Master Data",
            },
            { title: "Project" },
          ]}
        />
        <div className="bg-white rounded-lg p-5 space-y-5">
          <Tabs type="card" defaultActiveKey={"1"} items={items} />
        </div>
      </main>
    </CustomLayout>
  );
}
