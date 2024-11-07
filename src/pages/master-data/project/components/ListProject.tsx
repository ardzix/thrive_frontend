import { Button, Drawer, Form, Modal, notification, Table } from "antd";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { FaPen } from "react-icons/fa6";
import { PlusCircleOutlined } from "@ant-design/icons";
import InputSearch from "../../../shared/components/InputSearch";
import FormGenerator from "../../../shared/components/FormGenerator";
import UpdateProject from "./UpdateProject";
import { useProjectStore } from "../../../../stores/project.store";
import { useEntityStore } from "../../../../stores/entity.store";


export default function ListProject() {
  const [params, setParams] = useState({
    offset: 0,
    limit: 10,
    search: "",
  })
  const [openDrawer, setOpenDrawer] = useState({
    create: false,
    update: false,
  });
  const [hookFormGenerator] = Form.useForm();
  const {getProject, listProject, loading, postProject}=useProjectStore();
  const {getEntity, listEntity}=useEntityStore()
  const [projectId, setProjectId] = useState(null);

  const handleGetProject = () => {
    getProject(params)
  };

  useEffect(() => {
    handleGetProject();
  }, [params]);

  useEffect(() => {
    getEntity({
      offset: 0,
      limit: 10000
    })
  },[])

  const handleSubmit = async (values: any) => {
    try {
      console.log(values);
      await postProject(values), 
      notification.success({
        message: 'Success',
        description: 'Berhasil Menambah data Project',
      });
      handleGetProject();
      hookFormGenerator.resetFields();
      setOpenDrawer((val: any) => ({ ...val, create: false }));
    } catch (error: any) {
      console.log(error.message);
      Modal.error({
        title: 'Error',
        content: error.message || 'Internal Server Error',
      });
    }
  };

  const dataForm = [
    {
      name: "name",
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
      options: listEntity?.items?.map((item: any) => ({ 
        label: item.entity_name,
        value: item.id 
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

  const columns = [
    {
      title: "Project Id",
      dataIndex: "project_id",
      key: "project_id",
    },
    {
      title: "Nama Project",
      dataIndex: "name",
      key: "name",
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
      render: ({ updated_at }: any) => <span>{dayjs(updated_at).format("DD/MM/YYYY")}</span>,
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
        <>
          <Button
            onClick={()=>{
              setOpenDrawer({...openDrawer, update: true})
              setProjectId(id)
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
        <InputSearch placeholder="Search" onChange={(val) => setParams({...params, search: val})} />
        <Button onClick={() => setOpenDrawer({...openDrawer, create: true})} className="bg-[#F2E2A8] hover:!bg-[#F2E2A8] !border-none hover:!text-black font-semibold" icon={<PlusCircleOutlined />}>
          Project Baru
        </Button>
      </div>
      <Table
        columns={columns}
        dataSource={listProject?.items}
        size="small"
        loading={loading}
        pagination={{
          size: "default",
          current: Math.floor(params.offset / params.limit) + 1, // Perhitungan halaman saat ini
          pageSize: params.limit,
          // defaultPageSize: params.limit,
          showSizeChanger: true,
          total: listProject?.total, // Total data
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
       title="Tambah Project Baru"
       onClose={() => {
        setOpenDrawer({...openDrawer, create: false});
        hookFormGenerator.resetFields();
         }}
       open={openDrawer.create}
      >
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
        <div className="w-full absolute bottom-0 left-0 right-0 px-5 pb-5">
          <Button
            loading={loading}
            form="dynamicForm"
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
        handleGetProject={handleGetProject}
        listEntity={listEntity}
        projectId={projectId}
      />
    </main>
  );
}
