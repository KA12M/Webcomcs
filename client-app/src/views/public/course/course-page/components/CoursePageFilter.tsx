import React from "react";
import { Checkbox, Input, Radio, RadioChangeEvent, Space } from "antd";
import { observer } from "mobx-react-lite";
import { useStore } from "../../../../../store/store";
import { InterfaceMode } from "./InterfaceMode";

const CoursePageFilter = () => {
  const {
    courseStore: { predicate, setPredicate, loadCourses },
    generationStore: {
      loadGenerations,
      predicate: predicateGen,
      setPredicate: setPredicateGen,
    },
    userStore: { user },
  } = useStore();

  const handleSearch = (word: string) => {
    if (predicate.get("mode") == InterfaceMode.generation) {
      setPredicateGen("search", word);
      loadGenerations();
    } else {
      setPredicate("search", word);
      loadCourses();
    }
  };

  const handleRadio = (val: RadioChangeEvent) => {
    setPredicate("mode", val.target.value);
  };

  return (
    <Space wrap>
      <Input.Search
        allowClear
        placeholder="ค้นหาจากชื่อหลักสูตรอบรม"
        onSearch={handleSearch}
        defaultValue={predicate.get("search")}
      />

      <Radio.Group defaultValue={predicate.get("mode")} onChange={handleRadio}>
        <Radio value={InterfaceMode.generation}>หลักสูตรที่เปิดลงทะเบียน</Radio>
        <Radio value={InterfaceMode.course}>หลักสูตรทั้งหมด</Radio>
      </Radio.Group>

      {user && predicate.get("mode") == InterfaceMode.generation && (
        <Checkbox
          onChange={() => {
            setPredicateGen("myCourse", !predicateGen.get("myCourse"));
            loadGenerations();
          }}
          checked={predicateGen.get("myCourse")}
        >
          หลักสูตรของฉัน
        </Checkbox>
      )}
    </Space>
  );
};

export default observer(CoursePageFilter);
