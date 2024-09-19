import { Button, Drawer, Form, Table } from "antd";
import dayjs from "dayjs";
import { useState } from "react";
import { FaPen } from "react-icons/fa6";
import InputSearch from "../../shared/components/InputSearch";
import { PlusCircleOutlined } from "@ant-design/icons";
import FormGenerator from "../../shared/components/FormGenerator";

type ListDataType = {
  id: string;
  project_name: string;
  project_proposal: string;
  created_by: string;
  updated_at: string;
  status: string;
};

const data: ListDataType[] = [
  {
    id: "1",
    project_name: "Project 1",
    project_proposal: "Proposal 1",
    created_by: "Husen",
    updated_at: "2022-02-02 12:00:00",
    status: "active",
  },
  {
    id: "2",
    project_name: "Project 2",
    project_proposal: "Proposal 2",
    created_by: "Husen",
    updated_at: "2022-02-02 12:00:00",
    status: "active",
  },
  {
    id: "3",
    project_name: "Project 3",
    project_proposal: "Proposal 3",
    created_by: "Husen",
    updated_at: "2022-02-02 12:00:00",
    status: "not active",
  },
];

const columns = [
  {
    title: "Project Id",
    dataIndex: "id",
    key: "id",
  },
  {
    title: "Nama Project",
    dataIndex: "project_name",
    key: "project_name",
  },
  {
    title: "Project Proposal",
    dataIndex: "project_proposal",
    key: "project_proposal",
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

export default function ListProject() {
  const [page, setPage] = useState(1);
  const [openDrawer, setOpenDrawer] = useState(false);
  const [hookFormGenerator] = Form.useForm();

  const dataForm = [
    {
      name: "id",
      label: "Project Id",
      type: "text",
      placeholder: "Enter Project Id",
      required: true,
    },
    {
      name: "project_name",
      label: "Nama Project",
      type: "text",
      placeholder: "Enter Project Name",
      required: true,
    },
    {
      name: "project_proposal",
      label: "Proposal Project",
      type: "select",
      placeholder: "Enter Project Proposal",
      required: true,
      options: [
        {
          label: "proposal 1",
          value: "proposal 1",
        },
        {
          label: "proposal 2",
          value: "proposal 2",
        },
      ],
    },
    {
      name: "project_leader",
      label: "Project Leader",
      type: "select",
      placeholder: "Enter Project Leader",
      required: true,
      options: [
        {
          label: "Leader 1",
          value: "Leader 1",
        },
        {
          label: "Leader 2",
          value: "Leader 2",
        },
      ],
    },
    {
      name: "project_kickoff",
      label: "Project Kickoff",
      type: "text",
      placeholder: "Enter Project Kickoff",
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
          Project Baru
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
