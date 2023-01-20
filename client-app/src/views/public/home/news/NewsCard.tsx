import React from "react";
import { Card, Col } from "antd";
import Meta from "antd/es/card/Meta";
import { formatDistance } from "date-fns";
import { th } from "date-fns/locale";

import { News } from "../../../../models/News";
import { router } from "../../../../routes/Routes";

const truncate = (txt: string) =>
  txt.length > 40 ? txt.substring(0, 40) + "..." : txt;

interface Props {
  news: News;
}

const NewsCard = ({ news }: Props) => {
  return (
    <Col xs={24} md={12} lg={6}>
      <Card
        onClick={() => router.navigate(`/news/${news.id}`)}
        hoverable
        cover={
          <img
            className="object-cover object-top w-full h-48"
            src={news.mainImage}
          />
        }
        className="box-border"
      >
        <Meta
          className="box-border"
          title={truncate(news.title)}
          description={formatDistance(new Date(news.createdAt), Date.now(), {
            addSuffix: true,
            locale: th,
          })}
        />
      </Card>
    </Col>
  );
};

export default NewsCard;
