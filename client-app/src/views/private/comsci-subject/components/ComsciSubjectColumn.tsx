import React from "react";
import { Button, Popconfirm, Space, Tooltip } from "antd";
import { BiEdit, BiSearchAlt2, BiTrash } from "react-icons/bi";
import { router } from "../../../../routes/Routes";
import { useStore } from "../../../../store/store";
import { RoutePath } from '../../../../constants/RoutePath';

const ComsciSubjectColumn = ({ handleSetEdit, mapTable }: any) => {
  const {
    comSciSubject: { removeSubject },
  } = useStore();

  return [
    {
      title: "รูปหัวข้อ",
      key: "icon",
      dataIndex: "icon",
    },
    {
      title: "ชื่อหัวข้อ",
      key: "subjectName",
      dataIndex: "subjectName",
    },
    {
      title: "จัดการ",
      key: "action",
      render: (subject: any) => (
        <Space wrap>
          <Tooltip placement="top" title={"รายละเอียด"}>
            <Button
              shape="round"
              type="default"
              children={<BiSearchAlt2 size={18} />}
              onClick={() => router.navigate(RoutePath.comsciSubjectDetail(subject.key))}
            />
          </Tooltip>
          <Tooltip placement="top" title={"แก้ไข"}>
            <Button
              shape="round"
              type="primary"
              color="yellow"
              children={<BiEdit size={18} />}
              onClick={() => handleSetEdit(subject.key)}
            />
          </Tooltip>
          <Popconfirm
            placement="topRight"
            title="ลบ"
            description={"ข้อมูลจะถูกลบออกจากระบบ"}
            onConfirm={() => removeSubject(subject.key).then(mapTable)}
          >
            <Button
              shape="round"
              danger
              children={<BiTrash size={18} />}
              type="primary"
            />
          </Popconfirm>
        </Space>
      ),
    },
  ];
};

export default ComsciSubjectColumn;
