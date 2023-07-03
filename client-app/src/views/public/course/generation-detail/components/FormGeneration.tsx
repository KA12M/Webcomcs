import React, { useEffect, useRef } from "react";
import { observer } from "mobx-react-lite";
import { Button, Form, Image, Input, InputNumber, Space, Upload } from "antd";
import JoditEditor from "jodit-react";
import { useStore } from "../../../../../store/store";
import URLImage from "../../../../../utils/URL";
import { Skeleton } from "antd";
import { UploadChangeParam, UploadFile } from "antd/es/upload";
import { config } from "../../../../../constants/config";
import Datepicker from "react-tailwindcss-datepicker";

const FormGeneration = ({ form, submit, file, setFile }: any) => {
  const {
    courseStore: {},
    generationStore: { loading, submittingLoading },
  } = useStore();

  useEffect(() => {
    return () => {
      setFile("");
      form.resetFields();
    };
  }, []);

  const handleUploadImage = (info: UploadChangeParam<UploadFile<any>>) => {
    const { status, response } = info.file;
    if (status == "done") {
      setFile(response);
    }
  };

  return loading ? (
    <Skeleton active className="px-2 py-4" />
  ) : (
    <Form
      form={form}
      onFinish={submit}
      layout="vertical"
      className="px-4 py-8 mb-2"
      initialValues={{
        quantity: 1,
      }}
    >
      <Form.Item
        name="subTitle"
        label="หัวข้อ"
        rules={[{ required: true, message: "กรุณากรอกข้อมูล" }]}
      >
        <Input.TextArea
          showCount
          maxLength={60}
          autoSize={{ minRows: 1, maxRows: 4 }}
        />
      </Form.Item>

      <Form.Item
        name="dateRange"
        label="ระยะเวลา"
        rules={[{ required: true, message: "กรุณาเลือกระยะเวลาหลักสูตร" }]}
      >
        <Datepicker
          showShortcuts
          primaryColor={"indigo"}
          displayFormat={"DD-MM-YYYY"}
          containerClassName="border border-gray-300 rounded-lg"
          value={form.getFieldValue("dateRange")}
          onChange={(val) => form.setFieldValue("dateRange", val)}
        />
      </Form.Item>

      <Form.Item name="quantity" label="จำนวนผู้ลงทะเบียน">
        <InputNumber min={1} />
      </Form.Item>

      <Form.Item name="description" label="รายละเอียด">
        <JoditEditor value={form.getFieldValue("description")} />
      </Form.Item>

      <Form.Item>
        <Space wrap size={[16, 16]}>
          <Upload
            accept="image/jpeg, image/png,  image/jpg"
            action={config.urlUploadFile + "?quality=100"}
            previewFile={undefined}
            showUploadList={false}
            onChange={handleUploadImage}
          >
            <Button type="dashed" className="mt-4">
              อัพโหลดรูปปก
            </Button>
          </Upload>
          {file && (
            <Image
              src={URLImage(file)}
              width={"240px"}
              height={"160px"}
              className="max-h-96 shadow-md rounded-md object-cover object-center"
            />
          )}
        </Space>
      </Form.Item>

      <Form.Item>
        <Button
          type="primary"
          shape="round"
          htmlType="submit"
          children="บันทึก"
          loading={submittingLoading}
        />
      </Form.Item>
    </Form>
  );
};

export default observer(FormGeneration);
