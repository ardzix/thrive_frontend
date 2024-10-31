import { Button, Drawer, Form, Table } from "antd";
import dayjs from "dayjs";
import {  useState } from "react";
import { FaPen } from "react-icons/fa6";
import InputSearch from "../../../shared/components/InputSearch";
import FormGenerator from "../../../shared/components/FormGenerator";
import { PlusCircleOutlined } from "@ant-design/icons";
import UpdateBank from "./UpdateBank";

export default function ListBank() {
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
    bank_id: "BNK001",
    bank: "OCBC NISP",
    entity_id: "ENT001",
    acc_number: "315150001019",
    created_by: "admin",
    updated_at: dayjs().format("DD/MM/YYYY"),
    status: "Active",
  }),
  total: 10,
  offset: 0,
  limit: 10,
}

  const dataForm = [
    {
      name: "bank",
      label: "Bank",
      type: "text",
      placeholder: "Enter Bank",
      rules: [{ required: true, message: "This field is required!" }],
    },
    {
      name: "acc_number",
      label: "No. Rekening",
      type: "text",
      placeholder: "Enter No. Rekening",
      rules: [{ required: true, message: "This field is required!" }],
    },
    {
      name: "acc_code",
      label: "Account Code",
      type: "text",
      placeholder: "Enter Account Code",
      rules: [{ required: true, message: "This field is required!" }],
    },
    {
      name: "currency",
      label: "Currency",
      type: "select",
      placeholder: "Enter Currency",
      options: [
       {
        label: "IDR",
        value: "IDR",
       }
      ],
      rules: [{ required: true, message: "This field is required!" }],
    },
    {
      name: "division_id",
      label: "Managing Division",
      type: "select",
      placeholder: "Enter Currency",
      options: [
       {
        label: "Division 1",
        value: "323ejsdyf32dddd",
       }
      ],
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
      title: "Bank ID",
      dataIndex: "bank_id",
      key: "bank_id",
    },
    {
      title: "Bank",
      dataIndex: "bank",
      key: "bank",
    },
    {
      title: "Entitas",
      dataIndex: "entity_id",
      key: "entity_id",
    },
    {
      title: "No. Rekening",
      dataIndex: "acc_number",
      key: "acc_number",
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
            setOpenDrawer((prev:any) => ({...prev, update: true}))
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
         onClick={() => setOpenDrawer((prev:any) => ({...prev, create: true}))}
         className="bg-[#F2E2A8] hover:!bg-[#F2E2A8] !border-none hover:!text-black font-semibold"
         icon={<PlusCircleOutlined size={20} />}
         >
          Bank
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
       title="Tambah Bank Baru"
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
      <UpdateBank
        openDrawer={openDrawer}
        setOpenDrawer={setOpenDrawer}
        handleGetBank={()=>{}}
      />
    </main>
  );
}
