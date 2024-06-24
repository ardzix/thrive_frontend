import { Button, Dropdown, Layout, Menu } from "antd";
import Hamburger from "hamburger-react";
import { BiHomeAlt } from "react-icons/bi";
import { TbClipboardText } from "react-icons/tb";
import { useNavigate } from "react-router-dom";
import { useSharedStore } from "../shared.store";
import { FaCircleUser } from "react-icons/fa6";
import theme from "../../../lib/theme";
import { LogoutOutlined } from "@ant-design/icons";
import { useStorageStore } from "../storage.store";
const { Header, Content, Sider } = Layout;

function getItem(
  label: string,
  key: string,
  icon?: any,
  children?: any,
  disabled?: boolean
): any {
  return { label, key, icon, children, disabled };
}

const items = [
  getItem("Home", "/home", <BiHomeAlt />),
  getItem("Tambah Pasien", "/patient/form?step=1", <TbClipboardText />),
];

const CustomLayout = ({ children }: any) => {
  //   const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();

  const { collapsed, setCollapsed } = useSharedStore();
  const { handleLogout } = useStorageStore();

  const handleClickMenu = ({ key }: any) => {
    // console.log(key);
    navigate(key);
  };

  const menuItems = [
    {
      key: "1",
      label: (
        <div
          className="flex gap-x-2  items-center  min-w-[100px] font-semibold text-red-500"
          onClick={() => handleLogout()}
        >
          <LogoutOutlined />
          Logout
        </div>
      ),
    },
  ];

  return (
    <Layout>
      <Header className="flex  px-4 justify-between items-stretch bg-white shadow-sm h-[96px] z-10">
        <div className=" w-full flex items-center justify-start gap-x-4">
          <Hamburger toggled={collapsed} size={24} toggle={setCollapsed} />
          <img src="/logo/kemenkesLogo.svg" alt="logo" />
        </div>
        <div className=" w-full flex flex-col items-center justify-center ">
          <h1 className=" font-semibold text-3xl ">LABEL</h1>
          <p className=" font-semibold text-base whitespace-nowrap">
            Laboratorium Elektronik
          </p>
        </div>
        <div className=" w-full  flex items-center justify-end  mr-2 ">
          <Dropdown
            placement="bottomRight"
            menu={{
              items: menuItems,
            }}
          >
            <div className="flex items-center justify-end gap-x-3 cursor-pointer">
              <p className="font-semibold text-base ">Admin 1</p>
              <FaCircleUser size={32} color={theme?.mainColor} />
            </div>
          </Dropdown>
        </div>
      </Header>
      <Layout>
        <Sider
          className="shadow-sm z-9 "
          collapsed={!collapsed}
          theme="light"
          //   onCollapse={(value) => setCollapsed(value)}
          //   width={200}
          //   collapsedWidth={68}
        >
          <Menu
            mode="inline"
            className="h-full"
            inlineCollapsed={collapsed}
            selectedKeys={[window.location.pathname]}
            items={items}
            onClick={handleClickMenu}
            // style={{ marginTop: 20 }}
          />
        </Sider>
        <Layout>
          <Content className=" overflow-auto p-6 h-[calc(100vh-96px)] bg-white">
            <div className="2xl:container mx-auto">{children}</div>
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
};
export default CustomLayout;
