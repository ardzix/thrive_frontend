import { Tabs } from "antd";
import CustomLayout from "../../shared/components/CustomLayout";
import HeaderCustom from "../../shared/components/HeaderCustom";

const items = [
  {
    key: "1",
    label: "Class Master",
    children: <>test</>
  },
  // {
  //   key: "2",
  //   label: "Chart Of Acc",
  //   children: <>test</>,
  // },
  // {
  //   key: "3",
  //   label: "Currency",
  //   children: <>test</>,
  // },
];

export default function GeneralLedgerContainer() {
  return (
    <CustomLayout>
      <main className="space-y-5">
        <HeaderCustom
          title="Cash & Bank General Ledger"
          breadcrumbItems={[
            {
              title: "Finance",
            },
            { title: "General Ledger" },
          ]}
        />
        <div className="bg-white rounded-lg p-5 space-y-5">
          <Tabs type="card" defaultActiveKey={"1"} items={items} />
        </div>
      </main>
    </CustomLayout>
  );
}
