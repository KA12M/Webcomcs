import React, { useEffect } from "react";
import { observer } from "mobx-react-lite";
import { Empty, Pagination, Skeleton, Typography } from "antd";

import Main from "../../../containers/Main";
import { useStore } from "../../../store/store";
import JobHistoryList from "./components/JobHistoryList";
import BreadcrumbPersonPage from "../../../components/BreadcrumbPersonPage";
import JobByNameChart from "../../private/home/components/JobByNameChart";

const JobHistoryPage = () => {
  const {
    jobHistoryStore: {
      jobHistoryRegistry,
      loading,
      loadJobHistories,
      pagination,
      pagingParams,
      setPagingParams,
    },
    reportStore: { loadJobHistoryByJobName, jobByJobName },
  } = useStore();

  useEffect(() => {
    loadJobHistoryByJobName();
  }, []);

  useEffect(() => {
    loadJobHistories();
  }, [pagingParams]);

  return (
    <Main>
      <BreadcrumbPersonPage />

      <section className="min-h-screen bg-gray-100 py-8 px-4">
        <h1 className="text-center font-bold text-3xl text-indigo-500">
          ประวัติการทำงานของนักศึกษา
        </h1>

        <h3 className="text-center mb-4">สาขาวิทยาการคอมพิวเตอร์</h3>
        <hr className="w-40 my-6 border-4 rounded-md sm:mx-0 mx-auto" />

        {loading ? (
          <Skeleton active />
        ) : (
          <>
            <JobByNameChart jobByNames={jobByJobName} />
            
            <hr className="w-40 my-6 border-4 rounded-md sm:mx-0 mx-auto" />

            <JobHistoryList
              jobHistory={Array.from(jobHistoryRegistry.values())}
            />
          </>
        )}

        {!loading && jobHistoryRegistry.size < 1 && (
          <Main>
            <Empty
              image={Empty.PRESENTED_IMAGE_SIMPLE}
              description="ไม่มีข้อมูล"
            />
          </Main>
        )}

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
  );
};

export default observer(JobHistoryPage);
