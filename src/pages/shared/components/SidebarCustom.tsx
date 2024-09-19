import { Divider, Layout, Menu } from "antd";
import { useSharedStore } from "../shared.store";
import { BarChartOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { acceptablePathList } from "../../../lib/routes";
import theme from "../../../lib/theme";
import { FaCircleUser } from "react-icons/fa6";
import { useStorageStore } from "../storage.store";
import { MdLogout } from "react-icons/md";
import React from "react";

const { Sider } = Layout;

export default function SidebarCustom() {
  const navigate = useNavigate();

  function getItem(label: string, key: string, icon?: any, children?: any, disabled?: boolean): any {
    const childrenList = children?.filter((f: any) => f !== undefined);
    const isSubMenuExist = key?.includes("sub_") && childrenList.length !== 0;
    if (acceptablePathList?.includes(key) || isSubMenuExist) {
      return { label, key, icon, children, disabled };
    }
    return;
  }

  const items = [getItem("Master Data", "sub_3", <BarChartOutlined />, [getItem("company", "/company", null), getItem("User", "/user", null), getItem("Project", "/project", null), getItem("Finance", "/finance", null)])];

  const { collapsed, setCollapsed, setOpenKeys, openKeys } = useSharedStore();

  const pathActive = `/${window.location.pathname.split("/").filter((f) => f !== "")[0]}`;

  const defaultOpenKeys = ["sub_1", "sub_2", "sub_3"];

  React.useEffect(() => {
    if (openKeys.length === 0) {
      setOpenKeys(defaultOpenKeys);
    }
  }, []);

  const onOpenChange = (keys: any) => {
    setOpenKeys(keys);
  };

  const { handleLogout } = useStorageStore();

  return (
    <Sider className="min-h-screen border-r !bg-neutral-900" width={230} collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
      <div className={`w-full flex flex-col justify-center items-center pt-6 mb-6 ${collapsed && "hidden"} `}>
        <div className="flex flex-col justify-center items-center w-fit space-x-2">
          <img src="/images/thrive-logo.svg" className="object-contain h-14" alt="" />
        </div>
      </div>
      <Menu className="mt-2" style={{ border: 0 }} openKeys={openKeys} onOpenChange={onOpenChange} mode="inline" selectedKeys={[pathActive]} theme="dark" onClick={(v) => navigate(v.key)} items={items} />

      <div className="absolute bottom-0 w-full flex flex-col items-start justify-start p-6 ">
        <Divider className="bg-neutral-700" />
        <div className="flex items-center justify-end gap-x-3 mb-5 cursor-pointer">
          <FaCircleUser size={32} color={theme?.mainColor} />
          <div className="">
            <p className="font-semibold text-base text-neutral-200 ">Admin 1</p>
            <p className="text-sm text-neutral-400 ">Super Admin</p>
          </div>
        </div>
        <div className="min-w-[100px] flex items-center justify-end gap-x-3 font-semibold" onClick={() => handleLogout()}>
          <MdLogout size={32} color={theme?.mainPurpleLight} />
          <p className="font-semibold text-base text-neutral-200 ">Logout</p>
        </div>
      </div>
    </Sider>
  );
}
