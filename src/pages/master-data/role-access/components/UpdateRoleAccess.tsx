import { Button, Drawer, Form, Modal, notification } from 'antd';
import FormGenerator from '../../../shared/components/FormGenerator';
import { useRoleAccessStore } from '../../../../stores/roleAccess.store';
import { useEffect } from 'react';

interface IUserRole {
  openDrawer: any;
  setOpenDrawer: any;
  handleGetRoleAccess: any;
  roleAccess: any
  listUserRoles: any;
  listModules: any
}

export default function UpdateRoleAccess({
  openDrawer,
  setOpenDrawer,
  handleGetRoleAccess,
  listUserRoles,
  roleAccess,
  listModules
}: IUserRole) {
  const [hookFormGenerator] = Form.useForm();
  const {updateRoleAccess, loading } = useRoleAccessStore();

  const handleSubmitUpdate = async (values: any) => {
    try {
        const finalyPayload = {
          role_id: values.role_id,
          modules: values.modules,
          status: values.status
        }
      await updateRoleAccess(finalyPayload, roleAccess?.id), 
      notification.success({
        message: 'Success',
        description: 'Berhasil update data divisi',
      });
      setOpenDrawer((val: any) => ({ ...val, update: false }));
      handleGetRoleAccess();
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
    if (roleAccess) {
      hookFormGenerator.setFieldsValue({ 
            role_id: roleAccess?.role_id,
            modules: roleAccess?.modules?.map((module: any) => module.id),
            status: roleAccess?.status,
       });
    }
  }, [roleAccess]);

  const dataForm = [
    {
      name: "role_id",
      label: "Role Access",
      type: "select",
      placeholder: "Enter Role Access",
      rules: [{ required: true, message: "This field is required!" }],
      options: listUserRoles?.items?.map((role: any) => ({
        label: role.role_name,
        value: role.id,
      })),
    },
    {
      name: "modules",
      label: "Module",
      type: "checkbox",
      //   placeholder: "Enter Module",
      rules: [{ required: true, message: "This field is required!" }],
      className: "!flex !flex-col !gap-2",
      options: listModules?.items?.map((module: any) => ({
        label: module.name,
        value: module.id,
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
          value: "inactive",
        },
      ],
    },
  ];

  
  return (
    <Drawer
       title="Update Role Access"
       onClose={() => setOpenDrawer((val:any)=> ({...val, update: false}))}
       open={openDrawer.update}
      >
        <FormGenerator
          hookForm={hookFormGenerator}
          onFinish={handleSubmitUpdate}
          data={dataForm}
          id="dynamicForm"
          size="default"
          layout="vertical"
          disabled={loading}
        />
      <div className="w-full my-8 absolute bottom-0 left-0 right-0 px-6">
          <Button
            loading={loading}
            form="dynamicForm"
            htmlType="submit"
            className="bg-[#F2E2A8] w-full hover:!bg-[#F2E2A8] !border-none hover:!text-black font-semibold"
          >
            Simpan
          </Button>
       </div>
    </Drawer>
  );
}
