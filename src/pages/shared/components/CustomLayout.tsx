import { Layout } from "antd";
// import { useNavigate } from "react-router-dom";
// import { useSharedStore } from "../shared.store";
// import { useStorageStore } from "../storage.store";
import SidebarCustom from "./SidebarCustom";
import { ReactNode } from "react";
const { Content } = Layout;

const CustomLayout = ({ children }: { children: ReactNode }) => {
  //   const [collapsed, setCollapsed] = useState(false);
  // const navigate = useNavigate();

  // const { collapsed, setCollapsed } = useSharedStore();
  // const { handleLogout } = useStorageStore();

  // const handleClickMenu = ({ key }: any) => {
  //   // console.log(key);
  //   navigate(key);
  // };

  // const menuItems = [
  //   {
  //     key: "1",
  //     label: (
  //       <div className="flex gap-x-2  items-center  min-w-[100px] font-semibold text-red-500" onClick={() => handleLogout()}>
  //         <LogoutOutlined />
  //         Logout
  //       </div>
  //     ),
  //   },
  // ];

  return (
    <Layout>
      <SidebarCustom />
      <Layout>
        <Content className=" bg-neutral-200 overflow-auto p-6 h-[calc(100vh-96px)]">
          <div className="2xl:container mx-auto">{children}</div>
        </Content>
      </Layout>
    </Layout>
  );
};
export default CustomLayout;
