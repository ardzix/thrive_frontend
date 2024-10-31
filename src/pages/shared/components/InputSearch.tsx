import { SearchOutlined } from "@ant-design/icons";
import { Input } from "antd";
import { useEffect, useState } from "react";
import { useDebounce } from "use-debounce";

type InputSearchProps = {
  onChange: (text: string) => void;
  placeholder?: string;
};

export default function InputSearch({ onChange, placeholder }: InputSearchProps) {
  const [text, setText] = useState("");
  const [value] = useDebounce(text, 500);

  useEffect(() => {
    onChange(value);
  }, [value]);

  return (
    <div>
      <Input
        type="text"
        size="large"
        value={text}
        placeholder={placeholder}
        onChange={(e) => setText(e.target.value)}
        suffix={<SearchOutlined />} // Ubah prefix menjadi suffix
        className="min-w-[300px]"
      />
    </div>
  );
}
