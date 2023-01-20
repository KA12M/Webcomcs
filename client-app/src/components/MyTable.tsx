import React from "react";
import {
  Empty,
  Skeleton,
  Table,
  TablePaginationConfig,
  TableProps,
} from "antd";

interface Props {
  data: any;
  columns: any;
  isLoading: boolean;
  pagination?: false | TablePaginationConfig | undefined;
}

const MyTable = ({ data, columns, isLoading, pagination = false }: Props) => {
  return (
    <Table
      className="py-4 px-2 md:py-8 md:px-4 xl:py-12 xl:px-8"
      pagination={pagination}
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
