import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { observer } from "mobx-react-lite";
import { Button, Divider, Skeleton, Space } from "antd";

import Main from "../../../../containers/Main";
import { useStore } from "../../../../store/store";
import NewsDetailHeader from "./NewsDetailHeader";
import NewsDetailImageGrid from "./NewsDetailImageGrid";
import { router } from "../../../../routes/Routes";
import ReactHtmlParser from "react-html-parser";

const NewsDetail = () => {
  const { id } = useParams();
  const {
    newsStore: { loadNews, newsSelected, clearSelectNews, loading },
  } = useStore();

  useEffect(() => {
    if (id) loadNews(id!);

    return () => clearSelectNews();
  }, [id, loadNews, clearSelectNews]);

  if (!newsSelected || loading)
    return (
      <Main>
        <div className="px-2 py-2 md:py-8 md:px-20 bg-white shadow-46 rounded-lg h-screen">
          <Skeleton active />
        </div>
      </Main>
    );

  return (
    <>
      <Main>
        <div className="justify-end py-4">
          <Button
            shape="round"
            type="default"
            onClick={() => router.navigate(-1)}
          >
            กลับ
          </Button>
        </div>

        <div className="px-2 py-2 md:py-8 md:px-20 bg-white shadow-46 rounded-lg">
          <NewsDetailHeader news={newsSelected!} />

          <Divider />

          <span>{ReactHtmlParser(newsSelected!.body!)}</span>

          {newsSelected!.newsPhotos!.length > 0 && (
            <NewsDetailImageGrid photos={newsSelected?.newsPhotos!} />
          )}
        </div>
      </Main>
    </>
  );
};

export default observer(NewsDetail);
