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
    label: "Transcode",
    children: <>test</>,
  },
  // {
  //   key: "3",
  //   label: "Currency",
  //   children: <>test</>,
  // },
];

export default function SetupContainer() {
  return (
    <CustomLayout>
      <main className="space-y-5">
        <HeaderCustom
          title="Setup"
          breadcrumbItems={[
            {
              title: "Finance",
            },
            { title: "Setup" },
          ]}
        />
        <div className="bg-white rounded-lg p-5 space-y-5">
          <Tabs type="card" defaultActiveKey={"1"} items={items} />
        </div>
      </main>
    </CustomLayout>
  );
}
