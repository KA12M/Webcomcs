import React, { useEffect } from "react";
import { Col, Row, Image, Switch, Avatar, Space } from "antd";
import { observer } from "mobx-react-lite";
import format from "date-fns/format";
import { th } from "date-fns/locale";

import PageTitle from "../../../components/PageTitle";
import { useStore } from "../../../store/store";
import { columns } from "./components/ProjectTableColumn";
import MyTable from "../../../components/MyTable";
import ProjectFilter from "./components/ProjectFilter";
import { Link } from "react-router-dom";
import { RoutePath } from "../../../constants/RoutePath";

const ProjectManage = () => {
  const {
    projectStore: {
      loadProjects,
      setTable,
      hidden,
      setProjectSelect,
      setPagingParams,
      setPredicate,
      tableBody,
      loading,
      projectRegistry,
      pagination,
      pagingParams,
    },
  } = useStore();

  useEffect(() => {
    setPredicate({ showHidden: true });
    loadProjects().then(mapTable);
  }, [pagingParams]);

  const mapTable = () => {
    let body: any[] = [];
    Array.from(projectRegistry.values()).forEach((project, i) => {
      body.push({
        key: project.id,
        index: (pagingParams.currentPage - 1) * pagingParams.pageSize + (i + 1),
        nameTH: (
          <Space wrap>
            <Link to={RoutePath.projectDetail(project.id)}>{project.nameTH}</Link>
          </Space>
        ),
        student: (
          <Space wrap>
            <Avatar
              src={project.student.image}
              icon={project.student.fullName[0]}
            />
            <Link to={RoutePath.accountDetail(project.student.username)}>
              {project.student.fullName}
            </Link>
          </Space>
        ),
        isUsed: (
          <Switch
            checkedChildren="แสดง"
            unCheckedChildren="ซ่อน"
            defaultChecked={project.isUsed}
            onChange={() => hidden(project)}
          />
        ),
        createdAt: format(new Date(project.createdAt), "d MMMM yyyy HH:mm", {
          locale: th,
        }),
      });
    });
    setTable(body);
  };

  return (
    <>
      <PageTitle text="โครงงานนักศึกษา" />

      <Row className="shadow-46 rounded-xl">
        <Col span={24}>
          <ProjectFilter mapTable={mapTable} />

          <MyTable
            isLoading={loading}
            data={tableBody}
            columns={columns({ setProjectSelect })}
            pagination={{
              current: pagination?.currentPage,
              total: pagination?.totalItems,
              pageSize: pagingParams.pageSize,
              onChange: setPagingParams,
              showSizeChanger: true,
              pageSizeOptions: [10, 30, 50],
              style: { marginRight: 8, marginLeft: 8 },
            }}
          />
        </Col>
      </Row>
    </>
  );
};

export default observer(ProjectManage);
