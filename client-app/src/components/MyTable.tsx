import React from "react";
import { Empty, Skeleton, Table, TablePaginationConfig } from "antd";

interface Props {
  data: any;
  columns: any;
  isLoading: boolean;
  pagination?: false | TablePaginationConfig | undefined;
  title?: () => any;
}

const MyTable = ({
  data,
  columns,
  isLoading,
  pagination = false,
  title,
}: Props) => {
  return (
    <Table
      className="shadow-md rounded-lg"
      pagination={pagination}
      title={title}
      dataSource={data!}
      columns={columns}
      loading={isLoading}
      locale={{
        emptyText: isLoading ? <Skeleton active /> : <Empty />,
      }}
      scroll={{ x: 750 }}
    />
  );
};

export default MyTable;
