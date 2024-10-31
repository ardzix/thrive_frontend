import { Tabs } from "antd";
import CustomLayout from "../../shared/components/CustomLayout";
import HeaderCustom from "../../shared/components/HeaderCustom";
import ListBankIn from "./components/listBankIn";

const items = [
  {
    key: "1",
    label: "Bank In",
    children: <ListBankIn/>,
  },
  {
    key: "2",
    label: "Bank Out",
    children: <>test</>,
  },
  {
    key: "3",
    label: "Reconcilliation",
    children: <>test</>,
  },
];

export default function BankContainer() {
  return (
    <CustomLayout>
      <main className="space-y-5">
        <HeaderCustom
          title="Bank"
          breadcrumbItems={[
            {
              title: "Finance",
            },
            { title: "Bank" },
          ]}
        />
        <div className="bg-white rounded-lg p-5 space-y-5">
          <Tabs type="card" defaultActiveKey={"1"} items={items} />
        </div>
      </main>
    </CustomLayout>
  );
}
