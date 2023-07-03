import { Button, Space, Tooltip } from "antd";
import { BiSearchAlt2 } from "react-icons/bi";
import { router } from "../../../../routes/Routes";
import { RoutePath } from '../../../../constants/RoutePath';

export const columns = ({ setProjectSelect }: any) => {
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
        </Space>
      ),
    },
  ];
};
