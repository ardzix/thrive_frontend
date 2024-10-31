import { Button, Drawer, Form, Modal, notification } from 'antd';
import FormGenerator from '../../../shared/components/FormGenerator';

interface IUserRole {
  openDrawer: any;
  setOpenDrawer: any;
  handleGetBank: any;
}

export default function UpdateBank({
  openDrawer,
  setOpenDrawer,
  handleGetBank,
}: IUserRole) {
  const [hookFormGenerator] = Form.useForm();
  // const {updateDivision, loading } = useDivisionStore();

  const handleSubmitUpdate = async (values: any) => {
    try {
      // await updateDivision(values, division?.id), 
      notification.success({
        message: 'Success',
        description: 'Berhasil update data divisi',
      });
      setOpenDrawer((val: any) => ({ ...val, update: false }));
      handleGetBank();
      hookFormGenerator.resetFields();
    } catch (error: any) {
      console.log(error.message);
      Modal.error({
        title: 'Error',
        content: error.message || 'Internal Server Error',
      });
    }
  };

  // useEffect(()=>{
  //   hookFormGenerator.setFieldsValue({
  //     division_name: division?.division_name,
  //     description: division?.description,
  //     status: division?.status
  //   })
  // },[division])

  const dataForm = [
    {
      name: "bank",
      label: "Bank",
      type: "text",
      placeholder: "Enter Bank",
      rules: [{ required: true, message: "This field is required!" }],
    },
    {
      name: "acc_number",
      label: "No. Rekening",
      type: "text",
      placeholder: "Enter No. Rekening",
      rules: [{ required: true, message: "This field is required!" }],
    },
    {
      name: "acc_code",
      label: "Account Code",
      type: "text",
      placeholder: "Enter Account Code",
      rules: [{ required: true, message: "This field is required!" }],
    },
    {
      name: "currency",
      label: "Currency",
      type: "select",
      placeholder: "Enter Currency",
      options: [
       {
        label: "IDR",
        value: "IDR",
       }
      ],
      rules: [{ required: true, message: "This field is required!" }],
    },
    {
      name: "division_id",
      label: "Managing Division",
      type: "select",
      placeholder: "Enter Currency",
      options: [
       {
        label: "Division 1",
        value: "323ejsdyf32dddd",
       }
      ],
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
