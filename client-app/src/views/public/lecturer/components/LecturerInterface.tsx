import React from "react";

import { Lecturer } from "../../../../models/Lecturer";
import URLImage from "../../../../utils/URL";
import { Col, Row } from "antd";
import { useStore } from "../../../../store/store";
import HtmlParser from "react-html-parser";

const ModalCard = ({ el }: any) => (
  <>
    <div className="relative overflow-hidden px-6">
      <img
        src={URLImage(el.image!)}
        className="w-36 h-auto mx-auto rounded-full bg-gray-50"
        alt={el.fullName}
      />
    </div>
    <div className="pt-6 text-center">
      <p className="text-lg leading-normal font-bold mb-1">
        {`${el.prefix} ${el.fullName}`}
      </p>
      <p className="text-gray-500 leading-relaxed font-light">{el.position}</p>
    </div>
    <div className="px-4">
      <p>ข้อมูลเพิ่มเติม:</p>
      <div>{HtmlParser(el.expert)}</div>
    </div>
  </>
);

const LecturerInterface = (groupedLecturers: any) => {
  const {
    modalStore: { openModal },
  } = useStore();

  return (
    <Row className="" gutter={[16, 16]}>
      {Object.entries(groupedLecturers).map(([key, val]: any) =>
        val.map((el: Lecturer) => (
          <Col key={el.id} xs={24} md={12} lg={6}>
            <div
              className="relative overflow-hidden bg-white mb-12 hover-grayscale-0 wow fadeInUp py-4"
              data-wow-duration="1s"
              style={{
                visibility: "visible",
                animationDuration: "1s",
                animationName: "fadeInUp",
              }}
            >
              <div className="relative overflow-hidden px-6">
                <img
                  src={URLImage(el.image!)}
                  className="w-36 h-auto mx-auto rounded-full bg-gray-50 cursor-pointer"
                  alt={el.fullName}
                  onClick={() => openModal(<ModalCard el={el} />)}
                />
              </div>
              <div className="pt-6 text-center">
                <p className="text-lg leading-normal font-bold mb-1">
                  {`${el.prefix} ${el.fullName}`}
                </p>
                <p className="text-gray-500 leading-relaxed font-light">
                  {el.position}
                </p>
              </div>
            </div>
          </Col>
        ))
      )}
    </Row>
  );
};

export default LecturerInterface;
