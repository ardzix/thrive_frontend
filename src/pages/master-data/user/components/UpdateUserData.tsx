import { Button, Drawer, Form, Modal, notification } from 'antd';
import FormGenerator from '../../../shared/components/FormGenerator';
import { useEffect } from 'react';
import { useUserStore } from '../user.store';

interface I {
  openDrawer: any;
  setOpenDrawer: any;
  userId: any;
  handleGetListUsers: any;
  listUserRoles: any;
  // listEntity: any;
}

export default function UpdateUserData({
  openDrawer,
  setOpenDrawer,
  listUserRoles,
  userId,
  handleGetListUsers,
  // listEntity
}: I) {
  const [hookFormGenerator] = Form.useForm();
  const { updateUser, user, getUserById, loading } = useUserStore();

  const handleSubmitUpdate = async (values: any) => {
    try {
      await updateUser(values, userId);
      notification.success({
        message: 'Success',
        description: 'Berhasil update data entitas',
      });
      setOpenDrawer((val: any) => ({ ...val, update: false }));
      handleGetListUsers();
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
    if (userId) {
        getUserById(userId);
    }
  }, [userId, getUserById]);

  useEffect(() => {
    if (user) {
      hookFormGenerator.setFieldsValue({
        full_name: user?.full_name,
        position: user?.position,
        // role_id: user?.role_id,
        // entity_id: user?.entity_id,
        email: user?.email,
        phone: user?.phone,
        address: user?.address,
        status: user?.status,
      });
    }
  }, [user, hookFormGenerator]);

  const dataForm = [
    {
      name: "full_name",
      label: "Full Name",
      type: "text",
      placeholder: "Enter User Name",
      rules: [{ required: true, message: "This field is required!" }],
    },
    {
      name: "position",
      label: "Posisi",
      type: "select",
      placeholder: "Enter Position",
      defaultValue: user?.position,
      rules: [{ required: true, message: "This field is required!" }],
      options: [
        {
          label: "test",
          value: "test"
        }
      ],
    },
    {
      name: "role_id",
      label: "Access",
      type: "select",
      placeholder: "Enter Access",
      rules: [{ required: true, message: "This field is required!" }],
      options: listUserRoles?.items?.map((item: any) => ({
        label: item.role_name,
        value: item.id,
      })),
    },
    {
      name: "entity_id",
      label: "Entitas",
      type: "select",
      placeholder: "Enter Entity",
      rules: [{ required: true, message: "This field is required!" }],
      // options: listEntity?.items?.map((item :any) => ({
      //   label: item.entity_name,
      //   value: item.id,
      // })),
    },
    {
      name: "email",
      label: "Email",
      type: "text",
      placeholder: "Enter Email",
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
      name: "address",
      label: "Alamat",
      type: "text",
      placeholder: "Enter Address",
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
          value: "inactive",
        },
      ],
    },
  ];

  return (
    <Drawer
      title="Update user"
      onClose={() => {
        setOpenDrawer((val: any) => ({ ...val, update: false }));
        hookFormGenerator.resetFields();
      }}
      open={openDrawer.update}
    >
      <>
        <FormGenerator
          hookForm={hookFormGenerator}
          onFinish={handleSubmitUpdate}
          data={dataForm}
          id="updateUserData"
          size="default"
          layout="vertical"
          disabled={loading}
          initialValues={{
            entity_id:{
                value: user?.entity_id,
                label: user?.entity_name
            },
            role_id: {
              value: user?.role_id,
              label: user?.role_name
            }
          }}
        />
        <div className="w-full">
          <Button
            loading={loading}
            form="updateUserData"
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
