import React from "react";
import { Row, Col } from "antd";

import Youtube from "../../../components/Youtube";

export const YoutubeSpace = ({ youtube = [] }: { youtube: any[] }) => {
  return (
    <Row gutter={[18, 18]} className="py-12 ">
      {youtube.map((val, i) => (
        <Col key={i} xs={24} md={8} lg={6}>
          <Youtube url={val} />
        </Col>
      ))}
    </Row>
  );
};
