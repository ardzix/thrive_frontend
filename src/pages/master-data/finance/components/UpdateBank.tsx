import { Button, Drawer, Form, Modal, notification } from 'antd';
import FormGenerator from '../../../shared/components/FormGenerator';
import { useBankStore } from '../../../../stores/bank.store';
import { useEffect } from 'react';

interface IUserRole {
  openDrawer: any;
  setOpenDrawer: any;
  handleGetBanks: any;
  listDivision:any;
  listCurrency:any;
  bankId:any;
}

export default function UpdateBank({
  openDrawer,
  setOpenDrawer,
  handleGetBanks,
  bankId,
  listDivision,
  listCurrency,
}: IUserRole) {
  const [hookFormGenerator] = Form.useForm();
  const {updateBank, getBankById, bank, loading } = useBankStore();

  const handleSubmitUpdate = async (values: any) => {
    try {
      console.log(values);
      const finalyPayload ={
        ...values,
        currency_id: values.currency_id.value || values.currency_id,
        division_id: values.division_id.value || values.division_id
      }
      await updateBank(finalyPayload, bankId), 
      notification.success({
        message: 'Success',
        description: 'Berhasil update data divisi',
      });
      setOpenDrawer((val: any) => ({ ...val, update: false }));
      handleGetBanks();
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
    if(bankId !== null && openDrawer.update === true){
      getBankById(bankId)
    }
  },[openDrawer.update])

  useEffect(()=>{
      hookFormGenerator.setFieldsValue({
        bank: bank?.bank,
        account_number: bank?.account_number, 
        account_code: bank?.account_code,
        currency_id: bank?.currency_id,
        division_id: bank?.division_id,
        status: bank?.status
      })
  },[bank])

  const dataForm = [
    {
      name: "bank",
      label: "Bank",
      type: "text",
      placeholder: "Enter Bank",
      rules: [{ required: true, message: "This field is required!" }],
    },
    {
      name: "account_number",
      label: "No. Rekening",
      type: "text",
      placeholder: "Enter No. Rekening",
      rules: [
        { 
          required: true,
          message: "This field is required!"
        },
        {
          min: 10,
          message: "Account Code must be at least 10 characters",
        },
      ],
    },
    {
      name: "account_code",
      label: "Account Code",
      type: "text",
      placeholder: "Enter Account Code",
      rules: [
        { 
          required: true,
          message: "This field is required!"
        },
      ],
    },
    {
      name: "currency_id",
      label: "Currency",
      type: "select",
      placeholder: "Enter Currency",
      options: listCurrency?.items?.map((item: any) => ({
        label: item.currency,
        value: item.id,
      })),
      rules: [{ required: true, message: "This field is required!" }],
    },
    {
      name: "division_id",
      label: "Managing Division",
      type: "select",
      placeholder: "Enter Currency",
      options: listDivision?.items?.map((item: any) => ({
        label: item.division_name,
        value: item.id,
      })),
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
      title="Update Bank"
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
