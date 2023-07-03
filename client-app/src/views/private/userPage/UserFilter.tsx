import React from "react";
import { Button, Input, Select, Space } from "antd";

import { useStore } from "../../../store/store";
import { observer } from "mobx-react-lite";
import RegisterForm from "../../public/RegisterForm";

const UserFilter = ({ mapTable }: any) => {
  const {
    accountStore: {
      loadAccounts,
      setSearch,
      setPagingParams,
      setRole,
      pagingParams,
      predicate,
    },
    modalStore: { openModal },
  } = useStore();

  const handleSearch = (word: string) => {
    setSearch(word);
    setPagingParams(1, pagingParams.pageSize);
    loadAccounts().then(mapTable);
  };

  const handleSelectRole = (val: string) => {
    setRole(val);
    loadAccounts().then(mapTable);
  };

  return (
    <Space className="py-4 px-2" wrap>
      <Input.Search
        allowClear
        defaultValue={predicate.get("search")}
        placeholder="ค้นหา"
        onSearch={handleSearch}
        required
      />

      <Select
        defaultValue=""
        style={{ width: 120 }}
        onChange={handleSelectRole}
        options={[
          { value: "", label: "ทั้งหมด" },
          { value: "0", label: "ทั่วไป" },
          { value: "1", label: "นักศึกษา" },
          { value: "2", label: "อาจารย์" },
          { value: "3", label: "แอดมิน" },
        ]}
      />

      <Button
        type="primary"
        shape="round"
        children="เพิ่มผู้ใช้"
        onClick={() =>
          openModal(<RegisterForm roleLect={true} />, "ลงทะเบียนผู้ใช้")
        }
      />
    </Space>
  );
};

export default observer(UserFilter);
