import { Button, Drawer, Form, Table } from "antd";
import dayjs from "dayjs";
import {  useState } from "react";
import { FaPen } from "react-icons/fa6";
import InputSearch from "../../../shared/components/InputSearch";
import FormGenerator from "../../../shared/components/FormGenerator";
import { PlusCircleOutlined } from "@ant-design/icons";
import UpdateTax from "./UpdateTax";

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
//   const {getChartOfAccount,listClassMaster,loading, listGeneralLedger, postChartOfAccount}=useFinanceStore();

//   const handleSubmit = async (val: any)=> {
//     try {
//      await postChartOfAccount(val)
//      notification.success({
//        message: "Success",
//        description: "Berhasil menyimpan data user",
//      })
//      getChartOfAccount(params)
//     } catch (error: any) {
//      console.log(error.message)
//      Modal.error({
//        title: "Error",
//        content: error.message || "Internal Server Error",
//      })
//     }
//    };

//   useEffect(() => {
//     getChartOfAccount(params);
//   }, [params]);

// dummy data
const listBank = {
  items: Array(10).fill({
    tax_id: "TAX001",
    tax_name: "PPn",
    amount: "10%",
    created_by: "Jon Pantau",
    updated_at: dayjs().format("DD/MM/YYYY"),
    status: "Active",
  }),
  total: 10,
  offset: 0,
  limit: 10,
}

  const dataForm = [
    {
      name: "tax_name",
      label: "Tax Name",
      type: "text",
      placeholder: "Enter Tax Name",
      rules: [{ required: true, message: "This field is required!" }],
    },
    {
      name: "amount",
      label: "Amount",
      type: "text",
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
      dataIndex: "tax_name",
      key: "tax_name",
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
        dataSource={listBank?.items}
        size="small"
        loading={false}
        pagination={{
          size: "default",
          current: Math.floor(params.offset / params.limit) + 1, // Perhitungan halaman saat ini
          pageSize: params.limit,
          // defaultPageSize: params.limit,
          showSizeChanger: true,
          total: listBank?.total, // Total data
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
        {/* {
          loading && (
            <div className="flex justify-center items-center">
              <Spin size="large" />
            </div>
          )
        } */}
      <FormGenerator
          hookForm={hookFormGenerator}
          onFinish={() => {}}
          data={dataForm}
          id="dynamicForm"
          size="default" //small , default , large
          layout="vertical" //vertical, horizontal
          disabled={false}
          // formStyle={{ maxWidth: "100%" }}
        />
        <div className="w-full absolute bottom-0 left-0 right-0 p-5">
          <Button loading={false} form="dynamicForm" htmlType="submit" className="bg-[#F2E2A8] w-full hover:!bg-[#F2E2A8] !border-none hover:!text-black font-semibold">
            Simpan
          </Button>
        </div>
      </Drawer>
      <UpdateTax
        openDrawer={openDrawer}
        setOpenDrawer={setOpenDrawer}
        handleGetTax={()=>{}}
      />
    </main>
  );
}
