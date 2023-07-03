import React, { useEffect } from "react";
import { observer } from "mobx-react-lite";
import { PlusOutlined } from "@ant-design/icons";
import { Button, Col, Form, Input, Row, Upload } from "antd";

import JoditEditor from "jodit-react";
import CardImage from "./CardImage";
import { CourseDetail, Photo } from "../../../../../models/Course";
import { useStore } from "../../../../../store/store";
import useCourseForm from "../../../../../hooks/useCourseForm";
import { useParams } from "react-router-dom";
import { config } from "../../../../../constants/config";

const FormCourse = ({ form, fileList, setFileList, submit }: any) => {
  const { id } = useParams();
  const {
    courseStore: { submittingLoading, courseSelected, loadCourse },
  } = useStore();
  const { handleUploadImage } = useCourseForm();

  useEffect(() => {
    if (id && courseSelected) {
      initialData(courseSelected);
    } else if (id) {
      loadCourse(id).then(initialData);
    }
  }, []);

  const initialData = (data: CourseDetail) => {
    form.setFieldsValue({ title: data?.title, description: data?.description });
    setFileList(data.photos);
  };

  return (
    <Form
      layout="vertical"
      form={form}
      onFinish={submit}
      className="px-4 py-8 mb-2"
    >
      <Form.Item
        name="title"
        label="ชื่อหลักสูตร"
        required
        rules={[{ required: true, message: "กรุณากรอกข้อมูล" }]}
      >
        <Input.TextArea
          showCount
          maxLength={60}
          autoSize={{ minRows: 1, maxRows: 4 }}
        />
      </Form.Item>

      <Form.Item name="description" label="รายละเอียด">
        <JoditEditor value={form.getFieldValue("description")} />
      </Form.Item>

      <Form.Item>
        <Upload
          multiple
          previewFile={undefined}
          showUploadList={false}
          accept="image/jpeg, image/png,  image/jpg"
          action={config.urlUploadFile + "?quality=100"}
          onChange={(info) => handleUploadImage(info, setFileList)}
        >
          <Button type="dashed" className="mt-4">
            อัพโหลดรูปภาพ
          </Button>
        </Upload>
      </Form.Item>

      <Row className="pb-4" gutter={[16, 16]}>
        {fileList.map((file: Photo, i: number) => (
          <Col key={i} xs={12} sm={12} md={8} lg={6}>
            <CardImage
              photo={file}
              remove={() => {
                setFileList(
                  fileList.filter((_: any, index: any) => i != index)
                );
              }}
              onSetMain={() => {
                const updatedPhotos = fileList.map((p: any, index: number) => {
                  if (i == index) return { ...p, isMain: true };
                  else return { ...p, isMain: false };
                });
                setFileList(updatedPhotos);
              }}
            />
          </Col>
        ))}
      </Row>

      <Form.Item>
        <Button
          type="primary"
          shape="round"
          htmlType="submit"
          loading={submittingLoading}
        >
          บันทึก
        </Button>
      </Form.Item>
    </Form>
  );
};

export default observer(FormCourse);
