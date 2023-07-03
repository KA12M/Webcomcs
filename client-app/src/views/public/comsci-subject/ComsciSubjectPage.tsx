import React from "react";
import Main from "../../../containers/Main";
import BreadcrumbPublic from "../../../components/BreadcrumbPublic";
import { observer } from "mobx-react-lite";
import { useStore } from "../../../store/store";
import { Link } from "react-router-dom";
import { RoutePath } from "../../../constants/RoutePath";

const ComsciSubjectPage = () => {
  const {
    comSciSubject: { comsciSubjectRegistry },
  } = useStore();

  return (
    <div className="min-h-screen">
      <div className="bg-gray-100">
        <div className="container grid px-6 mx-auto">
          <BreadcrumbPublic text="เราเรียนอะไรบ้าง?" />
        </div>
      </div>

      <Main hScreen={false}>
        <div className="main flex flex-col my-6">
          <div className="header py-2">
            <div className="text-3xl font-bold text-indigo-500 mb-4">
              วิทยาการคอมพิวเตอร์ เราเรียนอะไรบ้าง?
            </div>
          </div>
          {Array.from(comsciSubjectRegistry.values()).map((val, i) => (
            <Link key={i} to={RoutePath.comsciSubjectDetail(val.id)}>
              <div className="each flex hover:shadow-lg select-none p-10 rounded-md border-gray-300 border mb-3 hover:border-gray-500 cursor-pointer">
                <div className="left space-x-4 flex flex-row">
                  <img
                    className="w-16 h-16 object-cover shadow-md rounded-md"
                    src={val.iconPreview}
                    alt=""
                  />
                  <div>
                    <div className="header text-blue-600 font-semibold text-2xl">
                      {val.subjectName}
                    </div>
                    <div className="desc text-gray-600">{val.subTitle}</div>
                  </div>
                </div>
                <div className="right m-auto mr-0">
                  <div className="icon">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-8 w-8 text-gray-600"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                      />
                    </svg>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </Main>
    </div>
  );
};

export default observer(ComsciSubjectPage);
