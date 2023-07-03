import React from "react";
import { observer } from "mobx-react-lite";
import { useStore } from "../../../../../store/store";
import { Row, Col, Empty, Pagination } from "antd";
import CardCourse from "../../../account/course-manage/components/CardCourse";

const CourseList = () => {
  const {
    courseStore: { courseRegistry, pagination, pagingParams, setPagingParams },
  } = useStore();

  return courseRegistry.size < 1 ? (
    <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description="ไม่มีข้อมูล" />
  ) : (
    <>
      <Row className="mb-4" gutter={[16, 16]}>
        {Array.from(courseRegistry.values()).map((val, i) => (
          <Col key={i} sm={24} md={8} lg={6} className="w-full">
            <CardCourse course={val} />
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
  );
};

export default observer(CourseList);
