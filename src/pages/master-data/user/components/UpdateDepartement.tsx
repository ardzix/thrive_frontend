import { Button, Drawer, Form, Modal, notification } from 'antd';
import FormGenerator from '../../../shared/components/FormGenerator';
import { useDivisionStore } from '../division.store';

interface IUserRole {
  openDrawer: any;
  setOpenDrawer: any;
  handleGetDivision: any;
  division: any
}

export default function UpdateDepartement({
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

  // useEffect(()=>{
  //   hookFormGenerator.setFieldsValue({
  //     division_name: division?.division_name,
  //     description: division?.description,
  //     status: division?.status
  //   })
  // },[division])

  const dataForm = [
    {
      name: "departement_name",
      label: "Departemen",
      type: "text",
      placeholder: "Enter Departemen Name",
     rules: [
        { required: true, message: "This field is required!" },
      ],
    },
    {
      name: "divisi_id",
      label: "Divisi",
      type: "select",
      placeholder: "Enter Divisi",
      options: [{
        label: division?.division_name,
        value: division?.id
      }],
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
      title="Update Departement"
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
