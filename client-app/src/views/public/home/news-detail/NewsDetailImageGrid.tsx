import React from "react";
import { Row, Col, Image } from "antd";
import { NewsPhoto } from "../../../../models/News";
import Title from "antd/es/typography/Title";

interface Props {
  photos: NewsPhoto[];
}

const NewsDetailImageGrid = ({ photos }: Props) => {
  return (
    <Image.PreviewGroup>
      <Title level={4} className="mt-8">
        <span>รูปภาพ</span>
      </Title>
      <Row wrap gutter={[16, 16]}>
        {photos.map((img) => (
          <Col key={img.id} xs={24} md={12} lg={6}>
            <Image
              src={img.url}
              className="object-cover object-top shadow-46"
              width="100%"
              height={240}
            />
          </Col>
        ))}
      </Row>
    </Image.PreviewGroup>
  );
};

export default NewsDetailImageGrid;
