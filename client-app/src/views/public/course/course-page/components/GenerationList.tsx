import React from "react";
import { observer } from "mobx-react-lite";
import { Row, Col, Empty, Pagination } from "antd";

import { useStore } from "./../../../../../store/store";
import CardGeneration from "./CardGeneration";

const GenerationList = () => {
  const {
    generationStore: {
      generationRegistry,
      pagination,
      pagingParams,
      setPagingParams,
    },
  } = useStore();

  return (
    <>
      {generationRegistry.size < 1 ? (
        <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description="ไม่มีข้อมูล" />
      ) : (
        <>
          <Row className="mb-4" gutter={[16, 16]}>
            {Array.from(generationRegistry.values()).map((val, i) => (
              <Col key={i} xs={24} sm={12} md={8} lg={6} className="w-full">
                <CardGeneration generation={val} />
              </Col>
            ))}
          </Row>

          <Pagination
            hideOnSinglePage
            className="float-right mb-4"
            total={pagination?.totalItems}
            current={pagination?.currentPage}
            pageSize={pagingParams.pageSize}
            onChange={setPagingParams}
          />
        </>
      )}
    </>
  );
};

export default observer(GenerationList);
