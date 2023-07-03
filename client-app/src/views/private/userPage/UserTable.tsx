import React from "react";
import { Empty, Skeleton, Table } from "antd";
import { useStore } from "../../../store/store";

import { observer } from "mobx-react-lite";

const UserTable = ({ data, columns }: any) => {
  const {
    accountStore: { loading, pagination, pagingParams, setPagingParams },
  } = useStore();

  return (
    <Table
      className="shadow-34 rounded-lg"
      title={() => `รายชื่อ (${pagination?.totalItems})`}
      pagination={{
        className: "mr-4",
        current: pagination?.currentPage,
        total: pagination?.totalItems,
        pageSize: pagingParams.pageSize,
        onChange: setPagingParams,
        showSizeChanger: true,
        pageSizeOptions: [10, 30, 50],
        style: { marginRight: 8, marginLeft: 8 },
      }}
      dataSource={data!}
      columns={columns}
      loading={loading}
      locale={{
        emptyText: loading ? <Skeleton active /> : <Empty />,
      }}
      scroll={{ x: 750 }}
    />
  );
};

export default observer(UserTable);
