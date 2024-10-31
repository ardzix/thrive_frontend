import { Button, Drawer, Form, Modal, notification, Table } from "antd";
import { useEffect, useState } from "react";
import { FaPen } from "react-icons/fa6";
import { PlusCircleOutlined } from "@ant-design/icons";
import InputSearch from "../../../shared/components/InputSearch";
import FormGenerator from "../../../shared/components/FormGenerator";
import { useDivisionStore } from "../division.store";
import UpdateDivision from "./UpdateDivision";

export default function ListUserDivison() {
  const [openDrawer, setOpenDrawer] = useState({
    create: false,
    update: false,
  });
  const [hookFormGenerator] = Form.useForm();
  const {postDivision,getDivison,listDivision, loading} = useDivisionStore((state) => state);
  const [params, setParams]= useState({
    offset: 0,
    limit: 10,
    search: "",
    status: "",
  })
  const [division, setDivision] = useState({});

  const dataForm = [
    {
      name: "division_name",
      label: "Divisi",
      type: "text",
      placeholder: "Enter Divisi",
     rules: [
        { required: true, message: "This field is required!" },
      ],
    },
    {
      name: "description",
      label: "Deskripsi",
      type: "textarea",
      className: "w-full !min-h-[150px]",
      placeholder: "Enter Deskripsi",
      rules: [
        { required: true, message: "This field is required!" },
      ],
    },
    {
      name: "status",
      label: "Status",
      type: "select",
      placeholder: "Enter Status",
      rules: [
        { required: true, message: "This field is required!" },
      ],
      options: [
        {
          label: "Active",
          value: "Active",
        },
        {
          label: "Inactive",
          value: "inactive",
        },
      ],
    },
  ];

  const handleGetDivision = () => {
    getDivison(params)
  }

  const handleSubmit= async (val: any)=>{
    console.log(val);
    try {
        await postDivision(val);
        notification.success({
          message: "Success",
          description: "Divisi Berhasil",
        })
        setOpenDrawer((prev)=> ({...prev, create: false}));
        hookFormGenerator.resetFields();

        handleGetDivision();
    } catch (error: any) {
      console.log(error.message);
      Modal.error({
        title: "Error",
        content: Object.values(error.response.data) || "Internal Server Error",
      })
    }
  }

  useEffect(()=> {
    handleGetDivision();
  },[params])

  const columns = [
    {
      title: "Divisi Id",
      dataIndex: "division_id",
      key: "division_id",
    },
    {
      title: "Nama",
      dataIndex: "division_name",
      key: "division_name",
    },
    {
      title: "Deskripsi",
      dataIndex: "description",
      key: "description",
    },
    // {
    //   title: "Tanggal Update",
    //   dataIndex: "updated_at",
    //   key: "updated_at",
    //   render: ({ updated_at }: ListDataType) => <span>{updated_at ? dayjs(updated_at).format("DD/MM/YYYY") : "-"}</span>,
    // },
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
      render: (_, prev: any) => {
        return (
          <>
            <Button onClick={()=>{
              setOpenDrawer((prev)=> ({...prev, update: true}))
              setDivision(prev)
            }}>
              <FaPen />
            </Button>
          </>
        )
      }
    },
  ];

  return (
    <main className="space-y-5">
      <div className="flex justify-between items-center">
        <InputSearch placeholder="Search" onChange={(val) => setParams({ ...params, search: val })} />
        <Button onClick={() => setOpenDrawer((prev)=> ({...prev, create: true}))} className="bg-[#F2E2A8] hover:!bg-[#F2E2A8] !border-none hover:!text-black font-semibold" icon={<PlusCircleOutlined />}>
          Divisi Baru
        </Button>
      </div>
      <Table
        columns={columns}
        dataSource={listDivision?.items}
        size="small"
        loading={loading}
        pagination={{
          size: "default",
          current: Math.floor(params.offset / params.limit) + 1, // Perhitungan halaman saat ini
          pageSize: params.limit,
          // defaultPageSize: params.limit,
          showSizeChanger: true,
          total: listDivision?.total, // Total data
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

      <Drawer title="Tambah Divisi Baru" onClose={() => setOpenDrawer((prev)=> ({...prev, create: false}))} open={openDrawer.create}>
        <FormGenerator
          hookForm={hookFormGenerator}
          onFinish={handleSubmit}
          data={dataForm}
          id="createDivision"
          size="default" //small , default , large
          layout="vertical" //vertical, horizontal
          disabled={loading}
          // formStyle={{ maxWidth: "100%" }}
        />
        <div className="w-full">
          <Button loading={loading} form="createDivision" htmlType="submit" className="bg-[#F2E2A8] w-full hover:!bg-[#F2E2A8] !border-none hover:!text-black font-semibold">
            Simpan
          </Button>
        </div>
      </Drawer>
      <UpdateDivision
        openDrawer={openDrawer}
        setOpenDrawer={setOpenDrawer}
        handleGetDivision={handleGetDivision}
        division={division}
      />
    </main>
  );
}
