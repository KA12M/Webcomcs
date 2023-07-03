import React, { useEffect, useRef, useState } from "react";
import { InboxOutlined } from "@ant-design/icons";
import {
  Button,
  Form,
  Input,
  Upload,
  Image,
  Card,
  Tooltip,
  Row,
  Col,
  Switch,
  Popconfirm,
  message,
} from "antd";
import JoditEditor from "jodit-react";
import { RcFile } from "antd/es/upload";
import { BiTrash } from "react-icons/bi";
import { NewsCreate } from "../../../../models/News";
import { truncate } from "../../../../utils/accessor";
import { useStore } from "../../../../store/store";
import { format } from "date-fns";
import { useForm } from "antd/es/form/Form";

interface Props {
  handleSubmit: () => void;
  handleUploadFiles: (file: RcFile, FileList: RcFile[]) => void;
  removeFileImage: (index: number) => void;
  handleValuesChange: (changedValues: any, values: any) => void;
  submitLoading: boolean;
  editCurrent: string | null;
  setEditCurrent: (val: string | null) => void;
  formBody: NewsCreate;
  preview: RcFile[] | undefined;
}

const FormNews = ({
  submitLoading,
  editCurrent,
  preview,
  handleUploadFiles,
  removeFileImage,
  handleValuesChange,
  handleSubmit,
  setEditCurrent,
  formBody,
}: Props) => {
  const {
    newsStore: { clearFormBody, clearSelectNews, setFormBody, deletePhotoNews },
  } = useStore();
  const [form] = useForm();

  useEffect(() => {
    if (editCurrent) form.setFieldsValue(formBody);

    return () => {
      if (editCurrent) {
        clearSelectNews();
        clearFormBody();
        setEditCurrent(null);
      }
    };
  }, []);

  const handleSetMainPhotoNews = (id: string) => {
    setFormBody({
      newsPhotos: formBody.newsPhotos?.map((a) =>
        Object.assign(a, { isMain: id === a.id ? true : false })
      ),
    });
  };

  const handleRemovePhoto = async (id: string) => {
    await deletePhotoNews(id).then(() => {
      message.success("สำเร็จ", 2);
    });
  };

  return (
    <Form
      form={form}
      className="py-4 px-2 md:py-8 md:px-4 xl:py-12 xl:px-8 shadow-46 rounded-lg"
      layout="vertical"
      onValuesChange={handleValuesChange}
      onFinish={handleSubmit}
    >
      <Row gutter={[16, 16]}>
        <Col xs={24} lg={12}>
          <Form.Item
            name="title"
            label="หัวข้อ"
            rules={[{ required: true, message: "กรุณากรอกข้อมูล" }]}
          >
            <Input.TextArea
              showCount
              maxLength={120}
              autoSize={{ minRows: 1, maxRows: 4 }}
            />
          </Form.Item>

          <Form.Item name="subTitle" label="รายละเอียดเพิ่มเติม">
            <Input.TextArea
              showCount
              maxLength={300}
              autoSize={{ minRows: 1, maxRows: 4 }}
            />
          </Form.Item>

          <Form.Item
            name="body"
            label="เนื้อหา"
            rules={[{ required: true, message: "กรุณากรอกข้อมูล" }]}
          >
            <JoditEditor value={form.getFieldValue("body")} />
          </Form.Item>
        </Col>

        <Col xs={24} lg={12}>
          <Form.Item label="อัพโหลดรูปภาพ" valuePropName="fileList" required>
            <>
              <Upload.Dragger
                multiple
                showUploadList={false}
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
                      <div className="relative rounded-md shadow-md w-full h-36">
                        <img
                          className="w-full h-full object-cover rounded-md shadow-md"
                          src={URL.createObjectURL(img)}
                        />
                        <Tooltip placement="top" title="นำออก">
                          <button
                            type="button"
                            onClick={() => removeFileImage(i)}
                            className="absolute top-2 right-2 text-gray-600 hover:text-red-600"
                          >
                            <svg
                              className="h-5 w-5 fill-current"
                              viewBox="0 0 24 24"
                            >
                              <path d="M18.364 5.636a.996.996 0 0 0-1.414 0L12 10.586 7.05 5.636a.996.996 0 1 0-1.414 1.414L10.586 12l-4.95 4.95a.996.996 0 1 0 1.414 1.414L12 13.414l4.95 4.95a.996.996 0 1 0 1.414-1.414L13.414 12l4.95-4.95a.996.996 0 0 0 0-1.414z" />
                            </svg>
                          </button>
                        </Tooltip>
                      </div>
                    </Col>
                  ))}
                </Row>
              )}

              {editCurrent && (
                <Row gutter={[16, 16]} className="mt-4">
                  {formBody.newsPhotos?.map((val, i) => (
                    <Col key={i} xs={12} md={8} lg={6}>
                      <div className="relative rounded-md shadow-md w-full h-36">
                        <img
                          className="w-full h-full object-cover rounded-md shadow-md"
                          src={val.previewURL}
                        />
                        <Tooltip placement="top" title="นำออก">
                          <button
                            type="button"
                            onClick={() => handleRemovePhoto(val.id)}
                            disabled={val.isMain}
                            className="absolute top-2 right-2 text-gray-600 hover:text-red-600"
                          >
                            <svg
                              className="h-5 w-5 fill-current"
                              viewBox="0 0 24 24"
                            >
                              <path d="M18.364 5.636a.996.996 0 0 0-1.414 0L12 10.586 7.05 5.636a.996.996 0 1 0-1.414 1.414L10.586 12l-4.95 4.95a.996.996 0 1 0 1.414 1.414L12 13.414l4.95 4.95a.996.996 0 1 0 1.414-1.414L13.414 12l4.95-4.95a.996.996 0 0 0 0-1.414z" />
                            </svg>
                          </button>
                        </Tooltip>

                        <div className="absolute bottom-2 right-2">
                          <Tooltip placement="top" title="ตั้งเป็นรูปปก">
                            <Switch
                              disabled={val.isMain}
                              onClick={() => handleSetMainPhotoNews(val.id)}
                              defaultChecked={val.isMain}
                            />
                          </Tooltip>
                        </div>
                      </div>
                    </Col>
                  ))}
                </Row>
              )}
            </>
          </Form.Item>
        </Col>
      </Row>

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
