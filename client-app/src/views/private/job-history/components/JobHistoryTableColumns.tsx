export const columns = ({}: any) => {
  return [
    {
      title: "นักศึกษา",
      key: "user",
      dataIndex: "user",
    },
    {
      title: "ชื่องาน",
      key: "jobName",
      dataIndex: "jobName",
    },
    {
      title: "บริษัท",
      key: "company",
      dataIndex: "company",
    },
    {
      title: "ตำแหน่ง",
      key: "position",
      dataIndex: "position",
    },

    {
      title: "แสดง",
      key: "isUse",
      dataIndex: "isUse",
    },
  ];
};
