import React from "react";
import { Space, Tag } from "antd";
import {
  ChromeOutlined,
  GithubOutlined,
  YoutubeOutlined,
} from "@ant-design/icons";

import { Project } from "../../../../models/Project";
import Youtube from "../../../../components/Youtube";

const ProjectDetailContentRight = ({ project }: { project: Project }) => {
  return (
    <>
      {project.videoUrl && <Youtube url={project.videoUrl} />}

      <Space className="py-4">
        {project.webUrl && (
          <Tag
            onClick={() => window.open(project.webUrl)}
            className="cursor-pointer"
            icon={<ChromeOutlined size={36} />}
            color="#55acee"
          >
            Web
          </Tag>
        )}

        {project.videoUrl && (
          <Tag
            onClick={() => window.open(project.videoUrl)}
            className="cursor-pointer"
            icon={<YoutubeOutlined size={36} />}
            color="#cd201f"
          >
            Youtube
          </Tag>
        )}

        {project.githubUrl && (
          <Tag
            onClick={() => window.open(project.githubUrl)}
            className="cursor-pointer"
            icon={<GithubOutlined size={36} />}
            color="#24292F"
          >
            Github
          </Tag>
        )}
      </Space>
    </>
  );
};

export default ProjectDetailContentRight;
