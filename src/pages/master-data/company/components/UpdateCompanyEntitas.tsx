import { Button, Drawer, Form, Modal, notification } from 'antd';
import FormGenerator from '../../../shared/components/FormGenerator';
import { useEntityStore } from '../entity.store';
import { useEffect } from 'react';

interface IUpdateCompanyEntitas {
  openDrawer: any;
  setOpenDrawer: any;
  listDivision: any;
  entityId: any;
  handleGetEntity: any;
  listRoleAccess: any;
}

export default function UpdateCompanyEntitas({
  openDrawer,
  setOpenDrawer,
  listDivision,
  entityId,
  handleGetEntity,
  listRoleAccess
}: IUpdateCompanyEntitas) {
  const [hookFormGenerator] = Form.useForm();
  const { updateEntity, entity, getEntityById, loading } = useEntityStore();

  const handleSubmitUpdate = async (values: any) => {
    try {
      const finalyPayload = {
        ...values,
        division: values.division.value || values.division,
        access: values.access.value || values.access,
        fiscal_year: Number(values.fiscal_year),
      }
      await updateEntity(finalyPayload, entityId);
      notification.success({
        message: 'Success',
        description: 'Berhasil update data entitas',
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

  const divisionName = listDivision?.items?.find(
    (division: any) => division?.id === entity?.division
  )?.division_name;

  const accessName = listRoleAccess?.items?.find(
    (access: any) => access?.id === entity?.access
  )?.role_name;
  
  useEffect(() => {
      hookFormGenerator.setFieldsValue({
        entity_name: entity?.entity_name,
        address: entity?.address,
        city: entity?.city,
        province: entity?.province,
        postal_code: entity?.postal_code,
        division_id: entity?.division_id,
        description: entity?.description,
        division: {
          label: divisionName,
          value: entity?.division,
        },
        access: {
          label: accessName,
          value: entity?.access,
        },
        updated_at: entity?.updated_at,
        created_at: entity?.created_at,
        entity_id: entity?.entity_id,
        phone: entity?.phone,
        email: entity?.email,
        fax: entity?.fax,
        fiscal_year: entity?.fiscal_year,
        audit_period: entity?.audit_period,
        status: entity?.status,
      });
  }, [entity, hookFormGenerator]);

  const dataForm = [
    {
      name: 'entity_name',
      label: 'Nama Entitas',
      type: 'text',
      placeholder: 'Enter Entitas Name',
      rules: [{ required: true, message: 'This field is required!' }],
    },
    {
      name: 'address',
      label: 'Alamat',
      type: 'text',
      placeholder: 'Enter Address',
      rules: [{ required: true, message: 'This field is required!' }],
    },
    {
      name: 'city',
      label: 'Kota',
      type: 'text',
      placeholder: 'Enter City',
      rules: [{ required: true, message: 'This field is required!' }],
    },
    {
      name: 'province',
      label: 'Provinsi',
      type: 'text',
      placeholder: 'Enter Province',
      rules: [{ required: true, message: 'This field is required!' }],
    },
    {
      name: 'postal_code',
      label: 'Kode Pos',
      type: 'text',
      placeholder: 'Enter Postcode',
      rules: [{ required: true, message: 'This field is required!' }],
    },
    {
      name: 'division',
      label: 'Divisi',
      type: 'select',
      placeholder: 'Enter Divisi',
      rules: [{ required: true, message: 'This field is required!' }],
      options: listDivision?.items?.map((item: any) => ({
        label: item.division_name,
        value: item.id,
      })),
    },
    {
      name: 'access',
      label: 'Akses',
      type: 'select',
      placeholder: 'Enter Akses',
      options: listRoleAccess.items?.map((item:any) => ({
        label: item.role_name,
        value: item.id
      })),
      rules: [{ required: true, message: 'This field is required!' }],
    },
    {
      name: 'phone',
      label: 'NO. Telp',
      type: 'text',
      placeholder: 'Enter Phone',
      rules: [{ required: true, message: 'This field is required!' }],
    },
    {
      name: 'email',
      label: 'Email',
      type: 'text',
      placeholder: 'Enter Email',
      rules: [{ required: true, message: 'This field is required!' }],
    },
    {
      name: 'fax',
      label: 'NO. Fax',
      type: 'text',
      placeholder: 'Enter Fax',
      rules: [{ required: true, message: 'This field is required!' }],
    },
    {
      name: 'fiscal_year',
      label: 'Tahun Fiskal',
      type: 'text',
      placeholder: 'Enter Fiskal',
      rules: [{ required: true, message: 'This field is required!' }],
    },
    {
      name: 'audit_period',
      label: 'Periode Audit',
      type: 'text',
      placeholder: 'Enter Periode Audit',
      rules: [{ required: true, message: 'This field is required!' }],
    },
    {
      name: 'status',
      label: 'Status',
      type: 'select',
      placeholder: 'Enter Status',
      rules: [{ required: true, message: 'This field is required!' }],
      options: [
        {
          label: 'Active',
          value: 'Active',
        },
        {
          label: 'Inactive',
          value: 'Inactive',
        },
      ],
    },
  ];

  return (
    <Drawer
      title="Update Entity"
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
