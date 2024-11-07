import { Button, Drawer, Form, Modal, notification } from 'antd';
import FormGenerator from '../../../shared/components/FormGenerator';
import { useEffect } from 'react';
import { useChartOfAccountStore } from '../../../../stores/chartOfAccount.store';

interface IchartOfAccount {
  openDrawer: any;
  setOpenDrawer: any;
  handleGetchartOfAccount: any;
  chartOfAccountId: any;
  listClassMaster: any;
}

export default function UpdateChartOfAccount({
  openDrawer,
  setOpenDrawer,
  handleGetchartOfAccount,
  chartOfAccountId,
  listClassMaster
}: IchartOfAccount) {
  const [hookFormGenerator] = Form.useForm();
  const { updateChartOfAccount, getChartOfAccountById, chartOfAccount, loading } = useChartOfAccountStore();

  const handleSubmitUpdate = async (values: any) => {
    try {
      await updateChartOfAccount(values, chartOfAccountId), 
      notification.success({
        message: 'Success',
        description: 'Berhasil update data user role',
      });
      setOpenDrawer((val: any) => ({ ...val, update: false }));
      handleGetchartOfAccount();
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
    if(chartOfAccountId !== null && openDrawer.update === true){
      getChartOfAccountById(chartOfAccountId);
    }
  }, [openDrawer.update]);

  useEffect(() => {
      hookFormGenerator.setFieldsValue({ 
        name: chartOfAccount?.name,
        class_id: chartOfAccount?.class_id,
        status: chartOfAccount?.status,
       });
  }, [chartOfAccount]);

  const dataForm = [
    {
      name: "name",
      label: "Nama Acc.",
      type: "text",
      placeholder: "Enter Acc. Name",
      rules: [{ required: true, message: "This field is required!" }],
    },
    {
      name: "class_id",
      label: "Kelass",
      type: "select",
      placeholder: "Enter Kelas",
      rules: [{ required: true, message: "This field is required!" }],
      options: listClassMaster?.items?.map((item:any) => ({
        label: item.name,
        value: item.id,
      }))
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
       title="Update Acc. "
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
