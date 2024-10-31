import { Button, Drawer, Form, Modal, notification } from 'antd';
import FormGenerator from '../../../shared/components/FormGenerator';
import { useRoleAccessStore } from '../roleAccess.store';

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
          role_id: values.role_id.value || values.role_id,
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

  console.log(roleAccess)

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
          id="updateroleAccess"
          size="default"
          layout="vertical"
          disabled={loading}
          initialValues={{ 
            role_id: {
              label: roleAccess?.role_name,
              value: roleAccess?.role_id
            },
            modules: roleAccess?.modules?.map((module: any) => module.id),
            status: roleAccess?.status,
           }}
        />
        <div className="w-full">
          <Button
            loading={loading}
            form="updateroleAccess"
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
