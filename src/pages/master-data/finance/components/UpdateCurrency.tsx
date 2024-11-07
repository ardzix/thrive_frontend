import { Button, Drawer, Form, Modal, notification } from 'antd';
import FormGenerator from '../../../shared/components/FormGenerator';
import { useCurrencyStore } from '../../../../stores/currency.store';
import { useEffect } from 'react';

interface IUpdateCurrency {
  openDrawer: any;
  setOpenDrawer: any;
  handleGetCurrency: any;
  currancy: any;
}

export default function UpdateCurrency({
  openDrawer,
  setOpenDrawer,
  handleGetCurrency,
  currancy,
}: IUpdateCurrency) {
  const [hookFormGenerator] = Form.useForm();
  const { updateCurrency, loading } = useCurrencyStore();
  
  const handleSubmitUpdate = async (values: any) => {
    try {
      console.log(values);
      await updateCurrency(values, currancy?.id), 
      notification.success({
        message: 'Success',
        description: 'Berhasil update data divisi',
      });
      setOpenDrawer((val: any) => ({ ...val, update: false }));
      handleGetCurrency();
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
      currency: currancy?.currency,
      code: currancy?.code,
      conv_rate: currancy?.conv_rate,
      status: currancy?.status
    })
  },[currancy])

  const dataForm = [
    {
      name: "currency",
      label: "Currency",
      type: "text",
      placeholder: "Enter Currency",
      rules: [{ required: true, message: "This field is required!" }],
    },
    {
      name: "code",
      label: "Currency Code",
      type: "text",
      placeholder: "Enter Currency Code",
      rules: [{ required: true, message: "This field is required!" }],
    },
    {
      name: "conv_rate",
      label: "Conversion Rate",
      type: "number",
      className: "w-full",
      placeholder: "Enter Conversion Rate",
      formatter: (value: any) =>
        `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ","),
      parser: (value: any) => value?.replace(/\$\s?|(,*)/g, ""),
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
      title="Update Mata Uang"
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
        <div className="w-full absolute bottom-0 left-0 right-0 px-5 pb-5">
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
