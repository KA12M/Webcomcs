import { Button, Popconfirm, Space, Tooltip } from "antd";
import { BiEdit, BiSearchAlt2, BiTrash } from "react-icons/bi";
import { router } from "../../../../routes/Routes";
import { RoutePath } from "../../../../constants/RoutePath";

export const columns = ({ handleRemove, handleEdit }: any) => {
  return [
    {
      title: "หลักสูตร",
      key: "nameTH",
      dataIndex: "nameTH",
    },
    {
      title: "หน่วยกิตรวม",
      key: "total",
      dataIndex: "total",
    },
    {
      title: "ปี",
      key: "year",
      dataIndex: "year",
    },
    {
      title: "แสดง",
      key: "hidden",
      dataIndex: "hidden",
    },
    {
      title: "จัดการ",
      key: "manage",
      render: (syllabus: any) => (
        <Space wrap>
          <Tooltip placement="top" title={"รายละเอียด"}>
            <Button
              shape="round"
              type="default"
              children={<BiSearchAlt2 size={18} />}
              onClick={() => router.navigate(RoutePath.syllabus)}
            />
          </Tooltip>
          <Tooltip placement="top" title={"แก้ไข"}>
            <Button
              shape="round"
              type="primary"
              children={<BiEdit size={18} />}
              onClick={() => handleEdit(syllabus.key)}
            />
          </Tooltip>
          <Popconfirm
            placement="topRight"
            title="ลบ"
            description={"ข้อมูลจะถูกลบออกจากระบบ"}
            onConfirm={() => handleRemove(syllabus.key)}
          >
            <Button
              danger
              type="primary"
              shape="round"
              children={<BiTrash size={18} />}
            />
          </Popconfirm>
        </Space>
      ),
    },
  ];
};
