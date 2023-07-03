import React from "react";
import { Input, Space } from "antd";
import { useStore } from "../../../../store/store";

const NewsPageFilter = () => {
  const {
    newsStore: { loadNewses, predicate, setSearch, pagination },
  } = useStore();

  const handleSearch = (word: string) => {
    setSearch(word);
    loadNewses();
  };

  return (
    <Space wrap className="flex flex-row-reverse mt-4">
      <Input.Search 
        allowClear
        placeholder="ค้าหาจากชื่อข่าว"
        onSearch={handleSearch}
        defaultValue={predicate.get("search")}
      />
    </Space>
  );
};

export default NewsPageFilter;
