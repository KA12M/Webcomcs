import React from "react";
import MyTable from "../../../../components/MyTable";
import { Project } from "../../../../models/Project";
import { Image, Space, Avatar } from "antd";
import { Link } from "react-router-dom";
import { router } from "../../../../routes/Routes";
import ProjectCardAction from './ProjectCardAction';
import { RoutePath } from '../../../../constants/RoutePath';

const columns = [
  {
    title: "โครงงาน",
    key: "image",
    dataIndex: "image",
  },
  {
    title: "ชื่อโครงงาน",
    key: "nameTH",
    dataIndex: "nameTH",
  },
  {
    title: "นักศึกษา",
    key: "student",
    dataIndex: "student",
  },
  {
    title: "เพิ่มเติม",
    key: "actions",
    dataIndex: "actions",
  },
];

const ProjectListTable = ({ projects, loading }: any) => {
  let body = projects.map((el: Project) => {
    return {
      key: el.id,
      image: (
        <Image
          height="120px"
          width="120px"
          className="object-cover object-top cursor-pointer rounded-md shadow-34"
          preview={false}
          src={el.imagePreview!}
          onClick={() => router.navigate(RoutePath.projectDetail(el.id))}
        />
      ),
      nameTH: <Link to={RoutePath.projectDetail(el.id)}>{el.nameTH}</Link>,
      student: (
        <Space wrap>
          <Avatar src={el.student.image} icon={el.student.fullName[0]} />
          <Link to={RoutePath.accountDetail(el.student.username)}>
            {el.student.fullName}
          </Link>
        </Space>
      ),
      actions: <Space wrap>{...ProjectCardAction(el)}</Space>,
    };
  });
  return <MyTable isLoading={loading} columns={columns} data={body} />;
};

export default ProjectListTable;
