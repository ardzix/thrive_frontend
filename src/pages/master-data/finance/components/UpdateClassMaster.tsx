import { Button, Drawer, Form, Modal, notification } from 'antd';
import FormGenerator from '../../../shared/components/FormGenerator';
import { useEffect } from 'react';
import { useFinanceStore } from '../finance.store';

interface IclassMaster {
  openDrawer: any;
  setOpenDrawer: any;
  handleGetClassMaster: any;
  classMaster: any;
}

export default function UpdateClassMaster({
  openDrawer,
  setOpenDrawer,
  handleGetClassMaster,
  classMaster,
}: IclassMaster) {
  const [hookFormGenerator] = Form.useForm();
  const { updateClassMaster, loading } = useFinanceStore();

  const handleSubmitUpdate = async (values: any) => {
    console.log(values.division_id);
    try {
      await updateClassMaster(values, classMaster.id), 
      notification.success({
        message: 'Success',
        description: 'Berhasil update data user role',
      });
      setOpenDrawer((val: any) => ({ ...val, update: false }));
      handleGetClassMaster();
      hookFormGenerator.resetFields();
    } catch (error: any) {
      console.log(error.message);
      Modal.error({
        title: 'Error',
        content: error.message || 'Internal Server Error',
      });
    }
  };

  console.log(classMaster)

  useEffect(() => {
      hookFormGenerator.setFieldsValue({ 
        name: classMaster?.name,
        code: classMaster?.code,
        status: classMaster?.status,
       });
  }, [classMaster]);

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

  return (
    <Drawer
        footer={
          <div className="w-full my-8">
          <Button
            loading={loading}
            form="dynamicForm"
            htmlType="submit"
            className="bg-[#F2E2A8] w-full hover:!bg-[#F2E2A8] !border-none hover:!text-black font-semibold"
          >
            Simpan
          </Button>
        </div>
        }
       title="Tambah Role Baru"
       onClose={() => setOpenDrawer((val:any)=> ({...val, update: false}))}
       open={openDrawer.update}
      >
      <>
        <FormGenerator
          hookForm={hookFormGenerator}
          onFinish={handleSubmitUpdate}
          data={dataForm}
          id="dynamicForm"
          size="default"
          layout="vertical"
          disabled={loading}
        />
      </>
    </Drawer>
  );
}
