import { Space, Button, Popconfirm, Switch } from "antd";
import { BiEdit, BiTrash } from "react-icons/bi";

export const LecturerColumn = ({
  handleRemove,
  setCurrentEdit,
  setEditMode,
  handleSetHidden
}: any) => {
  return [
    {
      title: "อาจารย์",
      key: "lecturer",
      dataIndex: "lecturer",
    },
    {
      title: "คำนำหน้า",
      key: "prefixed",
      dataIndex: "prefixed",
    },
    {
      title: "ชื่อ-นามสกุล",
      key: "name",
      dataIndex: "name",
    },
    {
      title: "ตำแหน่ง",
      key: "position",
      dataIndex: "position",
    },
    {
      title: "แสดง",
      key: "hidden",
      render: (lecturer: any) => (
        <Switch
          checkedChildren="แสดง"
          unCheckedChildren="ซ่อน"
          defaultChecked={!lecturer.hidden}
          onChange={() => handleSetHidden(lecturer.key)}
        />
      ),
    },
    {
      title: "จัดการ",
      key: "manage",
      render: (lecturer: any) => (
        <Space wrap>
          <Button
            shape="round"
            type="primary"
            children={<BiEdit size={18} />}
            onClick={() => {
              setCurrentEdit(lecturer.key);
              setEditMode(lecturer.key);
            }}
          />
          <Popconfirm
            placement="topRight"
            title="ลบ"
            description={"ข้อมูลจะถูกลบออกจากระบบ"}
            onConfirm={() => handleRemove(lecturer.key)}
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
