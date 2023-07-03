import React from "react";
import AvatarPlaceholder from "../../../../components/AvatarPlaceholder";
import { Descriptions } from "antd";
import { format } from "date-fns";
import { th } from "date-fns/locale";

const JobHistoryModal = ({ val }: any) => (
  <div className="flex flex-col items-center pb-8 px-4 pt-4">
    {val.user?.image ? (
      <img
        className="mb-3 w-24 h-24 rounded-full shadow-lg"
        src={val.user?.image!}
        alt={val.user?.fullName}
      />
    ) : (
      <AvatarPlaceholder
        label={val.user?.fullName!}
        className="mb-3 w-24 h-24 rounded-full shadow-lg"
      />
    )}
    <h3 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">
      {val.user?.fullName}
    </h3>
    <span className="text-sm text-gray-500 dark:text-gray-400">
      {val.jobName}
    </span>
    <div className="mt-4">
      <Descriptions column={{ xxl: 1, xl: 1, lg: 1, md: 1, sm: 1, xs: 1 }}>
        <Descriptions.Item label="บริษัท">{val.company}</Descriptions.Item>
        <Descriptions.Item label="ตำแหน่ง">{val.position}</Descriptions.Item>
        <Descriptions.Item label="รายละเอียด">
          {val.description}
        </Descriptions.Item>
        <Descriptions.Item label="วันที่เริ่มทำงาน">
          {format(
            new Date(val.date),
            `MMMM ${new Date(val.date).getFullYear() + 543}`,
            {
              locale: th,
            }
          )}
        </Descriptions.Item>
      </Descriptions>
    </div>
  </div>
);

export default JobHistoryModal;
