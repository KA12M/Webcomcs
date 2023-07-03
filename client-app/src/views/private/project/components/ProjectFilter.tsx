import React from "react";
import { Input, Space } from 'antd';
import { useStore } from "../../../../store/store";

const ProjectFilter = ({ mapTable }: any) => {
  const {
    projectStore: {
      predicate,
      pagingParams,
      projectRegistry,
      setPagingParams,
      loadProjects,
      setPredicate,
    },
  } = useStore();

  const handleSearch = (word: string) => {
    projectRegistry.clear();
    setPredicate({ search: word });
    setPagingParams(1, pagingParams.pageSize);
    loadProjects().then(mapTable);
  };

  return (
    <Space wrap className="px-2 py-4">
      <Input.Search
        allowClear
        className="mb-2"
        defaultValue={predicate.get("search")}
        placeholder="ค้นหา"
        onSearch={handleSearch}
        required
      />
    </Space>
  );
};

export default ProjectFilter;
