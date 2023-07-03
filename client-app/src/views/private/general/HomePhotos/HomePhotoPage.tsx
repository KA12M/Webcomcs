import React, { useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import {
  Button,
  Switch,
  Image,
  Popconfirm,
  UploadProps,
  Space,
  Tooltip,
  Col,
  Row,
} from "antd";
import { BiTrash } from "react-icons/bi";
import { RcFile } from "antd/es/upload";
import { FieldData } from "rc-field-form/lib/interface";

import PageTitle from "../../../../components/PageTitle";
import FormPhoto from "./FormPhoto";
import { useStore } from "../../../../store/store";
import MyTable from "../../../../components/MyTable";

const HomePhotoPage = () => {
  const columns = [
    {
      title: "รูปภาพ",
      key: "url",
      dataIndex: "url",
    },
    {
      title: "เกี่ยวกับ",
      key: "title",
      dataIndex: "title",
    },
    {
      title: "แสดง",
      key: "isEnable",
      dataIndex: "isEnable",
    },
    {
      title: "จัดการ",
      key: "action",
      render: (photo: any) => (
        <Popconfirm
          placement="topRight"
          title={"ลบ"}
          description={"ข้อมูลรูปภาพจะถูกลบออกจากระบบ"}
          onConfirm={() => deletePhoto(photo.key).then(mapTable)}
        >
          <Tooltip placement="right" title={"ลบ"}>
            <Button
              shape="round"
              danger
              children={<BiTrash size={18} />}
              type="primary"
            />
          </Tooltip>
        </Popconfirm>
      ),
    },
  ];

  const {
    homePhotoStore: {
      GetPhotos,
      photoRegistry,
      tableBody,
      hidden,
      setTable,
      deletePhoto,
      formBody,
      submitLoading,
      clearFormBody,
      addPhoto,
      isLoading,
    },
  } = useStore();

  const [formMode, setFormMode] = useState(false);
  const [preview, setPreview] = useState<RcFile | undefined>(
    formBody.fileImage
  );

  useEffect(() => {
    GetPhotos(false).then(mapTable);
  }, []);

  const mapTable = () => {
    const body: any = [];
    Array.from(photoRegistry.values())?.forEach((photo) =>
      body.push({
        key: photo.id,
        title: photo.title,
        url: (
          <Image
            className="rounded-lg "
            width={240}
            src={photo.url || "error"}
          />
        ),
        isEnable: (
          <Switch
            checkedChildren="แสดง"
            unCheckedChildren="ซ่อน"
            defaultChecked={photo.isEnable}
            onChange={() => hidden(photo).then(mapTable)}
          />
        ),
      })
    );
    setTable(body);
  };

  const handleSetFormMode = () => setFormMode(!formMode);

  const onUploadChange: UploadProps["beforeUpload"] = (file: RcFile) => {
    formBody.fileImage = file;
    setPreview(file);
  };

  const handleSubmit = () => {
    addPhoto().then(() => {
      GetPhotos(false).then(mapTable);
      setPreview(undefined);
      clearFormBody();
      handleSetFormMode();
    });
  };

  const handleChange = (changedFields: FieldData[]) => {
    formBody.title = changedFields.find((a) => a.name == "title")?.value;
  };

  return (
    <>
      <PageTitle text="รูปภาพหน้าเว็บ" />

      <Space className="mb-4">
        <Button
          shape="round"
          type={formMode ? "default" : "primary"}
          onClick={handleSetFormMode}
        >
          {formMode ? "กลับ" : "เพิ่ม"}
        </Button>
      </Space>

      {formMode ? (
        <div className="shadow-46 rounded-lg ">
          <FormPhoto
            preview={preview}
            formBody={formBody}
            submitLoading={submitLoading}
            onUploadChange={onUploadChange}
            handleSubmit={handleSubmit}
            handleFieldsChange={handleChange}
          />
        </div>
      ) : (
        <Row className="shadow-46 rounded-lg">
          <Col span={24}>
            <Image.PreviewGroup>
              <MyTable
                data={tableBody}
                columns={columns}
                isLoading={isLoading}
              />
            </Image.PreviewGroup>
          </Col>
        </Row>
      )}
    </>
  );
};

export default observer(HomePhotoPage);
