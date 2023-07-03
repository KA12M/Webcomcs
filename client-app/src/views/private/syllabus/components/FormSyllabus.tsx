import React, { useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import { useStore } from "./../../../../store/store";
import {
  Button,
  Col,
  DatePicker,
  Divider,
  Form,
  Row,
  Space,
  Typography,
  Upload,
} from "antd";
import { useForm } from "antd/es/form/Form";
import InputSyllabus from "./InputSyllabus";
import InputListSyllabus from "./InputListSyllabus";
import { RcFile, UploadChangeParam, UploadFile } from "antd/es/upload";
import { InboxOutlined } from "@ant-design/icons";
import InputListSubject from "./InputListSubject";
import { message } from "antd";
import moment from "moment";

const PlaceholderUpload = () => (
  <>
    <p className="ant-upload-drag-icon">
      <InboxOutlined />
    </p>
    <p className="ant-upload-text">
      คลิ้กหรือลากไฟล์ไปยังพื้นที่นี้เพื่ออัปโหลด
    </p>
    <p className="ant-upload-hint">รองรับการอัปโหลดครั้งเดียว</p>
  </>
);

const FormSyllabus = ({ mapTable, setFormMode }: any) => {
  const {
    syllabusStore: {
      formBody,
      setFormBody,
      submittingLoading,
      createSyllabus,
      clearFormBody,
      loadSyllabuses,
      editSyllabus,
    },
  } = useStore();

  const [previewFile, setPreviewFile] = useState<any>();

  const [form] = useForm();

  useEffect(() => {
    form.setFieldsValue(formBody);
    if (formBody.yearPreview)
      form.setFieldsValue({
        year: moment(`${formBody.yearPreview}-01-01`, "YYYY-MM-DD"),
      });
    if (formBody.pdf) setPreviewFile(formBody.pdf);

    return () => {
      clearFormBody();
    };
  }, []);

  const handleSubmitForm = async (values: any) => {
    if (!formBody.id && !previewFile)
      return message.error("กรุณาอัพโหลดไฟล์เอกสาร");
    setFormBody({ pdf: previewFile.response || previewFile });
    if (formBody.id) {
      await editSyllabus()
        .then(clearFormBody)
        .then(successActions)
        .catch((error) => message.error(error));
    } else if (!formBody.id && previewFile)
      await createSyllabus()
        .then(clearFormBody)
        .then(successActions)
        .catch((error) => message.error(error));
    else message.error("กรุณาอัพโหลดไฟล์เอกสาร");
  };

  const successActions = () => {
    message.success("สำเร็จ");
    loadSyllabuses().then(mapTable);
    setFormMode(false);
  };

  const handleUploadFile = (info: UploadChangeParam<UploadFile<any>>) => {
    if (info.file.status === "done") {
      setPreviewFile(info.file);
    } else if (info.file.status === "error")
      message.error(`${info.file.response}, file upload failed.`);
  };

  return (
    <Form
      form={form}
      className="p-8"
      onValuesChange={(_, values) => setFormBody(values)}
      onFinish={handleSubmitForm}
    >
      <Row>
        <Col sm={24} lg={12} className="lg:pr-2 md:pr-2">
          <div>
            <Typography.Title level={5}>
              <p>ชื่อหลักสูตร</p>
            </Typography.Title>
            <Space wrap>
              <InputSyllabus name="nameTH" label="ภาษาไทย" required />
              <InputSyllabus name="nameEN" label="ภาษาอังกฤษ" required />
            </Space>
          </div>
          <Divider />

          <div>
            <Typography.Title level={5}>
              <p>ชื่อปริญญาและสาขาวิชา</p>
            </Typography.Title>
            <Space wrap>
              <InputSyllabus name="degreeTH" label="ภาษาไทย" required />
              <InputSyllabus name="degreeEN" label="ภาษาอังกฤษ" required />
            </Space>
          </div>
          <Divider />

          <Typography.Title level={5}>
            <p>ปีการศึกษา</p>
          </Typography.Title>
          <Form.Item
            name="year"
            required
            rules={[{ required: true, message: "กรุณากรอกข้อมูล" }]}
          >
            <DatePicker picker="year" placeholder="ปี" />
          </Form.Item>
          <Divider />

          <Typography.Title level={5}>
            <p>วัตถุประสงค์ของหลักสูตรอหลักสูตร</p>
          </Typography.Title>
          <InputListSyllabus name="objective" />
          <Divider />

          <Typography.Title level={5}>
            <p>อาชีพที่สามารถประกอบอาชีพได้หลังสำเร็จการศึกษา</p>
          </Typography.Title>
          <InputListSyllabus name="occupation" />
          <Divider />

          <Form.Item label="อัพโหลดไฟล์เอกสาร" required>
            <Upload.Dragger
              method="post"
              accept=".pdf"
              showUploadList={false}
              onChange={handleUploadFile}
              action={import.meta.env.VITE_API_URL + "/uploadFile/file"}
            >
              {previewFile ? (
                <>{previewFile.name || previewFile}</>
              ) : (
                PlaceholderUpload()
              )}
            </Upload.Dragger>
          </Form.Item>
        </Col>

        <Col sm={24} lg={12} className="lg:pl-2 md:pl-2">
          <div className="w-full">
            <Typography.Title level={5}>
              <p>หมวดวิชาศึกษาทั่วไป</p>
            </Typography.Title>
            <InputListSubject name="subjectGeneral" />
            <Divider />
          </div>

          <div>
            <Typography.Title level={5}>
              <p>หมวดวิชาเฉพาะ</p>
            </Typography.Title>
            <InputListSubject name="subjectSpecific" />
            <Divider />
          </div>

          <div>
            <Typography.Title level={5}>
              <p>หมวดวิชาเลือกเสรี</p>
            </Typography.Title>
            <InputListSubject name="subjectFreeElective" />
            <Divider />
          </div>
        </Col>
      </Row>

      <Form.Item>
        <Button
          shape="round"
          type="primary"
          htmlType="submit"
          loading={submittingLoading}
          children={"บันทึก"}
        />
      </Form.Item>
    </Form>
  );
};

export default observer(FormSyllabus);
