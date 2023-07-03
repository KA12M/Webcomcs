import React, { useState } from "react";
import { Row, Col, Button, Empty } from "antd";
import Title from "antd/es/typography/Title";
import { observer } from "mobx-react-lite";

import ProjectList from "./ProjectList";
import { useStore } from "../../../../store/store";
import { Project } from "../../../../models/Project";
import { router } from '../../../../routes/Routes';
import { RoutePath } from '../../../../constants/RoutePath';

interface Props {
  projects: Project[];
}

const AccountProject = ({ projects }: Props) => {
  const {
    userStore: { profile },
  } = useStore(); 

  return (
    <>
      <Row justify={"space-between"} className="mb-4">
        <Col>
          <Title level={4}>
            <p>โครงงานวิจัย ({projects.length})</p>
          </Title>
        </Col>
        <Col>
          {profile!.isMe && (
            <Button
              onClick={() => router.navigate(RoutePath.projectForm)}
              shape="round"
              type="primary"
            >
              สร้างโครงงาน
            </Button>
          )}
        </Col>
      </Row>

      {projects.length < 1 ? (
        <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
      ) : (
        <ProjectList projects={projects} />
      )}
    </>
  );
};

export default observer(AccountProject);
