import { Button, Drawer, Form, Modal, notification } from 'antd';
import FormGenerator from '../../../shared/components/FormGenerator';
import { useTaxStore } from '../../../../stores/tax.store';
import { useEffect } from 'react';

interface IUserRole {
  openDrawer: any;
  setOpenDrawer: any;
  handleGetTax: any;
  taxId: any;
}

export default function UpdateTax({
  openDrawer,
  setOpenDrawer,
  handleGetTax,
  taxId,
}: IUserRole) {
  const [hookFormGenerator] = Form.useForm();
  const {getTaxById, tax, updateTax } = useTaxStore();

  const handleSubmitUpdate = async (values: any) => {
    try {
      console.log(values);
      await updateTax(values, taxId), 
      notification.success({
        message: 'Success',
        description: 'Berhasil update data tax',
      });
      setOpenDrawer((val: any) => ({ ...val, update: false }));
      handleGetTax();
      hookFormGenerator.resetFields();
    } catch (error: any) {
      console.log(error.message);
      Modal.error({
        title: 'Error',
        content: error.message || 'Internal Server Error',
      });
    }
  };

  console.log(taxId, tax)

  useEffect(() => {
    if(taxId !== null && openDrawer.update === true){
      getTaxById(taxId);
    }
  }, [openDrawer.update]);

  useEffect(()=>{
    hookFormGenerator.setFieldsValue({
      name: tax?.name,
      amount: tax?.amount,
      status: tax?.status
    })
  },[tax])

  const dataForm = [
    {
      name: "name",
      label: "Tax Name",
      type: "text",
      placeholder: "Enter Tax Name",
      rules: [{ required: true, message: "This field is required!" }],
    },
    {
      name: "amount",
      label: "Amount",
      type: "number",
      className: "w-full",
      placeholder: "Enter Amount",
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
      title="Update Tax"
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
          // disabled={loading}
        />
        <div className="w-full absolute bottom-0 left-0 right-0 px-5 pb-5">
          <Button
            // loading={loading}
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
