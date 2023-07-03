import React from "react";
import { Link } from "react-router-dom";
import { Badge, Dropdown, MenuProps, Modal, Space } from "antd";

import { MyIcon } from "../../../../../constants/MyIcon/index";
import { useStore } from "../../../../../store/store";
import { DateFormatYear543 } from "../../../../../utils/Date";
import { RoutePath } from "../../../../../constants/RoutePath";
import URLImage from "../../../../../utils/URL";
import { router } from "../../../../../routes/Routes";
import { CourseOpenRegister } from "../../../../../constants/Course"; 

const BannerCourse = ({ handleSetFormEdit }: any) => {
  const {
    generationStore: { cancel, generationSelect, deleteGeneration },
    userStore: { user },
  } = useStore();

  if (!generationSelect) return null;

  const isHost = user?.username == generationSelect.lecturer.username;

  const BadgeOpen = new CourseOpenRegister(
    generationSelect.generation.isCancelled
  );

  const handleRemoveGeneration = () => {
    Modal.confirm({
      centered: true,
      title: "ยืนยัน",
      content: `ข้อมูลหลักสูตรอบรม ${generationSelect.generation.subTitle} และข้อมูลผู้ที่ลงทะเบียนในรอบนี้จะถูกลบออกจากระบบ`,
      onOk: () => {
        return deleteGeneration(generationSelect.generation.id).then(() => {
          router.navigate(-1);
        });
      },
    });
  };

  const items: MenuProps["items"] = [
    {
      key: "edit-generation",
      label: "แก้ไข",
      onClick: handleSetFormEdit,
    },
    {
      key: "cancel-generation",
      label: BadgeOpen.data(!BadgeOpen.open)[0],
      danger: !BadgeOpen.open,
      onClick: () => cancel(generationSelect.generation.id),
    },
    {
      key: "remove-generation",
      label: "ยกเลิกหลักสูตรอบรม",
      danger: true,
      onClick: handleRemoveGeneration,
    },
  ];

  const Content = () => (
    <div
      className="bg-gray-100 m-auto h-80"
      style={{
        backgroundImage: `url(${URLImage(
          generationSelect?.generation.genPhoto
        )})`,
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      }}
    >
      <div className="flex flex-row items-end h-full w-full">
        <div className="flex flex-col w-full pb-3 pt-10 px-3 bg-gradient-to-t from-black text-gray-200">
          <h3 className="text-lg font-bold leading-5 uppercase">
            <Link to={RoutePath.courseDetail(generationSelect.id)}>
              {generationSelect?.title}
            </Link>
          </h3>
          <div className="inline-flex items-center">
            <span className="capitalize font-base text-sm my-1 mr-1">
              {generationSelect?.generation.subTitle}
            </span>
          </div>
          <div className="flex flex-row justify-between">
            <div className="flex flex-row">
              <div className="w-max inline-flex items-center">
                <MyIcon.time />

                <Space wrap className="text-xs ml-1 antialiased">
                  {DateFormatYear543(generationSelect?.generation.startDate!)}-
                  {DateFormatYear543(generationSelect?.generation.endDate!)}
                </Space>
              </div>
            </div>
            <div className="w-max">
              {isHost && (
                <Dropdown
                  menu={{ items }}
                  placement="topRight"
                  trigger={["click"]}
                  arrow
                >
                  <div className="cursor-pointer p-2 hover:bg-blue-500 text-white rounded-full">
                    <MyIcon.more />
                  </div>
                </Dropdown>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <Badge.Ribbon
      placement="start"
      text={BadgeOpen.data(BadgeOpen.open)[0]}
      color={BadgeOpen.data(BadgeOpen.open)[1]}
    >
      <Content />
    </Badge.Ribbon>
  );
};

export default BannerCourse;
