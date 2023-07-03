import React, { useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import { useStore } from "../../../../store/store";
import Main from "../../../../containers/Main";
import { Breadcrumb, Col, Row, Skeleton, Space } from "antd";
import { Link, useParams, useLocation } from "react-router-dom";
import { RoutePath } from "../../../../constants/RoutePath";
import useCourseDetail from "../../../../hooks/useCourseDetail";
import LeftContent from "./components/LeftContent";
import CourseRecomment from "../../../../components/CourseRecomment";
import RightContent from "./components/RightContent";
import { HomeOutlined } from "@ant-design/icons";

const CourseDetail = () => {
  const { pathname } = useLocation();
  const { id } = useParams();
  const {
    courseStore: { loadCourse, courseSelected, courseRegistry },
  } = useStore();
  const { loadApp, setLoadApp } = useCourseDetail();

  useEffect(() => {
    if (id) {
      setLoadApp(true);
      loadCourse(id).finally(() => setLoadApp(false));
    }
  }, [pathname]);

  return (
    <div className="min-h-screen">
      <div className="bg-gray-100">
        <div className="container grid px-6 mx-auto">
          <Breadcrumb className="my-8">
            <Breadcrumb.Item>
              <Link to={RoutePath.home}>
                <Space>
                  <HomeOutlined />
                  <span>หน้าหลัก</span>
                </Space>
              </Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item>
              <Link to={RoutePath.courses} children="หลักสูตรอบรม" />
            </Breadcrumb.Item>
            <Breadcrumb.Item>
              <span>{courseSelected?.title || "..."}</span>
            </Breadcrumb.Item>
          </Breadcrumb>
        </div>
      </div>

      <Main hScreen={false}>
        <Row className="rounded-md pt-4">
          {loadApp ? (
            <Skeleton active className="px-2 py-4" />
          ) : (
            <>
              <Col xs={24} md={12} lg={14} className="md:pr-2 lg:pr-4">
                <LeftContent />
              </Col>
              <Col xs={24} md={12} lg={10} className="md:pl-2 lg:pl-4">
                <RightContent />
              </Col>

              {Array.from(courseRegistry.values()).length > 0 && (
                <Col span={24}>
                  <CourseRecomment />
                </Col>
              )}
            </>
          )}
        </Row>
      </Main>
    </div>
  );
};

export default observer(CourseDetail);
