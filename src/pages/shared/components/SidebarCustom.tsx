import { Divider, Layout, Menu } from "antd";
import { useSharedStore } from "../shared.store";
import { BarChartOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { acceptablePathList } from "../../../lib/routes";
import  { colors } from "../../../lib/theme";
import { FaCircleUser } from "react-icons/fa6";
import { useStorageStore } from "../storage.store";
import { MdLogout } from "react-icons/md";
import React, { useState } from "react";
import ConfirmModal from "./ConfirmModal";

const { Sider } = Layout;

export default function SidebarCustom() {
  const navigate = useNavigate();

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  function getItem(label: string, key: string, icon?: any, children?: any, disabled?: boolean): any {
    const childrenList = children?.filter((f: any) => f !== undefined);
    const isSubMenuExist = key?.includes("sub_") && childrenList.length !== 0;
    if (acceptablePathList?.includes(key) || isSubMenuExist) {
      return { label, key, icon, children, disabled };
    }
    return;
  }

  const items = [
    getItem("Master Data", "sub_1", <BarChartOutlined />, [getItem("company", "/company", null), getItem("User", "/user", null), getItem("Project", "/project", null), getItem("Finance", "/finance", null)]),
    // getItem("Project", "sub_3", <FaUserCog />, [getItem("company", "/company", null), getItem("User", "/user", null), getItem("Project", "/project", null), getItem("Finance", "/finance", null)])
];

  const { collapsed, setCollapsed, setOpenKeys, openKeys } = useSharedStore();

  const pathActive = `/${window.location.pathname.split("/").filter((f) => f !== "")[0]}`;

  const defaultOpenKeys = ["sub_1", "sub_2",];

  React.useEffect(() => {
    if (openKeys.length === 0) {
      setOpenKeys(defaultOpenKeys);
    }
  }, []);

  const onOpenChange = (keys: any) => {
    setOpenKeys(keys);
  };

  const { handleLogout ,name, role } = useStorageStore();

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleConfirm = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setIsModalVisible(false);
      handleLogout();
    }, 1000);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <Sider className="min-h-screen border-r !bg-black" width={230} collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
      <div className={`w-full flex flex-col justify-center items-center pt-6 mb-6 ${collapsed && "hidden"} `}>
        <div className="flex flex-col justify-center items-center w-fit space-x-2">
          <img src="/images/thrive-logo.svg" className="object-contain h-14" alt="" />
        </div>
      </div>
      <Menu className="mt-2 custom-menu !bg-black" style={{ border: 0 }} openKeys={openKeys} onOpenChange={onOpenChange} mode="inline" selectedKeys={[pathActive]} theme="dark" onClick={(v) => navigate(v.key)} items={items} />

      <div className="absolute bottom-0 w-full flex flex-col items-start justify-start p-6 ">
        <Divider className="bg-neutral-700" />
        <div className="flex items-center justify-end gap-x-3 mb-5 cursor-pointer">
          <FaCircleUser size={32} color={colors?.grey} />
          <div className="">
            <p className="font-semibold text-base text-neutral-200 ">{name}</p>
            <p className="text-sm text-neutral-400 ">{role?.role_name}</p>
          </div>
        </div>
        <div className="min-w-[100px] cursor-pointer flex items-center justify-end gap-x-3 font-semibold" onClick={showModal}>
          <MdLogout size={32} color={colors?.grey} />
          <p className="font-semibold text-base text-neutral-200 ">Logout</p>
        </div>
      </div>
      <ConfirmModal
        danger={true}
        isVisible={isModalVisible}
        title="Log Out"
        content="Apakah anda yakin ingin keluar dari aplikasi?"
        confirmText="Log Out"
        cancelText="Cancel"
        onConfirm={handleConfirm}
        onCancel={handleCancel}
        loading={loading}
      />
    </Sider>
  );
}
