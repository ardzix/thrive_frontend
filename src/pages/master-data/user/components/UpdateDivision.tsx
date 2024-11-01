import { Button, Drawer, Form, Modal, notification } from 'antd';
import FormGenerator from '../../../shared/components/FormGenerator';
import { useDivisionStore } from '../../division/division.store';
import { useEffect } from 'react';

interface IUserRole {
  openDrawer: any;
  setOpenDrawer: any;
  handleGetDivision: any;
  division: any
}

export default function UpdateDivision({
  openDrawer,
  setOpenDrawer,
  handleGetDivision,
  division
}: IUserRole) {
  const [hookFormGenerator] = Form.useForm();
  const {updateDivision, loading } = useDivisionStore();

  const handleSubmitUpdate = async (values: any) => {
    try {
      console.log(division)
      await updateDivision(values, division?.id), 
      notification.success({
        message: 'Success',
        description: 'Berhasil update data divisi',
      });
      setOpenDrawer((val: any) => ({ ...val, update: false }));
      handleGetDivision();
      hookFormGenerator.resetFields();
    } catch (error: any) {
      console.log(error.message);
      Modal.error({
        title: 'Error',
        content: error.message || 'Internal Server Error',
      });
    }
  };

  useEffect(()=>{
    hookFormGenerator.setFieldsValue({
      division_name: division?.division_name,
      description: division?.description,
      status: division?.status
    })
  },[division])

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
  
  return (
    <Drawer
      title="Update Divisi"
      onClose={() => {
        setOpenDrawer((val: any) => ({ ...val, update: false }))
        hookFormGenerator.resetFields();
      }}
      open={openDrawer.update}
    >
      <>
        <FormGenerator
          hookForm={hookFormGenerator}
          onFinish={handleSubmitUpdate}
          data={dataForm}
          id="updateDivision"
          size="default"
          layout="vertical"
          disabled={loading}
        />
        <div className="w-full">
          <Button
            loading={loading}
            form="updateDivision"
            htmlType="submit"
            className="bg-[#F2E2A8] w-full hover:!bg-[#F2E2A8] !border-none hover:!text-black font-semibold"
          >
            Simpan
          </Button>
        </div>
      </>
    </Drawer>
  );
}
