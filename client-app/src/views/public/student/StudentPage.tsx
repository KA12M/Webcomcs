import React, { useEffect } from "react";
import { observer } from "mobx-react-lite";
import Title from "antd/es/typography/Title";
import { Pagination, Row, Col, Skeleton } from "antd";

import StudentList from "./StudentList";
import Main from "../../../containers/Main";
import { useStore } from "../../../store/store";
import GridSkeleton from "../../../components/GridSkeleton";
import BreadcrumbPersonPage from "../../../components/BreadcrumbPersonPage";

const StudentPage = () => {
  const {
    accountStore: {
      pagingParams,
      loading,
      accountsRegistry,
      setPredicate,
      loadAccounts,
      pagination,
      setPagingParams,
    },
  } = useStore();

  useEffect(() => {
    setPredicate({ role: "1" });
    loadAccounts();
  }, [pagingParams]);

  return (
    <Main>
      <BreadcrumbPersonPage />

      <section className="min-h-screen bg-gray-100 py-8 px-4">
        <h1 className="text-center font-bold text-3xl text-indigo-500">
          นักศึกษา
        </h1>

        <h3 className="text-center mb-4">สาขาวิทยาการคอมพิวเตอร์</h3>
        <hr className="w-40 my-6 border-4 rounded-md sm:mx-0 mx-auto" />

        {loading && accountsRegistry.size < 1 ? (
          <Skeleton active />
        ) : (
          <StudentList students={Array.from(accountsRegistry.values())} />
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

export default observer(StudentPage);
