import React, { useEffect } from "react";
import { observer } from "mobx-react-lite";
import { Button, Col, Form, Input, Row, Tooltip, Upload } from "antd";
import { useForm } from "antd/es/form/Form";
import { useStore } from "../../../../store/store";
import { config } from "../../../../constants/config";
import ImgCrop from "antd-img-crop";
import URLImage from "../../../../utils/URL";
import { PlusOutlined, InboxOutlined } from "@ant-design/icons";
import JoditEditor from "jodit-react";
import { Photo } from "../../../../models/ComSciSubject";

const ComsciSubjectForm = ({
  handleSubmit,
  currentEdit,
  setCurrentEdit,
  file,
  setFile,
  setImgList,
  handleUploadImageList,
  imgList,
  handleRemoveImgFromList,
  handleUploadImage,
}: any) => {
  const {
    comSciSubject: { loadSubject, clearSelect, submitLoading },
  } = useStore();

  const [form] = useForm();

  useEffect(() => {
    if (currentEdit) initialData();

    return () => {
      clearSelect();
      setCurrentEdit(null);
    };
  }, []);

  const initialData = async () => {
    await loadSubject(currentEdit).then((val) => {
      form.setFieldsValue(val);
      setFile(val.icon);
      setImgList(val.photos);
    });
  };

  return (
    <Form
      form={form}
      className="py-4 px-2 md:py-8 md:px-4 xl:py-12 xl:px-8 shadow-46 rounded-lg"
      layout="vertical"
      onFinish={handleSubmit}
    >
      <Row gutter={[16, 16]}>
        <Col xs={24} lg={12}>
          <Form.Item label="รูปภาพหลัก" required>
            <ImgCrop modalTitle="สัดส่วนรูปภาพ" quality={100}>
              <Upload
                accept="image/jpeg, image/png,  image/jpg"
                action={
                  config.urlUploadFile + "?quality=100&saveOriginalFile=true"
                }
                listType="picture-card"
                previewFile={undefined}
                showUploadList={false}
                onChange={handleUploadImage}
              >
                {file ? (
                  <img
                    style={{ width: 120, height: 100 }}
                    src={URLImage(file)}
                    className="object-top object-cover rounded-lg"
                  />
                ) : (
                  <div>
                    <PlusOutlined />
                    <div style={{ marginTop: 8 }}>อัพโหลดรูปภาพ</div>
                  </div>
                )}
              </Upload>
            </ImgCrop>
          </Form.Item>

          <Form.Item
            name="subjectName"
            label="ชื่อหัวข้อ"
            required
            rules={[{ required: true, message: "กรุณากรอกข้อมูล" }]}
          >
            <Input.TextArea
              autoSize={{ minRows: 1, maxRows: 2 }}
              maxLength={60}
              showCount
            />
          </Form.Item>

          <Form.Item
            name="subTitle"
            label="คำอธิบายเพิ่มเติม"
            required
            rules={[{ required: true, message: "กรุณากรอกข้อมูล" }]}
          >
            <Input.TextArea
              autoSize={{ minRows: 1, maxRows: 2 }}
              maxLength={120}
              showCount
            />
          </Form.Item>

          <Form.Item name="description" label="เนื้อหา">
            <JoditEditor value={form.getFieldValue("description")} />
          </Form.Item>
        </Col>

        <Col xs={24} lg={12}>
          <Form.Item>
            <Upload.Dragger
              multiple
              accept="image/jpeg, image/png,  image/jpg"
              action={config.urlUploadFile}
              previewFile={undefined}
              showUploadList={false}
              onChange={handleUploadImageList}
            >
              <p className="ant-upload-drag-icon">
                <InboxOutlined />
              </p>
              <p className="ant-upload-text">
                คลิ้กหรือลากไฟล์ไปยังพื้นที่นี้เพื่ออัปโหลด
              </p>
              <p className="ant-upload-hint">รองรับการอัปโหลดหลายครั้ง</p>
            </Upload.Dragger>
          </Form.Item>

          <Row className="pb-4" gutter={[16, 16]}>
            {imgList.map((file: Photo, i: number) => (
              <Col key={i} xs={12} sm={12} md={8} lg={6}>
                <div className="relative rounded-md shadow-md w-full h-36">
                  <img
                    className="w-full h-full object-cover rounded-md shadow-md"
                    src={URLImage(file.url)}
                  />
                  <Tooltip placement="top" title="นำออก">
                    <button
                      type="button"
                      onClick={() => handleRemoveImgFromList(i)}
                      className="absolute top-2 right-2 text-gray-600 hover:text-red-600"
                    >
                      <svg className="h-5 w-5 fill-current" viewBox="0 0 24 24">
                        <path d="M18.364 5.636a.996.996 0 0 0-1.414 0L12 10.586 7.05 5.636a.996.996 0 1 0-1.414 1.414L10.586 12l-4.95 4.95a.996.996 0 1 0 1.414 1.414L12 13.414l4.95 4.95a.996.996 0 1 0 1.414-1.414L13.414 12l4.95-4.95a.996.996 0 0 0 0-1.414z" />
                      </svg>
                    </button>
                  </Tooltip>
                </div>
              </Col>
            ))}
          </Row>
        </Col>
      </Row>

      <Form.Item>
        <Button
          type="primary"
          shape="round"
          htmlType="submit"
          loading={submitLoading}
        >
          บันทึก
        </Button>
      </Form.Item>
    </Form>
  );
};

export default observer(ComsciSubjectForm);
