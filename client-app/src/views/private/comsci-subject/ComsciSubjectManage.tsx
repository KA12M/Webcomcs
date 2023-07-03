import React, { useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import { useStore } from "../../../store/store";
import MyTable from "../../../components/MyTable";
import ComsciSubjectColumn from "./components/ComsciSubjectColumn";
import { Button, Col, Row, Space } from "antd";
import PageTitle from "../../../components/PageTitle";
import ComsciSubjectForm from "./components/ComsciSubjectForm";
import { Photo } from "../../../models/ComSciSubject";
import { UploadChangeParam, UploadFile } from "antd/es/upload";

const ComsciSubjectManage = () => {
  const {
    comSciSubject: {
      comsciSubjectRegistry,
      loading,
      loadSubjects,
      subjectSelected,
      tableBody,
      setTableBody,
      updateSubject,
      createSubject,
    },
  } = useStore();

  const [editMode, setEditMode] = useState<boolean>(false);
  const [currentEdit, setCurrentEdit] = useState<any | null>(null);
  const [file, setFile] = useState<any>();
  const [imgList, setImgList] = useState<Photo[]>([]);

  useEffect(() => {
    loadSubjects().then(mapTable);
  }, []);

  const mapTable = () => {
    let body: any[] = Array.from(comsciSubjectRegistry.values()).map((el) => ({
      key: el.id,
      icon: (
        <img src={el.iconPreview} className="w-16 h-16 rounded-md shadow-md" />
      ),
      subjectName: el.subjectName,
    }));
    setTableBody(body);
  };

  const handleSetMode = () => setEditMode(!editMode);

  const handleSetEdit = (id: string) => {
    setCurrentEdit(id);
    setEditMode(true);
  };

  const handleSubmit = async (values: any) => {
    var body = Object.assign(values, { icon: file, photos: imgList });
    if (currentEdit) {
      body.id = currentEdit;
      await updateSubject(body)
        .then(mapTable)
        .then(() => setEditMode(false));
    } else
      await createSubject(body)
        .then(mapTable)
        .then(() => setEditMode(false));
  };

  const handleUploadImage = (info: UploadChangeParam<UploadFile<any>>) => {
    const { status, response } = info.file;
    if (status == "done") {
      setFile(response);
    }
  };

  const handleUploadImageList = (info: UploadChangeParam<UploadFile<any>>) => {
    const { status, response } = info.file;
    if (status == "done") {
      setImgList([...imgList, { url: response }]);
    }
  };

  const handleRemoveImgFromList = (index: number) => {
    setImgList(imgList.filter((_, i) => i !== index));
  };

  return (
    <>
      <PageTitle
        text="สิ่งที่เรียนในสาขา"
        tail={currentEdit && subjectSelected && subjectSelected!.subjectName}
      />

      <Space wrap className="mb-4">
        <Button
          shape="round"
          type={editMode ? "default" : "primary"}
          onClick={handleSetMode}
          children={editMode ? "กลับ" : "เพิ่ม"}
        />
      </Space>

      {editMode ? (
        <ComsciSubjectForm
          handleSubmit={handleSubmit}
          currentEdit={currentEdit}
          setCurrentEdit={setCurrentEdit}
          file={file}
          setFile={setFile}
          setImgList={setImgList}
          handleUploadImageList={handleUploadImageList}
          imgList={imgList}
          handleRemoveImgFromList={handleRemoveImgFromList}
          handleUploadImage={handleUploadImage}
        />
      ) : (
        <Row className="shadow-46 rounded-lg">
          <Col span={24}>
            <MyTable
              data={tableBody}
              isLoading={loading}
              columns={ComsciSubjectColumn({ handleSetEdit, mapTable })}
            />
          </Col>
        </Row>
      )}
    </>
  );
};

export default observer(ComsciSubjectManage);
