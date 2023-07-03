import React from "react";
import { Link } from "react-router-dom";
import { RoutePath } from '../constants/RoutePath';

const LecturerCourse = ({ lecturer }: any) => {
  return (
    <div className="flex bg-white shadow-md rounded-lg overflow-hidden my-4">
      <div className="w-2 bg-gray-800"></div>
      <div className="flex items-center px-2 py-3">
        {lecturer.image! ? (
          <img
            className="w-12 h-12 object-cover rounded-full"
            src={lecturer.image}
          />
        ) : (
          <div className="avatar-initials w-12 h-12 rounded-full flex items-center justify-center bg-gray-500 text-lg text-white font-bold">
            {lecturer.fullName.charAt(0)}
          </div>
        )}
        <div className="mx-3">
          <h2 className="text-xl font-semibold text-gray-800">
            <Link to={RoutePath.accountDetail(lecturer.username)}>
              {lecturer.fullName}
            </Link>
          </h2>
          <p className="text-gray-600">อาจารย์</p>  
        </div>
      </div>
    </div>
  );
};

export default LecturerCourse;
