import React from "react";
import Title from "antd/es/typography/Title";
import { Project } from "../../../../models/Project";
import { Divider, Typography } from "antd";

const { Text } = Typography;

interface Props {
  project: Project;
}

const ProjectDetailHeader = ({ project }: Props) => {
  return (
    <>
      <Title level={2}>
        <p>{project.nameTH}</p>
      </Title>
      <Typography.Text>
        <p>{project.nameEN}</p>
      </Typography.Text>

      <Divider />
    </>
  );
};

export default ProjectDetailHeader;
