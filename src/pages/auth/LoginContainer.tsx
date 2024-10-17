import { Button, Carousel, Form, Modal, notification } from "antd";
import FormGenerator, { IDataForm } from "../shared/components/FormGenerator";
import { FaUser } from "react-icons/fa6";
import { PiLockKeyFill } from "react-icons/pi";
import { useStorageStore } from "../shared/storage.store";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "./auth.store";

export default function LoginContainer() {
  const [hookFormGenerator] = Form.useForm();
  const { handleToken } = useStorageStore();
  const navigate = useNavigate();

  const dataForm :IDataForm[] = [
    {
      name: "email",
      type: "text",
      placeholder: "Email/Whatsapp",
      prefix: (
        <div className="bg-neutral-100 p-3 rounded-md">
          <FaUser />
        </div>
      ),
      className: "min-h-[50px]",
      rules: [
        { required: true, message: "This field is required!" },
        { type: "email", message: "Please enter a valid email!" },
      ],
    },
    {
      name: "password",
      type: "text",
      placeholder: "Password",
      prefix: (
        <div className="bg-neutral-100 p-3 rounded-md">
          <PiLockKeyFill />
        </div>
      ),
      className: "min-h-[50px]",
      rules: [
        { required: true, message: "This field is required!" },
        { min: 8, message: "Password must be at least 8 characters!" },
      ],
    },
  ];

  const {postLogin, loading}= useAuthStore();

  const handleSubmit = async (value: any) => {
    try {
      const res: any = await postLogin(value);
      if (res) {
        notification.success({ message: "Success" });

        setTimeout(() => {
          handleToken(res?.data);
        }, 1000);
      }
    } catch (error: any) {
      console.log(error.response);
      Modal.error({
        title: "Failed ",
        content: Object?.values(error?.response?.data) || "",
      });
    }
  };

  return (
    <div className="grid grid-cols-3 w-full min-h-screen">
      <div className="col-span-2 w-full h-full">
        <Carousel autoplay dots={true} effect="fade" className="w-full h-full" style={{ height: "100%" }}>
          <div className="w-full h-full">
            <img src="/images/pen.png" alt="Vite" className="w-full h-full object-cover" style={{ height: "100%", maxHeight: "100vh" }} />
          </div>
          <div className="w-full h-full">
            <img src="/images/pen.png" alt="Vite" className="w-full h-full object-cover" style={{ height: "100%", maxHeight: "100vh" }} />
          </div>
          <div className="w-full h-full">
            <img src="/images/pen.png" alt="Vite" className="w-full h-full object-cover" style={{ height: "100%", maxHeight: "100vh" }} />
          </div>
        </Carousel>
      </div>
      <div className="h-full  relative">
        <div className="bg-black py-6 h-[175px] flex justify-center items-center">
          <img src="/images/thrive-logo.svg" alt="thrive" className="w-[130px] h-[130px]" />
        </div>
        <div className="p-6 space-y-5">
          <h2 className="text-2xl font-bold">Login</h2>
          <FormGenerator
            hookForm={hookFormGenerator}
            onFinish={handleSubmit}
            data={dataForm}
            id="dynamicForm"
            size="default" //small , default , large
            layout="vertical" //vertical, horizontal
            // disabled={loading}
            // formStyle={{ maxWidth: "100%" }}
          />
          <div className="flex flex-col justify-center items-center gap-5">
            <Button color="default" type="link" onClick={() => navigate("/forgot-password")}>Forgot Password?</Button>
            <Button loading={loading} htmlType="submit" form="dynamicForm" className="bg-black text-white w-[200px] h-[50px] hover:!bg-black !border-none hover:!text-white font-semibold">
              Log In
            </Button>
            <Button className="bg-transparent w-[200px] h-[50px]">Request Access</Button>
          </div>
        </div>
        <div className="absolute bottom-10 left-0 right-0">
          <p className="text-center text-neutral-400">
          Powered by <strong>Altru</strong>
          </p>
        </div>
      </div>
    </div>
  );
}
