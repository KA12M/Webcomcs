import React from "react";

import { Project } from "../../../../models/Project";
import { router } from "../../../../routes/Routes";
import { BiEdit, BiTrash } from "react-icons/bi";
import { Modal, Space } from "antd";
import { observer } from "mobx-react-lite";
import { RoutePath } from "../../../../constants/RoutePath";
import { useStore } from "../../../../store/store";
import { ExclamationCircleFilled } from "@ant-design/icons";

const ProjectCard = ({
  project,
  keyWordHidden = false,
}: {
  project: Project;
  keyWordHidden?: boolean;
}) => {
  const {
    userStore: { user },
    projectStore: { deleteProject },
  } = useStore();

  const handleRemoveProject = () => {
    Modal.confirm({
      title: "ลบโครงงานวิจัย?",
      content: `ข้อมูลโครงงานวิจัย ${project.nameTH} จะถูกลบออกจากระบบ`,
      okText: "ลบ",
      okType: "danger",
      cancelText: "ยกเลิก",
      centered: true,
      icon: <ExclamationCircleFilled />,
      async onOk() {
        await deleteProject(project.id);
      },
    });
  };

  return (
    <section className="relative bg-white w-full space-y-3 px-6 py-4 rounded-3xl shadow-lg border flex flex-col overflow-clip">
      <img
        src={project.imagePreview!}
        className="w-full h-32 object-cover rounded-xl hover:brightness-75 transition cursor-pointer"
        onClick={() => router.navigate(RoutePath.projectDetail(project.id))}
      />
      <div className="flex justify-between items-center">
        <h3 className="font-semibold">{project.nameTH}</h3>
        {user?.username == project.student.username && (
          <Space className="font-extrabold">
            <p
              className="bg-gray-200 rounded-full p-2 cursor-pointer group"
              onClick={() =>
                router.navigate(RoutePath.projectFormEdit(project.id))
              }
            >
              <BiEdit />
            </p>
            <p
              className="bg-gray-200 rounded-full p-2 cursor-pointer group"
              onClick={handleRemoveProject}
            >
              <BiTrash />
            </p>
          </Space>
        )}
      </div>
      {!keyWordHidden && (
        <Space wrap>
          {project.keyWordList!.map((val, i) => (
            <div
              key={i}
              className="bg-blue-400 text-white text-md px-4 rounded-3xl"
            >
              {val}
            </div>
          ))}
        </Space>
      )}
      <div className="text-gray-600 font-light">{/* {project} */}</div>
      <button
        className="bg-gray-800 hover:bg-gray-900 transition text-white py-1 rounded-2xl"
        onClick={() => router.navigate(RoutePath.projectDetail(project.id))}
      >
        ดูเพิ่มเติม
      </button>
    </section>
  );
};

export default observer(ProjectCard);
