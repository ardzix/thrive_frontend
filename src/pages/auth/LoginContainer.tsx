import { Button } from "antd";
import { useNavigate } from "react-router-dom";

export default function LoginContainer() {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col space-y-5 h-screen items-center justify-center">
      <p>The login system has not been implemented, please access /company or click the button</p>
      <Button onClick={() => navigate("/company")} type="primary">
        Go Master Data
      </Button>
    </div>
  );
}
