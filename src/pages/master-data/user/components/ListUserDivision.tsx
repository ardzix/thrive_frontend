import { Button, Drawer, Form, Table } from "antd";
import dayjs from "dayjs";
import { useState } from "react";
import { FaPen } from "react-icons/fa6";
import { PlusCircleOutlined } from "@ant-design/icons";
import InputSearch from "../../../shared/components/InputSearch";
import FormGenerator from "../../../shared/components/FormGenerator";

type ListDataType = {
  id: string;
  role_name: string;
  division: string;
  created_by: string;
  updated_at: string;
  status: string;
};

const data: ListDataType[] = [
  {
    id: "1",
    role_name: "Accounting",
    division: "Finance",
    created_by: "Husen",
    updated_at: "2022-02-02 12:00:00",
    status: "active",
  },
  {
    id: "2",
    role_name: "Accounting",
    division: "Finance",
    created_by: "Husen",
    updated_at: "2022-02-02 12:00:00",
    status: "active",
  },
  {
    id: "3",
    role_name: "Accounting",
    division: "Finance",
    created_by: "Husen",
    updated_at: "2022-02-02 12:00:00",
    status: "not active",
  },
];

const columns = [
  {
    title: "Divisi Id",
    dataIndex: "id",
    key: "id",
  },
  {
    title: "Role",
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

export default function ListUserDivison() {
  const [page, setPage] = useState(1);
  const [openDrawer, setOpenDrawer] = useState(false);
  const [hookFormGenerator] = Form.useForm();

  const dataForm = [
    {
      name: "id",
      label: "Divisi Id",
      type: "text",
      placeholder: "Enter Divisi Id",
      rules: [{ required: true, message: "This field is required!" }],
    },
    {
      name: "division_name",
      label: "Divisi",
      type: "text",
      placeholder: "Enter Divisi",
      rules: [{ required: true, message: "This field is required!" }],
    },
    {
      name: "description",
      label: "Deskripsi",
      type: "textarea",
      className: "w-full !min-h-[150px]",
      placeholder: "Enter Deskripsi",
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
          Divisi Baru
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

      <Drawer title="Tambah Divisi Baru" onClose={() => setOpenDrawer(false)} open={openDrawer}>
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
