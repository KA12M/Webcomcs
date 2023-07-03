import React from "react";

import SyllabusChart from "./SyllabusChart";
import { Typography } from "antd";
import { Syllabus } from "./../../../../models/Syllabus";
import SubjectDescription from "./SubjectDescription";
import Title from "antd/es/typography/Title";

interface Props {
  syllabus: Syllabus;
}

const SyllabusContentRight = ({ syllabus }: Props) => {
  if (!syllabus) return <></>;

  return (
    <>
      <Title level={4}>
        <span>โครงสร้างหลักสูตร</span>
      </Title>
      <span>
        โครงสร้างหลักสูตร
        แบ่งเป็นหมวดวิชาที่สอดคล้องกับที่กำหนดไว้ในเกณฑ์มาตรฐานหลักสูตรของกระทรวงศึกษาธิการ
        ดังนี้
      </span>

      <div className="chart-container rounded-lg bg-gray-100 pt-2 mb-2">
        <SyllabusChart syllabus={syllabus} />
      </div>

      <Typography.Title level={4}>
        <span>จำนวนหน่วยกิตรวมตลอดหลักสูตร {syllabus.total} หน่วยกิต</span>
      </Typography.Title>

      <SubjectDescription syllabus={syllabus} />
    </>
  );
};

export default SyllabusContentRight;
