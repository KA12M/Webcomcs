import React from "react";
import ReactECharts, { EChartsOption } from "echarts-for-react";
import { Syllabus } from "../../../../models/Syllabus";
import {
  SubjectCategory,
  SubjectCategoryLabel,
} from "../../../../constants/SubjectCategory";

interface Props {
  syllabus: Syllabus;
}

const formatter = (params: any) => {
  const { percent } = params;
  return `${Math.round(percent)}%`;
};
const SyllabusChart = ({ syllabus }: Props) => {
  const data = [
    {
      value: syllabus.subjectGeneralSum,
      name: SubjectCategoryLabel[SubjectCategory.general],
    },
    {
      value: syllabus.subjectSpecificSum,
      name: SubjectCategoryLabel[SubjectCategory.specific],
    },
    {
      value: syllabus.subjectFreeElectiveSum,
      name: SubjectCategoryLabel[SubjectCategory.freeElective],
    },
  ];

  const option: EChartsOption = {
    tooltip: {
      trigger: "item",
    },
    legend: {
      top: "top",
    },
    series: [
      {
        name: "หน่วยกิต",
        type: "pie",
        radius: "50%",
        data: data,
        label: {
          show: true,
          formatter: formatter,
        },
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: "rgba(0, 0, 0, 0.5)",
          },
        },
      },
    ],
  };

  return (
    <ReactECharts
      option={option}
      style={{ height: "400px", width: "100%" }}
      opts={{ renderer: "svg" }}
    />
  );
};

export default SyllabusChart;
