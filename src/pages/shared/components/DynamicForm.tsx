import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Form, FormInstance, Input, InputNumber } from "antd";
import { PiNotePencilBold } from "react-icons/pi";

export type DataFormType = {
  label: string;
  placeholder: string;
  type: string;
  prefix?: string;
  required?: boolean;
  name: string;
  parser?: (value: any) => any;
  formatter?: (value: any) => any;
  min?: number;
  max?: number;
  rules?: {
    required?: boolean;
    message?: string;
    validator?: (rule: any, value: any, callback: any) => void;
    max?: number;
    min?: number;
  }[];
}[];

interface CustomFormProps {
  hookForm?: FormInstance;
  initialValues?: any[];
  titleForm: string;
  id: string;
  data: DataFormType;
  disabled?: boolean;
  labelText?: string;
  isLoading: boolean;
  labelCol?: number;
  wrapperCol?: number;
  onFinish: (values: any) => void;
}

export default function DynamicForm({ disabled, titleForm, data, id, onFinish, labelCol = 24, wrapperCol = 24, isLoading, hookForm, initialValues }: CustomFormProps) {
  return (
    <Form
      disabled={isLoading}
      labelCol={{ span: labelCol }}
      wrapperCol={{ span: wrapperCol }}
      initialValues={{ [titleForm]: initialValues }}
      id={id}
      size="large"
      form={hookForm}
      name={titleForm}
      onFinish={onFinish}
      // onValuesChange={(val) => console.log(val)}
      autoComplete="on"
      className="min-h-[200px]"
    >
      <p className="font-semibold uppercase text-neutral-600 flex items-center gap-x-2 w-full mb-4">
        <PiNotePencilBold size={18} />
        {titleForm}
      </p>
      <Form.List name={titleForm}>
        {(fields, { add, remove }) => (
          <>
            {fields.map(({ key, name, ...restField }) => (
              <div key={key} style={{ display: "flex", alignItems: "center" }}>
                <div style={{ flex: 1, display: "flex", alignItems: "center" }}>
                  {data.map((item) => {
                    if (item.type === "text") {
                      return (
                        <Form.Item key={item.name} {...restField} label={item.label} name={[name, item.name]} rules={item.rules} style={{ width: "100%" }}>
                          <Input disabled={disabled} placeholder={item.placeholder} style={{ width: "100%" }} />
                        </Form.Item>
                      );
                    }
                    if (item.type === "number") {
                      return (
                        <Form.Item key={item.name} {...restField} label={item.label} name={[name, item.name]} rules={item.rules} style={{ width: "100%" }}>
                          <InputNumber disabled={disabled} inputMode="numeric" style={{ width: "100%" }} placeholder={item.placeholder} prefix={item.prefix} parser={item?.parser} formatter={item?.formatter} />
                        </Form.Item>
                      );
                    }
                  })}
                </div>
                <div className={` ${labelCol !== 24 ? "mb-5" : "mt-5"}`}>
                  <MinusCircleOutlined
                    onClick={() => !disabled && remove(name)} // Jangan hapus jika form disabled
                    style={{
                      fontSize: "16px",
                      color: disabled ? "grey" : "#ff4d4f", // Warna berubah jika disabled
                      cursor: disabled ? "not-allowed" : "pointer", // Cursor berubah jika disabled
                    }}
                  />
                </div>
              </div>
            ))}
            <Form.Item wrapperCol={{ span: 24 }}>
              <Button disabled={disabled} type="dashed" onClick={() => add()} icon={<PlusOutlined />} style={{ width: "100%" }}>
                Tambah {titleForm}
              </Button>
            </Form.Item>
          </>
        )}
      </Form.List>
    </Form>
  );
}
