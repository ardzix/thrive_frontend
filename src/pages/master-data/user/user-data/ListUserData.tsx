import { Button, Drawer, Form, Modal, notification, Skeleton, Table } from "antd";
import { useEffect, useState } from "react";
import { FaPen } from "react-icons/fa6";
import { PlusCircleOutlined } from "@ant-design/icons";
import InputSearch from "../../../shared/components/InputSearch";
import FormGenerator from "../../../shared/components/FormGenerator";
import UpdateUserData from "./UpdateUserData";
import { useDivisionStore } from "../../../../stores/division.store";
import { useUserStore } from "../../../../stores/user.store";
import { useUserRoleStore } from "../../../../stores/userRole.store";

export default function ListUserData() {
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
  const [hookFormGenerator] = Form.useForm();
  const {getUserRole,listUserRoles, loading:loadingUserRole}=useUserRoleStore()
  const {getUsers, listUsers, loading, postUser} = useUserStore()
  // const {getEntity,listEntity} = useEntityStore()
  const { getDivison, listDivision}= useDivisionStore();
  const [userId, setUserId] = useState("")

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
    // getEntity({
    //   offset: 0,
    //   limit: 10000
    // })
    getDivison({
      offset: 0,
      limit: 10000
    })
  },[])

  const handleSubmit = async (val: any)=> {
   try {
    console.log(val)
    await postUser(val)
    notification.success({
      type: "success",
      message: "Success",
      description: "Berhasil menyimpan data user",
    })
    handleGetUsers()
    setOpenDrawer((val: any) => ({ ...val, create: false }))
    hookFormGenerator.resetFields()
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
      name: "full_name",
      label: "Nama User",
      type: "text",
      placeholder: "Enter Full Name",
      rules: [{ required: true, message: "This field is required!" }],
    },
    {
      name: "division_id",
      label: "Divisi",
      type: "select",
      placeholder: "Enter Divisi",
      rules: [{ required: true, message: "This field is required!" }],
      options: listDivision?.items?.map((item: any) => ({
        label: item.division_name,
        value: item.id,
      }))
    },
    {
      name: "department_id",
      label: "Departemen",
      type: "select",
      placeholder: "Enter Departemen",
      rules: [{ required: true, message: "This field is required!" }],
      options: [
        {
          label: "test",
          value: "test"
        }
      ]
    },
    {
      name: "role_id",
      label: "User Role",
      type: "select",
      placeholder: "Enter User Role",
      rules: [{ required: true, message: "This field is required!" }],
      options: listUserRoles?.items?.map((item: any) => ({
        label: item.role_name,
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
      render: (id: any) => (
          <Button onClick={()=> {
            setOpenDrawer((val: any) => ({ ...val, update: true }))
            setUserId(id)
          }} >
            <FaPen />
          </Button>
      ),
    },
  ];

  return (
    <main className="space-y-5">
      <div className="flex justify-between items-center">
        <InputSearch placeholder="Search" onChange={(e) => setParams({...params, search: e})} />
        <Button onClick={() => setOpenDrawer((val: any) => ({ ...val, create: true }))} className="bg-[#F2E2A8] hover:!bg-[#F2E2A8] !border-none hover:!text-black font-semibold" icon={<PlusCircleOutlined />}>
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

      <Drawer 
       title="Tambah User Baru"
       onClose={() => {
        setOpenDrawer({ ...openDrawer, create: false });
        hookFormGenerator.resetFields();
       }} 
       open={openDrawer.create}
      >
        {
          loadingUserRole && (
          <Skeleton active paragraph={{ rows: dataForm.length }} />
          )
        }
        <FormGenerator
          hookForm={hookFormGenerator}
          onFinish={handleSubmit}
          data={dataForm}
          id="createUser"
          size="default" //small , default , large
          layout="vertical" //vertical, horizontal
          disabled={loading}
          // formStyle={{ maxWidth: "100%" }}
        />
        <div className="w-full">
          <Button loading={loading} form="createUser" htmlType="submit" className="bg-[#F2E2A8] w-full hover:!bg-[#F2E2A8] !border-none hover:!text-black font-semibold">
            Simpan
          </Button>
        </div>
      </Drawer>
      <UpdateUserData
        openDrawer={openDrawer}
        setOpenDrawer={setOpenDrawer}
        handleGetListUsers={handleGetUsers}
        // listEntity={listEntity}
        listUserRoles={listUserRoles}
        userId={userId}
      />
    </main>
  );
}
