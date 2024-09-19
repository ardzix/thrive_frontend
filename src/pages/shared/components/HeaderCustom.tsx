import { ArrowLeftOutlined, PlusCircleOutlined } from "@ant-design/icons";
import { Breadcrumb, Button } from "antd";
import { useNavigate } from "react-router-dom";

interface HeaderCustomProps {
  title: string;
  addTitle?: string;
  withBack?: boolean;
  handleAdd?: () => void;
  breadcrumbItems?: any;
}

export default function HeaderCustom({ title, handleAdd, addTitle, withBack, breadcrumbItems }: HeaderCustomProps) {
  const navigate = useNavigate();
  const handleBack = () => {
    navigate(-1);
  };
  return (
    <div className="flex justify-between items-center">
      <div className=" flex items-center gap-x-3">
        {withBack && <ArrowLeftOutlined className=" cursor-pointer text-xl" onClick={handleBack} />}

        <p className="text-xl uppercase font-bold">{title}</p>
      </div>

      {addTitle && (
        <Button onClick={handleAdd} size="large" type="primary" icon={<PlusCircleOutlined />}>
          {addTitle}
        </Button>
      )}
      <Breadcrumb items={breadcrumbItems} />
    </div>
  );
}
