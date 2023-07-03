import React, { useEffect } from "react";
import { observer } from "mobx-react-lite";
import { Breadcrumb, Col, Row, Skeleton, Space } from "antd";
import { Link, useParams } from "react-router-dom";

import Main from "../../../../containers/Main";
import { useStore } from "../../../../store/store";
import LeftContent from "./LeftContent";
import RightContent from "./RightContent";
import CourseRecomment from "../../../../components/CourseRecomment";
import { RoutePath } from "../../../../constants/RoutePath";
import { HomeOutlined } from "@ant-design/icons";

const GenerationDetail = () => {
  const { id } = useParams();
  const {
    generationStore: {
      loadingGeneration,
      generationSelect,
      clearGenerationSelect,
    },
    courseStore: { courseRegistry },
  } = useStore();

  useEffect(() => {
    if (id) loadingGeneration(id);

    return () => {
      clearGenerationSelect();
    };
  }, []);

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
            {generationSelect ? (
              <>
                <Breadcrumb.Item>
                  <Link to={RoutePath.courseDetail(generationSelect!.id)}>
                    {generationSelect?.title}
                  </Link>
                </Breadcrumb.Item>
                <Breadcrumb.Item>
                  <span>{generationSelect?.generation.subTitle}</span>
                </Breadcrumb.Item>
              </>
            ) : (
              <Breadcrumb.Item>
                <span>...</span>
              </Breadcrumb.Item>
            )}
          </Breadcrumb>
        </div>
      </div>

      <Main hScreen={false}>
        <Row className="pt-4 rounded-md">
          {!generationSelect ? (
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

export default observer(GenerationDetail);
