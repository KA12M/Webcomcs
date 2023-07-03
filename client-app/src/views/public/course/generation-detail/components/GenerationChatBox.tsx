import React, { useEffect, useRef } from "react";
import { observer } from "mobx-react-lite";
import { useStore } from "../../../../../store/store";
import { Form, Input, Modal, Divider, Tooltip, Space } from "antd";
import AvatarPlaceholder from "./../../../../../components/AvatarPlaceholder";
import { ExclamationCircleFilled } from "@ant-design/icons";
import ChatBoxItem from "./ChatBoxItem";
import { useForm } from "antd/es/form/Form";
import { User } from "../../../../../models/User";
import { MyIcon } from "../../../../../constants/MyIcon";
import { Link } from "react-router-dom";
import { RoutePath } from "../../../../../constants/RoutePath";
import { TbMessageDots } from "react-icons/tb";

interface Props {
  generationId: string;
}

const GenerationChatBox = ({ generationId }: Props) => {
  const {
    courseCommentStore,
    generationStore: { generationSelect },
    userStore: { user },
  } = useStore();

  const formRef = useRef<any>(null);
  const [form] = useForm();

  useEffect(() => {
    if (generationId) courseCommentStore.createHubConnection(generationId);

    return () => {
      courseCommentStore.clearComments();
      courseCommentStore.setCountShown(8);
    };
  }, [courseCommentStore, generationId]);

  const handleChatSubmit = (values: any) => {
    if (values.body)
      courseCommentStore.addComment(values).then(() => {
        form.resetFields();
        formRef.current.getFieldInstance("body").focus();
      });
  };

  const handleRemoveComment = (id: string, author: User) => {
    Modal.confirm({
      title: "ลบข้อความ?",
      okText: "ลบ",
      okType: "danger",
      cancelText: "ยกเลิก",
      centered: true,
      icon: <ExclamationCircleFilled />,
      content: `ลบข้อความของ ${
        author.username == user?.username ? "คุณ" : author.fullName
      } ใช่ไหม`,
      async onOk() {
        await courseCommentStore.removeComment(id);
      },
    });
  };

  const handleKeyPress = (event: any) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      event.stopPropagation();
      form.submit();
    }
  };

  return (
    <>
      {user && (
        <Form
          ref={formRef}
          form={form}
          onFinish={handleChatSubmit}
          className="flex items-center justify-center py-2 px-3 bg-gray-100 rounded-lg mb-2"
        >
          <Form.Item className="m-0 w-12">
            <Link to={RoutePath.accountDetail(user.username)}>
              {user && user.image ? (
                <img
                  className="text-gray-500 cursor-pointer rounded-full w-10 h-10 p-1"
                  src={user.image}
                />
              ) : (
                <div className="p-2">
                  <AvatarPlaceholder
                    label={user?.fullName!}
                    className="rounded-full w-8 h-8"
                  />
                </div>
              )}
            </Link>
          </Form.Item>

          <Form.Item name="body" className="w-full m-0">
            <Input.TextArea
              allowClear
              autoSize={{ minRows: 1, maxRows: 4 }}
              className="block w-full text-sm text-gray-900 bg-white rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
              placeholder="เพิ่มข้อความของคุณ..."
              onKeyDown={handleKeyPress}
              onChange={(e) => {
                form.setFieldValue("body", e.target.value);
              }}
            />
          </Form.Item>

          <Form.Item className="m-0">
            <Tooltip placement="top" title={"ส่ง"}>
              <button
                type="submit"
                className="p-2 text-blue-600 rounded-full cursor-pointer hover:bg-blue-100"
              >
                <MyIcon.send />
              </button>
            </Tooltip>
          </Form.Item>
        </Form>
      )}

      <div className="py-4 my-4 antialiased mx-auto max-w-screen-sm shadow-md rounded-lg">
        <Space className="px-4">
          <TbMessageDots size={16}/>
          <h3 className="text-md font-semibold text-gray-900 ">
            พูดคุย {courseCommentStore.comments.length} รายการ
          </h3>
        </Space>

        <ChatBoxItem
          commentsByDate={Object.entries(courseCommentStore.commentsByDate())}
          user={user}
          isHost={generationSelect?.isHost}
          handleRemoveComment={handleRemoveComment}
        />

        {courseCommentStore.comments.length > courseCommentStore.countShown && (
          <div className="w-full px-4 mt-2">
            <button
              className="py-2 px-4 w-full block bg-slate-100 text-center rounded-lg font-medium hover:bg-slate-200 transition ease-in-out delay-75"
              onClick={() =>
                courseCommentStore.setCountShown(
                  courseCommentStore.countShown + 8
                )
              }
            >
              แสดงเพิ่มเติม
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default observer(GenerationChatBox);
