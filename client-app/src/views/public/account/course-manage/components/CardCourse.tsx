import React from "react";
import { CourseList } from "../../../../../models/Course";
import { Modal } from "antd";
import { router } from "../../../../../routes/Routes";
import { RoutePath } from "../../../../../constants/RoutePath";
import { BiEdit, BiTrash } from "react-icons/bi";
import { useStore } from "../../../../../store/store";
import { observer } from "mobx-react-lite";

interface Props {
  course: CourseList;
}

const CardCourse = ({ course }: Props) => {
  const {
    userStore: { user },
    courseStore: { deleteCourse },
  } = useStore();

  const handleDelete = () => {
    Modal.confirm({
      centered: true,
      title: "ยืนยัน",
      content: `ข้อมูลหลักสูตร ${course.title} และข้อมูลการรับลงทะเบียนจะถูกลบออกจากระบบ`,
      onOk: () => {
        return deleteCourse(course.id);
      },
    });
  };

  return (
    <div className="relative bg-white shadow-md rounded-2xl p-2 cursor-pointer hover:transform hover:scale-105 hover:shadow-lg duration-300">
      <div className="overflow-x-hidden rounded-2xl relative">
        <img
          className="h-40 rounded-2xl w-full object-cover object-top hover:brightness-75 transition duration-500 ease-in-out"
          onClick={() => router.navigate(RoutePath.courseDetail(course.id))}
          src={course.image!}
          loading="lazy"
        />
        {user?.username == course.lecturer.username && (
          <p
            className="absolute right-2 top-2 bg-white rounded-full p-2 cursor-pointer group"
            onClick={handleDelete}
          >
            <BiTrash />
          </p>
        )}
      </div>
      <div className="mt-4 pl-2 mb-2 flex justify-between ">
        <div>
          <p className="font-semibold text-gray-900 mb-0">{course.title}</p>
        </div>
        <div className="flex flex-col-reverse mb-1 mr-4 group cursor-pointer">
          {user?.username == course.lecturer.username && (
            <BiEdit
              onClick={() =>
                router.navigate(RoutePath.coursesFormEdit(course.id))
              }
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default observer(CardCourse);
