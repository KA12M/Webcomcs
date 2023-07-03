import React, { useEffect } from "react";
import { Col, Row, Skeleton, List, Breadcrumb } from "antd";
import { observer } from "mobx-react-lite";

import Main from "../../../../containers/Main";
import { Link, useParams } from "react-router-dom";
import { useStore } from "../../../../store/store";
import ProjectDetailLeftContent from "./ProjectDetailLeftContent";
import ProjectDetailHeader from "./ProjectDetailHeader";
import ProjectDetailContentRight from "./ProjectDetailContentRight";
import FooterPDF from "./FooterPDF";
import { RoutePath } from "../../../../constants/RoutePath";
import ProjectDetailContent from "./ProjectDetailContent";
import BreadcrumbPublic from "../../../../components/BreadcrumbPublic";

const ProjectDetail = () => {
  const { id } = useParams();
  const {
    projectStore: {
      projectSelected,
      loading,
      loadProject,
      clearProjectSelected,
    },
  } = useStore();

  useEffect(() => {
    if (id && !projectSelected) loadProject(id);

    return () => {
      clearProjectSelected();
    };
  }, [id]);

  return (
    <div className="min-h-screen">
      <div className="bg-gray-100">
        <div className="container grid px-6 mx-auto">
          <BreadcrumbPublic
            text={(projectSelected && projectSelected!.nameTH) || "..."}
            links={
              <Breadcrumb.Item>
                <Link to={RoutePath.projects} children={<span className="text-base">โครงงานวิจัย</span>} />
              </Breadcrumb.Item>
            }
          />
        </div>
      </div>

      <Main hScreen={false}>
        <div className="p-4 bg-white shadow-46 rounded-lg">
          {!projectSelected || loading ? (
            <Skeleton active />
          ) : (
            <>
              <ProjectDetailHeader project={projectSelected!} />

              <Row gutter={[16, 16]}>
                <Col span={24} md={12} lg={8}>
                  <ProjectDetailLeftContent project={projectSelected} />

                  <ProjectDetailContentRight project={projectSelected} />
                </Col>

                <Col span={24} md={12} lg={16}>
                  <ProjectDetailContent project={projectSelected} />
                </Col>
              </Row>

              <FooterPDF />
            </>
          )}
        </div>
      </Main>
    </div>
  );
};

export default observer(ProjectDetail);
