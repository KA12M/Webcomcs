import React, { useState } from "react";
import { Button, Carousel, Dropdown, MenuProps } from "antd";
import { observer } from "mobx-react-lite";
import { useParams } from "react-router-dom";
import { useForm } from "antd/es/form/Form";
import { useStore } from "../../../../../store/store";
import URLImage from "../../../../../utils/URL";
import LecturerCourse from "../../../../../components/LecturerCourse";
import Description from "../../../../../components/Description";
import { Photo } from "../../../../../models/Course";
import FormCourse from "../../../account/course-manage/components/FormCourse";
import useCourseForm from "./../../../../../hooks/useCourseForm";
import { MyIcon } from "../../../../../constants/MyIcon/index";

const LeftContent = () => {
  const { id } = useParams();
  const {
    courseStore: { courseSelected },
    userStore: { user },
  } = useStore();
  const { formMode, setFormMode, handleSubmit } = useCourseForm();

  const [form] = useForm();
  const [fileList, setFileList] = useState<Photo[]>([]);

  const submit = (values: any) => {
    handleSubmit(values, fileList)?.then(() => {
      setFormMode(false);
      window.scrollTo({
        top: -window.pageYOffset,
        behavior: "smooth",
      });
    });
  };

  const items: MenuProps["items"] = [
    {
      key: "edit",
      label: "แก้ไข",
      onClick: () => setFormMode(!formMode),
    },
  ];

  return (
    <>
      <div className="relative shadow-md">
        <Carousel autoplay draggable lazyLoad="progressive">
          {courseSelected?.photos.map((photo, i) => (
            <img
              key={i}
              className="h-80 object-cover object-center"
              src={URLImage(photo.url)}
            />
          ))}
        </Carousel>
        <div className="absolute bottom-0 left-0 p-4 bg-gradient-to-t from-black text-gray-200 w-full flex justify-between">
          <h3 className="text-lg font-bold leading-5 uppercase">
            {courseSelected?.title}
          </h3>
          {courseSelected?.lecturer.username == user?.username && (
            <div>
              <Dropdown
                menu={{ items }}
                placement="topRight"
                trigger={["click"]}
                arrow
              >
                <div className="cursor-pointer rounded-full p-2 text-white hover:bg-blue-500">
                  <MyIcon.more />
                </div>
              </Dropdown>
            </div>
          )}
        </div>
      </div>

      {formMode ? (
        <div className="round-md shadow-md mb-2">
          <FormCourse
            form={form}
            fileList={fileList}
            setFileList={setFileList}
            currentEdit={id}
            submit={submit}
          />
        </div>
      ) : (
        <>
          <LecturerCourse lecturer={courseSelected?.lecturer} />

          <Description description={courseSelected?.description!} />
        </>
      )}
    </>
  );
};

export default observer(LeftContent);
