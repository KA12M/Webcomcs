import React, { useRef, useState } from "react";
import { PlusOutlined, InboxOutlined, DeleteOutlined } from "@ant-design/icons";
import {
  Button,
  Form,
  Input,
  Upload,
  Image,
  Card,
  Space,
  Tooltip,
  Row,
  Col,
} from "antd";
import JoditEditor from "jodit-react";
import TextArea from "antd/es/input/TextArea";
import { RcFile } from "antd/es/upload";
import { BiTrash } from "react-icons/bi";
import { NewsCreate } from "../../../../models/News";

interface Props {
  handleSubmit: () => void;
  handleUploadFiles: (file: RcFile, FileList: RcFile[]) => void;
  removeFileImage: (index: number) => void;
  handleValuesChange: (changedValues: any, values: any) => void;
  submitLoading: boolean;
  preview: RcFile[] | undefined;
  editMode: boolean; 
  formBody: NewsCreate;
}

const FormNews = ({
  submitLoading,
  preview,
  formBody,
  handleUploadFiles,
  removeFileImage,
  handleValuesChange,
  handleSubmit, 
}: Props) => {
  const editor = useRef(null);
  const [text, setText] = useState("");

  return (
    <Form
      className="py-4 px-2 md:py-8 md:px-4 xl:py-12 xl:px-8" 
      labelCol={{ span: 4 }}
      wrapperCol={{ span: 14 }}
      layout="horizontal"
      onValuesChange={handleValuesChange}
      onFinish={handleSubmit}
      initialValues={{
        title: formBody.title,
        subTitle: formBody.subTitle,
        body: formBody.body,
      }}
    >
      <Form.Item
        name="title"
        label="หัวข้อ"
        rules={[{ required: true, message: "กรุณากรอกข้อมูล" }]}
      >
        <Input />
      </Form.Item>

      <Form.Item name="subTitle" label="รายละเอียดเพิ่มเติม">
        <TextArea rows={2} />
      </Form.Item>

      <Form.Item
        name="body"
        label="เนื้อหา"
        rules={[{ required: true, message: "กรุณากรอกข้อมูล" }]}
      >
        <JoditEditor ref={editor} value={text} onChange={setText} />
      </Form.Item>

      <Form.Item
        name="fileImages"
        label="อัพโหลดรูปภาพ"
        valuePropName="fileList"
        required
      >
        <>
          <Upload.Dragger
            name="fileImages"
            showUploadList={false}
            multiple
            beforeUpload={handleUploadFiles}
          >
            <p className="ant-upload-drag-icon">
              <InboxOutlined />
            </p>
            <p className="ant-upload-text">
              คลิ้กหรือลากไฟล์ไปยังพื้นที่นี้เพื่ออัปโหลด
            </p>
            <p className="ant-upload-hint">รองรับการอัปโหลดหลายครั้ง</p>
          </Upload.Dragger>

          {preview && (
            <Row gutter={[16, 16]} className="mt-4">
              {preview.map((img, i) => (
                <Col key={i} xs={12} md={8} lg={6}>
                  <Card
                    hoverable
                    className="w-full items-center justify-center"
                    cover={
                      <Image
                        className="object-cover object-center"
                        height={120}
                        src={URL.createObjectURL(img)}
                      />
                    }
                    actions={[
                      <Tooltip placement="top" title={"ลบ"}>
                        <Button
                          shape="round"
                          danger
                          children={<BiTrash size={18} />}
                          type="primary"
                          onClick={() => removeFileImage(i)}
                        />
                      </Tooltip>,
                    ]}
                  />
                </Col>
              ))}
            </Row>
          )}
        </>
      </Form.Item>

      <Form.Item className="my-4">
        <Button
          loading={submitLoading}
          shape="round"
          type="primary"
          htmlType="submit"
        >
          บันทึก
        </Button>
      </Form.Item>
    </Form>
  );
};

export default FormNews;
