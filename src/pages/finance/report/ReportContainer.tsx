import { Tabs } from "antd";
import CustomLayout from "../../shared/components/CustomLayout";
import HeaderCustom from "../../shared/components/HeaderCustom";

const items = [
  {
    key: "1",
    label: "Bank",
    children: <>test</>
  },
  {
    key: "2",
    label: "Ledger",
    children: <>test</>,
  },
  {
    key: "3",
    label: "Petty Cash",
    children: <>test</>,
  },
];

export default function ReportContainer() {
  return (
    <CustomLayout>
      <main className="space-y-5">
        <HeaderCustom
          title="Report"
          breadcrumbItems={[
            {
              title: "Finance",
            },
            { title: "Report" },
          ]}
        />
        <div className="bg-white rounded-lg p-5 space-y-5">
          <Tabs type="card" defaultActiveKey={"1"} items={items} />
        </div>
      </main>
    </CustomLayout>
  );
}
