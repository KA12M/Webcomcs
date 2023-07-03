import React, { useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import BreadcrumbPublic from "../../../../components/BreadcrumbPublic";
import Main from "../../../../containers/Main";
import { useStore } from "../../../../store/store";
import { Link, useParams } from "react-router-dom";
import { router } from "../../../../routes/Routes";
import { Breadcrumb, Col, Row, Skeleton } from "antd";
import { RoutePath } from "../../../../constants/RoutePath";
import ReactHtmlParser from "react-html-parser";

const ComsciSubjectDetail = () => {
  const { id } = useParams();
  const {
    comSciSubject: { loading, loadSubject, clearSelect, subjectSelected },
  } = useStore();
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState(0);

  useEffect(() => {
    if (!id) router.navigate("*");

    loadSubject(id!);

    return () => {
      clearSelect();
    };
  }, []);

  const handleDotClick = (e: any, index: number) => {
    setSelectedPhotoIndex(index);
  };

  return (
    <div className="min-h-screen">
      <div className="bg-gray-100">
        <div className="container grid px-6 mx-auto">
          <BreadcrumbPublic
            text={subjectSelected?.subjectName || "..."}
            links={
              <Breadcrumb.Item>
                <Link to={RoutePath.comsciSubjectPage}>เราเรียนอะไรบ้าง?</Link>
              </Breadcrumb.Item>
            }
          />
        </div>
      </div>

      <Main hScreen={false}>
        <div className="py-4">
          {loading ? (
            <Skeleton active />
          ) : (
            <Row gutter={[16, 16]}>
              <Col xs={24} lg={14}>
                <div className="flex flex-col p-8 bg-indigo-500 shadow-md shadow-gray-200 hover:shodow-lg rounded-2xl">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <img
                        src={subjectSelected?.iconPreview}
                        className="w-16 h-16 object-cover rounded-md shadow-zinc-100"
                        alt=""
                      />
                      <div className="flex flex-col ml-3 space-y-4">
                        <div className="font-bold text-lg leading-none text-white">
                          {subjectSelected?.subjectName}
                        </div>
                        <p className="text-md text-gray-50 leading-none mt-1">
                          {subjectSelected?.subTitle}
                        </p>
                      </div>
                    </div>
                  </div>
                </div> 
                <div className="py-8 overflow-x-hidden whitespace-pre-wrap">
                  {ReactHtmlParser(subjectSelected?.description!)}
                </div>
              </Col>
              <Col xs={24} lg={10}>
                <div className="flex flex-col items-center">
                  <div className="flex flex-col items-center">
                    <div className="swiper flex overflow-x-scroll">
                      {subjectSelected?.photos.map((val, i) => (
                        <img
                          key={i}
                          className="w-full h-80 object-cover bg-gray-300"
                          src={val.imagePreview}
                          id={`slide-${i}`}
                        />
                      ))}
                    </div>
                  </div>
                  <div className="flex mt-4">
                    {subjectSelected?.photos.map((val, i) => (
                      <a
                        key={i}
                        href={`#slide-${i}`}
                        className={`w-4 h-4 mx-1 rounded-full ${
                          i === selectedPhotoIndex
                            ? "bg-gray-400"
                            : "bg-gray-300"
                        }`}
                        onClick={(e) => handleDotClick(e, i)}
                      ></a>
                    ))}
                  </div>
                </div>
              </Col>
            </Row>
          )}
        </div>
      </Main>
    </div>
  );
};

export default observer(ComsciSubjectDetail);
