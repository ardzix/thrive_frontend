import { Button, Drawer, Form, Modal, notification } from 'antd';
import FormGenerator from '../../../shared/components/FormGenerator';
import { useProjectStore } from '../../../../stores/project.store';
import { useEffect } from 'react';

interface IUserRole {
  openDrawer: any;
  setOpenDrawer: any;
  handleGetProject: any;
  listEntity: any;
  projectId: any;
}

export default function UpdateProject({
  openDrawer,
  setOpenDrawer,
  handleGetProject,
  listEntity,
  projectId
}: IUserRole) {
  const [hookFormGenerator] = Form.useForm();
  const {getProjectById,project, updateProject, loading } = useProjectStore();

  const handleSubmitUpdate = async (values: any) => {
    try {
      console.log(values);
      await updateProject(values, projectId), 
      notification.success({
        message: 'Success',
        description: 'Berhasil update data divisi',
      });
      setOpenDrawer((val: any) => ({ ...val, update: false }));
      handleGetProject();
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
    if(projectId !== null && openDrawer.update === true){
      getProjectById(projectId)
    }
  }, [openDrawer.update, projectId])

  console.log(listEntity)

  useEffect(()=>{
    hookFormGenerator.setFieldsValue({
      name: project?.name,
      entity_id: project?.entity_id,
      status: project?.status
    })
  },[project])

  const dataForm = [
    {
      name: "name",
      label: "Nama Project",
      type: "text",
      placeholder: "Enter Project Name",
      rules: [{ required: true, message: "This field is required!" }],
    },
    {
      name: "entity_id",
      label: "Entitas",
      type: "select",
      placeholder: "Enter Entity",
      rules: [{ required: true, message: "This field is required!" }],
      options: listEntity?.items?.map((item: any) => ({ 
        label: item.entity_name,
        value: item.id 
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
          label: "Not Active",
          value: "Not Active",
        },
      ],
    },
  ];
  
  return (
    <Drawer
      title="Update Project"
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
