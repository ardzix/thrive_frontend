import { Tabs } from "antd";
import CustomLayout from "../../shared/components/CustomLayout";
import HeaderCustom from "../../shared/components/HeaderCustom";

const items = [
  {
    key: "1",
    label: "Payment",
    children: <>test</>
  },
  {
    key: "2",
    label: "Petty Cash",
    children: <>test</>,
  },
  {
    key: "3",
    label: "Reimburse",
    children: <>test</>,
  },
  {
    key: "4",
    label: "Settlement",
    children: <>test</>,
  },
];

export default function RequestsContainer() {
  return (
    <CustomLayout>
      <main className="space-y-5">
        <HeaderCustom
          title="Requests"
          breadcrumbItems={[
            {
              title: "Finance",
            },
            { title: "Requests" },
          ]}
        />
        <div className="bg-white rounded-lg p-5 space-y-5">
          <Tabs type="card" defaultActiveKey={"1"} items={items} />
        </div>
      </main>
    </CustomLayout>
  );
}
