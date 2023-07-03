import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { observer } from "mobx-react-lite";
import { Breadcrumb, Skeleton } from "antd";

import Main from "../../../../containers/Main";
import { useStore } from "../../../../store/store";
import NewsDetailImageGrid from "./NewsDetailImageGrid";
import { RoutePath } from "../../../../constants/RoutePath";
import NewsDetailContent from "./NewsDetailContent";
import { truncate } from "../../../../utils/accessor";
import BreadcrumbPublic from "../../../../components/BreadcrumbPublic";

const NewsDetail = () => {
  const { id } = useParams();
  const {
    newsStore: { loadNews, newsSelected, clearSelectNews, loading },
  } = useStore();

  useEffect(() => {
    if (id) loadNews(id!);

    return () => clearSelectNews();
  }, [id, loadNews, clearSelectNews]);

  return (
    <div className="min-h-screen">
      <div className="bg-gray-100">
        <div className="container grid px-6 mx-auto">
          <BreadcrumbPublic
            text={
              (newsSelected &&
                truncate(newsSelected.subTitle! ?? newsSelected.title, 40)) ||
              "..."
            }
            links={
              <Breadcrumb.Item>
                <Link to={RoutePath.news} children="ข่าวประชาสัมพันธ์" />
              </Breadcrumb.Item>
            }
          />
        </div>
      </div>

      <Main hScreen={false}>
        <div className="mb-4">
          {/* Content body */}
          {!newsSelected || loading ? (
            <Skeleton className="py-8" active />
          ) : (
            <NewsDetailContent newsSelected={newsSelected} />
          )}

          {/* Grid images gallery */}
          {newsSelected && newsSelected!.newsPhotos!.length > 1 && (
            <NewsDetailImageGrid
              photos={newsSelected?.newsPhotos!.filter((a) => !a.isMain)}
            />
          )}
        </div>
      </Main>
    </div>
  );
};

export default observer(NewsDetail);
