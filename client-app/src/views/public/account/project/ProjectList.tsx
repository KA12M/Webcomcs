import React from "react";
import { Col, Row } from "antd";

import { Project } from "../../../../models/Project";
import ProjectCard from "../../project/project-page/ProjectCard";
import { observer } from 'mobx-react-lite';

interface Props {
  projects: Project[];
}

const ProjectList = ({ projects }: Props) => {
  return (
    <Row gutter={[16, 16]} wrap>
      {projects.map((el, i) => (
        <Col className="w-full" key={i} sm={24} md={12} lg={8}>
          <ProjectCard project={el} keyWordHidden />
        </Col>
      ))}
    </Row>
  );
};

export default observer(ProjectList);
