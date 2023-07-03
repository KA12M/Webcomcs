import React, { useEffect, useRef, useState } from "react";
import {
  Button,
  Divider,
  Form,
  Input,
  InputRef,
  Select,
  Space,
  Upload,
  Image,
} from "antd";
import { useForm } from "antd/es/form/Form";
import { PlusOutlined } from "@ant-design/icons";
import { RcFile } from "antd/es/upload";
import { observer } from "mobx-react-lite";

import { useStore } from "../../../../store/store";
import ImgCrop from "antd-img-crop"; 
import JoditEditor from "jodit-react";

const FormLecturer = ({
  setEditMode,
  mapTable,
  currentEdit,
  setCurrentEdit,
}: any) => {
  const {
    lecturerStore: {
      submitLoading,
      lecturerRegistry,
      setPositionList,
      addLecturer,
      loadLecturers,
      editLecturer,
      prefixList,
    },
  } = useStore();
  const [uploadImage, setUploadImage] = useState<RcFile | null>();
  const [previewImage, setPreviewImage] = useState<string | null>();
  const [form] = useForm();

  const [prefixes, setPrefixes] = useState(prefixList());
  const [positions, setPositions] = useState(setPositionList());
  const [inputPrefix, setInputPrefix] = useState("");
  const [inputPosition, setInputPosition] = useState("");
  const inputRef = useRef<InputRef>(null);

  useEffect(() => {
    if (currentEdit) {
      let data = lecturerRegistry.get(currentEdit);
      form.setFieldsValue(data);
      setPreviewImage(data?.imagePreview);
    }

    return () => {
      if (currentEdit) handleReset();
    };
  }, []);

  const addItem = (
    e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>
  ) => {
    e.preventDefault();
    if (inputPrefix && !prefixes.includes(inputPrefix)) {
      setPrefixes([...prefixes, inputPrefix]);
      setInputPrefix("");
      inputRef.current?.focus();
    }
  };

  const addPositionItem = (
    e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>
  ) => {
    e.preventDefault();
    if (inputPosition && !positions.includes(inputPosition)) {
      setPositions([...positions, inputPosition]);
      setInputPosition("");
      inputRef.current?.focus();
    }
  };

  const handleSubmit = (values: any) => {
    let bodyForm = Object.assign(values, {
      id: currentEdit,
      fileImage: uploadImage,
    });

    if (currentEdit)
      editLecturer(bodyForm)
        .then(handleReset)
        .then(loadLecturers)
        .then(mapTable);
    else
      addLecturer(bodyForm)
        .then(handleReset)
        .then(loadLecturers)
        .then(mapTable);
  };

  const handleUpload = (file: RcFile) => {
    setUploadImage(file);
    setPreviewImage(URL.createObjectURL(file));
  };

  const handleReset = () => {
    setEditMode(false);
    setUploadImage(null);
    setCurrentEdit(null);
    form.resetFields();
  };

  return (
    <Form
      form={form}
      className="p-8"
      layout="vertical" 
      onFinish={handleSubmit}
    >
      <Form.Item>
        <ImgCrop modalTitle="สัดส่วนรูปภาพ" quality={100}>
          <Upload
            listType="picture-card"
            showUploadList={false}
            beforeUpload={handleUpload}
          >
            {previewImage ? (
              <Image
                style={{ width: 120, height: 100 }}
                className="object-top object-cover rounded-lg"
                src={previewImage}
                preview={false}
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
        name="prefix"
        label="คำนำหน้าชื่อ"
        rules={[{ required: true, message: "กรุณากรอกข้อมูล" }]}
      >
        <Select
          style={{ width: 300 }}
          placeholder="คำนำหน้าชื่อ"
          options={prefixes.map((item) => ({ label: item, value: item }))}
          dropdownRender={(menu) => (
            <>
              {menu}
              <Divider style={{ margin: "8px 0" }} />
              <Space style={{ padding: "0 8px 4px" }}>
                <Input
                  value={inputPrefix}
                  ref={inputRef}
                  onChange={(e) => setInputPrefix(e.target.value)}
                  placeholder="กรอกคำนำหน้าชื่อ"
                />
                <Button type="text" icon={<PlusOutlined />} onClick={addItem}>
                  เพิ่ม
                </Button>
              </Space>
            </>
          )}
        />
      </Form.Item>

      <Form.Item
        name="fullName"
        label="ชื่อ-นามสกุล"
        rules={[{ required: true, message: "กรุณากรอกข้อมูล" }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="position"
        label="ตำแหน่ง"
        rules={[{ required: true, message: "กรุณากรอกข้อมูล" }]}
      >
        <Select
          style={{ width: 300 }}
          placeholder="ตำแหน่ง"
          options={positions.map((item) => ({ label: item, value: item }))}
          dropdownRender={(menu) => (
            <>
              {menu}
              <Divider style={{ margin: "8px 0" }} />
              <Space style={{ padding: "0 8px 4px" }}>
                <Input
                  value={inputPosition}
                  ref={inputRef}
                  onChange={(e) => setInputPosition(e.target.value)}
                  placeholder="กรอกชื่อตำแหน่ง"
                />
                <Button
                  type="text"
                  icon={<PlusOutlined />}
                  onClick={addPositionItem}
                >
                  เพิ่ม
                </Button>
              </Space>
            </>
          )}
        />
      </Form.Item>

      <Form.Item name="expert" label="รายละเอียดเพิ่มเติม">
        <JoditEditor value={form.getFieldValue("export")} />
      </Form.Item>

      <Form.Item>
        <Button
          loading={submitLoading}
          shape="round"
          type="primary"
          htmlType="submit"
          children={"บันทึก"}
        />
      </Form.Item>
    </Form>
  );
};

export default observer(FormLecturer);
