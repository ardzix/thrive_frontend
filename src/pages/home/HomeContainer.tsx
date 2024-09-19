import { useState } from "react";

import CustomLayout from "../shared/components/CustomLayout";
import HeaderCustom from "../shared/components/HeaderCustom";
import { Drawer, Tabs } from "antd";

const items = [
  {
    key: "1",
    label: "Entitas",
    children: "Content of Tab Pane 1",
  },
];

export default function HomeContainer() {
  const [openDrawer, setOpenDrawer] = useState(false);
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
          <Tabs items={items} />
        </div>
      </main>
      <Drawer title="Tambah Entitas Baru" onClose={() => setOpenDrawer(false)} open={openDrawer}>
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Drawer>
    </CustomLayout>
  );
}
