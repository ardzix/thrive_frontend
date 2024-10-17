import { useRef, useState, useCallback } from "react";
import dayjs from "dayjs";

import {
  Button,
  Checkbox,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Radio,
  Select,
  Slider,
  Spin,
  Switch,
  Upload,
  message,
} from "antd";
import axios from "axios";
import { useSharedStore } from "../shared.store";
import { RiImageAddFill } from "react-icons/ri";

const { RangePicker } = DatePicker;
const { TextArea } = Input;

const getBase64 = (file: any) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

export default function FormGenerator({
  data,
  onFinish,
  id,
  size,
  layout,
  formStyle,
  labelCol,
  wrapperCol,
  hookForm,
  disabled,
  className,
}: any) {
  const formRef: any = useRef(null);
  const [_, setImageUrl] = useState("");
  const [Loading, setLoading] = useState(false);

  const handleChangeSingleImage = useCallback(
    async (info: any, name: string, uploadType: any, withUpload?: boolean) => {
      const file = info.file.originFileObj;

      const isJpgOrPng =
        file.type === "image/jpeg" || file.type === "image/png";
      if (!isJpgOrPng) {
        message.error("You can only upload JPG/PNG file!");
      }
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isLt2M) {
        message.error("Image must smaller than 2MB!");
      }

      console.log(isJpgOrPng, "isJpgOrPng");
      console.log(isLt2M, "isLt2m");
      try {
        const url: any = await getBase64(file);

        if (withUpload) {
          setLoading(true);
          try {
            const response = await axios.post(
              "https://faq.balesin.id/api/custom/upload",
              {
                file: url,
                file_name: file.name,
              },
              {
                headers: {
                  "Content-Type": "application/json",
                  Token:
                    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NTgwNywiZW1haWwiOiJiYWxlc2luaWRAZ21haWwuY29tIiwiaWF0IjoxNjg2MTE1NjkxMDU2LCJleHAiOjE2ODYxMTU2OTEwNTZ9.IY6DvNWrVDn7rMuzQI6YS00wm47IO8KMxxMF_DU93G4",
                },
              }
            );

            console.log(response);
            setImageUrl(response?.data?.response);
            formRef?.current?.setFieldValue(name, response?.data?.response);
            setLoading(false);
          } catch (error) {
            console.log(error, "Upload Failed");

            setLoading(false);
          }
        }
        //withnoupload
        if (!withUpload) {
          if (isJpgOrPng && isLt2M) {
            setImageUrl(url);
            // prettier-ignore
            formRef?.current?.setFieldValue(name,uploadType === "base64" ? url : file); //validate upload type
          } else {
            formRef?.current?.setFieldValue(name, undefined);
            setImageUrl("");
          }
        }
        console.log("successfully");
      } catch (error) {
        console.log(error, "error generate base64 uploading");
      }
    },
    []
  );

  const { postUploadFile, loading: loadingMultipleImage } = useSharedStore();

  const [listMultipleImages, setListMultipleImages] = useState<any>([]);

  const handleMultipleImage = async (
    info: any,
    name: string,
    uploadType: any,
    withUpload?: boolean
  ) => {
    const file = info.file.originFileObj;

    const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
    if (!isJpgOrPng) {
      message.error("You can only upload JPG/PNG file!");
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error("Image must smaller than 2MB!");
      return;
    }

    console.log(isJpgOrPng, "isJpgOrPng");
    console.log(isLt2M, "isLt2m");

    try {
      const base64file: any = await getBase64(file);

      if (withUpload) {
        console.log(base64file);
        console.log(file.name);
        try {
          const body = {
            name: file.name,
            file_base64: base64file,
            description: "description" + file?.name,
          };
          const res: any = await postUploadFile(body);
          console.log(res);

          setListMultipleImages((prev: any) => [
            ...prev,
            {
              id32: res?.id32,
              url: res?.url,
            },
          ]);

          // handleFillMultipleImage(name);
        } catch (error) {
          console.log(error);
        }
        // setLoading(true);
        // try {
        //   const response = await axios.post(
        //     "https://faq.balesin.id/api/custom/upload",
        //     {
        //       file: url,
        //       file_name: file.name,
        //     },
        //     {
        //       headers: {
        //         "Content-Type": "application/json",
        //         Token:
        //           "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NTgwNywiZW1haWwiOiJiYWxlc2luaWRAZ21haWwuY29tIiwiaWF0IjoxNjg2MTE1NjkxMDU2LCJleHAiOjE2ODYxMTU2OTEwNTZ9.IY6DvNWrVDn7rMuzQI6YS00wm47IO8KMxxMF_DU93G4",
        //       },
        //     }
        //   );

        //   console.log(response);
        //   setImageUrl(response?.data?.response);
        //   formRef?.current?.setFieldValue(name, response?.data?.response);
        //   setLoading(false);
        // } catch (error) {
        //   console.log(error, "Upload Failed");

        //   setLoading(false);
        // }
      }
      //withnoupload
      if (!withUpload) {
        if (isJpgOrPng && isLt2M) {
          setImageUrl(base64file);
          // prettier-ignore
          formRef?.current?.setFieldValue(name,uploadType === "base64" ? base64file : file); //validate upload type
        } else {
          formRef?.current?.setFieldValue(name, undefined);
          setImageUrl("");
        }
      }
      console.log("successfully");
    } catch (error) {
      console.log(error, "error generate base64 uploading");
    }
  };

  // const handleFillMultipleImage = useCallback(
  //   (name: string) => {
  //     console.log("hadir");
  //     formRef?.current?.setFieldValue(name, listMultipleImages);
  //   },
  //   [listMultipleImages]
  // );

  return (
    <div>
      <Form
        ref={formRef}
        className={className}
        form={hookForm}
        disabled={disabled}
        id={id}
        onFinishFailed={(failData) => console.log(failData)}
        onFinish={(value) => {
          //filter value formatted
          for (const objForm of data) {
            if (objForm.type === "date") {
              value[objForm.name] = dayjs(new Date(value[objForm.name])).format(
                objForm.payloadFormat
              );
            }
            if (objForm.type === "range") {
              value[objForm.name] = [
                dayjs(new Date(value[objForm.name][0])).format(
                  objForm.payloadFormat
                ),
                dayjs(new Date(value[objForm.name][1])).format(
                  objForm.payloadFormat
                ),
              ];
            }
            if (objForm.type === "multiple_image") {
              value[objForm.name] = listMultipleImages;
            }
          }
          onFinish(value);
        }}
        layout={layout}
        size={size}
        scrollToFirstError={{
          //make error visible in the middle
          behavior: "smooth",
          block: "center",
          inline: "center",
        }}
        // disabled={componentDisabled}
        style={{ ...formStyle }}
        labelCol={{ ...labelCol }}
        wrapperCol={{ ...wrapperCol }}
      >
        {data.map((res: any, i: number) => {
          //TEXT
          if (res?.type === "text")
            return (
              <Form.Item
                key={i}
                className="w-full"
                label={res?.label}
                name={res?.name}
                rules={res?.rules}
              >
                <Input
                  placeholder={res?.placeholder}
                  className={res?.className}
                  prefix={res?.prefix}
                />
              </Form.Item>
            );
          //EMAIL
          if (res.type === "email") {
            return (
              <Form.Item
                key={i}
                className="w-full"
                label={res.label}
                name={res.name}
                rules={[
                  ...res.rules,
                  {
                    type: "email",
                    message: "The input is not valid E-mail!",
                  },
                ]}
              >
                <Input
                  placeholder={res.placeholder}
                  className={res?.className}
                  prefix={res?.prefix}
                />
              </Form.Item>
            );
          }
          //PASSWORD
          if (res.type === "password") {
            return (
              <Form.Item
                key={i}
                className="w-full"
                label={res?.label}
                name={res?.name}
                rules={res?.rules}
              >
                <Input.Password
                  className={res?.className}
                  placeholder={res?.placeholder}
                  prefix={res?.prefix}
                />
              </Form.Item>
            );
          }
          //CONFIRM PASSWORD
          if (res.type === "confirm_password") {
            return (
              <Form.Item
                key={i}
                className="w-full"
                label={res?.label}
                name={res?.name}
                rules={[
                  ...res?.rules,
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (
                        !value ||
                        getFieldValue(res.confirmationWith) === value
                      ) {
                        return Promise.resolve();
                      }
                      return Promise.reject(
                        new Error(
                          "The new password that you entered do not match!"
                        )
                      );
                    },
                  }),
                ]}
              >
                <Input.Password
                  className={res?.className}
                  placeholder={res?.placeholder}
                />
              </Form.Item>
            );
          }
          //NUMBER
          if (res?.type === "number") {
            return (
              <Form.Item
                key={i}
                className="w-full"
                label={res?.label}
                name={res?.name}
                rules={res?.rules}
              >
                <InputNumber
                  style={{ minWidth: 140 }}
                  placeholder={res?.placeholder}
                  prefix={res?.prefix}
                  addonAfter={res?.addonAfter}
                  addonBefore={res?.addonBefore}
                  suffix={res?.suffix}
                  min={res?.min}
                  max={res?.max}
                  className={res?.className}
                  formatter={res?.formatter}
                  parser={res?.parser}
                />
              </Form.Item>
            );
          }
          //TEL
          if (res?.type === "tel") {
            return (
              <Form.Item
                key={i}
                className="w-full"
                label={res?.label}
                name={res?.name}
                rules={res?.rules}
              >
                <Input
                  placeholder={res?.placeholder}
                  className={res?.className}
                />
              </Form.Item>
            );
          }
          //SELECT
          if (res?.type === "select") {
            if (res?.hide) {
              return;
            }
            return (
              <Form.Item
                label={res.label}
                className="w-full"
                key={i}
                name={res.name}
                rules={res?.rules}
                extra={res?.helperText}
              >
                <Select
                  placeholder={res?.placeholder}
                  defaultValue={res?.defaultValue}
                  className={res?.className}
                  // maxTagCount="responsive"
                  showSearch
                  optionFilterProp="children"
                  filterOption={(input: any, option: any) =>
                    (option?.label ?? "")
                      .toLowerCase()
                      .includes(input.toLowerCase())
                  }
                  options={res.options}
                  onChange={res?.onChange}
                  disabled={res?.disabled}
                />
              </Form.Item>
            );
          }
          //SELECT MULTIPLE
          if (res?.type === "select_multiple")
            return (
              <Form.Item
                label={res.label}
                className="w-full"
                key={i}
                name={res.name}
                rules={res?.rules}
              >
                <Select
                  placeholder={res.placeholder}
                  className={res?.className}
                  // maxTagCount="responsive"
                  // labelInValue={true}
                  mode="multiple"
                  showSearch
                  optionFilterProp="children"
                  filterOption={(input: any, option: any) => {
                    const textForSearch =
                      (typeof option?.label === "string" && option.label) ||
                      option?.labelForSearch;
                    return (textForSearch ?? "")
                      .toLowerCase()
                      .includes(input.toLowerCase());
                  }}
                  options={res.options}
                  onChange={res?.onChange}
                />
              </Form.Item>
            );
          if (res?.type === "checkbox") {
            return (
              <Form.Item
                label={res.label}
                className="w-full"
                key={i}
                name={res.name}
                rules={res?.rules}
              >
                <Checkbox.Group className="min-h-[300px] flex-wrap flex flex-col justify-start items-start space-y-2">
                  {res.options.map((option: any, optIdx: number) => (
                    <Checkbox key={optIdx} value={option.value}>
                      {option.label}
                    </Checkbox>
                  ))}
                </Checkbox.Group>
              </Form.Item>
            );
          }
          //CHECKBOX BOOLEAN
          if (res?.type === "checkbox_boolean") {
            return (
              <Form.Item
                label={res.label}
                className="w-full"
                // className="mb-0"
                style={res.overideStyle}
                key={i}
                name={res.name}
                rules={res?.rules}
                valuePropName="checked"
              >
                <Checkbox key={i}>{res?.labelCheckbox}</Checkbox>
              </Form.Item>
            );
          }
          //RADIO
          if (res?.type === "radio") {
            return (
              <Form.Item
                label={res.label}
                className="w-full"
                key={i}
                name={res.name}
                rules={res?.rules}
              >
                <Radio.Group className={res?.className}>
                  {res.options.map((option: any, optIdx: number) => (
                    <Radio key={optIdx} value={option.value}>
                      {option.label}
                    </Radio>
                  ))}
                </Radio.Group>
              </Form.Item>
            );
          }
          //SLIDER
          if (res?.type === "slider") {
            return (
              <Form.Item
                label={res.label}
                className="w-full"
                key={i}
                name={res.name}
                rules={res?.rules}
                initialValue={res.min}
              >
                <Slider min={res.min} max={res.max} />
              </Form.Item>
            );
          }
          // //SWITCH
          if (res?.type === "switch") {
            const isValueTrue = Form.useWatch(res?.name, hookForm);
            return (
              <Form.Item
                label={res.label}
                className="w-full"
                key={i}
                name={res.name}
                rules={res?.rules}
                valuePropName="checked"
                initialValue
              >
                <Switch
                  style={{
                    background: isValueTrue ? "green" : "gray",
                  }}
                  checkedChildren={res?.checkedChildren}
                  unCheckedChildren={res?.unCheckedChildren}
                />
              </Form.Item>
            );
          }
          //DATE
          if (res?.type === "date") {
            return (
              <Form.Item
                label={res.label}
                className="w-full"
                key={i}
                name={res.name}
                // className={res?.className}
                rules={res?.rules}
              >
                <DatePicker
                  format={res.previewFormat}
                  className={res?.className}
                  disabledDate={(current) => {
                    return (
                      (current &&
                        current < dayjs(res?.minDate, "YYYY-MM-DD")) ||
                      current > dayjs(res?.maxDate, "YYYY-MM-DD")
                    );
                  }}
                />
              </Form.Item>
            );
          }
          //RANGE DATE PICKER
          if (res?.type === "range") {
            return (
              <Form.Item
                label={res.label}
                className="w-full"
                key={i}
                name={res.name}
                rules={res?.rules}
              >
                <RangePicker
                  className={res?.className}
                  format={res.previewFormat}
                  disabledDate={(current) => {
                    return (
                      (current &&
                        current < dayjs(res?.minDate, "YYYY-MM-DD")) ||
                      current > dayjs(res?.maxDate, "YYYY-MM-DD")
                    );
                  }}
                />
              </Form.Item>
            );
          }
          //TEXTAREA
          if (res?.type === "textarea") {
            return (
              <Form.Item
                label={res.label}
                className="w-full"
                key={i}
                name={res.name}
                rules={res?.rules}
              >
                <TextArea
                  className={res?.className}
                  placeholder={res?.placeholder}
                />
              </Form.Item>
            );
          }
          //SINGLE IMAGE
          if (res.type === "single_image") {
            const imageWatch = Form.useWatch(res?.name, hookForm);
            console.log(imageWatch);
            const imageSource = imageWatch;
            return (
              <Form.Item
                label={res.label}
                className="w-full"
                key={i}
                name={res.name}
                rules={res?.rules}
                valuePropName="string || {}"
              >
                <Upload
                  listType="picture-card"
                  className="avatar-uploader"
                  customRequest={() => {}}
                  showUploadList={false}
                  accept="image/png, image/jpg, image/jpeg"
                  // multiple
                  onChange={(info) =>
                    handleChangeSingleImage(
                      info,
                      res.name,
                      res?.uploadType,
                      res?.withUpload
                    )
                  }
                >
                  {Loading && <Spin />}
                  {imageSource && !Loading && (
                    <img
                      src={imageSource}
                      alt="avatar"
                      style={{
                        width: "100%",
                        objectFit: "contain",
                        aspectRatio: "1/1",
                      }}
                    />
                  )}
                  {!imageSource && !Loading && <Button>Upload</Button>}
                </Upload>
              </Form.Item>
            );
          }
          // MULTIPLE image
          if (res.type === "multiple_image") {
            const imageWatch = Form.useWatch(res?.name, hookForm);
            console.log(imageWatch);
            if (res?.isHide) {
              return;
            }
            return (
              <Form.Item
                label={res.label}
                className="w-full flex"
                key={i}
                name={res.name}
                rules={res?.rules}
                valuePropName="string || {}"
              >
                <div className="flex gap-4 flex-wrap">
                  {listMultipleImages?.map((res: any, i: number) => (
                    <img
                      key={i}
                      src={res?.url}
                      alt=""
                      className="w-[100px] object-contain aspect-square border bg-neutral-100 rounded-lg"
                    />
                  ))}
                  <Upload
                    disabled={listMultipleImages.length > 5}
                    listType="picture-card"
                    className="avatar-uploader"
                    customRequest={() => {}}
                    showUploadList={false}
                    accept="image/png, image/jpg, image/jpeg"
                    // multiple
                    onChange={(info) =>
                      handleMultipleImage(
                        info,
                        res.name,
                        res?.uploadType,
                        res?.withUpload
                      )
                    }
                  >
                    {loadingMultipleImage && <Spin />}

                    {!loadingMultipleImage && (
                      <div className="text-xs text-center text-neutral-600 flex flex-col justify-center items-center">
                        <RiImageAddFill className=" text-3xl" />
                        <b>Upload here</b>
                      </div>
                    )}
                  </Upload>
                </div>
              </Form.Item>
            );
          }

          if (res?.type === "separator") {
            return <h3 className={` ${res?.className} `}>{res?.label}</h3>;
          }
          return null;
        })}
      </Form>
    </div>
  );
}
