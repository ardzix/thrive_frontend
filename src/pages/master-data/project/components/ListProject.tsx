import { Button, Drawer, Form, Table } from "antd";
import dayjs from "dayjs";
import { useState } from "react";
import { FaPen } from "react-icons/fa6";
import { PlusCircleOutlined } from "@ant-design/icons";
import InputSearch from "../../../shared/components/InputSearch";
import FormGenerator from "../../../shared/components/FormGenerator";
import UpdateProject from "./UpdateProject";


export default function ListProject() {
  const [page, setPage] = useState(1);
  const [openDrawer, setOpenDrawer] = useState({
    create: false,
    update: false,
  });
  const [hookFormGenerator] = Form.useForm();

  // dummy data
  const listProjects={
    items: Array(10).fill({
      project_id: "PRO001",
      project_name: "Lembayung Senja",
      status: "Active",
      created_by: "Jon Pantau",
      updated_at: dayjs().format('DD/MM/YYYY'),
    }),
    total: 10,
    offset: 0,
    limit: 10,
  }

  const dataForm = [
    {
      name: "project_name",
      label: "Nama Project",
      type: "text",
      placeholder: "Enter Project Name",
      rules: [{ required: true, message: "This field is required!" }],
    },
    {
      name: "entity_id",
      label: "Entitas",
      type: "select",
      placeholder: "Enter Entity",
      rules: [{ required: true, message: "This field is required!" }],
      options: [
        {
          label: "entitas 1",
          value: "entitas 1",
        },
        {
          label: "entitas 1",
          value: "entitas 1",
        },
      ],
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

  const columns = [
    {
      title: "Project Id",
      dataIndex: "project_id",
      key: "project_id",
    },
    {
      title: "Nama Project",
      dataIndex: "project_name",
      key: "project_name",
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
      // render: ({ updated_at }: ListDataType) => <span>{dayjs(updated_at).format("DD/MM/YYYY")}</span>,
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
          <Button
            onClick={()=>{
              setOpenDrawer({...openDrawer, update: true})

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
        <InputSearch placeholder="Search" onChange={() => {}} />
        <Button onClick={() => setOpenDrawer({...openDrawer, create: true})} className="bg-[#F2E2A8] hover:!bg-[#F2E2A8] !border-none hover:!text-black font-semibold" icon={<PlusCircleOutlined />}>
          Project Baru
        </Button>
      </div>
      <Table
        columns={columns}
        dataSource={listProjects?.items}
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

      <Drawer 
       title="Tambah Project Baru"
       onClose={() => {
        setOpenDrawer({...openDrawer, create: false});
        hookFormGenerator.resetFields();
         }}
       open={openDrawer.create}
      >
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
        <div className="w-full absolute bottom-0 left-0 right-0 px-5 pb-5">
          <Button
            // loading={loading}
            form="updateDivision"
            htmlType="submit"
            className="bg-[#F2E2A8] w-full hover:!bg-[#F2E2A8] !border-none hover:!text-black font-semibold"
          >
            Simpan
        </Button>
        </div>
      </Drawer>
      <UpdateProject
        openDrawer={openDrawer}
        setOpenDrawer={setOpenDrawer}
        handleGetTax={()=>{}}
      />
    </main>
  );
}
