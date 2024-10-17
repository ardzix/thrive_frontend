import { Button, Drawer, Form, Modal, notification, Skeleton, Table } from "antd";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { FaPen } from "react-icons/fa6";
import { PlusCircleOutlined } from "@ant-design/icons";
import InputSearch from "../../../shared/components/InputSearch";
import FormGenerator from "../../../shared/components/FormGenerator";
import { useUserRoleStore } from "../userRole.store";
import { useDivisionStore } from "../division.store";

type ListDataType = {
  id: string;
  role_name: string;
  division: string;
  created_by: string;
  updated_at: string;
  status: string;
};

const columns = [
  {
    title: "Role Id",
    dataIndex: "role_id",
    key: "role_id",
  },
  {
    title: "Role",
    dataIndex: "role_name",
    key: "role_name",
  },
  {
    title: "Divisi",
    dataIndex: "division_name",
    key: "division_name",
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
    render: () => (
      <>
        <Button>
          <FaPen />
        </Button>
      </>
    ),
  },
];

export default function ListUserRole() {
  const [params, setParams] = useState({
    offset: 0,
    limit: 10,
    search: "",
  });
  const [openDrawer, setOpenDrawer] = useState(false);
  const [hookFormGenerator] = Form.useForm();
  const{getDivison,listDivision,loading:loadingDivision}= useDivisionStore()

  const dataForm = [
    {
      name: "role_name",
      label: "Role",
      type: "text",
      placeholder: "Enter Role",
      rules: [{ required: true, message: "This field is required!" }],
    },
    {
      name: "division_id",
      label: "Divisi",
      type: "select",
      placeholder: "Enter Divisi",
      rules: [{ required: true, message: "This field is required!" }],
      options: listDivision?.items?.map((item) => ({
        label: item.division_name,
        value: item.id,
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
          label: "Not Active",
          value: "Not Active",
        },
      ],
    },
  ];
  const {getUserRole, loading, listUserRoles, postUserRole} =useUserRoleStore()
  const handleGetUserRole = () => {
    getUserRole(params)
 }

 useEffect(()=>{
     handleGetUserRole()
 },[params])

 useEffect(()=>{
  getDivison({
    offset: 0,
    limit: 1000,
  })
 },[])

 const handleSubmit = async (val: any)=> {
  try {
   await postUserRole(val)
   notification.success({
     message: "Success",
     description: "Berhasil menyimpan data role",
   })
   handleGetUserRole()
  } catch (error: any) {
   console.log(error.message)
   Modal.error({
     title: "Error",
     content: error.message || "Internal Server Error",
   })
  }
 };

  return (
    <main className="space-y-5">
      <div className="flex justify-between items-center">
        <InputSearch placeholder="Search" onChange={(val) => setParams({ ...params, search: val })} />
        <Button onClick={() => setOpenDrawer(true)} className="bg-[#F2E2A8] hover:!bg-[#F2E2A8] !border-none hover:!text-black font-semibold" icon={<PlusCircleOutlined />}>
          Role Baru
        </Button>
      </div>
      <Table
        columns={columns}
        dataSource={listUserRoles?.items}
        size="small"
        loading={loading}
        pagination={{
          size: "default",
          current: Math.floor(params.offset / params.limit) + 1, // Perhitungan halaman saat ini
          pageSize: params.limit,
          // defaultPageSize: params.limit,
          showSizeChanger: true,
          total: listUserRoles?.total, // Total data
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

      <Drawer title="Tambah Role Baru" onClose={() => setOpenDrawer(false)} open={openDrawer}>
        {
          loadingDivision && (
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
          <Button form="dynamicForm" htmlType="submit" className="bg-[#F2E2A8] w-full hover:!bg-[#F2E2A8] !border-none hover:!text-black font-semibold">
            Simpan
          </Button>
        </div>
      </Drawer>
    </main>
  );
}
