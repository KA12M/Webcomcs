import React from "react";
import {  Descriptions, Divider, Space } from "antd";
import { Syllabus } from "../../../../models/Syllabus";

interface Props {
  syllabus: Syllabus;
}

const SyllabusContentLeft = ({ syllabus }: Props) => {
  return (
    <>
      <Descriptions column={1} title="ชื่อปริญญาและสาขาวิชา">
        <Descriptions.Item label="ภาษาไทย">
          {syllabus?.degreeTH}
        </Descriptions.Item>
        <Descriptions.Item label="ภาษาอังกฤษ">
          {syllabus?.degreeEN}
        </Descriptions.Item>
      </Descriptions>

      <Divider />
      <Descriptions column={1} title="วัตถุประสงค์ของหลักสูตร">
        {syllabus.objective.map((a: string, i: number) => (
          <Descriptions.Item key={i}>
            <Space>
              {`${i + 1})`}
              {a}
            </Space>
          </Descriptions.Item>
        ))}
      </Descriptions>

      <Divider />
      <Descriptions column={1} title="อาชีพที่สามารถทำได้หลังสำเร็จการศึกษา">
        {syllabus.occupation.map((a: string, i: number) => (
          <Descriptions.Item key={i}>
            <Space >
              {`${i + 1})`}
              {a}
            </Space>
          </Descriptions.Item>
        ))}
      </Descriptions> 

      <div className="mb-4"></div>
    </>
  );
};

export default SyllabusContentLeft;
