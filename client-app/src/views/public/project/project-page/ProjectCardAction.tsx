import React from "react";
import {
  FilePdfOutlined,
  GithubOutlined,
  YoutubeOutlined,
} from "@ant-design/icons";

import { URLFile } from "../../../../utils/URL";
import { Project } from "../../../../models/Project";
import { Tooltip } from "antd";

const labelTooltip: any = {
  0: "PDF",
  1: "Youtube",
  2: "Github",
};

const ProjectCardAction = (project: Project) => {
  const Actions = [
    <FilePdfOutlined onClick={() => window.open(URLFile(project.pdf))} />,
    <YoutubeOutlined
      onClick={() =>
        window.open(project.videoUrl)
      }
    />,
    <GithubOutlined onClick={() => window.open(project.githubUrl)} />,
  ];

  return Actions.map((val, i) => (
    <Tooltip key={i} title={labelTooltip[i]}>
      {val}
    </Tooltip>
  ));
};

export default ProjectCardAction;
