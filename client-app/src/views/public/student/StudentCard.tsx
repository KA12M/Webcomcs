import React from "react";
import { Col } from "antd";
import { Link } from "react-router-dom";

import { Profile } from "../../../models/User";
import { RoutePath } from "../../../constants/RoutePath";
import AvatarPlaceholder from "../../../components/AvatarPlaceholder";

const StudentCard = ({ student }: { student: Profile }) => {
  return (
    <Col sm={24} md={12} lg={6} className="w-full p-2">
      <div className="bg-white px-6 py-8 rounded-lg shadow-lg text-center ">
        <div className="mb-3 flex justify-center">
          {student.image ? (
            <img
              className="w-24 h-24 mx-auto rounded-full"
              src={student.image}
              alt={student.fullName}
            />
          ) : (
            <AvatarPlaceholder label={student.fullName} className="w-24 h-24" />
          )}
        </div>
        <h2 className="text-xl font-medium text-gray-700">
          {student.fullName}
        </h2>
        <span className="text-blue-500 block mb-5">{student.email}</span>

        <Link
          to={RoutePath.accountDetail(student.username)}
          className="px-4 py-2 bg-blue-500 text-white rounded-full"
        >
          ดูโปรไฟล์
        </Link>
      </div>
    </Col>
  );
};

export default StudentCard;
