import React, { useEffect } from "react";
import { observer } from "mobx-react-lite";
import { Link } from "react-router-dom";
import { Breadcrumb, Row, Pagination, Empty, Col } from "antd";

import Main from "../../../containers/Main";
import NewsCard from "../home/news/NewsCard";
import { useStore } from "../../../store/store";
import GridSkeleton from "../../../components/GridSkeleton";
import NewsPageFilter from "./components/NewsPageFilter";
import { RoutePath } from "../../../constants/RoutePath";
import BreadcrumbPublic from "../../../components/BreadcrumbPublic";

const NewsPage = () => {
  const {
    newsStore: {
      loadNewses,
      stopLoading,
      setPagingParams,
      newsRegistry,
      pagination,
      pagingParams,
      loading,
      predicate,
    },
  } = useStore();

  useEffect(() => {
    loadNewses().then(stopLoading);
  }, [pagingParams, predicate]);

  return (
    <div className="min-h-screen">
      <div className="bg-gray-100">
        <div className="container grid px-6 mx-auto">
          <BreadcrumbPublic text="ข่าวประชาสัมพันธ์" />
        </div>
      </div>

      <Main hScreen={false}>
        <section className="py-8 px-4">
          <h1 className="text-center font-bold text-3xl text-indigo-500">
            ข่าวประชาสัมพันธ์
          </h1>

          <h3 className="text-center ">สาขาวิทยาการคอมพิวเตอร์</h3>
          <NewsPageFilter />
          <hr className="w-40 my-10 border-4 rounded-md sm:mx-0 mx-auto" />

          <div className="justify-center my-10">
            {!loading && newsRegistry.size < 1 && (
              <Empty
                image={Empty.PRESENTED_IMAGE_SIMPLE}
                description="ไม่มีข้อมูล"
              />
            )}

            <Row gutter={[16, 16]}>
              {loading ? (
                <Col span={24}>
                  <GridSkeleton />
                </Col>
              ) : (
                Array.from(newsRegistry.values()).map((val) => (
                  <NewsCard key={val.id} news={val} />
                ))
              )}
            </Row>
          </div>

          <Pagination
            hideOnSinglePage
            className="float-right mb-4"
            total={pagination?.totalItems}
            current={pagination?.currentPage}
            pageSize={pagingParams.pageSize}
            onChange={setPagingParams}
          />
        </section>
      </Main>
    </div>
  );
};

export default observer(NewsPage);
