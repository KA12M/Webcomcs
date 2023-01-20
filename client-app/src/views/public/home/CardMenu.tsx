import { Card, Col } from "antd";
import Meta from "antd/es/card/Meta";
import React from "react";
import { router } from "../../../routes/Routes";

const CardMenu = ({ title, path, image }: any) => {
  return (
    <Col xs={24} md={12} lg={6}>
      <Card
        hoverable
        onClick={() => router.navigate(path)}
        cover={
          <img
            className="object-cover object-top"
            style={{ height: "160px" }}
            src={image}
          />
        }
      >
        <Meta title={title} />
      </Card>
    </Col>
  );
};

export default CardMenu;
