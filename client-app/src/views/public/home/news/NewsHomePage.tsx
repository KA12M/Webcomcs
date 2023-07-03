import React, { useEffect } from "react";
import Title from "antd/es/typography/Title";
import { observer } from "mobx-react-lite";
import { Empty, Row, Space, Button, Col } from "antd";

import NewsCard from "./NewsCard";
import { useStore } from "../../../../store/store";
import { router } from "../../../../routes/Routes";
import { RoutePath } from "../../../../constants/RoutePath";
import GridSkeleton from "../../../../components/GridSkeleton";

const NewsHomePage = () => {
  const {
    newsStore: {
      loadNewses,
      stopLoading,
      newsRegistry,
      loading,
      setPagingParams,
    },
  } = useStore();

  useEffect(() => {
    loadNewses().then(stopLoading);

    () => setPagingParams(1, 10);
  }, []);

  return (
    <div className="py-6  text-gray-400">
      <Space wrap align="center">
        <Title level={2}>
          <span className="border-l-4 border-gray-500 pl-4 rounded-sm">
            ข่าวประชาสัมพันธ์
          </span>
        </Title> 
      </Space>

      {loading ? (
        <Row className="py-4">
          <Col span={24}>
            <GridSkeleton />
          </Col>
        </Row>
      ) : newsRegistry.size > 0 ? (
        <>
          <Row gutter={[16, 16]}>
            {Array.from(newsRegistry.values()).map(
              (news, i) => i < 4 && <NewsCard key={news.id} news={news} />
            )}
          </Row>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
            className="py-2"
          >
            {newsRegistry.size > 4 && (
              <Button
                type="dashed"
                children="เพิ่มเติม"
                onClick={() => router.navigate(RoutePath.news)}
              />
            )}
          </div>
        </>
      ) : (
        <Empty className="shadow-md rounded-md py-8" />
      )}
    </div>
  );
};

export default observer(NewsHomePage);
