import FormVerifyEmail from "./components/FormVerifyEmail";

export default function ForgotPasswordContainer() {
  return (
    <div
      className=" h-screen flex items-center justify-center login-container relative bg-neutral-100"
      // style={{ backgroundImage: `url(/img/wave.svg)` }}
    >
      <div className=" max-w-[450px] w-full pb-10 space-y-5 rounded-xl bg-white shadow-xl">
        <div className="space-y-2 flex flex-col items-center justify-center">
         <div className="bg-black rounded-t-xl h-[175px] w-full flex justify-center items-center">
          <img src="/images/thrive-logo.svg" alt="thrive" className="w-[130px] h-[130px]" />
        </div>
        </div>
        <div className="px-5">
          <p className="text-center text-sm ">
            Input your email to get a verification code
          </p>
        <FormVerifyEmail />
        </div>
      </div>
    </div>
  );
}
