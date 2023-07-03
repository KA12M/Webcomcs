import React, { useEffect } from "react";

import PageTitle from "../../../components/PageTitle";
import { TbAddressBook, TbBook2, TbNews, TbUsers } from "react-icons/tb";
import { Link } from "react-router-dom";
import { RouteSecret } from "../../../constants/RoutePath";
import { observer } from "mobx-react-lite";
import { useStore } from "../../../store/store";
import JobByNameChart from "./components/JobByNameChart";
import { Col, Row } from "antd";
import UserByRoleChart from "./components/UserByRoleChart";

const HomeDashboard = () => {
  const {
    reportStore: {
      loadDashboard,
      dashboardData,
      loading,
      jobByJobName,
      loadJobHistoryByJobName,
      loadUserCountByRole,
      userCountByRole,
    },
  } = useStore();

  useEffect(() => {
    loadDashboard();
  }, []);

  useEffect(() => {
    loadJobHistoryByJobName();
  }, []);

  useEffect(() => {
    loadUserCountByRole();
  }, []);

  return (
    <>
      <PageTitle text="แผงควบคุม" />

      {loading ? (
        <> </>
      ) : (
        <>
          <div className="my-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            <div className="flex items-start rounded-xl bg-white p-4 shadow-lg">
              <div className="flex h-12 w-12 items-center justify-center rounded-full border border-orange-100 bg-orange-50">
                <TbUsers size={24} />
              </div>

              <div className="ml-4">
                <h2 className="font-semibold">
                  {dashboardData?.userNum || 0} รายการ
                </h2>
                <Link
                  to={RouteSecret.userManage}
                  className="mt-2 text-sm text-gray-500 hover:text-blue-500 hover:font-bold"
                >
                  ผู้ใช้ในระบบ
                </Link>
              </div>
            </div>

            <div className="flex items-start rounded-xl bg-white p-4 shadow-lg">
              <div className="flex h-12 w-12 items-center justify-center rounded-full border border-indigo-100 bg-indigo-50">
                <TbAddressBook size={24} />
              </div>

              <div className="ml-4">
                <h2 className="font-semibold">
                  {dashboardData?.jobHistoryNum || 0} รายการ
                </h2>
                <Link
                  to={RouteSecret.jobHistoryManage}
                  className="mt-2 text-sm text-gray-500 hover:text-blue-500 hover:font-bold"
                >
                  ประวัติการทำงานของนักศึกษา
                </Link>
              </div>
            </div>

            <div className="flex items-start rounded-xl bg-white p-4 shadow-lg">
              <div className="flex h-12 w-12 items-center justify-center rounded-full border border-blue-100 bg-blue-50">
                <TbBook2 size={24} />
              </div>

              <div className="ml-4">
                <h2 className="font-semibold">
                  {dashboardData?.projectNum || 0} รายการ
                </h2>
                <Link
                  to={RouteSecret.projectManage}
                  className="mt-2 text-sm text-gray-500 hover:text-blue-500 hover:font-bold"
                >
                  โครงงานวิจัยของนักศึกษา
                </Link>
              </div>
            </div>

            <div className="flex items-start rounded-xl bg-white p-4 shadow-lg">
              <div className="flex h-12 w-12 items-center justify-center rounded-full border border-red-100 bg-red-50">
                <TbNews size={24} />
              </div>

              <div className="ml-4">
                <h2 className="font-semibold">
                  {dashboardData?.newsNum || 0} รายการ
                </h2>
                <Link
                  to={RouteSecret.newsManage}
                  className="mt-2 text-sm text-gray-500 hover:text-blue-500 hover:font-bold"
                >
                  ข่าวประชาสัมพันธ์
                </Link>
              </div>
            </div>
          </div>

          <Row gutter={[16, 16]}>
            <Col xs={24} md={10} lg={10} className="py-4">
              <UserByRoleChart userByRoles={userCountByRole} />
            </Col>
            <Col xs={24} md={14} lg={14} className="py-4">
              <JobByNameChart jobByNames={jobByJobName} />
            </Col>
          </Row>
        </>
      )}
    </>
  );
};

export default observer(HomeDashboard);
