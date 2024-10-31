import { Button, Drawer, Form, Modal, notification, Skeleton, Table } from "antd";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { FaPen } from "react-icons/fa6";
import { PlusCircleOutlined } from "@ant-design/icons";
import InputSearch from "../../../shared/components/InputSearch";
import FormGenerator from "../../../shared/components/FormGenerator";
import { useRoleAccessStore } from "../roleAccess.store";
import { useUserRoleStore } from "../userRole.store";
import UpdateRoleAccess from "./UpdateRoleAccess";

type ListDataType = {
  id: string;
  role_name: string;
  division: string;
  created_by: string;
  updated_at: string;
  status: string;
};

export default function ListRoleAccess() {
  const [params, setParams] = useState({
    offset: 0,
    limit: 10,
    search: "",
  });
  // const [openDrawer, setOpenDrawer] = useState(false);
  const [openDrawer, setOpenDrawer] = useState({
    create: false,
    update: false,
  });
  const [roleAccess, setRoleAccess] = useState({});
  const [hookFormGenerator] = Form.useForm();
  const {
         getRoleAccess,
         loading,
         listRoleAccess,
         postRoleAccess,
         getModules,
         listModules,   
         }=useRoleAccessStore()

  const {loading:loadingUserRole,listUserRoles,getUserRole}=useUserRoleStore()

  const dataForm = [
    {
      name: "role_id",
      label: "Role Access",
      type: "select",
      placeholder: "Enter Role Access",
      rules: [{ required: true, message: "This field is required!" }],
      options: listUserRoles?.items?.map((role: any) => ({
        label: role.role_name,
        value: role.id,
      })),
    },
    {
      name: "modules",
      label: "Module",
      type: "checkbox",
      //   placeholder: "Enter Module",
      rules: [{ required: true, message: "This field is required!" }],
      className: "!flex !flex-col !gap-2",
      options:listModules?.items?.map((module: any) => ({
        label: module.name,
        value: module.id,
      })),
    },
    {
      name: "status",
      label: "Status",
      type: "select",
      placeholder: "Enter Status",
      rules: [{ required: true, message: "This field is required!" }],
      options: [
        {
          label: "Active",
          value: "Active",
        },
        {
          label: "Inactive",
          value: "inactive",
        },
      ],
    },
  ];

  const handleGetRoleAccess = () => {
    getRoleAccess(params)
  };

  useEffect(()=>{
   handleGetRoleAccess();
  },[params])

  useEffect(()=>{
    getModules({
      offset: 0,
      limit: 1000,
    })

    getUserRole({
      offset: 0,
      limit: 1000,
    })

  },[])

  const handleSubmit = async (val: any)=> {
    try {
     await postRoleAccess(val)
     notification.success({
       message: "Success",
       description: "Berhasil menyimpan role access",
     })
     hookFormGenerator.resetFields()
     setOpenDrawer((prev:any) => ({...prev, create: false }))
     handleGetRoleAccess()
    } catch (error: any) {
     console.log(error.message)
     Modal.error({
       title: "Error",
       content: error.message || "Internal Server Error",
     })
    }
   };

   const columns = [
    {
      title: "Access Id",
      dataIndex: "access_id",
      key: "access_id",
    },
    {
      title: "Role Access",
      dataIndex: "role_name",
      key: "role_name",
    },
    {
      title: "Dibuat Oleh",
      dataIndex: "created_by",
      key: "created_by",
    },
    {
      title: "Tanggal Update",
      dataIndex: "updated_at",
      key: "updated_at",
      render: ({ updated_at }: ListDataType) => <span>{dayjs(updated_at).format("DD/MM/YYYY")}</span>,
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status: string) => {
        return (
          <>
            <p className={`${status.charAt(0).toUpperCase() + status.slice(1) === "Active"  ? "text-green-500" : "text-red-500"} capitalize`}>{status}</p>
          </>
        );
      },
    },
    {
      title: "Action",
      dataIndex: "id",
      key: "id",
      render: (_, prev: any) => (
        <>
          <Button 
          onClick={() => {
            setOpenDrawer((prev: any) => ({ ...prev, update: true }));
            setRoleAccess(prev);
          }}
          >
            <FaPen />
          </Button>
        </>
      ),
    },
  ];

  return (
    <main className="space-y-5">
      <div className="flex justify-between items-center">
        <InputSearch placeholder="Search" onChange={(e) => setParams({...params, search: e})} />
        <Button onClick={() => setOpenDrawer((prev: any) => ({ ...prev, create: true }))} className="bg-[#F2E2A8] hover:!bg-[#F2E2A8] !border-none hover:!text-black font-semibold" icon={<PlusCircleOutlined />}>
          Role Access Baru
        </Button>
      </div>
      <Table
        columns={columns}
        dataSource={listRoleAccess?.items}
        size="small"
        loading={loading}
        pagination={{
          size: "default",
          current: Math.floor(params.offset / params.limit) + 1, // Perhitungan halaman saat ini
          pageSize: params.limit,
          // defaultPageSize: params.limit,
          showSizeChanger: true,
          total: listRoleAccess?.total, // Total data
          onChange: (page, pageSize) => {
            setParams({
              ...params,
              limit: pageSize,
              offset: (page - 1) * pageSize, // Perhitungan offset
            });
          },
          onShowSizeChange: (current, size) => {
            setParams({
              ...params,
              limit: size,
              offset:(current - 1) * size,
            });
          },
          showTotal: (total, range) => {
            return(
              <span style={{ left: 0, position: "absolute", fontSize: 12 }}>
                Menampilkan {range[0]} hingga {Math.min(range[1], total)} dari {total} hasil
              </span>
            )
          },
        }}
        scroll={{
          x: "100%",
        }}
      />

      <Drawer title="Tambah Akses Baru" onClose={() => setOpenDrawer((prev: any) => ({ ...prev, create: false }))} open={openDrawer.create}>
        {
          loadingUserRole && (
          <Skeleton active paragraph={{ rows: dataForm.length }} />
          )
        }
          <FormGenerator
            hookForm={hookFormGenerator}
            onFinish={handleSubmit}
            data={dataForm}
            id="dynamicForm"
            size="default" //small , default , large
            layout="vertical" //vertical, horizontal
            // disabled={loading}
            // formStyle={{ maxWidth: "100%" }}
          />
        <div className="w-full">
          <Button loading={loading} form="dynamicForm" htmlType="submit" className="bg-[#F2E2A8] w-full hover:!bg-[#F2E2A8] !border-none hover:!text-black font-semibold">
            Simpan
          </Button>
        </div>
      </Drawer>
      <UpdateRoleAccess
        listUserRoles={listUserRoles}
        openDrawer={openDrawer}
        setOpenDrawer={setOpenDrawer}
        handleGetRoleAccess={handleGetRoleAccess}
        roleAccess={roleAccess}
        listModules={listModules}
      />
    </main>
  );
}
