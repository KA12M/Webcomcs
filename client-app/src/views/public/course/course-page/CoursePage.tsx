import React, { useEffect } from "react";
import Main from "../../../../containers/Main";
import { Breadcrumb, Button, Col, Row, Typography } from "antd";
import { Link } from "react-router-dom";
import { observer } from "mobx-react-lite";
import CoursePageFilter from "./components/CoursePageFilter";
import { useStore } from "./../../../../store/store";
import CourseList from "./components/CourseList";
import { InterfaceMode } from "./components/InterfaceMode";
import GenerationList from "./components/GenerationList";
import GridSkeleton from "../../../../components/GridSkeleton";
import { router } from "../../../../routes/Routes";
import { RoutePath } from "../../../../constants/RoutePath";
import { RoleLabel, UserRole } from "../../../../constants/UserRole";
import BreadcrumbPublic from "../../../../components/BreadcrumbPublic";

const CoursePage = () => {
  const {
    courseStore: {
      pagingParams: coursePagingParams,
      loading,
      predicate,
      loadCourses,
    },
    generationStore: {
      loadGenerations,
      pagingParams: genPagingParams,
      loading: genLoading,
    },
    userStore: { user },
  } = useStore();

  useEffect(() => {
    loadGenerations();
  }, [genPagingParams]);

  useEffect(() => {
    loadCourses();
  }, [coursePagingParams]);

  return (
    <div className="min-h-screen">
      <div className="bg-gray-100">
        <div className="container grid px-6 mx-auto">
          <BreadcrumbPublic text="หลักสูตรอบรม" />
        </div>
      </div>

      <Main hScreen={false}>
        <Row className="mb-4 pt-8">
          <Col span={24}>
            <div className="flex justify-between w-full align-middle items-center">
              <Typography.Title level={3}>
                <p>หลักสูตรอบรม</p>
              </Typography.Title>

              {user?.roles &&
                user.roles?.includes(RoleLabel[UserRole.lecturer]["en"]) && (
                  <Button
                    type="primary"
                    shape="round"
                    children="หลักสูตรใหม่"
                    onClick={() => router.navigate(RoutePath.coursesForm)}
                  />
                )}
            </div>

            <div className="mb-4">
              <CoursePageFilter />
            </div>
            <hr className="w-40 my-6 border-4 rounded-md sm:mx-0 mx-auto" />

            {loading || genLoading ? (
              <GridSkeleton />
            ) : predicate.get("mode") == InterfaceMode.course ? (
              <CourseList />
            ) : (
              <GenerationList />
            )}
          </Col>
        </Row>
      </Main>
    </div>
  );
};

export default observer(CoursePage);
