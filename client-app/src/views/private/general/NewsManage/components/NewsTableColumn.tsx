import { Button, Popconfirm, Space, Tooltip } from "antd";
import { BiEdit, BiSearchAlt2, BiTrash } from "react-icons/bi";
import { router } from "../../../../../routes/Routes";
import { RoutePath } from '../../../../../constants/RoutePath';

export const columns = ({ deleteNews, mapTable, setCurrentEdit }: any) => {
  return [
    {
      title: "ประชาสัมพันธ์",
      key: "mainImage",
      dataIndex: "mainImage",
    },
    {
      title: "หัวข้อ",
      key: "title",
      dataIndex: "title",
    },
    {
      title: "วันที่",
      key: "createdAt",
      dataIndex: "createdAt",
    },
    {
      title: "แสดง",
      key: "isHidden",
      dataIndex: "isHidden",
    },
    {
      title: "จัดการ",
      key: "action",
      render: (news: any) => (
        <Space wrap>
          <Tooltip placement="top" title={"รายละเอียด"}>
            <Button
              shape="round"
              type="default"
              children={<BiSearchAlt2 size={18} />}
              onClick={() => router.navigate(RoutePath.newsDetail(news.key))}
            />
          </Tooltip>
          <Tooltip placement="top" title={"แก้ไข"}>
            <Button
              shape="round"
              type="primary"
              color="yellow"
              onClick={() => setCurrentEdit(news.key)}
              children={<BiEdit size={18} />}
            />
          </Tooltip>
          <Popconfirm
            placement="topRight"
            title="ลบ"
            description={"ข้อมูลจะถูกลบออกจากระบบ"}
            onConfirm={() => deleteNews(news.key).then(mapTable)}
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
