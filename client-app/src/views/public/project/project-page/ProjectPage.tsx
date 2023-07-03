import React, { useEffect, useState } from "react";
import { Row, Col, Skeleton, Pagination, List, Breadcrumb } from "antd";
import { observer } from "mobx-react-lite";

import Main from "../../../../containers/Main";
import ProjectList from "./ProjectList";
import ProjectFilter from "./ProjectFilter";
import { useStore } from "../../../../store/store";
import Title from "antd/es/typography/Title";
import { Link } from "react-router-dom";
import { RoutePath } from "../../../../constants/RoutePath";
import BreadcrumbPublic from "../../../../components/BreadcrumbPublic";

const ProjectPage = () => {
  const {
    projectStore: {
      pagination,
      pagingParams,
      projectRegistry,
      loading,
      predicate,
      showMode,
      loadProjects,
      setPagingParams,
      setShowMode,
    },
  } = useStore();

  useEffect(() => {
    loadProjects();
  }, [pagingParams, predicate]);

  return (
    <div className="min-h-screen">
      <div className="bg-gray-100">
        <div className="container grid px-6 mx-auto">
          <BreadcrumbPublic text="โครงงานวิจัย" />
        </div>
      </div>

      <Main hScreen={false}>
        <Row className="mb-4 pt-8">
          <Col span={24}>
            <Title level={3}>
              <p>โครงงานวิจัยนักศึกษา</p>
            </Title>

            <div className="mb-4">
              <ProjectFilter setShowMode={setShowMode} />
            </div>
            <hr className="w-40 my-6 border-4 rounded-md sm:mx-0 mx-auto" />

            {loading && Array.from(projectRegistry.values()).length < 1 ? (
              <Skeleton active />
            ) : Array.from(projectRegistry.values()).length < 1 ? (
              <List className="h-48 mb-4" />
            ) : (
              <ProjectList
                loading={loading}
                showMode={showMode}
                projects={Array.from(projectRegistry.values())}
              />
            )}

            <Pagination
              hideOnSinglePage
              className="float-right mb-4"
              total={pagination?.totalItems}
              current={pagination?.currentPage}
              pageSize={pagingParams.pageSize}
              onChange={setPagingParams}
            />
          </Col>
        </Row>
      </Main>
    </div>
  );
};

export default observer(ProjectPage);
