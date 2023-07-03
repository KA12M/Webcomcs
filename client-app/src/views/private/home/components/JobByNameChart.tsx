import React from "react";
import ReactECharts, { EChartsOption } from "echarts-for-react";
import { JobHistoryByName } from "../../../../models/Report";
import Title from "antd/es/typography/Title";

interface Props {
  jobByNames: JobHistoryByName[];
}

const formatter = (params: any) => {
  const { percent } = params;
  return `${Math.round(percent)}%`;
};

const JobByNameChart = ({ jobByNames }: Props) => {
  const data = jobByNames.map((val) => ({
    name: val.jobName,
    value: val.count,
  }));

  const option: EChartsOption = {
    tooltip: {
      trigger: "item",
    },
    legend: {
      top: "top",
    },
    series: [
      {
        name: "จำนวน",
        type: "pie",
        radius: "50%",
        data,
        label: {
          show: true,
          formatter,
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
    <>
      <Title level={4}>
        <span>การทำงานของนักศึกษา</span>
      </Title>
      <span>ข้อมูลการทำงานแบ่งตามชื่องานของนักศึกษา</span>

      <div className="rounded-lg bg-gray-100 pt-2 mb-2">
        <ReactECharts
          option={option}
          style={{ height: "400px", width: "100%" }}
          opts={{ renderer: "svg" }}
        />
      </div>
    </>
  );
};

export default JobByNameChart;
