import React from "react";
import { Space, Input, Select } from "antd"; 
import { useStore } from "../../../../store/store";

const LecturerFilter = ({ mapTable }: any) => {
  const {
    lecturerStore: { predicate, loadLecturers, positionList, setPredicate },
  } = useStore();

  return (
    <Space wrap className="py-4 px-2">
      <Input.Search
        allowClear
        defaultValue={predicate.get("search")}
        placeholder="ค้นหา"
        onSearch={(word) => {
          setPredicate("search", word);
          loadLecturers().then(mapTable);
        }}
      />

      <Select
        showSearch
        allowClear
        style={{ width: 200 }}
        placeholder="ตำแหน่ง"
        filterOption={(input, option) => (option?.label ?? "").includes(input)}
        filterSort={(optionA, optionB) =>
          (optionA?.label ?? "")
            .toLowerCase()
            .localeCompare((optionB?.label ?? "").toLowerCase())
        }
        onClear={() => {
          setPredicate("position", "");
          loadLecturers().then(mapTable);
        }}
        onChange={(val) => {
          setPredicate("position", val);
          loadLecturers().then(mapTable);
        }}
        options={[
          ...positionList.map((el) => ({
            value: el,
            label: el,
          })),
        ]}
      />
    </Space>
  );
};

export default LecturerFilter;
