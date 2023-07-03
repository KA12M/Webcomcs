import React from "react";
import { Project } from "../../../../models/Project";
import { Card, List } from "antd";
import Title from "antd/es/typography/Title";
import HtmlParser from "react-html-parser";

interface Props {
  project: Project;
}

const ProjectDetailContent = ({ project }: Props) => {
  return (
    <div className="mb-4">
      <Card className="mb-4 " title="รายละเอียด">
        {HtmlParser(project.description)}
      </Card>

      {project.keyWordList!.length > 0 && (
        <List
          bordered
          size="small"
          className="mb-4 border-gray"
          dataSource={project.keyWordList!}
          renderItem={(item) => <List.Item>{item}</List.Item>}
          header={
            <Title level={5}>
              <p>เกี่ยวข้อง</p>
            </Title>
          }
        />
      )}

      {project.consultants!.length > 0 && (
        <List
          bordered
          size="small"
          className="mb-4 border-gray"
          dataSource={project.consultants!}
          renderItem={(item) => <List.Item>{item.lecturerName}</List.Item>}
          rowKey={(item) => item.id!}
          header={
            <Title level={5}>
              <p>ที่ปรึกษา</p>
            </Title>
          }
        />
      )}
    </div>
  );
};

export default ProjectDetailContent;
