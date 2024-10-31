import { Button, Drawer, Form, Table } from "antd";
import dayjs from "dayjs";
import {  useState } from "react";
import { FaPen } from "react-icons/fa6";
import InputSearch from "../../../shared/components/InputSearch";
import FormGenerator from "../../../shared/components/FormGenerator";
import { AiOutlineDownload } from "react-icons/ai";

type ListDataType = {
  id: string;
  acc_name: string;
  class: string;
  type: string;
  created_by: string;
  updated_at: string;
  status: string;
};



const columns = [
  {
    title: "Transaction_ID",
    dataIndex: "transaction_id",
    key: "transaction_id",
  },
  {
    title: "Transaction_Type",
    dataIndex: "transaction_type",
    key: "transaction_type",
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
    render: ({ updated_at }: ListDataType) => <span>{dayjs(updated_at).format("DD/MM/YYYY")}</span>,
  },
  {
    title: "Status",
    dataIndex: "status",
    key: "status",
    render: (status: string) => {
      return (
        <>
          <p className={`${status.charAt(0).toUpperCase() + status.slice(1) === "Completed"  ? "text-green-500" : "text-red-500"} capitalize`}>{status}</p>
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

export default function ListGeneralLedger() {
  const [params, setParams] = useState({
    offset: 0,
    limit: 10,
    search: "",
  });
  const [openDrawer, setOpenDrawer] = useState(false);
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

  const dataForm = [
    {
      name: "acc_name",
      label: "Nama Acc.",
      type: "text",
      placeholder: "Enter Acc. Name",
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

  const listGeneralLedger = {
    total: 0,
    items: [
      {
        id: "1",
        "transaction_id": "TRA001",
        "transaction_type": "Cash & Bank",
        amount: "Rp. 1.400.000.000",
        created_by: "Admin",
        updated_at: "2022-01-01",
        status: "Completed",
      },
      {
        id: "2",
        "transaction_id": "TRA002",
        "transaction_type": "Cash & Bank",
        amount: "Rp. 1.400.000.000",
        created_by: "Admin",
        updated_at: "2022-01-01",
        status: "Completed",
      },
      {
        id: "3",
        "transaction_id": "TRA003",
        "transaction_type": "Cash & Bank",
        amount: "Rp. 1.400.000.000",
        created_by: "Admin",
        updated_at: "2022-01-01",
        status: "Pending",
      },
      {
        id: "4",
        "transaction_id": "TRA004",
        "transaction_type": "Cash & Bank",
        amount: "Rp. 1.400.000.000",
        created_by: "Admin",
        updated_at: "2022-01-01",
        status: "Pending",
      },
    ],
  };

  return (
    <main className="space-y-5">
      <div className="flex justify-between items-center">
      <InputSearch placeholder="Search" onChange={(e) => setParams({...params, search: e})} />
        <Button 
         onClick={() => {}}
         className="bg-[#F2E2A8] hover:!bg-[#F2E2A8] !border-none hover:!text-black font-semibold"
         icon={<AiOutlineDownload size={20} />}
         >
          Download Data
        </Button>
      </div>
      <Table
        columns={columns}
        dataSource={listGeneralLedger?.items}
        size="small"
        loading={false}
        pagination={{
          size: "default",
          current: Math.floor(params.offset / params.limit) + 1, // Perhitungan halaman saat ini
          pageSize: params.limit,
          // defaultPageSize: params.limit,
          showSizeChanger: true,
          total: listGeneralLedger?.total, // Total data
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

      <Drawer title="Tambah Acc. Baru" onClose={() => setOpenDrawer(false)} open={openDrawer}>
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
        <div className="w-full">
          <Button loading={false} form="dynamicForm" htmlType="submit" className="bg-[#F2E2A8] w-full hover:!bg-[#F2E2A8] !border-none hover:!text-black font-semibold">
            Simpan
          </Button>
        </div>
      </Drawer>
    </main>
  );
}
