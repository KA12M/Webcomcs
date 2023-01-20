import React from "react";
import ImgCrop from "antd-img-crop";
import { Button, Upload, Form, Input, Image } from "antd";

import { InboxOutlined } from "@ant-design/icons";
import { RcFile } from "antd/es/upload";
import { FieldData } from "rc-field-form/lib/interface";
import { BiComment } from "react-icons/bi";

import { PhotoCreate } from "../../../../models/HomePhoto";

interface Props {
  preview: RcFile | undefined;
  formBody: PhotoCreate;
  onUploadChange: any;
  submitLoading: boolean;
  handleSubmit: (values: any) => void;
  handleFieldsChange: (
    changedFields: FieldData[],
    allFields: FieldData[]
  ) => void;
}

const FormPhoto = ({
  preview,
  formBody,
  onUploadChange,
  handleFieldsChange,
  submitLoading,
  handleSubmit,
}: Props) => {
  return (
    <Form
      className="form-photo"
      initialValues={{
        title: formBody.title,
      }}
      onFinish={handleSubmit}
      onFieldsChange={handleFieldsChange}
    >
      <Form.Item
        label="เกี่ยวกับ"
        name="title"
        rules={[{ required: true, message: "กรุณากรอกข้อมูล" }]}
      >
        <Input prefix={<BiComment />} />
      </Form.Item>

      <ImgCrop
        grid
        modalTitle="สัดส่วนรูปภาพ"
        aspect={21 / 9}
        quality={100}
        modalWidth={780}
      >
        <Upload.Dragger name="FileImage" beforeUpload={onUploadChange}>
          <p className="ant-upload-drag-icon">
            <InboxOutlined />
          </p>
          <p className="ant-upload-text">
            คลิกหรือลากไฟล์ไปยังพื้นที่นี้เพื่ออัปโหลด
          </p>
          <p className="ant-upload-hint">รองรับการอัปโหลดครั้งเดียว</p>
        </Upload.Dragger>
      </ImgCrop>

      {preview && (
        <div className="rounded-lg py-8 px-2">
          <Image width={"100%"} src={URL.createObjectURL(preview!)} />
        </div>
      )}

      <Form.Item className="my-4">
        <Button
          shape="round"
          loading={submitLoading}
          type="primary"
          htmlType="submit"
        >
          บันทึก
        </Button>
      </Form.Item>
    </Form>
  );
};

export default FormPhoto;
