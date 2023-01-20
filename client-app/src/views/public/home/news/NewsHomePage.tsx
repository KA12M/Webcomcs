import React, { useEffect } from "react";
import Title from "antd/es/typography/Title";
import { observer } from "mobx-react-lite";
import { Empty, Row } from "antd";

import NewsCard from "./NewsCard";
import { useStore } from "../../../../store/store";
import LoadingSkeleton from "./LoadingSkeleton";  

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
    setPagingParams(1, 4);
    loadNewses().then(stopLoading);

    () => setPagingParams(1, 10);
  }, []);

  return (
    <div className="py-6  text-gray-400">
      <Title level={2}>
        <span>ข่าวประชาสัมพันธ์</span>
      </Title>

      {!loading || newsRegistry ? (
        Array.from(newsRegistry.values()).length > 0 ? (
          <Row gutter={[16, 16]}>
            {Array.from(newsRegistry.values()).map((news) => (
              <NewsCard key={news.id} news={news} />
            ))}
          </Row>
        ) : (
          <Empty className="shadow-46 rounded-lg py-8" />
        )
      ) : (
        <LoadingSkeleton />
      )}
    </div>
  );
};

export default observer(NewsHomePage);
