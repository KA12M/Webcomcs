import React from "react";
import { Col, Row } from "antd";

import ProjectListTable from "./ProjectListTable";
import ProjectCard from "./ProjectCard";
import { Project } from "../../../../models/Project";

interface Props {
  projects: Project[];
  showMode: number;
  loading: boolean;
}

const ProjectList = ({ projects, showMode, loading }: Props) => {
  const show: any = {
    0: projects.map((el, i) => (
      <Col key={i} sm={12} md={8} lg={6} className="w-full">
        <ProjectCard project={el} />
      </Col>
    )),
    1: (
      <Col span={24}>
        <ProjectListTable projects={projects} loading={loading} />
      </Col>
    ),
  };

  return (
    <Row gutter={[16, 16]} className="mb-4">
      {show[showMode]}
    </Row>
  );
};

export default ProjectList;
