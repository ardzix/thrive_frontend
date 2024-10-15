import { useState } from "react";
import OTPInput from "react-otp-input";
import { Button, Modal, notification } from "antd";
// import OTPCounter from "./OTPCounter";
import { useNavigate } from "react-router-dom";
import { useStorageStore } from "../../shared/storage.store";
import { useAuthStore } from "../../../stores/auth.store";
import OTPCounter from "./OTPCounter";

export default function FormOtp({ email }: any) {
  const [VerifyCode, setVerifyCode] = useState("");
  const { handleOtpDate, otpDate } = useStorageStore();
  const { postVerifyEmail, loading, postSendOtp } = useAuthStore();

  const navigate = useNavigate();

  const handleSubmit = async () => {
    const data = {
      otp: VerifyCode,
      email: email,
    };
    try {
      const response: any = await postVerifyEmail(data);
      if (response?.data?.token) {
        notification.success({ message: response?.message });
        navigate(`/reset-password/${email}/${response?.data?.token}`);
      } else {
        Modal.error({
          title: "Error",
          content: `token not found!`,
          okType: "danger",
        });
      }
    } catch (error: any) {
      Modal.error({
        title: "Error",
        content: ` ${Object.values(error.response.data)}`,
        okType: "danger",
      });
      // console.log(error);
    }
  };

  const handleDate = async () => {
    try {
      const response: any = await postSendOtp({
        email: email,
      });
      if (response) {
        const seccond = 6; // one minute
        handleOtpDate(Date.now() + seccond * 10000); //seccond
        notification.success({
          message: "The verification email has been sent",
        });
      }
    } catch (error: any) {
      Modal.error({
        title: "Error",
        content: ` ${Object.values(error?.response?.data)}`,
        okType: "danger",
      });
      // console.log(error);
    }
  };

  return (
    <div className="input-otp space-y-6">
      <OTPInput
        value={VerifyCode}
        onChange={setVerifyCode}
        numInputs={6}
        containerStyle={{ display: "flex", justifyContent: "space-between" }}
        // renderSeparator={<span className="p-3"></span>}
        shouldAutoFocus
        inputType="number"
        inputStyle={{
          width: 50,
          height: 50,
          borderRadius: 8,
          border: "1px #DDE1E6 solid",
          fontSize: 36,
          // fontFamily: "var(--font-montserrat)",
        }}
        renderInput={(props) => <input {...props} disabled={loading} />}
      />

      <p className="text-neutral-700 text-sm font-light space-x-2">
        <span>Didn’t get verification code?</span>
        <OTPCounter
          date={otpDate}
          handleDate={handleDate}
          // key={DateSendOtp}
          loading={loading}
        />
      </p>
      <div className="flex justify-between space-x-4">
        {/* <ButtonCustom
        height={40}
        className="w-full border-main"
        title="Cancel"
      /> */}
        <Button
          htmlType="submit"
          disabled={VerifyCode.length !== 6}
          size="large"
          type="primary"
          className="w-full text-white"
          onClick={handleSubmit}
          loading={loading}
        >
          Verify
        </Button>
      </div>
    </div>
  );
}
