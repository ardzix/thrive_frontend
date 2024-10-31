import { Button, Form, Modal, notification, Table } from "antd";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { FaPen } from "react-icons/fa6";
import { PlusCircleOutlined } from "@ant-design/icons";
import InputSearch from "../../../shared/components/InputSearch";
import { useEntityStore } from "../entity.store";
import { useDivisionStore } from "../../user/division.store";
import UpdateCompanyEntitas from "./UpdateCompanyEntitas";
import { useRoleAccessStore } from "../../user/roleAccess.store";
import UpdateCompanyModule from "./UpdateModule";

type ListDataType = {
  id: string;
  entitas_name: string;
  city: string;
  created_by: string;
  updated_at: string;
  status: string;
};

export default function ListCompanyModules() {
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

  const handleGetEntity = () => {
     getEntity(params)
  }
 
  const handleSubmit = async (values: any) => {
    try {
      console.log(values);
      const finalyPayload = {
        ...values,
        fiscal_year: Number(values.fiscal_year),
      }
      await postEntity(finalyPayload);
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
      title: "Modules",
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

  return (
    <main className="space-y-5">
      <div className="flex justify-between items-center">
        <InputSearch placeholder="Search" onChange={(search) => setParams({ ...params, search }) } />
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
      <UpdateCompanyModule
        handleGetEntity={handleGetEntity}
        openDrawer={openDrawer}
        setOpenDrawer={setOpenDrawer}
        entityId={idEntity}
      />
    </main>
  );
}