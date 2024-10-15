import { Button, Form, Modal, notification } from "antd";
import { useNavigate } from "react-router-dom";
import FormGenerator from "../../shared/components/FormGenerator";
import { useAuthStore } from "../auth.store";

export default function ForgotPasswordForm() {
  const navigate = useNavigate();
  const [hookFormForgotPass] = Form.useForm();
  const { postSendOtp, loading } = useAuthStore((state) => state);

  const dataForm = [
    {
      name: "email",
      label: "Email",
      type: "email",
      placeholder: "Email",
      rules: [{ required: true, message: "This field is required!" }],
    },
  ];

  const handleSubmit = async (values: any) => {
    console.log(values);
    try {
      const response: any = await postSendOtp({
        email: values.email,
      });
      if (response) {
        // console.log(response);
        notification.success({
          message: "The OTP code has been sent to your email",
        });
      }
      navigate(`/verify-forgot-password/${values.email}`);
    } catch (error: any) {
      console.log(error);
      Modal.error({
        title: "Error",
        content: ` ${Object?.values(error?.response?.data)}`,
        okType: "danger",
      });
      console.log(error);
    }
  };

  return (
    <>
      <FormGenerator
        hookForm={hookFormForgotPass}
        onFinish={handleSubmit}
        data={dataForm}
        id="dynamicFormForgot"
        size="large" //small , default , large
        layout="vertical" //vertical, horizontal
        // formStyle={{ maxWidth: "100%" }}
        disabled={loading}
      />
      <div className="flex justify-between space-x-4">
        <Button
          size="large"
          type="default"
          className="w-full border-main"
          onClick={() => navigate(-1)}
        >
          Cancel
        </Button>
        <Button
          form="dynamicFormForgot"
          htmlType="submit"
          className="w-full bg-main "
          size="large"
          type="primary"
          loading={loading}
        >
          Reset Password
        </Button>
      </div>
    </>
  );
}
