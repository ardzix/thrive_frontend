import { Button, Drawer, Form, Modal, notification, Skeleton, Table } from "antd";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { FaPen } from "react-icons/fa6";
import { PlusCircleOutlined } from "@ant-design/icons";
import InputSearch from "../../../shared/components/InputSearch";
import FormGenerator from "../../../shared/components/FormGenerator";
import { useEntityStore } from "../entity.store";
import { useDivisionStore } from "../../user/division.store";
import UpdateCompanyEntitas from "./UpdateCompanyEntitas";
import { useRoleAccessStore } from "../../user/roleAccess.store";

type ListDataType = {
  id: string;
  entitas_name: string;
  city: string;
  created_by: string;
  updated_at: string;
  status: string;
};

export default function ListCompanyEntitas() {
  const [openDrawer, setOpenDrawer] = useState({
    create: false,
    update: false,
  });
  const [hookFormGenerator] = Form.useForm();
  const [idEntity, setIdEntity] = useState("");
  const {getEntity,listEntity, postEntity, loading}= useEntityStore()
  const {getDivison,listDivision, loading: loadingDivision}=useDivisionStore()
  const {getRoleAccess, listRoleAccess,}= useRoleAccessStore();
  const [params, setParams]= useState({
    offset: 0,
    limit: 10,
    search: "",
    status: "",
  })

  const dataForm = [
    {
      name: "entity_name",
      label: "Nama Entitas",
      type: "text",
      placeholder: "Enter Entitas Name",
      rules: [{ required: true, message: "This field is required!" }],
    },
    {
      name: "address",
      label: "Alamat",
      type: "text",
      placeholder: "Enter Address",
      rules: [{ required: true, message: "This field is required!" }],
    },
    {
      name: "city",
      label: "Kota",
      type: "text",
      placeholder: "Enter City",
      rules: [{ required: true, message: "This field is required!" }],
    },
    {
      name: "province",
      label: "Provinsi",
      type: "text",
      placeholder: "Enter Province",
      rules: [{ required: true, message: "This field is required!" }],
    },
    {
      name: "postal_code",
      label: "Kode Pos",
      type: "text",
      placeholder: "Enter Postcode",
      rules: [{ required: true, message: "This field is required!" }],
    },
    {
      name: "division",
      label: "Divisi",
      type: "select",
      placeholder: "Enter Divisi",
      rules: [{ required: true, message: "This field is required!" }],
      options: listDivision?.items?.map((item:any) => ({
        label: item.division_name,
        value: item.id,
      }))
    },
    {
      name: "access",
      label: "Akses",
      type: "select",
      placeholder: "Enter Akses",
      options: listRoleAccess.items?.map((item:any) => ({
        label: item.role_name,
        value: item.id
      })),
      rules: [{ required: true, message: "This field is required!" }],
    },
    {
      name: "phone",
      label: "NO. Telp",
      type: "text",
      placeholder: "Enter Phone",
      rules: [{ required: true, message: "This field is required!" }],
    },
    {
      name: "email",
      label: "Email",
      type: "text",
      placeholder: "Enter Phone",
      rules: [{ required: true, message: "This field is required!" }],
    },
    {
      name: "fax",
      label: "NO. Fax",
      type: "text",
      placeholder: "Enter Fax",
      rules: [{ required: true, message: "This field is required!" }],
    },
    {
      name: "fiscal_year",
      label: "Tahun Fiskal",
      type: "number",
      placeholder: "Enter Fiskal",
      rules: [{ required: true, message: "This field is required!" }],
    },
    {
      name: "audit_period",
      label: "Periode Audit",
      type: "text",
      placeholder: "Enter Periode Audit",
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
      title: "Entitas Id",
      dataIndex: "entity_id",
      key: "entity_id",
    },
    {
      title: "Nama entitas",
      dataIndex: "entity_name",
      key: "entity_name",
    },
    {
      title: "Kota",
      dataIndex: "city",
      key: "city",
    },
    {
      title: "Tanggal Update",
      dataIndex: "updated_at",
      key: "updated_at",
      render: ({ updated_at }: ListDataType) => <span>{dayjs(updated_at).format("DD/MM/YYYY")}</span>,
    },
    {
      title: "Dibuat Oleh",
      dataIndex: "created_by",
      key: "created_by",
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
          <Button onClick={() => {
            console.log(id);
            setOpenDrawer((val) => ({...val, update: true}))
            setIdEntity(id)
          }}>
            <FaPen />
          </Button>
        </>
      ),
    },
  ];

  const handleGetEntity = () => {
     getEntity(params)
  }
 
  const handleSubmit = async (values: any) => {
    try {
      console.log(values);
      await postEntity(values);
      setOpenDrawer((val) => ({...val, create: false}));
      hookFormGenerator.resetFields();

      notification.success({
        message: "Success",
        description: "Berhasil menyimpan data entitas",
      });
      
      handleGetEntity();
    } catch (error: any) {
      console.log(error.message);
      Modal.error({
        title: "Error",
        content: error.message || "Internal Server Error",
      });
    }
  };

  useEffect(() => {
    handleGetEntity()
  }, [params]);

  useEffect(()=>{
    getDivison({
      offset: 0,
      limit: 10000,
    })
    getRoleAccess({
      offset: 0,
      limit: 10000
    })
  },[])

  return (
    <main className="space-y-5">
      <div className="flex justify-between items-center">
        <InputSearch placeholder="Search" onChange={(search) => setParams({ ...params, search }) } />
        <Button type="primary" onClick={() => setOpenDrawer({ ...openDrawer, create: true })} className="text-black hover:!bg-[#F2E2A8] !border-none hover:!text-black font-semibold" icon={<PlusCircleOutlined />}>
          Entitas Baru
        </Button>
      </div>
      <Table
        columns={columns}
        dataSource={listEntity?.items}
        size="small"
        loading={loading}
        pagination={{
          size: "default",
          current: Math.floor(params.offset / params.limit) + 1, // Perhitungan halaman saat ini
          pageSize: params.limit,
          // defaultPageSize: params.limit,
          showSizeChanger: true,
          total: listEntity?.total, // Total data
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
      <Drawer title="Tambah Entitas Baru" onClose={() => setOpenDrawer(() => ({ ...openDrawer, create: false }))} open={openDrawer.create}>
        {
          listDivision?.items?.length > 0 && !loadingDivision ? (
              <> 
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
              </>   
          ): (
            <Skeleton avatar paragraph={{ rows: dataForm.length }} />
          )
        }
      </Drawer>
      <UpdateCompanyEntitas
        handleGetEntity={handleGetEntity}
        openDrawer={openDrawer}
        setOpenDrawer={setOpenDrawer}
        listDivision={listDivision}
        entityId={idEntity}
        listRoleAccess={listRoleAccess}
      />
    </main>
  );
}