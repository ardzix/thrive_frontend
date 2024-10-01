import { Button, Drawer, Form, Table } from "antd";
import { useState } from "react";
import { FaPen } from "react-icons/fa6";
import InputSearch from "../../shared/components/InputSearch";
import { PlusCircleOutlined } from "@ant-design/icons";
import FormGenerator from "../../shared/components/FormGenerator";

type ListDataType = {
  id: string;
  user_name: string;
  entitas_name: string;
  role: string;
  status: string;
};

const data: ListDataType[] = [
  {
    id: "1",
    user_name: "Husen",
    entitas_name: "Pt. Maju Terus Selamanya",
    role: "Super Admin",
    status: "active",
  },
  {
    id: "2",
    user_name: "Kevin",
    entitas_name: "Pt. Maju Terus Selamanya",
    role: "Admin",
    status: "active",
  },
  {
    id: "3",
    user_name: "John Doe",
    entitas_name: "Pt. Maju Terus Selamanya",
    role: "User",
    status: "not active",
  },
];

const columns = [
  {
    title: "User Id",
    dataIndex: "id",
    key: "id",
  },
  {
    title: "Nama User",
    dataIndex: "user_name",
    key: "user_name",
  },
  {
    title: "Role",
    dataIndex: "role",
    key: "role",
  },
  {
    title: "Entitas",
    dataIndex: "entitas_name",
    key: "entitas_name",
  },
  {
    title: "Status",
    dataIndex: "status",
    key: "status",
    render: (status: string) => {
      return (
        <>
          <p className={`${status === "active" ? "text-green-500" : "text-red-500"}`}>{status}</p>
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

export default function ListUserData() {
  const [page, setPage] = useState(1);
  const [openDrawer, setOpenDrawer] = useState(false);
  const [hookFormGenerator] = Form.useForm();

  const dataForm = [
    {
      name: "id",
      label: "User Id",
      type: "text",
      placeholder: "Enter User Id",
      rules: [{ required: true, message: "This field is required!" }],
    },
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
          label: "Accounting",
          value: "Accounting",
        },
        {
          label: "Finance",
          value: "Finance",
        },
      ],
    },
    {
      name: "access",
      label: "Access",
      type: "select",
      placeholder: "Enter Access",
      rules: [{ required: true, message: "This field is required!" }],
      options: [
        {
          label: "Accounting",
          value: "Accounting",
        },
        {
          label: "Finance",
          value: "Finance",
        },
      ],
    },
    {
      name: "entity",
      label: "Entitas",
      type: "select",
      placeholder: "Enter Entity",
      rules: [{ required: true, message: "This field is required!" }],
      options: [
        {
          label: "Accounting",
          value: "Accounting",
        },
        {
          label: "Finance",
          value: "Finance",
        },
      ],
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
          label: "Not Active",
          value: "Not Active",
        },
      ],
    },
  ];

  return (
    <main className="space-y-5">
      <div className="flex justify-between items-center">
        <InputSearch placeholder="Search" onChange={() => {}} />
        <Button onClick={() => setOpenDrawer(true)} className="bg-[#F2E2A8] hover:!bg-[#F2E2A8] !border-none hover:!text-black font-semibold" icon={<PlusCircleOutlined />}>
          User Baru
        </Button>
      </div>
      <Table
        columns={columns}
        dataSource={data}
        size="small"
        loading={false}
        pagination={{
          size: "default",
          current: page,
          // current: parseInt(CurrentPage),
          // defaultCurrent: 1,
          onChange: (p) => {
            setPage(p);
          },
          //   pageSize: pageSize,
          // size: pageSize,
          showSizeChanger: true,
          //   total: listTaskAll?.count,
          //   onShowSizeChange: (p, s) => {
          //     setPage(p);
          //     setPageSize(s);
          //   },
          showTotal: (total, range) => (
            <span style={{ left: 0, position: "absolute", fontSize: 12 }}>
              Showing {range[0]} to {range[1]} of {total} results
            </span>
          ),
        }}
        scroll={{
          x: "100%",
          // y: "100%",
        }}
      />

      <Drawer title="Tambah User Baru" onClose={() => setOpenDrawer(false)} open={openDrawer}>
        <FormGenerator
          hookForm={hookFormGenerator}
          onFinish={() => {}}
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
