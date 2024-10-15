import { Button, Form, Modal, notification } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import FormGenerator from "../../shared/components/FormGenerator";
import { useAuthStore } from "../auth.store";

export default function ResetPasswordForm() {
  const { loading, postResetPassword } = useAuthStore();
  const { token } = useParams();

  const router = useNavigate();
  const [hookFormGenerator] = Form.useForm();
  const dataForm = [
    //PASSWORD
    // regex ref :
    // Minimum eight characters, at least one letter and one number: "^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$"
    // Minimum eight characters, at least one letter, one number and one special character: "^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$"
    // Minimum eight characters, at least one uppercase letter, one lowercase letter and one number: "^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$"
    // Minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character: "^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$"
    {
      name: "new_password",
      label: "New Password",
      type: "password",
      placeholder: "New Password",
      rules: [
        { required: true, message: "This field is required!" },
        {
          pattern: new RegExp(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/g),
          message:
            "Minimum eight characters, at least one letter and one number",
        },
      ],
    },
    //CONFIRMATION PASSWORD
    {
      name: "confirm",
      label: "Confirm New Password",
      type: "confirm_password",
      confirmationWith: "new_password", //  name input to validate value are same
      placeholder: "Confirm New Password",
      rules: [{ required: true, message: "This field is required!" }],
    },
  ];

  const handleSubmit = async (values: any) => {
    const data = {
      token: token,
      new_password: values.new_password,
    };
    try {
      const response: any = await postResetPassword(data);
      if (response) {
        notification.success({ message: "Reset password seccess!" });
        router(`/congratulation`);
      }
    } catch (error: any) {
      Modal.error({
        title: "Error",
        content: ` ${Object.values(error.response.data)}`,
        okType: "danger",
      });
      console.log(error);
    }
  };

  return (
    <div className=" space-y-6">
      <FormGenerator
        hookForm={hookFormGenerator}
        onFinish={handleSubmit}
        data={dataForm}
        id="dynamicForm"
        size="large" //small , default , large
        layout="vertical" //vertical, horizontal
        className="space-y-6"
        disabled={loading}
        // formStyle={{ maxWidth: "100%" }}
      />
      <div className="flex justify-between space-x-4">
        <Button
          size="large"
          type="default"
          className="w-full border-main"
          onClick={() => router("/")}
        >
          Cancel
        </Button>
        <Button
          size="large"
          type="primary"
          form="dynamicForm"
          htmlType="submit"
          className="w-full bg-main "
          loading={loading}
        >
          Reset Password
        </Button>
      </div>
    </div>
  );
}
