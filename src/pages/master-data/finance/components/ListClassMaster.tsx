import { Button, Drawer, Form, Modal, notification, Table } from "antd";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { FaPen } from "react-icons/fa6";
import { PlusCircleOutlined } from "@ant-design/icons";
import InputSearch from "../../../shared/components/InputSearch";
import FormGenerator from "../../../shared/components/FormGenerator";
import { useFinanceStore } from "../../../../stores/finance.store";
import UpdateClassMaster from "./UpdateClassMaster";

type ListDataType = {
  id: string;
  class_name: string;
  type: string;
  created_by: string;
  updated_at: string;
  status: string;
};

export default function ListClassMaster() {
  const [params, setParams] = useState({
    offset: 0,
    limit: 10,
    search: "",
  });
  const [openDrawer, setOpenDrawer] = useState({
    create: false,
    update: false,
  });
  const [hookFormGenerator] = Form.useForm();
  const {getClassMaster, listClassMaster,postClassMaster,loading}=useFinanceStore()
  const [classMaster, setClassMaster]=useState({})

  const handleGetClassMaster = async () => {
      getClassMaster(params)
  };

  useEffect(() => {
    handleGetClassMaster()
  }, [params])

  const handleSubmit = async (val: any)=> {
    try {
     await postClassMaster(val)
     notification.success({
       message: "Success",
       description: "Berhasil menyimpan data user",
     })
     handleGetClassMaster()
     hookFormGenerator.resetFields()
     setOpenDrawer((val: any) => ({ ...val, create: false }))
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
      name: "name",
      label: "Nama Class",
      type: "text",
      placeholder: "Enter Class Name",
      rules: [{ required: true, message: "This field is required!" }],
    },
    {
      name: "code",
      label: "Code",
      type: "text",
      placeholder: "Enter Type",
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
          value: "Inactive",
        },
      ],
    },
  ];

  const columns = [
    {
      title: "Class Id",
      dataIndex: "class_id",
      key: "class_id",
    },
    {
      title: "Nama Class",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Code",
      dataIndex: "code",
      key: "code",
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
          onClick={()=>{
            setOpenDrawer((prev:any) => ({...prev, update: true}));
            setClassMaster(prev)
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
        <Button onClick={() => setOpenDrawer({...openDrawer, create: true})} className="bg-[#F2E2A8] hover:!bg-[#F2E2A8] !border-none hover:!text-black font-semibold" icon={<PlusCircleOutlined />}>
          Kelas Baru
        </Button>
      </div>
     <Table
        columns={columns}
        dataSource={listClassMaster?.items}
        size="small"
        loading={loading}
        pagination={{
          size: "default",
          current: Math.floor(params.offset / params.limit) + 1, // Perhitungan halaman saat ini
          pageSize: params.limit,
          // defaultPageSize: params.limit,
          showSizeChanger: true,
          total: listClassMaster?.total,
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
      footer={
        <div className="w-full my-8">
          <Button form="dynamicForm" htmlType="submit" className="bg-[#F2E2A8] w-full hover:!bg-[#F2E2A8] !border-none hover:!text-black font-semibold">
            Simpan
          </Button>
        </div>
        }
        title="Tambah Class"
        onClose={() => setOpenDrawer((val:any)=> ({...val, create: false}))}
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
      </ Drawer>
      <UpdateClassMaster
        openDrawer={openDrawer}
        setOpenDrawer={setOpenDrawer}
        classMaster={classMaster}
        handleGetClassMaster={handleGetClassMaster}
      />
    </main>
  );
}
