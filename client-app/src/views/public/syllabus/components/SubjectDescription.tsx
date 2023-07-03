import React from "react";
import { Badge, Collapse, Space } from "antd";
import { SubjectCategoryLabel } from "../../../../constants/SubjectCategory";

interface Props {
  syllabus: any;
}

const SubjectDescription = ({ syllabus }: Props) => {
  const CategoryLabel: any = SubjectCategoryLabel;

  const subjects: any = {
    0: "subjectGeneral",
    1: "subjectSpecific",
    2: "subjectFreeElective",
  };

  return (
    <Collapse accordion className="flex flex-col">
      {Array.from({ length: 3 }).map((_, i) => (
        <Collapse.Panel
          key={i}
          header={
            <div className="flex justify-between">
              <div>{CategoryLabel[i]}</div>
              <div>ไม่น้อยกว่า {syllabus[`${subjects[i]}Sum`]} หน่วยกิต</div>
            </div>
          }
        >
          {syllabus[subjects[i]].map((item: any, index: any) => (
            <div className="px-6 flex justify-between" key={index}>
              <div>{item.name}</div>
              <div>{item.credit} หน่วยกิต</div>
            </div>
          ))}
        </Collapse.Panel>
      ))}
    </Collapse>
  );
};

export default SubjectDescription;
