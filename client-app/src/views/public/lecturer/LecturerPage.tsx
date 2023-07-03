import React, { useEffect } from "react";
import Title from "antd/es/typography/Title";
import { Empty, Skeleton } from "antd";
import { observer } from "mobx-react-lite";

import { useStore } from "../../../store/store";
import Main from "../../../containers/Main";
import LecturerInterface from "./components/LecturerInterface";
import BreadcrumbPersonPage from "../../../components/BreadcrumbPersonPage";

const LecturerPage = () => {
  const {
    lecturerStore: { groupedLecturers, loadLecturers, predicate, loading },
  } = useStore();

  useEffect(() => {
    predicate.set("showHidden", false);
    loadLecturers();
  }, []);

  return (
    <Main>
      <BreadcrumbPersonPage />

      <section className="min-h-screen bg-gray-100 py-8 px-4">
        <h1 className="text-center font-bold text-3xl text-indigo-500">
          อาจารย์ประจำสาขา
        </h1>

        <h3 className="text-center mb-4">สาขาวิทยาการคอมพิวเตอร์</h3>
        <hr className="w-40 my-6 border-4 rounded-md sm:mx-0 mx-auto" />

        {loading ? <Skeleton active /> : LecturerInterface(groupedLecturers)}

        {!loading && Object.keys(groupedLecturers).length < 1 && (
          <Main>
            <Empty
              image={Empty.PRESENTED_IMAGE_SIMPLE}
              description="ไม่มีข้อมูล"
            />
          </Main>
        )}
      </section>
    </Main>
  );
};

export default observer(LecturerPage);
