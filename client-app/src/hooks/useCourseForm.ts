import React, { useState } from "react";
import { Photo } from "../models/Course";
import { router } from "../routes/Routes";
import { useStore } from "../store/store";
import { message } from "antd";
import { UploadChangeParam, UploadFile } from "antd/es/upload";
import { useParams } from "react-router-dom";

const useCourseForm = () => {
  const { id } = useParams();
  const {
    courseStore: { createCourse, updateCourse },
  } = useStore();
  const [formMode, setFormMode] = useState(false);

  const [load, setLoad] = useState(true);

  const handleUploadImage = (
    info: UploadChangeParam<UploadFile<any>>,
    setFileList: any
  ) => {
    const { status, response } = info.file;
    if (status == "done") {
      setFileList((prevFileList: any) => [...prevFileList, { url: response }]);
    }
  };

  const handleSubmit = (values: any, fileList: Photo[]) => {
    if (fileList.length < 1) return message.warning("กรุณาอัพโหลดรูปภาพ");

    let body: any = Object.assign(values, {
      id,
      photos: fileList,
    });
    if (body.id)
      return updateCourse(body).then(() => {
        setFormMode(false);
      });
    else
      createCourse(body).then(() => {
        router.navigate(-1);
      });
  };

  return {
    load,
    setLoad,
    handleSubmit,
    handleUploadImage,
    formMode,
    setFormMode,
  };
};

export default useCourseForm;
