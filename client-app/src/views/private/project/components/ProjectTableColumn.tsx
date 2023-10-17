import { Button, Popconfirm, Space, Tooltip } from "antd";
import { BiEdit, BiSearchAlt2, BiTrash } from "react-icons/bi";
import { router } from "../../../../routes/Routes";
import { RoutePath } from "../../../../constants/RoutePath";

export const columns = ({ setProjectSelect, deleteProject }: any) => {
  return [
    {
      title: "ลำดับ",
      key: "index",
      dataIndex: "index",
    },
    {
      title: "โครงงาน",
      key: "nameTH",
      dataIndex: "nameTH",
    },
    {
      title: "นักศึกษา",
      key: "student",
      dataIndex: "student",
    },
    {
      title: "วันที่",
      key: "createdAt",
      dataIndex: "createdAt",
    },
    {
      title: "แสดง",
      key: "isUsed",
      dataIndex: "isUsed",
    },
    {
      title: "จัดการ",
      key: "manage",
      render: (project: any) => (
        <Space wrap>
          <Tooltip placement="top" title={"รายละเอียด"}>
            <Button
              shape="round"
              type="default"
              children={<BiSearchAlt2 size={18} />}
              onClick={() => {
                setProjectSelect(project.key);
                router.navigate(RoutePath.projectDetail(project.key));
              }}
            />
          </Tooltip>
          <Tooltip placement="top" title={"แก้ไข"}>
            <Button
              shape="round"
              type="primary"
              color="yellow"
              onClick={() =>
                router.navigate(RoutePath.projectFormEdit(project.key))
              }
              children={<BiEdit size={18} />}
            />
          </Tooltip>
          <Popconfirm
            placement="topRight"
            title="ลบ"
            description={"ข้อมูลจะถูกลบออกจากระบบ"}
            onConfirm={() => deleteProject(project.key)}
          >
            <Tooltip placement="right" title={"ลบ"}>
              <Button
                shape="round"
                danger
                children={<BiTrash size={18} />}
                type="primary"
              />
            </Tooltip>
          </Popconfirm>
        </Space>
      ),
    },
  ];
};
