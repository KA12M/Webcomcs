import React, { useState } from "react";
import { observer } from "mobx-react-lite";
import { Button, Card, Descriptions, Empty, Popconfirm, Space } from "antd";
import { format } from "date-fns";
import { th } from "date-fns/locale";
import FormJobHistory from "./components/FormJobHistory";
import { useStore } from "../../../../store/store";
import { BiEdit, BiTrash } from "react-icons/bi";

const AccountJobHistory = () => {
  const {
    userStore: { profile },
    jobHistoryStore: { meRemoveJobHistory },
  } = useStore();
  const { jobHistory } = profile!;

  const [formMode, setFormMode] = useState(false);

  return (
    <>
      {profile!.isMe && !jobHistory && (
        <Button
          onClick={() => setFormMode(!formMode)}
          shape="round"
          type="dashed"
        >
          เพิ่มประวัติการทำงาน
        </Button>
      )}

      <div className="overflow-scroll">
        {formMode ? (
          <FormJobHistory setFormMode={setFormMode} />
        ) : !jobHistory ? (
          <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
        ) : (
          <Card
            title={jobHistory.jobName}
            extra={
              profile?.isMe && (
                <Space wrap>
                  <Button
                    shape="round"
                    type="primary"
                    onClick={() => setFormMode(!formMode)}
                  >
                    <BiEdit />
                  </Button>
                  <Popconfirm
                    title="ลบ"
                    placement="topRight"
                    description={"ข้อมูลจะถูกลบออกจากระบบ"}
                    onConfirm={meRemoveJobHistory}
                  >
                    <Button shape="round" type="primary" danger>
                      <BiTrash />
                    </Button>
                  </Popconfirm>
                </Space>
              )
            }
          >
            <Descriptions>
              <Descriptions.Item label="บริษัท">
                {jobHistory.company}
              </Descriptions.Item>
              <Descriptions.Item label="ตำแหน่ง">
                {jobHistory.position}
              </Descriptions.Item>
              <Descriptions.Item label="รายละเอียด">
                {jobHistory.description}
              </Descriptions.Item>
              <Descriptions.Item label="วันที่เริ่มทำงาน">
                {format(
                  new Date(jobHistory.date),
                  `MMMM ${new Date(jobHistory.date).getFullYear() + 543}`,
                  {
                    locale: th,
                  }
                )}
              </Descriptions.Item>
            </Descriptions>
          </Card>
        )}
      </div>
    </>
  );
};

export default observer(AccountJobHistory);
