import { Button, Drawer, Form, Table } from "antd";
import dayjs from "dayjs";
import { useState } from "react";
import { FaPen } from "react-icons/fa6";
import InputSearch from "../../shared/components/InputSearch";
import { PlusCircleOutlined } from "@ant-design/icons";
import FormGenerator from "../../shared/components/FormGenerator";

type ListDataType = {
  id: string;
  entitas_name: string;
  city: string;
  created_by: string;
  updated_at: string;
  status: string;
};

const data: ListDataType[] = [
  {
    id: "1",
    entitas_name: "Pt. Maju Terus Selamanya",
    city: "Jakarta",
    created_by: "Husen",
    updated_at: "2022-02-02 12:00:00",
    status: "active",
  },
  {
    id: "2",
    entitas_name: "Pt. Maju Terus Selamanya",
    city: "Jakarta",
    created_by: "Husen",
    updated_at: "2022-02-02 12:00:00",
    status: "active",
  },
  {
    id: "3",
    entitas_name: "Pt. Maju Terus Selamanya",
    city: "Jakarta",
    created_by: "Husen",
    updated_at: "2022-02-02 12:00:00",
    status: "not active",
  },
];

const columns = [
  {
    title: "Entitas Id",
    dataIndex: "id",
    key: "id",
  },
  {
    title: "Nama entitas",
    dataIndex: "entitas_name",
    key: "entitas_name",
  },
  {
    title: "Kota",
    dataIndex: "city",
    key: "city",
  },
  {
    title: "Tanggal Update",
    dataIndex: "updated_at",
    key: "updated_at",
    render: ({ updated_at }: ListDataType) => <span>{dayjs(updated_at).format("DD/MM/YYYY")}</span>,
  },
  {
    title: "Dibuat Oleh",
    dataIndex: "created_by",
    key: "created_by",
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

export default function ListCompanyEntitas() {
  const [page, setPage] = useState(1);
  const [openDrawer, setOpenDrawer] = useState(false);
  const [hookFormGenerator] = Form.useForm();

  const dataForm = [
    {
      name: "id",
      label: "Entitas Id",
      type: "text",
      placeholder: "Enter Entitas Id",
      required: true,
    },
    {
      name: "entitas_name",
      label: "Nama Entitas",
      type: "text",
      placeholder: "Enter Entitas Name",
      required: true,
    },
    {
      name: "address",
      label: "Alamat",
      type: "text",
      placeholder: "Enter Address",
      required: true,
    },
    {
      name: "city",
      label: "Kota",
      type: "text",
      placeholder: "Enter City",
      required: true,
    },
    {
      name: "province",
      label: "Provinsi",
      type: "text",
      placeholder: "Enter Province",
      required: true,
    },
    {
      name: "postcode",
      label: "Kode Pos",
      type: "text",
      placeholder: "Enter Postcode",
      required: true,
    },
    {
      name: "division",
      label: "Divisi",
      type: "select",
      placeholder: "Enter Divisi",
      required: true,
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
      label: "Akses",
      type: "select",
      placeholder: "Enter Akses",
      options: [
        {
          label: "Public",
          value: "Public",
        },
        {
          label: "Private",
          value: "Private",
        },
      ],
      required: true,
    },
    {
      name: "phone",
      label: "NO. Telp",
      type: "text",
      placeholder: "Enter Phone",
      required: true,
    },
    {
      name: "fax",
      label: "NO. Fax",
      type: "text",
      placeholder: "Enter Fax",
      required: true,
    },
    {
      name: "Fiskal",
      label: "Tahun Fiskal",
      type: "text",
      placeholder: "Enter Fiskal",
      required: true,
    },
    {
      name: "periode_audit",
      label: "Periode Audit",
      type: "text",
      placeholder: "Enter Periode Audit",
      required: true,
    },
    {
      name: "status",
      label: "Status",
      type: "select",
      placeholder: "Enter Status",
      required: true,
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
          Entitas Baru
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

      <Drawer title="Tambah Entitas Baru" onClose={() => setOpenDrawer(false)} open={openDrawer}>
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
