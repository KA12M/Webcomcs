import React from "react";
import { JobHistory } from "../../../../models/JobHistory";
import { Col, Row } from "antd";
import { Link } from "react-router-dom";
import { RoutePath } from "../../../../constants/RoutePath";
import AvatarPlaceholder from "../../../../components/AvatarPlaceholder";
import { useStore } from "../../../../store/store"; 
import JobHistoryModal from './JobHistoryModal';

interface Props {
  jobHistory: JobHistory[];
}

const JobHistoryList = ({ jobHistory }: Props) => {
  const {
    modalStore: { openModal },
  } = useStore();

  return (
    <Row gutter={[16, 16]}>
      {jobHistory.map((val, i) => (
        <Col key={i} xs={24} md={8} lg={6}>
          <div className="w-full bg-white rounded-lg border border-gray-200 shadow-md py-2">
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
              <h3 className="mb-1 text-xl font-medium text-gray-900">
                {val.user?.fullName}
              </h3>
              <span className="text-sm text-gray-500">
                {val.jobName}
              </span>
              <div className="flex mt-4 space-x-3 lg:mt-6">
                <div
                  className="inline-flex items-center cursor-pointer py-2 px-4 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:ring-blue-300"
                  onClick={() => openModal(<JobHistoryModal val={val} />)}
                >
                  เพิ่มเติม
                </div>
                <Link
                  to={RoutePath.accountDetail(val.user?.username!)}
                  className="inline-flex items-center py-2 px-4 text-sm font-medium text-center text-gray-900 bg-white rounded-lg border border-gray-300 hover:bg-gray-100 focus:ring-4 focus:ring-blue-300"
                >
                  ดูโปรไฟล์
                </Link>
              </div>
            </div>
          </div>
        </Col>
      ))}
    </Row>
  );
};

export default JobHistoryList;
