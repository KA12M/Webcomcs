import React from "react";
import { Badge } from "antd";
import { GenerationList } from "../../../../../models/Course";
import { Link } from "react-router-dom";
import { CourseOpenRegister } from "../../../../../constants/Course";
import { RoutePath } from "../../../../../constants/RoutePath";
import URLImage from "../../../../../utils/URL";

const CardGeneration = ({ generation }: { generation: GenerationList }) => {
  const open = generation.attendeeCount <= generation.quantity;
  const BadgeOpen = new CourseOpenRegister(generation.isCancelled);

  const BtnRegister = () => {
    let color =
      open && !generation.isCancelled
        ? // &&
          // new Date(generation.endDate) > new Date(Date.now())
          "bg-green-500 hover:bg-green-600"
        : "bg-gray-500 ";
    return (
      <div
        className={`flex items-center space-x-1.5 rounded-lg  px-4 py-1.5 text-white duration-100 ${color}`}
      >
        <button className="text-sm">ลงทะเบียน</button>
      </div>
    );
  };

  const AttendeeCount = () => {
    let color =
      open && !generation.isCancelled ? "text-blue-500" : "text-red-500";
    return (
      <p className={`text-lg font-bold ${color}`}>
        {generation.attendeeCount}/{generation.quantity}
      </p>
    );
  };

  const CardGen = () => (
    <Link
      to={RoutePath.generationDetail(generation.id)}
      className="h-full w-full"
    >
      <div className="relative w-full">
        <img
          src={generation.genPhoto}
          className="h-40 object-cover object-center mb-3 w-full rounded-xl 3xl:h-full 3xl:w-full hover:brightness-75 transition duration-500 ease-in-out"
        />
        <p className="absolute bottom-0 px-4 py-2 text-lg text-gray-200">
          {generation.course.title}
        </p>
      </div>
      <div className="mb-3 flex items-center justify-between px-1 md:items-start">
        <div className="mb-2">
          <p className="text-lg font-bold text-navy-700">
            {generation.subTitle}
          </p>
          <p className="mt-1 text-sm font-medium text-gray-600 md:mt-2">
            โดย {generation.course.lecturer?.fullName}
          </p>
        </div>
        <div className="flex flex-row-reverse md:mt-2 lg:mt-0">
          {generation.attendeeCount - generation.previewAttendees!.length >
            0 && (
            <span className="z-0 ml-px inline-flex h-8 w-8 items-center justify-center rounded-full border-2 border-white bg-[#E0E5F2] text-xs text-navy-700 ">
              +{generation.attendeeCount - generation.previewAttendees!.length}
            </span>
          )}
          {generation.previewAttendees?.map((val, i) => (
            <span
              key={i}
              className="z-10 -mr-3 h-8 w-8 rounded-full border-2 border-white"
            >
              {val.image ? (
                <img
                  className="h-full w-full rounded-full object-cover"
                  src={URLImage(val.image!)}
                />
              ) : (
                <div
                  className={`avatar-initials h-full w-full rounded-full object-cover items-center justify-center bg-gray-400 text-lg text-white font-bold`}
                >
                  {val.fullName.charAt(0)}
                </div>
              )}
            </span>
          ))}
        </div>
      </div>
      <div className="flex items-center justify-between md:items-center lg:justify-between ">
        <div className="flex">
          <div className="!mb-0 text-sm font-bold text-brand-500">
            <AttendeeCount />
          </div>
        </div>
        <BtnRegister />
      </div>
    </Link>
  );

  return (
    <article className="shadow-md hover:shadow-lg hover:transform hover:scale-105 duration-300 !z-5 relative flex flex-col rounded-[10px] bg-clip-border shadow-3xl shadow-shadow-500 w-full !p-4 3xl:p-![18px] bg-gray-100">
      {generation.isCancelled || !open ? (
        <Badge.Ribbon text={BadgeOpen.data(BadgeOpen.open)[0]} color="gray">
          <CardGen />
        </Badge.Ribbon>
      ) : (
        <CardGen />
      )}
    </article>
  );
};

export default CardGeneration;
