import { Button, Drawer, Form, Modal, notification, Table } from "antd";
import dayjs from "dayjs";
import {  useEffect, useState } from "react";
import { FaPen } from "react-icons/fa6";
import InputSearch from "../../../shared/components/InputSearch";
import FormGenerator from "../../../shared/components/FormGenerator";
import { PlusCircleOutlined } from "@ant-design/icons";
import UpdateTax from "./UpdateTax";
import { useTaxStore } from "../../../../stores/tax.store";

export default function ListTax() {
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
  const {getTax, listTax, loading, postTax}=useTaxStore();
  const [taxId, setTaxId]= useState(null);

  const handleGetTax = () => {
    getTax(params);
  };

  const handleSubmit = async (val: any)=> {
    try {
     await postTax(val)
     notification.success({
       message: "Success",
       description: "Berhasil menyimpan tax",
     })
     handleGetTax()
     hookFormGenerator.resetFields()
     setOpenDrawer({ ...openDrawer, create: false })
    } catch (error: any) {
     console.log(error.message)
     Modal.error({
       title: "Error",
       content: error.message || "Internal Server Error",
     })
    }
   };

  useEffect(() => {
    handleGetTax();
  }, [params]);

  const dataForm = [
    {
      name: "name",
      label: "Tax Name",
      type: "text",
      placeholder: "Enter Tax Name",
      rules: [{ required: true, message: "This field is required!" }],
    },
    {
      name: "amount",
      label: "Amount",
      type: "number",
      className: "w-full",
      placeholder: "Enter Amount",
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
      title: "Tax ID",
      dataIndex: "tax_id",
      key: "tax_id",
    },
    {
      title: "Tax Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
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
      render: (id:any) => (
        <>
          <Button 
           onClick={()=>{
            setOpenDrawer({...openDrawer, update: true})
            setTaxId(id)
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
        <Button 
         onClick={() => setOpenDrawer({...openDrawer, create: true})}
         className="bg-[#F2E2A8] hover:!bg-[#F2E2A8] !border-none hover:!text-black font-semibold"
         icon={<PlusCircleOutlined size={20} />}
         >
          Tax Code
        </Button>
      </div>
      <Table
        columns={columns}
        dataSource={listTax?.items}
        size="small"
        loading={loading}
        pagination={{
          size: "default",
          current: Math.floor(params.offset / params.limit) + 1, // Perhitungan halaman saat ini
          pageSize: params.limit,
          // defaultPageSize: params.limit,
          showSizeChanger: true,
          total: listTax?.total, // Total data
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
       title="Tambah Tax Baru"
       onClose={() => {
        setOpenDrawer({ ...openDrawer, create: false });
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
        <div className="w-full absolute bottom-0 left-0 right-0 p-5">
          <Button loading={loading} form="dynamicForm" htmlType="submit" className="bg-[#F2E2A8] w-full hover:!bg-[#F2E2A8] !border-none hover:!text-black font-semibold">
            Simpan
          </Button>
        </div>
      </Drawer>
      <UpdateTax
        openDrawer={openDrawer}
        setOpenDrawer={setOpenDrawer}
        handleGetTax={handleGetTax}
        taxId={taxId}
      />
    </main>
  );
}
