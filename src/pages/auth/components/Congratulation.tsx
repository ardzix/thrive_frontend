import { Button } from "antd";
import { Link, useNavigate } from "react-router-dom";

export default function CongratPage() {
  const router = useNavigate();
  const handleClick = () => router("/");
  return (
    <div className="p-12 h-screen flex w-100 relative justify-center items-center">
      <Link to="/">
        <img src="/img/bri.png" alt="logo" className="absolute top-0 left-0 m-12 max-w-32 max-h-64 " />
      </Link>
      <div className=" space-y-5 flex-col flex items-center justify-center">
        <p className="text-center text-main font-secondary text-5xl font-bold">Congratulations!</p>
        <p className="text-center text-neutral-700 text-base">Your account ready to sign in</p>
        <img src="/img/baloons.svg" alt="" />

        <Button className="bg-main text-white max-w-[341px] w-full" onClick={handleClick}>
          Sign In
        </Button>
      </div>
    </div>
  );
}
