import React from "react";
import { Input, Radio, RadioChangeEvent } from "antd";

import { useStore } from "../../../store/store";
import { observer } from 'mobx-react-lite';

const UserFilter = ({ mapTable }: any) => {
  const {
    accountStore: {
      loadAccounts,
      setSearch,
      setPagingParams,
      setRole,
      pagingParams,
      predicate
    },
  } = useStore();

  const handleSearch = (word: string) => {
    setSearch(word);
    setPagingParams(1, pagingParams.pageSize);
    loadAccounts().then(mapTable);
  };

  const handleSelectRole = (e: RadioChangeEvent) => {
    setRole(e.target.value);
    loadAccounts().then(mapTable);
  };

  return (
    <>
      <Input.Search
        allowClear
        className="mb-2"
        defaultValue={predicate.get("search")}
        placeholder="ค้นหา"
        onSearch={handleSearch}
        required
      />

      <Radio.Group
        defaultValue={predicate.get("role")}
        buttonStyle="solid"
        onChange={handleSelectRole}
      >
        <Radio.Button value="all">ทั้งหมด</Radio.Button>
        <Radio.Button value="guest">ทั่วไป</Radio.Button>
        <Radio.Button value="student">นักศึกษา</Radio.Button>
        <Radio.Button value="lecturer">อาจารย์</Radio.Button>
      </Radio.Group>
    </>
  );
};

export default observer(UserFilter);
