import { Button, Drawer, Form, Modal, notification } from 'antd';
import FormGenerator from '../../../shared/components/FormGenerator';
import { useEntityStore } from '../entity.store';
import { useEffect } from 'react';
import { useRoleAccessStore } from '../../user/roleAccess.store';

interface IUpdateCompanyEntitas {
  openDrawer: any;
  setOpenDrawer: any;
  entityId: any;
  handleGetEntity: any;
}

export default function UpdateCompanyModule({
  openDrawer,
  setOpenDrawer,
  entityId,
  handleGetEntity,
}: IUpdateCompanyEntitas) {
  const [hookFormGenerator] = Form.useForm();
  const {  entity, getEntityById, loading } = useEntityStore();
  const {getModules, listModules}=useRoleAccessStore();


  const handleSubmitUpdate = async (values: any) => {
    try {
      console.log(values);
      // const finalyPayload = {
      //   ...values,
      //   division: values.division.value || values.division,
      //   access: values.access.value || values.access,
      //   fiscal_year: Number(values.fiscal_year),
      // }
      // await updateEntity(finalyPayload, entityId);
      notification.success({
        message: 'Success',
        description: 'Berhasil update module entitas',
      });
      setOpenDrawer((val: any) => ({ ...val, update: false }));
      handleGetEntity();
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
    if (entityId) {
      getEntityById(entityId);
    }
  }, [entityId, getEntityById]);

  useEffect(() => {
      hookFormGenerator.setFieldsValue({
        module_1: "",
        module_2: "",
        status: entity?.status,
      });
  }, [entity, hookFormGenerator]);

  useEffect(()=>{
    getModules({
      offset: 0,
      limit: 10000,
    })
  },[])

  const dataForm = [
    {
      name: 'module_1',
      label: 'Module 1',
      type: 'text',
      placeholder: 'Module 1',
      rules: [{ required: true, message: 'This field is required!' }],
    },
    {
      name: 'Module_2',
      label: 'Module 2',
      type: 'text',
      placeholder: 'Module 2',
      rules: [{ required: true, message: 'This field is required!' }],
    },
    {
      name: "modules",
      label: "Sub-Module",
      type: "checkbox",
      //   placeholder: "Enter Module",
      rules: [{ required: true, message: "This field is required!" }],
      className: "!flex !flex-col !gap-2",
      options:listModules?.items?.map((module: any) => ({
        label: module.name,
        value: module.id,
      })),
    },
    // {
    //   name: 'status',
    //   label: 'Status',
    //   type: 'select',
    //   placeholder: 'Enter Status',
    //   rules: [{ required: true, message: 'This field is required!' }],
    //   options: [
    //     {
    //       label: 'Active',
    //       value: 'Active',
    //     },
    //     {
    //       label: 'Set',
    //       value: 'Set',
    //     },
    //     {
    //       label: 'Not Set',
    //       value: 'Not Set',
    //     },
    //   ],
    // },
  ];

  return (
    <Drawer
      title="Edit Module Entitas"
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
          id="dynamicForm"
          size="default"
          layout="vertical"
          disabled={loading}
        />
        <div className="w-full">
          <Button
            loading={loading}
            form="dynamicForm"
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
