import { Button, Drawer, Form, Modal, notification } from 'antd';
import FormGenerator from '../../../shared/components/FormGenerator';
import { useEffect } from 'react';
import { useUserRoleStore } from '../userRole.store';

interface IUserRole {
  openDrawer: any;
  setOpenDrawer: any;
  userRole: any;
  handleGetUserRole: any;
  listDivision: any;
}

export default function UpdateUserRole({
  openDrawer,
  setOpenDrawer,
  userRole,
  listDivision,
  handleGetUserRole,
}: IUserRole) {
  const [hookFormGenerator] = Form.useForm();
  const {updateUserRole, loading } = useUserRoleStore();

  console.log(userRole.division_id);

  const handleSubmitUpdate = async (values: any) => {
    try {
        const finalyPayload = {
          role_name: values.role_name,
          division_id: values.division_id?.value,
          status: values.status
        }
      await updateUserRole(finalyPayload,userRole.id), 
      notification.success({
        message: 'Success',
        description: 'Berhasil update data user role',
      });
      setOpenDrawer((val: any) => ({ ...val, update: false }));
      handleGetUserRole();
      hookFormGenerator.resetFields();
    } catch (error: any) {
      console.log(error.message);
      Modal.error({
        title: 'Error',
        content: error.message || 'Internal Server Error',
      });
    }
  };


  useEffect(() => {
      hookFormGenerator.setFieldsValue({ 
        role_name: userRole?.role_name,
        division_id:{
          label: userRole?.division_name,
          value: userRole?.division_id
        },
        status: userRole?.status,
       });
  }, [userRole]);

  const dataForm = [
    {
      name: "role_name",
      label: "Role",
      type: "text",
      placeholder: "Enter Role",
      rules: [{ required: true, message: "This field is required!" }],
    },
    {
      name: "division_id",
      label: "Divisi",
      type: "select",
      placeholder: "Enter Divisi",
      rules: [{ required: true, message: "This field is required!" }],
      options: listDivision?.items?.map((item:any) => ({
        label: item.division_name,
        value: item.id,
      })),
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
      title="Update Role"
      onClose={() => {
        setOpenDrawer((val: any) => ({ ...val, update: false }))
        hookFormGenerator.resetFields()
      }}
      open={openDrawer.update}
    >
      <>
        <FormGenerator
          hookForm={hookFormGenerator}
          onFinish={handleSubmitUpdate}
          data={dataForm}
          id="updateRole"
          size="default"
          layout="vertical"
          disabled={loading}
        />
        <div className="w-full">
          <Button
            loading={loading}
            form="updateRole"
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
