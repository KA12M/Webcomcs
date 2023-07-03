import React, { useEffect, useState } from "react";
import { BiInfoCircle } from "react-icons/bi";
import {
  Button,
  Form,
  Image,
  Tour,
  Upload,
  message,
  Input,
  Row,
  Col,
} from "antd";
import { InboxOutlined } from "@ant-design/icons";
import { RcFile } from "antd/es/upload";
import { observer } from "mobx-react-lite";

import ProjectInput from "./components/ProjectInput";
import StepTourYoutubeLink from "../../../private/settingPage/StepTourYoutubeLink";
import { useStore } from "../../../../store/store";

import ProjectConsultants from "./components/ProjectConsultants";
import ProjectKeyWord from "./components/ProjectKeyWord";
import { useForm } from "antd/es/form/Form";
import JoditEditor from "jodit-react";
import { router } from "../../../../routes/Routes";
import { RoutePath } from "../../../../constants/RoutePath";

const FormProject = ({ currentEdit }: { currentEdit: any }) => {
  const {
    userStore: { user },
    commonStore: { json },
    projectStore: {
      projectRegistry,
      submitLoading,
      setFormBody,
      createProject,
      clearFormBody,
      loadProjectByUsername,
      updateProject,
      formBody,
    },
  } = useStore();

  const [tourLinkYoutube, setTourLinkYoutube] = useState(false);
  const [previewImage, setPreviewImage] = useState<any>();
  const [previewPDF, setPreviewPDF] = useState<any>();

  const [form] = useForm();

  useEffect(() => {
    if (currentEdit) initial();

    return () => {
      if (currentEdit) {
        window.scrollTo(0, 0);
        clearFormBody();
      }
    };
  }, []);

  const initial = async () => {
    let body = projectRegistry.get(currentEdit);

    if (!body || body.student.username !== user!.username)
      router.navigate(RoutePath.projects, { replace: true });

    setFormBody({ ...body });
    form.setFieldsValue(formBody);
    setPreviewPDF(formBody.pdf);
    setPreviewImage(formBody.imagePreview);
  };

  const handleUploadFileImage = (file: RcFile) => {
    setPreviewImage(URL.createObjectURL(file));
    setFormBody({ fileImage: file });
  };
  const handleUploadFilePDF = (file: RcFile) => {
    setPreviewPDF(file);
    setFormBody({ filePDF: file });
  };

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

  const handleSubmitForm = () => {
    if (!currentEdit) {
      createProject()
        .then(clearFormBody)
        .then(successActions)
        .catch((err) => message.error(err));
    } else {
      updateProject().then(clearFormBody).then(successActions);
    }
  };

  const successActions = () => {
    loadProjectByUsername(user?.username!);
    router.navigate(RoutePath.projects);
    message.success("สำเร็จ");
  };

  return (
    <Form
      form={form}
      layout="vertical"
      onValuesChange={setFormBody}
      onFinish={handleSubmitForm}
      className="overflow-clip w-full"
    >
      <Row gutter={[16, 16]}>
        <Col span={24} lg={12}>
          <Form.Item
            name="nameTH"
            label="ชื่อโครงงาน ภาษาไทย"
            rules={[{ required: true, message: "กรุณากรอกข้อมูล" }]}
          >
            <Input.TextArea
              showCount
              maxLength={120}
              autoSize={{ minRows: 1, maxRows: 4 }}
            />
          </Form.Item>

          <Form.Item
            name="nameEN"
            label="ชื่อโครงงาน ภาษาอังกฤษ"
            rules={[{ required: true, message: "กรุณากรอกข้อมูล" }]}
          >
            <Input.TextArea
              showCount
              maxLength={120}
              autoSize={{ minRows: 1, maxRows: 4 }}
            />
          </Form.Item>

          <ProjectInput
            name="videoUrl"
            label="ลิ้งยูทูป"
            rules={[
              {
                type: "url",
                warningOnly: true,
                message: "รูปแบบ URL ไม่ถูกต้อง",
              },
            ]}
            required={false}
            help={
              <BiInfoCircle
                className="cursor-pointer"
                onClick={() => setTourLinkYoutube(true)}
              />
            }
          />
          <ProjectInput
            name="webUrl"
            label="ลิ้งตัวอย่างเว็บ"
            required={false}
            rules={[
              {
                type: "url",
                warningOnly: true,
                message: "รูปแบบ URL ไม่ถูกต้อง",
              },
            ]}
          />
          <ProjectInput
            name="githubUrl"
            label="Github"
            required={false}
            rules={[
              {
                type: "url",
                warningOnly: true,
                message: "รูปแบบ URL ไม่ถูกต้อง",
              },
            ]}
          />
          <Form.Item
            name="description"
            label="รายละเอียด"
            rules={[{ required: true, message: "กรุณากรอกข้อมูล" }]}
            className="overflow-clip"
          >
            <JoditEditor value={form.getFieldValue("description")} />
          </Form.Item>
        </Col>

        <Col span={24} lg={12}>
          <Form.Item label="อัพโหลดรูปภาพ" required>
            <Upload.Dragger
              showUploadList={false}
              beforeUpload={handleUploadFileImage}
              accept=".png,.jpg"
            >
              {previewImage ? (
                <Image
                  preview={false}
                  className="object-cover object-top"
                  width={280}
                  height={160}
                  src={previewImage}
                />
              ) : (
                PlaceholderUpload()
              )}
            </Upload.Dragger>
          </Form.Item>

          <Form.Item label="อัพโหลดไฟล์เอกสาร" required>
            <Upload.Dragger
              showUploadList={false}
              beforeUpload={handleUploadFilePDF}
              accept=".pdf"
            >
              {previewPDF ? (
                <>{previewPDF.name || previewPDF}</>
              ) : (
                PlaceholderUpload()
              )}
            </Upload.Dragger>
          </Form.Item>

          <Form.Item label="ที่ปรึกษา">
            <ProjectConsultants currentEdit={currentEdit} />
          </Form.Item>

          <Form.Item label="คำสำคัญ">
            <ProjectKeyWord currentEdit={currentEdit} />
          </Form.Item>

          <Form.Item>
            <Button
              loading={submitLoading}
              shape="round"
              type="primary"
              htmlType="submit"
            >
              บันทึก
            </Button>
          </Form.Item>
        </Col>
      </Row>

      <Tour
        animated
        open={tourLinkYoutube}
        onClose={() => setTourLinkYoutube(false)}
        steps={StepTourYoutubeLink(json["youtube-guidelines"])}
      />
    </Form>
  );
};

export default observer(FormProject);
