import React from "react";
import { Button, DatePicker, Input, Segmented, Space } from "antd";
import {
  AppstoreOutlined,
  BarsOutlined,
  ReloadOutlined,
} from "@ant-design/icons";

import { useStore } from "../../../../store/store";
import { observer } from "mobx-react-lite";
import { RoleLabel, UserRole } from "../../../../constants/UserRole";
import { router } from "../../../../routes/Routes";
import { RoutePath } from "../../../../constants/RoutePath";

const ProjectFilter = ({ setShowMode }: any) => {
  const {
    projectStore: {
      pagingParams,
      predicate,
      showMode,
      loading,
      setPagingParams,
      setPredicate,
      loadProjects,
    },
    userStore: { user },
  } = useStore();

  const handleSearch = (val: string) => {
    setPredicate({ search: val });
    setPagingParams(1, pagingParams.pageSize);
  };

  const handleSetYear = (day: any) => {
    setPredicate({ year: (day && day.year()) || "" });
    loadProjects();
  };

  const handleReload = () => {
    setPredicate({ year: "", search: "" });
    loadProjects();
  };

  return (
    <Space wrap>
      <Input.Search
        allowClear
        placeholder="ค้นหาชื่อโครงงาน ชื่อนักศึกษา"
        onSearch={handleSearch}
        defaultValue={predicate.get("search")}
      />

      <DatePicker
        picker="year"
        placeholder="ปีการศึกษา"
        onChange={handleSetYear}
      />

      <Segmented
        options={[
          {
            value: 0,
            icon: <AppstoreOutlined />,
          },
          {
            value: 1,
            icon: <BarsOutlined />,
          },
        ]}
        onChange={setShowMode}
        defaultValue={showMode}
      />

      <Button
        icon={<ReloadOutlined />}
        loading={loading}
        onClick={handleReload}
      />

      {user?.roles &&
        user.roles?.includes(RoleLabel[UserRole.student]["en"]) && (
          <Button
            onClick={() => router.navigate(RoutePath.projectForm)}
            shape="round"
            type="primary"
          >
            สร้างโครงงาน
          </Button>
        )}
    </Space>
  );
};

export default observer(ProjectFilter);
