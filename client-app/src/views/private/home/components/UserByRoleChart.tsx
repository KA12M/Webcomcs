import React from "react";
import Title from "antd/es/typography/Title";
import ReactECharts, { EChartsOption } from "echarts-for-react";
import { RoleLabel } from "../../../../constants/UserRole";

const formatter = (params: any) => {
  const { percent } = params;
  return `${Math.round(percent)}%`;
};

const UserByRoleChart = ({ userByRoles }: any) => {
  const data = userByRoles.map((val: any) => ({
    name: RoleLabel[val.role]["th"],
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
        <span>ผู้ใช้ในระบบ</span>
      </Title>
      <span>ข้อมูลแบ่งตามประเภทของผู้ใช้งาน</span>

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

export default UserByRoleChart;
