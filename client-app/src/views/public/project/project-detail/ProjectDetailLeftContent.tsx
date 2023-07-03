import React from "react";
import { Image } from "antd";
import { Project } from "../../../../models/Project";
import { Link } from "react-router-dom";
import AvatarPlaceholder from "../../../../components/AvatarPlaceholder";
import { RoutePath } from "../../../../constants/RoutePath";
import { DateFormatYear543 } from "../../../../utils/Date";

interface Props {
  project: Project;
}

const ProjectDetailLeftContent = ({ project }: Props) => {
  return (
    <div className="mb-4">
      <Image
        className="rounded-lg"
        width={"100%"}
        src={project.imagePreview!}
        alt={project.nameTH}
      />

      <div className="flex bg-white shadow-lg rounded-lg overflow-hidden my-2">
        <div className="w-2 bg-gray-800"></div>
        <div className="flex items-center px-2 py-3">
          {project.student.image ? (
            <img
              className="w-12 h-12 object-cover rounded-full"
              src={project.student.image!}
            />
          ) : (
            <AvatarPlaceholder
              className="w-12 h-12"
              label={project.student.fullName[0]}
            />
          )}

          <div className="mx-3">
            <h2 className="text-xl font-semibold text-gray-800">
              <Link to={RoutePath.accountDetail(project.student.username)}>
                {project.student.fullName}
              </Link>
            </h2>
            <p className="text-gray-600">
              อัพโหลดเมื่อ {DateFormatYear543(project.createdAt!)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetailLeftContent;
