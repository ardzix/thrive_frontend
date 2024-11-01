import { Divider, Layout, Menu } from "antd";
import { useSharedStore } from "../shared.store";
import { BarChartOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { acceptablePathList } from "../../../lib/routes";
import  { colors } from "../../../lib/theme";
import { 
  // FaCalculator,
  FaCircleUser,
  // FaWallet 
  } from "react-icons/fa6";
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
    const isParentExist = key?.includes("parent_") && childrenList.length !== 0;
    const isSubMenuExist = key?.includes("sub_") && childrenList.length !== 0;
    if (acceptablePathList?.includes(key) || isSubMenuExist || isParentExist) {
      return { label, key, icon, children, disabled };
    }
    return;
  }

  const items = [
    getItem("Master Data", "parent_1", <BarChartOutlined />, [
      getItem("Company", "/master-data/company", null),
      getItem("Project", "/master-data/project", null),
      getItem("User", "/master-data/user", null),
      getItem("Divisi", "/master-data/division", null),
      getItem("Departemen", "/master-data/departement", null),
      getItem("Role Access", "/master-data/role-access", null),
      getItem("Finance", "/master-data/finance", null),
    ]),
    // getItem("Finance", "parent_2", <FaCalculator />, [
    //   getItem("Cash and Bank", "sub_1", <FaWallet />,  [
    //     getItem("Dashboard", "/finance/dashboard", null),
    //     getItem("General Ledger", "/finance/general-ledger", null),
    //     getItem("Bank", "/finance/bank", null),
    //     getItem("Requests", "/finance/requests", null),
    //     getItem("Report", "/finance/report", null),
    //     getItem("Setup", "/finance/setup", null),
    //   ]),
    // ]),
];

  const { collapsed, setCollapsed, setOpenKeys, openKeys } = useSharedStore();

  // const pathActive = `/${window.location.pathname.split("/").filter((f) => f !== "")[0]}`;
  const pathActive = window.location.pathname;

  const defaultOpenKeys = ["parent_1"];

  React.useEffect(() => {
    if (openKeys.length === 0) {
      setOpenKeys(defaultOpenKeys);
    }
  }, []);

  const onOpenChange = (keys: any) => {
    // Ambil key parent yang baru dibuka
    const latestOpenKey = keys.find((key: string) => !openKeys.includes(key));
  
    // Jika tidak ada parent yang baru dibuka, berarti yang ada adalah penutupan item, maka set langsung
    if (!latestOpenKey) {
      setOpenKeys(keys);
      return;
    }
  
    // Set openKeys hanya untuk parent yang baru dibuka
    setOpenKeys(latestOpenKey.includes("parent_") ? [latestOpenKey] : keys);
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
    <Sider
      className="min-h-screen border-r !bg-black"
      width={230}
      collapsed={collapsed}
      onCollapse={(value) => setCollapsed(value)}
    >
      <div className={`w-full flex flex-col justify-center items-center pt-6 mb-6 ${collapsed && "hidden"}`}>
        <div className="flex flex-col justify-center items-center w-fit space-x-2">
          <img src="/images/thrive-logo.svg" className="object-contain h-14" alt="" />
        </div>
      </div>

      {/* Wrapper untuk Menu dengan scroll */}
      <div className="flex-1 overflow-y-hidden" style={{ maxHeight: "calc(100vh - 150px)" }}>
        <Menu
          className="mt-2 !z-0 custom-menu !bg-black"
          style={{ border: 0 }}
          openKeys={openKeys}
          onOpenChange={onOpenChange}
          mode="inline"
          selectedKeys={[pathActive]}
          theme="dark"
          onClick={(v) => navigate(v.key)}
          items={items}
        />
      </div>

      {/* Bagian User dan Logout tetap di bawah */}
      <div className="w-full absolute bottom-0 z-50 flex flex-col items-start justify-start p-6">
        <Divider className="bg-neutral-700" />
        <div className="flex items-center justify-end gap-x-3 mb-5 cursor-pointer">
          <FaCircleUser size={32} color={colors?.grey} />
          <div>
            <p className="font-semibold text-base text-neutral-200">{name}</p>
            <p className="text-sm text-neutral-400">{role?.role_name}</p>
          </div>
        </div>
        <div className="min-w-[100px] cursor-pointer flex items-center justify-end gap-x-3 font-semibold" onClick={showModal}>
          <MdLogout size={32} color={colors?.grey} />
          <p className="font-semibold text-base text-neutral-200">Logout</p>
        </div>
      </div>

      <ConfirmModal
        danger
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
