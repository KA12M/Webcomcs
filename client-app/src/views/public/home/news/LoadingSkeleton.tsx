import React from "react";
import { Col, Row, Skeleton, Card } from "antd";

const LoadingSkeleton = () => {
  return (
    <Row gutter={[16, 16]}>
      <Col xs={24} md={12} lg={6}>
        <Card>
          <Skeleton loading={true} active></Skeleton>
        </Card>
      </Col>
      <Col xs={24} md={12} lg={6}>
        <Card>
          <Skeleton loading={true} active></Skeleton>
        </Card>
      </Col>
      <Col xs={24} md={12} lg={6}>
        <Card className="h-48">
          <Skeleton loading={true} active></Skeleton>
        </Card>
      </Col>
    </Row>
  );
};

export default LoadingSkeleton;
