import React, { useEffect, useRef, useState } from "react";
import {
  Button,
  Form,
  DatePicker,
  Select,
  Divider,
  Space,
  Input,
  InputRef,
} from "antd";
import { observer } from "mobx-react-lite";
import { useForm } from "antd/es/form/Form";
import { useStore } from "../../../../../store/store";
import TextArea from "antd/es/input/TextArea";
import JobInput from "./JobInput";
import moment from "moment";
import { PlusOutlined } from "@ant-design/icons";

interface Props {
  setFormMode: (state: boolean) => void;
}

const FormJobHistory = ({ setFormMode }: Props) => {
  const {
    jobHistoryStore: { updateJobHistory, submittingLoading },
    userStore: { profile },
    commonStore: {loadJobNameList, jobNameList}
  } = useStore();
  const inputRef = useRef<InputRef>(null);
  const [inputJobName, setInputJobName] = useState("");

  const [form] = useForm();

  useEffect(() => {
    loadJobNameList();
  }, []);

  useEffect(() => {
    if (profile?.jobHistory) {
      let initialValues = {
        ...profile.jobHistory,
        date: moment(profile.jobHistory.date),
      };
      form.setFieldsValue(initialValues);
    }
  }, []);

  const handleSubmit = (values: any) => {
    updateJobHistory(values).then(() => setFormMode(false));
  };

  const addItem = (
    e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>
  ) => {
    e.preventDefault();
    if (inputJobName && !jobNameList.includes(inputJobName)) {
      jobNameList.push(inputJobName);
      setInputJobName("");
      inputRef.current?.focus();
    }
  };

  return (
    <Form
      className="py-4"
      layout="vertical"
      form={form}
      onFinish={handleSubmit}
    >
      <Form.Item
        name="jobName"
        label="ชื่องาน"
        rules={[{ required: true, message: "ต้องระบุ" }]}
      >
        <Select
          style={{ width: 300 }}
          placeholder="ชื่องาน"
          options={
            jobNameList &&
            jobNameList.map((item) => ({ label: item, value: item }))
          }
          dropdownRender={(menu) => (
            <>
              {menu}
              <Divider style={{ margin: "8px 0" }} />
              <Space style={{ padding: "0 8px 4px" }}>
                <Input
                  value={inputJobName}
                  ref={inputRef}
                  onChange={(e) => setInputJobName(e.target.value)}
                  placeholder="กรอกคำนำหน้าชื่อ"
                />
                <Button type="text" icon={<PlusOutlined />} onClick={addItem}>
                  เพิ่ม
                </Button>
              </Space>
            </>
          )}
        />
      </Form.Item>
      <JobInput label="ชื่อบริษัท" name="company" required />
      <JobInput label="ตำแหน่ง" name="position" required />

      <Form.Item label="วันที่เริ่มงาน" name="date" required>
        <DatePicker picker="month" format="MMMM, YYYY" />
      </Form.Item>

      <Form.Item label="รายละเอียด" name="description">
        <TextArea rows={2} />
      </Form.Item>

      <Form.Item>
        <Button
          shape="round"
          type="primary"
          htmlType="submit"
          children="บันทึก"
          loading={submittingLoading}
        />
      </Form.Item>
    </Form>
  );
};

export default observer(FormJobHistory);
