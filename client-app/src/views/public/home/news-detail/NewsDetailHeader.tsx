import React from "react";
import { Divider, Space, Typography } from "antd";
import { BiPieChartAlt, BiUserCircle } from "react-icons/bi";

import { format, formatDistanceToNowStrict } from "date-fns";
import { th } from "date-fns/locale";

import { NewsDetail } from "../../../../models/News";
import NewsDateFormat from "./NewsDateFormat";

const { Text, Title } = Typography;

interface Props {
  news: NewsDetail;
}

const NewsDetailHeader = ({ news }: Props) => {
  return (
    <>
      <Title level={3}>
        <span className="font-bold">{news?.title}</span>
      </Title>

      {news.subTitle && (
        <Title level={5}>
          <Text type="secondary">{news.subTitle}</Text>
        </Title>
      )}

      <Text type="secondary">
        <Space split={<Divider type="vertical" />} wrap>
          <Space>
            <BiPieChartAlt />
            {NewsDateFormat(news.createdAt)}
          </Space>
          <Space>
            <Space>
              <BiUserCircle />
              {news!.author?.fullName}
            </Space>
          </Space>
        </Space>
      </Text>
    </>
  );
};

export default NewsDetailHeader;
