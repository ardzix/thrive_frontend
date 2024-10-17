import { Button, Drawer, Form, Modal, notification, Skeleton, Table } from "antd";
import { useEffect, useState } from "react";
import { FaPen } from "react-icons/fa6";
import { PlusCircleOutlined } from "@ant-design/icons";
import InputSearch from "../../../shared/components/InputSearch";
import FormGenerator from "../../../shared/components/FormGenerator";
import { useUserStore } from "../user.store";
import { useUserRoleStore } from "../userRole.store";
import { useEntityStore } from "../../company/entity.store";

const columns = [
  {
    title: "User Id",
    dataIndex: "user_id",
    key: "user_id",
  },
  {
    title: "Nama User",
    dataIndex: "full_name",
    key: "full_name",
  },
  {
    title: "Role",
    dataIndex: "role",
    key: "role",
  },
  {
    title: "Entitas",
    dataIndex: "entity",
    key: "entity",
  },
  {
    title: "Status",
    dataIndex: "status",
    key: "status",
    render: (status: string) => {
      return (
          <p className={`${status === "active" ? "text-green-500" : "text-red-500"}`}>{status}</p>
      );
    },
  },
  {
    title: "Action",
    dataIndex: "id",
    key: "id",
    render: () => (
        <Button>
          <FaPen />
        </Button>
    ),
  },
];

export default function ListUserData() {
  const [params, setParams] = useState({
    offset: 0,
    limit: 10,
    search: "",
  });
  const [openDrawer, setOpenDrawer] = useState(false);
  const [hookFormGenerator] = Form.useForm();
  const {getUserRole,listUserRoles, loading:loadingUserRole}=useUserRoleStore()
  const {getUsers, listUsers, loading, postUser} = useUserStore()
  const {getEntity,listEntity} = useEntityStore()

  const handleGetUsers = () => {
     getUsers(params)
  }

  useEffect(()=>{
      handleGetUsers()
  },[params])

  useEffect(()=>{
    getUserRole({
      offset: 0,
      limit: 10000,
    })
    getEntity({
      offset: 0,
      limit: 10000
    })
  },[])

  const handleSubmit = async (val: any)=> {
   try {
    await postUser(val)
    notification.success({
      message: "Success",
      description: "Berhasil menyimpan data user",
    })
    handleGetUsers()
   } catch (error: any) {
    console.log(error.message)
    Modal.error({
      title: "Error",
      content: error.message || "Internal Server Error",
    })
   }
  };

  const dataForm = [
    {
      name: "user_name",
      label: "Nama User",
      type: "text",
      placeholder: "Enter User Name",
      rules: [{ required: true, message: "This field is required!" }],
    },
    {
      name: "position",
      label: "Posisi",
      type: "select",
      placeholder: "Enter Position",
      rules: [{ required: true, message: "This field is required!" }],
      options: [
        {
          label: "test",
          value: "test"
        }
      ],
    },
    {
      name: "access",
      label: "Access",
      type: "select",
      placeholder: "Enter Access",
      rules: [{ required: true, message: "This field is required!" }],
      options: listUserRoles?.items?.map((item) => ({
        label: item.role_name,
        value: item.role_name,
      })),
    },
    {
      name: "entity_id",
      label: "Entitas",
      type: "select",
      placeholder: "Enter Entity",
      rules: [{ required: true, message: "This field is required!" }],
      options: listEntity?.items?.map((item :any) => ({
        label: item.entity_name,
        value: item.id,
      })),
    },
    {
      name: "email",
      label: "Email",
      type: "text",
      placeholder: "Enter Email",
      rules: [{ required: true, message: "This field is required!" }],
    },
    {
      name: "phone",
      label: "NO. Telp",
      type: "text",
      placeholder: "Enter Phone",
      rules: [{ required: true, message: "This field is required!" }],
    },
    {
      name: "address",
      label: "Alamat",
      type: "text",
      placeholder: "Enter Address",
      rules: [{ required: true, message: "This field is required!" }],
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

  return (
    <main className="space-y-5">
      <div className="flex justify-between items-center">
        <InputSearch placeholder="Search" onChange={(e) => setParams({...params, search: e})} />
        <Button onClick={() => setOpenDrawer(true)} className="bg-[#F2E2A8] hover:!bg-[#F2E2A8] !border-none hover:!text-black font-semibold" icon={<PlusCircleOutlined />}>
          User Baru
        </Button>
      </div>
      <Table
        columns={columns}
        dataSource={listUsers?.items}
        size="small"
        loading={loading}
        pagination={{
          size: "default",
          current: Math.floor(params.offset / params.limit) + 1, // Perhitungan halaman saat ini
          pageSize: params.limit,
          // defaultPageSize: params.limit,
          showSizeChanger: true,
          total: listUsers?.total, // Total data
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

      <Drawer title="Tambah User Baru" onClose={() => setOpenDrawer(false)} open={openDrawer}>
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
          disabled={loading}
          // formStyle={{ maxWidth: "100%" }}
        />
        <div className="w-full">
          <Button loading={loading} form="dynamicForm" htmlType="submit" className="bg-[#F2E2A8] w-full hover:!bg-[#F2E2A8] !border-none hover:!text-black font-semibold">
            Simpan
          </Button>
        </div>
      </Drawer>
    </main>
  );
}
