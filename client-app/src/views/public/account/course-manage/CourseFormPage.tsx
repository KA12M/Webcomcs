import React, { useEffect, useState } from "react";
import Main from "../../../../containers/Main";
import { Breadcrumb, Skeleton } from "antd";
import { Link, useParams } from "react-router-dom";
import { RoutePath } from "../../../../constants/RoutePath";
import FormCourse from "./components/FormCourse";
import { observer } from "mobx-react-lite";
import { useStore } from "../../../../store/store";
import useCourseForm from "../../../../hooks/useCourseForm";
import { CourseDetail, Photo } from "../../../../models/Course";
import { useForm } from "antd/es/form/Form";
import { router } from "../../../../routes/Routes";
import BreadcrumbPublic from "../../../../components/BreadcrumbPublic";

const CourseFormPage = () => {
  const { id } = useParams();
  const {
    courseStore: { loadCourse, loading, courseSelected },
  } = useStore();
  const { setLoad, load, handleSubmit } = useCourseForm();
  const [form] = useForm();
  const [fileList, setFileList] = useState<Photo[]>([]);

  useEffect(() => {
    if (id && courseSelected) {
      initialData(courseSelected);
      setLoad(false);
    } else if (id) {
      loadCourse(id)
        .then(initialData)
        .finally(() => setLoad(false));
    } else setLoad(false);
  }, []);

  const initialData = (data: CourseDetail) => {
    form.setFieldsValue({ title: data?.title, description: data?.description });
    setFileList(data.photos);
  };

  const submit = (values: any) => {
    handleSubmit(values, fileList)?.then(() => {
      router.navigate(-1);
    });
  };

  return (
    <div className="min-h-screen">
      <div className="bg-gray-100">
        <div className="container grid px-6 mx-auto">
          <BreadcrumbPublic
            text="ฟอร์มกรอกข้อมูลหลักสูตร"
            links={
              <Breadcrumb.Item>
                <Link to={RoutePath.courses} children="หลักสูตร" />
              </Breadcrumb.Item>
            }
          />
        </div>
      </div>

      <Main hScreen={false}>  
        {load || loading ? (
          <Skeleton active className="px-2 py-6"></Skeleton>
        ) : (
          <div className="min-h-screen bg-white rounded-md mb-4 shadow-lg">
            <FormCourse
              form={form}
              fileList={fileList}
              setFileList={setFileList}
              currentEdit={id}
              submit={submit}
            />
          </div>
        )}
      </Main>
    </div>
  );
};

export default observer(CourseFormPage);
