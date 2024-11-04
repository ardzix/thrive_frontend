import { Button, Drawer, Form, Modal, notification, Spin, Table } from "antd";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { FaPen } from "react-icons/fa6";
import { PlusCircleOutlined } from "@ant-design/icons";
import InputSearch from "../../../shared/components/InputSearch";
import FormGenerator from "../../../shared/components/FormGenerator";
import { useFinanceStore } from "../finance.store";
import UpdateChartOfAccount from "./UpdateChartOfAccount";

type ListDataType = {
  id: string;
  acc_name: string;
  class: string;
  type: string;
  created_by: string;
  updated_at: string;
  status: string;
};

export default function ListChart() {
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
  const {getChartOfAccount, getClassMaster, listClassMaster,loading, listChartOfAccount, postChartOfAccount}=useFinanceStore();
  const [chartOfAccount, setChartOfAccount]=useState({});

  const handleGetChartOfAccount = () => {
    getChartOfAccount(params);
  }

  const handleSubmit = async (val: any)=> {
    try {
     await postChartOfAccount(val)
     notification.success({
       message: "Success",
       description: "Berhasil menyimpan data user",
     })
     handleGetChartOfAccount()
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

  useEffect(() => {
    handleGetChartOfAccount();
  }, [params]);

  useEffect(()=>{
    getClassMaster({
      offset: 0,
      limit: 10000
    })
  },[])

  const dataForm = [
    {
      name: "name",
      label: "Nama Acc.",
      type: "text",
      placeholder: "Enter Acc. Name",
      rules: [{ required: true, message: "This field is required!" }],
    },
    {
      name: "class_id",
      label: "Kelass",
      type: "select",
      placeholder: "Enter Kelas",
      rules: [{ required: true, message: "This field is required!" }],
      options: listClassMaster?.items?.map((item:any) => ({
        label: item.name,
        value: item.id,
      }))
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
      title: "Acc. ID",
      dataIndex: "acc_id",
      key: "acc_id",
    },
    {
      title: "Nama Acc.",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Kelas",
      dataIndex: "class_name",
      key: "class_name",
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
      render: (_, res: any) => (
        <>
          <Button 
            onClick={()=>{
              setOpenDrawer({...openDrawer, update: true})
              setChartOfAccount(res)
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
          Acc. Baru
        </Button>
      </div>
      <Table
        columns={columns}
        dataSource={listChartOfAccount?.items}
        size="small"
        loading={loading}
        pagination={{
          size: "default",
          current: Math.floor(params.offset / params.limit) + 1, // Perhitungan halaman saat ini
          pageSize: params.limit,
          // defaultPageSize: params.limit,
          showSizeChanger: true,
          total: listChartOfAccount?.total, // Total data
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
        title="Tambah Acc."
        onClose={() => setOpenDrawer((val:any)=> ({...val, create: false}))}
        open={openDrawer.create}
    >
        {
          loading && (
            <div className="flex justify-center items-center">
              <Spin size="large" />
            </div>
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
      </Drawer>
      
      <UpdateChartOfAccount 
        openDrawer={openDrawer}
        setOpenDrawer={setOpenDrawer}
        handleGetchartOfAccount={handleGetChartOfAccount}
        chartOfAccount={chartOfAccount}
        listClassMaster={listClassMaster}
      />
    </main>
  );
}
