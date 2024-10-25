import { Button, Drawer, Form, Modal, notification, Table } from "antd";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { FaPen } from "react-icons/fa6";
import { PlusCircleOutlined } from "@ant-design/icons";
import InputSearch from "../../../shared/components/InputSearch";
import FormGenerator from "../../../shared/components/FormGenerator";
import { rupiahFormat } from "../../../../lib/helper";
import { useFinanceStore } from "../finance.store";

type ListDataType = {
  id: string;
  currency: string;
  code: string;
  conversion: number;
  created_by: string;
  updated_at: string;
  status: string;
};

const columns = [
  {
    title: "Currency Id",
    dataIndex: "id",
    key: "id",
  },
  {
    title: "Currency",
    dataIndex: "currency",
    key: "currency",
  },
  {
    title: "Code",
    dataIndex: "code",
    key: "code",
  },
  {
    title: "Konversi",
    dataIndex: "conversion",
    key: "conversion",
    render: (conversion: number) => {
      return (
        <>
          <p>{rupiahFormat(conversion)}</p>
        </>
      );
    },
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

export default function ListCurrency() {
  const [params, setParams] = useState({
    offset: 0,
    limit: 10,
    search: "",
  });
  const [openDrawer, setOpenDrawer] = useState(false);
  const [hookFormGenerator] = Form.useForm();
  const {getCurrency,loading, postCurrency, listCurrency} = useFinanceStore();

  const handleSubmit = async (val: any)=> {
    try {
     await postCurrency(val)
     notification.success({
       message: "Success",
       description: "Berhasil menyimpan data user",
     })
     getCurrency(params)
    } catch (error: any) {
     console.log(error.message)
     Modal.error({
       title: "Error",
       content: error.message || "Internal Server Error",
     })
    }
   };

  useEffect(() => {
    getCurrency(params);
  }, [params])

  const dataForm = [
    {
      name: "currency",
      label: "Currency",
      type: "text",
      placeholder: "Enter Currency",
      rules: [{ required: true, message: "This field is required!" }],
    },
    {
      name: "currency_code",
      label: "Currency Code",
      type: "text",
      placeholder: "Enter Currency Code",
      rules: [{ required: true, message: "This field is required!" }],
    },
    {
      name: "conversion_rate",
      label: "Conversion Rate",
      type: "text",
      placeholder: "Enter Conversion Rate",
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

  return (
    <main className="space-y-5">
      <div className="flex justify-between items-center">
      <InputSearch placeholder="Search" onChange={(e) => setParams({...params, search: e})} />
        <Button onClick={() => setOpenDrawer(true)} className="bg-[#F2E2A8] hover:!bg-[#F2E2A8] !border-none hover:!text-black font-semibold" icon={<PlusCircleOutlined />}>
          Mata Uang Baru
        </Button>
      </div>
      <Table
        columns={columns}
        dataSource={listCurrency?.items}
        size="small"
        loading={loading}
        pagination={{
          size: "default",
          current: Math.floor(params.offset / params.limit) + 1, // Perhitungan halaman saat ini
          pageSize: params.limit,
          // defaultPageSize: params.limit,
          showSizeChanger: true,
          total: listCurrency?.total, // Total data
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

      <Drawer title="Tambah Mata Uang Baru" onClose={() => setOpenDrawer(false)} open={openDrawer}>
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
        <div className="w-full">
          <Button loading={loading} form="dynamicForm" htmlType="submit" className="bg-[#F2E2A8] w-full hover:!bg-[#F2E2A8] !border-none hover:!text-black font-semibold">
            Simpan
          </Button>
        </div>
      </Drawer>
    </main>
  );
}
