import { Tabs } from "antd";
import ListClassMaster from "./components/ListClassMaster";
import ListChart from "./components/ListChart";
import ListCurrency from "./components/ListCurrency";
import CustomLayout from "../../shared/components/CustomLayout";
import HeaderCustom from "../../shared/components/HeaderCustom";
import ListTax from "./components/listTax";
import ListBank from "./components/ListBank";

const items = [
  {
    key: "1",
    label: "Class Master",
    children: <ListClassMaster />,
  },
  {
    key: "2",
    label: "Chart Of Acc",
    children: <ListChart />,
  },
  {
    key: "3",
    label: "Currency",
    children: <ListCurrency />,
  },
  {
    key: "4",
    label: "Bank",
    children: <ListBank />,
  },
  {
    key: "5",
    label: "Tax",
    children: <ListTax />,
  },
];

export default function FinanceContainer() {
  return (
    <CustomLayout>
      <main className="space-y-5">
        <HeaderCustom
          title="Finance Data Settings"
          breadcrumbItems={[
            {
              title: "Master Data",
            },
            { title: "Finance" },
          ]}
        />
        <div className="bg-white rounded-lg p-5 space-y-5">
          <Tabs type="card" defaultActiveKey={"1"} items={items} />
        </div>
      </main>
    </CustomLayout>
  );
}
